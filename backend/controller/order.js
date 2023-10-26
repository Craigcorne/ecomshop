const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const Order = require("../model/order");
const Shop = require("../model/shop");
const Product = require("../model/product");
const sendMail = require("../utils/sendMail");
const pdf = require("pdfkit");
const fs = require("fs");
const path = require("path");

const sharedOrderDetails = [];
// create new order
router.post(
  "/create-order",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        cart,
        shippingAddress,
        user,
        totalPrice,
        paymentInfo,
        shippingPrice,
        discount,
      } = req.body;

      const shopItemsMap = new Map();
      const shopEmailsMap = new Map();

      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);

        if (!shopEmailsMap.has(shopId)) {
          const shop = await Shop.findById(shopId);
          if (shop) {
            shopEmailsMap.set(shopId, shop.email);
          }
        }
      }

      const orders = [];
      const sharedOrderDetails = [];

      for (const [shopId, items] of shopItemsMap) {
        const shopEmail = shopEmailsMap.get(shopId);

        // Create a single order with all items from the same shop
        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
          shippingPrice,
          discount,
        });

        const subTotals = order?.cart.reduce(
          (acc, item) => acc + item.qty * item.discountPrice,
          0
        );

        if (order.paymentInfo.status === "succeeded") {
          try {
            const shop = await Shop.findById(shopId);

            if (!shop) {
              console.error(`Shop with ID ${shopId} not found.`);
            } else {
              const amountToAdd = (subTotals * 0.9).toFixed(2);
              // const amountToAdd2 = (subTotals * 0.1).toFixed(2);
              shop.availableBalance += parseInt(amountToAdd);
              // user.admin.availableBalance += parseInt(amountToAdd2);

              await shop.save();
            }
            order.cart.forEach(async (o) => {
              if (o.sizes.length > 0) {
                await updateOrderWithSizes(o._id, o.qty, o.size);
              }
              await updateOrder(o._id, o.qty);
            });

            async function updateOrder(id, qty) {
              const product = await Product.findById(id);

              product.stock -= qty;
              product.sold_out += qty;

              await product.save({ validateBeforeSave: false });
            }

            async function updateOrderWithSizes(id, qty, size) {
              const product = await Product.findById(id);

              product.sizes.find((s) => s.name === size).stock -= qty;

              await product.save({ validateBeforeSave: false });
            }
          } catch (error) {
            console.error(
              `Error updating availableBalance for shop ${shopId}: ${error}`
            );
          }
          orders.push(order);
          sharedOrderDetails.push(order);
        }
      }

      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      console.log(error);

      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.post(
  "/sendemail",
  catchAsyncErrors(async (req, res, next) => {
    const orders = sharedOrderDetails;
    console.log(orders);

    const combinedAttachments = [];
    for (const order of orders) {
      console.log(order);

      combinedAttachments.push(
        ...order.cart.map((item) => ({
          filename: item.images[0].url,
          path: item.images[0].url,
          cid: item.images[0].url,
        }))
      );
    }
    combinedAttachments.push({
      filename: "logo.png",
      path: `https://res.cloudinary.com/bramuels/image/upload/v1695878268/logo/LOGO-01_moo9oc.png`,
      cid: "logo",
    });

    // Send a single email to the user with combined order details
    await sendMail({
      email: user.email,
      subject: "Order Confirmation",
      attachments: combinedAttachments,
    });

    // Send individual emails to each shop
    for (const [shopId, shopEmail] of shopEmailsMap.entries()) {
      const shopAttachments = shopItemsMap.get(shopId).map((item) => ({
        filename: item.images[0].url,
        path: item.images[0].url,
        cid: item.images[0].url,
      }));
      shopAttachments.push({
        filename: "logo.png",
        path: `https://res.cloudinary.com/bramuels/image/upload/v1695878268/logo/LOGO-01_moo9oc.png`,
        cid: "logo",
      });

      await sendMail({
        email: shopEmail,
        subject: "Order Confirmation for Your Shop",

        attachments: shopAttachments,
      });
    }
  })
);

// get all orders of user
router.get(
  "/get-all-orders/:userId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({ "user._id": req.params.userId }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get("/generate-receipt/:orderId", (req, res) => {
  const orderId = req.params.orderId;
  const pdfFileName = `receipt_${orderId}.pdf`;

  const tempReceiptsDir = path.join(__dirname, "..", "public", "receipts");

  if (!fs.existsSync(tempReceiptsDir)) {
    fs.mkdirSync(tempReceiptsDir, { recursive: true });
  }

  const doc = new pdf();
  res.setHeader("Content-Disposition", `attachment; filename="${pdfFileName}"`);

  doc.pipe(res);

  doc.text(`Receipt for Order ID: ${orderId}`);

  doc.end();

  const tempPdfPath = path.join(tempReceiptsDir, pdfFileName);
  res.on("finish", () => {
    if (fs.existsSync(tempPdfPath)) {
      fs.unlinkSync(tempPdfPath, (err) => {
        if (err) {
          console.error("Error while deleting the temporary file:", err);
        }
      });
    }
  });
});

// get all orders of seller
router.get(
  "/get-seller-all-orders/:shopId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({
        "cart.shopId": req.params.shopId,
      }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update order status for seller
router.put(
  "/update-order-status/:id",
  // isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }
      if (
        req.body.status === "Transferred to delivery partner" &&
        order.paymentInfo.status !== "succeeded"
      ) {
        order.cart.forEach(async (o) => {
          if (o.sizes.length > 0) {
            await updateOrderWithSizes(o._id, o.qty, o.size);
          }
          await updateOrder(o._id, o.qty);
        });
      }

      order.status = req.body.status;

      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
        if (order.paymentInfo.status !== "succeeded") {
          const seller = await Shop.findById(req.body.sellerId);

          const realTotalPrice = parseFloat(req.body.totalPricee);

          const amountToAdd = (realTotalPrice * 0.9).toFixed(2);

          seller.availableBalance += parseFloat(amountToAdd);

          await seller.save();
        }
        order.paymentInfo.status = "succeeded";
      }

      await order.save({ validateBeforeSave: false });
      res.status(200).json({
        success: true,
        order,
      });

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock -= qty;
        product.sold_out += qty;

        await product.save({ validateBeforeSave: false });
      }

      async function updateOrderWithSizes(id, qty, size) {
        const product = await Product.findById(id);

        product.sizes.find((s) => s.name === size).stock -= qty;

        await product.save({ validateBeforeSave: false });
      }

      // async function updateSellerInfo(amount) {
      //   const seller = await Shop.findById(req.seller.id);

      //   seller.availableBalance = amount;

      //   await seller.save();
      // }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// give a refund ----- user
router.put(
  "/order-refund/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
        message: "Order Refund Request successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// accept the refund ---- seller
router.put(
  "/order-refund-success/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      order.status = req.body.status;

      await order.save();

      res.status(200).json({
        success: true,
        message: "Order Refund successfull!",
      });

      if (req.body.status === "Refund Success") {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock += qty;
        product.sold_out -= qty;

        await product.save({ validateBeforeSave: false });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all orders --- for admin
router.get(
  "/admin-all-orders",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find().sort({
        deliveredAt: -1,
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/get-order-details/:id",
  catchAsyncErrors(async (req, res, next) => {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    if (!order) {
      return next(new ErrorHandler("Order not found with this ID", 404));
    }

    res.status(200).json({
      success: true,
      order,
    });
  })
);

module.exports = router;
