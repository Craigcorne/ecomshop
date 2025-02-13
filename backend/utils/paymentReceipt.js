const { PDFDocument, rgb } = require("pdf-lib");

async function generateInvoice(orderData) {
  // Your HTML template goes here

  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Add a new page
  const page = pdfDoc.addPage([600, 800]);

  // Embed the HTML content into the PDF
  // You'll need to convert the HTML to PDF using an HTML to PDF library
  // Here, I'm using a placeholder function named 'htmlToPDF'
  const htmlContent = `<!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <link
      href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
      rel="stylesheet"
    />
      <title>3 dolts Emails</title>
      <style>
        @media only screen and (max-width: 620px) {
          table.body h1 {
            font-size: 28px !important;
            margin-bottom: 10px !important;
          }
          table.body p,
          table.body ul,
          table.body ol,
          table.body td,
          table.body span,
          table.body a {
            font-size: 16px !important;
          }
          table.body .wrapper,
          table.body .article {
            padding: 10px !important;
          }
          table.body .content {
            padding: 0 !important;
          }
          table.body .container {
            padding: 0 !important;
            width: 100% !important;
          }
          table.body .main {
            border-left-width: 0 !important;
            border-radius: 0 !important;
            border-right-width: 0 !important;
          }
          table.body .btn table {
            width: 100% !important;
          }
          table.body .btn a {
            width: 100% !important;
          }
          table.body .img-responsive {
            height: auto !important;
            max-width: 100% !important;
            width: auto !important;
          }
        }
        @media all {
          .ExternalClass {
            width: 100%;
          }
          .ExternalClass,
          .ExternalClass p,
          .ExternalClass span,
          .ExternalClass font,
          .ExternalClass td,
          .ExternalClass div {
            line-height: 100%;
          }
          .apple-link a {
            color: inherit !important;
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            text-decoration: none !important;
          }
          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
            font-size: inherit;
            font-family: inherit;
            font-weight: inherit;
            line-height: inherit;
          }
          .btn-primary table td:hover {
            background-color: #34495e !important;
          }
          .btn-primary a:hover {
            background-color: #34495e !important;
            border-color: #34495e !important;
          }
        }
      </style>
    </head>
    <body
      style="
        background-color: #f6f6f6;
        font-family: sans-serif;
        -webkit-font-smoothing: antialiased;
        font-size: 14px;
        line-height: 1.4;
        margin: 0;
        padding: 0;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      "
    >
      <span
        class="preheader"
        style="
          color: transparent;
          display: none;
          height: 0;
          max-height: 0;
          max-width: 0;
          opacity: 0;
          overflow: hidden;
          mso-hide: all;
          visibility: hidden;
          width: 0;
        "
        >eShop</span
      >
      <table
        role="presentation"
        border="0"
        cellpadding="0"
        cellspacing="0"
        class="body"
        style="
          border-collapse: separate;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          background-color: #f6f6f6;
          width: 100%;
        "
        width="100%"
        bgcolor="#f6f6f6"
      >
        <tr>
          <td
            style="font-family: sans-serif; font-size: 14px; vertical-align: top"
            valign="top"
          >
            &nbsp;
          </td>
          <td
            class="container"
            style="
              font-family: sans-serif;
              font-size: 14px;
              vertical-align: top;
              display: block;
              max-width: 580px;
              padding: 10px;
              width: 580px;
              margin: 0 auto;
            "
            width="580"
            valign="top"
          >
            <div
              class="content"
              style="
                box-sizing: border-box;
                display: block;
                margin: 0 auto;
                max-width: 580px;
                padding: 10px;
              "
            >
           
            <div
            class="logo-container"
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100px;
              width: 100px;
              margin: 0 auto;
            "
          >
            <img
              src="cid:logo"
              alt="3 dolts logo"
              style="height: 80px; width: 80px;"
            />
          </div>
         
              <!-- START CENTERED WHITE CONTAINER -->
              <table
                role="presentation"
                class="main"
                style="
                  border-collapse: separate;
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  background: #ffffff;
                  border-radius: 3px;
                  width: 100%;
                "
                width="100%"
              >
                <!-- START MAIN CONTENT AREA -->
                <tr>
                  <td
                    class="wrapper"
                    style="
                      font-family: sans-serif;
                      font-size: 14px;
                      vertical-align: top;
                      box-sizing: border-box;
                      padding: 20px;
                    "
                    valign="top"
                  >
                    <table
                      role="presentation"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        border-collapse: separate;
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        width: 100%;
                      "
                      width="100%"
                    >
                      <tr>
                        <td
                          style="
                            font-family: sans-serif;
                            font-size: 14px;
                            vertical-align: top;
                          "
                          valign="top"
                        >
                          <h2>Thanks for shopping with us</h2>
                          <p>Hello ${user.name},</p>
                          <p>
                            We have received your order and it's being processed.
                          </p>
                          <h2>
                            Order No.
                            ${order._id
                              .toString()
                              .replace(/\D/g, "")
                              .slice(0, 10)}
                          </h2>
                          <h4>
                          Ordered on: (${order.createdAt
                            .toString()
                            .substring(0, 10)})</h4>
                          <table>
                            <thead>
                              <tr>
                              <td width="75%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                              <strong>Product(s)</strong></td>
                              <td width="25%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                              <strong>Quantity</strong></td>
                              <td width="25%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                              <strong align="right">Price</strong></td>
                              </tr>
                            </thead>
                            <tbody>
                              ${order.cart
                                .map(
                                  (item) => `
                              <tr style="border: 1px solid #000; border-radius: 5px; margin-bottom: 5px;">
                              <td style="display: flex;" align="start">
                              <img src="cid:${item.images[0].url}" 
                              style="height: 80px; width: 80px; margin-right: 5px"/>
                              ${item.name} <br/> ${
                                    item.size ? `Size: ${item.size}` : ""
                                  }
                             </td>
                                <td align="center">${item.qty}</td>
                                <td align="right">${item.discountPrice
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              </td>
                              </tr>
                              `
                                )
                                .join("\n")}
                            </tbody>
                            <br/>
                            <tfoot>
                              <tr>
                              <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                              Items Price:</td>
                              <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                              Ksh. ${subTotals
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                              </tr> 
                              <tr>
                                <td colspan="2">Shipping Price:</td>
                                <td align="right">Ksh. ${
                                  order?.shippingPrice &&
                                  order?.shippingPrice
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }</td>
                              </tr>
                              <tr>
                                <td colspan="2">Discount: </td>
                                <td align="right">Ksh. ${
                                  order?.discount &&
                                  order?.discount
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }</td>
                              </tr>
                              <br/>
                              <tr>
                                <td colspan="2"><strong>Total Price:</strong></td>
                                <td align="right">
                                  <strong> Ksh. ${Math.round(totalPrice)
                                    .toString()
                                    .replace(
                                      /\B(?=(\d{3})+(?!\d))/g,
                                      ","
                                    )}</strong>
                                </td>
                              
                              </tr>
                              <br/><br/>
                              <tr>
                                <td colspan="2">Payment Method:</td>
                                <td align="right">${paymentInfo.type}</td>
                              </tr>
                              <tr>
                                <td colspan="2">Payment Status:</td>
                                <td align="right">${
                                  paymentInfo.status
                                    ? paymentInfo.status
                                    : "Not paid"
                                }</td>
                              </tr>
                            </tfoot>
                          </table>
  
                          <h2>Shipping address</h2>
                          <p>
                            ${
                              shippingAddress.address1
                                ? shippingAddress.address1
                                : ""
                            },<br />
                            ${
                              shippingAddress.address2
                                ? shippingAddress.address2
                                : ""
                            },<br />
                            ${shippingAddress.city},<br />
                            ${shippingAddress.country}<br />
                          </p>
                          <hr />
                          <p>Thanks for shopping with us.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
  
                <!-- END MAIN CONTENT AREA -->
              </table>
              <!-- END CENTERED WHITE CONTAINER -->
  
              <!-- START FOOTER -->
              <div
                class="footer"
                style="
                  clear: both;
                  margin-top: 10px;
                  text-align: center;
                  width: 100%;
                "
              >
                <table
                  role="presentation"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    border-collapse: separate;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    width: 100%;
                  "
                  width="100%"
                >
                  <tr>
                    <td
                      class="content-block"
                      style="
                        font-family: sans-serif;
                        vertical-align: top;
                        padding-bottom: 10px;
                        padding-top: 10px;
                        color: #999999;
                        font-size: 12px;
                        text-align: center;
                      "
                      valign="top"
                      align="center"
                    >
                      <span
                        class="apple-link"
                        style="
                          color: #999999;
                          font-size: 12px;
                          text-align: center;
                        "
                        >eShop Online Shop, Kahawa Shukari, Baringo Road</span
                      >
                      <br />
                      Don't like receiving <b>eShop</b> emails?
                      <a
                        href="http://localhost:3000/unsubscribe"
                        style="
                          text-decoration: underline;
                          color: #999999;
                          font-size: 12px;
                          text-align: center;
                        "
                        >Unsubscribe</a
                      >.
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="content-block powered-by"
                      style="
                        font-family: sans-serif;
                        vertical-align: top;
                        padding-bottom: 10px;
                        padding-top: 10px;
                        color: #999999;
                        font-size: 12px;
                        text-align: center;
                      "
                      valign="top"
                      align="center"
                    >
                      <a
                        href="http://htmlemail.io"
                        style="
                          color: #999999;
                          font-size: 12px;
                          text-align: center;
                          text-decoration: none;
                        "
                        >&copy; ${new Date().getFullYear()} eShop. All rights
                        reserved.</a
                      >.
                    </td>
                  </tr>
                </table>
              </div>
              <!-- END FOOTER -->
            </div>
          </td>
          <td
            style="font-family: sans-serif; font-size: 14px; vertical-align: top"
            valign="top"
          >
            &nbsp;
          </td>
        </tr>
      </table>
    </body>
  </html>`;
  const pdfBytes = await htmlToPDF(htmlContent);

  // Load the PDF content into the page
  const [pdfPage] = await pdfDoc.embedPdf(pdfBytes);
  page.drawImage(pdfPage, {
    x: 0,
    y: 0,
    width: page.getWidth(),
    height: page.getHeight(),
  });

  // Save the PDF to a buffer
  const pdfBytesArray = await pdfDoc.save();

  return pdfBytesArray;
}
