const express = require("express");
const Subscriber = require("../model/subscribers");
const router = express.Router();
const sendMail = require("../utils/sendMail");
const { isAuthenticated } = require("../middleware/auth");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

//create a subscriber
router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      return res.status(400).json({ message: "Email already subscribed." });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    await sendMail({
      email: "samuelndewa2018@gmail.com",
      subject: "New Subscriber Alert! 🎉",
      //       html: `<!DOCTYPE html>
      //      <html>
      //        <head>
      //          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      //          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      //          <title>Simple Transactional Email</title>
      //          <style>
      //            /* Add your CSS styles here */
      //          </style>
      //        </head>
      //        <body
      //          style="
      //            background-color: #f6f6f6;
      //            font-family: sans-serif;
      //            -webkit-font-smoothing: antialiased;
      //            font-size: 14px;
      //            line-height: 1.4;
      //            margin: 0;
      //            padding: 0;
      //            -ms-text-size-adjust: 100%;
      //            -webkit-text-size-adjust: 100%;
      //          "
      //        >
      //          <span
      //            class="preheader"
      //            style="
      //              color: transparent;
      //              display: none;
      //              height: 0;
      //              max-height: 0;
      //              max-width: 0;
      //              opacity: 0;
      //              overflow: hidden;
      //              mso-hide: all;
      //              visibility: hidden;
      //              width: 0;
      //            "
      //            >eShop</span
      //          >
      //          <table
      //            role="presentation"
      //            border="0"
      //            cellpadding="0"
      //            cellspacing="0"
      //            class="body"
      //            style="
      //              border-collapse: separate;
      //              mso-table-lspace: 0pt;
      //              mso-table-rspace: 0pt;
      //              background-color: #f6f6f6;
      //              width: 100%;
      //            "
      //            width="100%"
      //            bgcolor="#f6f6f6"
      //          >
      //            <tr>
      //              <td
      //                style="font-family: sans-serif; font-size: 14px; vertical-align: top"
      //                valign="top"
      //              >
      //                &nbsp;
      //              </td>
      //              <td
      //                class="container"
      //                style="
      //                  font-family: sans-serif;
      //                  font-size: 14px;
      //                  vertical-align: top;
      //                  display: block;
      //                  max-width: 580px;
      //                  padding: 10px;
      //                  width: 580px;
      //                  margin: 0 auto;
      //                "
      //                width="580"
      //                valign="top"
      //              >
      //                <div
      //                  class="content"
      //                  style="
      //                    box-sizing: border-box;
      //                    display: block;
      //                    margin: 0 auto;
      //                    max-width: 580px;
      //                    padding: 10px;
      //                  "
      //                >
      //                <div
      //                class="logo-container"
      //                style="
      //                  display: flex;
      //                  justify-content: center;
      //                  align-items: center;
      //                  height: 100px;
      //                  width: 100px;
      //                  margin: 0 auto;
      //                "
      //              >
      //                <img
      //                  src="cid:logo"
      //                  alt="3 dolts logo"
      //                  style="height: 80px; width: 80px;"
      //                />
      //              </div>
      //                  <!-- START CENTERED WHITE CONTAINER -->
      //                  <table
      //                    role="presentation"
      //                    class="main"
      //                    style="
      //                      border-collapse: separate;
      //                      mso-table-lspace: 0pt;
      //                      mso-table-rspace: 0pt;
      //                      background: #ffffff;
      //                      border-radius: 3px;
      //                      width: 100%;
      //                    "
      //                    width="100%"
      //                  >
      //                    <div
      //                      style="
      //                        clear: both;
      //                        margin-top: 10px;
      //                        text-align: center;
      //                        width: 100%;
      //                      "
      //                    >

      //                      <p style="color: #999999; font-size: 12px; text-align: center">
      //                        We are here to serve
      //                      </p>
      //                    </div>
      //                    <!-- START MAIN CONTENT AREA -->
      //                    <tr>
      //                      <td
      //                        class="wrapper"
      //                        style="
      //                          font-family: sans-serif;
      //                          font-size: 14px;
      //                          vertical-align: top;
      //                          box-sizing: border-box;
      //                          padding: 20px;
      //                        "
      //                        valign="top"
      //                      >
      //                        <table
      //                          role="presentation"
      //                          border="0"
      //                          cellpadding="0"
      //                          cellspacing="0"
      //                          style="
      //                            border-collapse: separate;
      //                            mso-table-lspace: 0pt;
      //                            mso-table-rspace: 0pt;
      //                            width: 100%;
      //                          "
      //                          width="100%"
      //                        >
      //                          <tr>
      //                            <td
      //                              style="
      //                                font-family: sans-serif;
      //                                font-size: 14px;
      //                                vertical-align: top;
      //                              "
      //                              valign="top"
      //                            >
      //                              <div
      //                                style="
      //                                  display: flex;
      //                                  justify-content: center;
      //                                  align-items: center;
      //                                  margin-bottom: 25px;
      //                                "
      //                              ></div>

      //                              <p
      //                                style="
      //                                  font-family: sans-serif;
      //                                  font-size: 14px;
      //                                  font-weight: normal;
      //                                  margin: 0;
      //                                  margin-bottom: 15px;
      //                                "
      //                              >
      //                              </p>
      //                              <p
      //                                style="
      //                                  font-family: sans-serif;
      //                                  font-size: 14px;
      //                                  font-weight: normal;
      //                                  margin: 0;
      //                                  margin-bottom: 15px;
      //                                "
      //                              >
      //                              <p style="font-family: Arial, sans-serif; background-color: #f9f9f9; text-align: center;">
      //     <h1 style="color: #ff6600;">New Subscriber Alert! 🎉</h1>
      //     <p>Hey there, Admin Extraordinaire!</p>
      //     <p>Hold on to your hats because we've got a brand-new subscriber joining our circus of hilarity! 🎪🎉</p>
      //     <p>Our latest recruit goes by the name of [<strong>${email}</strong>], and we're pretty sure they're ready to embrace the weird and wonderful world of our online shop.</p>
      //     <p>We can't wait for them to witness our assortment of whacky wonders, from quirky quandaries to brain-teasing surprises. And of course, let's not forget our resident mascot, Chuckles the Crazy Chameleon, who's always ready to spread laughter.</p>
      //     <p>Now, here's the fun part. As our esteemed Admin, your mission, should you choose to accept it (which we know you will), is to give our new subscriber a warm and uproarious welcome. Let them know they're in for a ride of a lifetime!</p>
      //     <p>And hey, if you've got any hilarious jokes up your sleeve, don't be shy – share the laughter and brighten their day! 😄</p>
      //     <p>If you need any circus-related help, remember, you're the Ringmaster of our support team! Feel free to reach out to our new subscriber at <a href="mailto:[Subscriber's Email]">[${email}]</a>. Let's give them the VIP treatment!</p>
      //     <p>Remember, laughter is the key to a happy circus – and you, dear Admin, are the master of mirth!</p>
      //     <p>Thank you for being the star of our show and keeping the fun rolling!</p>
      //     <p>Keep juggling those tasks like a pro, and may your days be filled with endless laughter!</p>
      //     <p><em>P.S. We heard a rumor that you can juggle flaming rubber chickens while riding a unicycle – Impressive!</em></p>
      // </p>
      //                                <br />
      //                              </p>
      //                              <table
      //                                role="presentation"
      //                                border="0"
      //                                cellpadding="0"
      //                                cellspacing="0"
      //                                class="btn btn-primary"
      //                                style="
      //                                  border-collapse: separate;
      //                                  mso-table-lspace: 0pt;
      //                                  mso-table-rspace: 0pt;
      //                                  box-sizing: border-box;
      //                                  width: 100%;
      //                                "
      //                                width="100%"
      //                              >
      //                                <tbody>
      //                                  <tr>
      //                                    <td
      //                                      align="left"
      //                                      style="
      //                                        font-family: sans-serif;
      //                                        font-size: 14px;
      //                                        vertical-align: top;
      //                                        padding-bottom: 15px;
      //                                      "
      //                                      valign="top"
      //                                    >
      //                                      <table
      //                                        role="presentation"
      //                                        border="0"
      //                                        cellpadding="0"
      //                                        cellspacing="0"
      //                                        style="
      //                                          border-collapse: separate;
      //                                          mso-table-lspace: 0pt;
      //                                          mso-table-rspace: 0pt;
      //                                          width: auto;
      //                                        "
      //                                      >
      //                                        <tbody>
      //                                          <tr>
      //                                            <td
      //                                              style="
      //                                                font-family: sans-serif;
      //                                                font-size: 14px;
      //                                                vertical-align: top;
      //                                                border-radius: 5px;
      //                                                text-align: center;
      //                                                background-color: #3498db;
      //                                              "
      //                                              valign="top"
      //                                              align="center"
      //                                              bgcolor="#3498db"
      //                                            ></td>
      //                                          </tr>
      //                                        </tbody>
      //                                      </table>
      //                                    </td>
      //                                  </tr>
      //                                </tbody>
      //                              </table>
      //                              <p
      //                                style="
      //                                  font-family: sans-serif;
      //                                  font-size: 14px;
      //                                  font-weight: normal;
      //                                  margin: 0;
      //                                  margin-bottom: 15px;
      //                                "
      //                              >
      //                                <b>eShop</b> Quality is our middle name
      //                              </p>
      //                              <p
      //                                style="
      //                                  font-family: sans-serif;
      //                                  font-size: 14px;
      //                                  font-weight: normal;
      //                                  margin: 0;
      //                                  margin-bottom: 15px;
      //                                "
      //                              >
      //                                Asante Sana! Karibu.
      //                              </p>
      //                            </td>
      //                          </tr>
      //                        </table>
      //                      </td>
      //                    </tr>

      //                    <!-- END MAIN CONTENT AREA -->
      //                  </table>
      //                  <!-- END CENTERED WHITE CONTAINER -->

      //                  <!-- START FOOTER -->
      //                  <div
      //                    class="footer"
      //                    style="
      //                      clear: both;
      //                      margin-top: 10px;
      //                      text-align: center;
      //                      width: 100%;
      //                    "
      //                  >
      //                    <table
      //                      role="presentation"
      //                      border="0"
      //                      cellpadding="0"
      //                      cellspacing="0"
      //                      style="
      //                        border-collapse: separate;
      //                        mso-table-lspace: 0pt;
      //                        mso-table-rspace: 0pt;
      //                        width: 100%;
      //                      "
      //                      width="100%"
      //                    >
      //                      <tr>
      //                        <td
      //                          class="content-block"
      //                          style="
      //                            font-family: sans-serif;
      //                            vertical-align: top;
      //                            padding-bottom: 10px;
      //                            padding-top: 10px;
      //                            color: #999999;
      //                            font-size: 12px;
      //                            text-align: center;
      //                          "
      //                          valign="top"
      //                          align="center"
      //                        >
      //                          <span
      //                            class="apple-link"
      //                            style="
      //                              color: #999999;
      //                              font-size: 12px;
      //                              text-align: center;
      //                            "
      //                            >eShop Online Shop, Kahawa Shukari, Baringo Road</span
      //                          >
      //                          <br />
      //                          Don't like receiving <b>eShop</b> emails?
      //                          <a
      //                            href="http://localhost:3000/unsubscribe"
      //                            style="
      //                              text-decoration: underline;
      //                              color: #999999;
      //                              font-size: 12px;
      //                              text-align: center;
      //                            "
      //                            >Unsubscribe</a
      //                          >.
      //                        </td>
      //                      </tr>
      //                      <tr>
      //                        <td
      //                          class="content-block powered-by"
      //                          style="
      //                            font-family: sans-serif;
      //                            vertical-align: top;
      //                            padding-bottom: 10px;
      //                            padding-top: 10px;
      //                            color: #999999;
      //                            font-size: 12px;
      //                            text-align: center;
      //                          "
      //                          valign="top"
      //                          align="center"
      //                        >
      //                          <a
      //                            href=""
      //                            style="
      //                              color: #999999;
      //                              font-size: 12px;
      //                              text-align: center;
      //                              text-decoration: none;
      //                            "
      //                            >&copy; ${new Date().getFullYear()} eShop. All rights
      //                            reserved.</a
      //                          >.
      //                        </td>
      //                      </tr>
      //                    </table>
      //                  </div>
      //                  <!-- END FOOTER -->
      //                </div>
      //              </td>
      //              <td
      //                style="font-family: sans-serif; font-size: 14px; vertical-align: top"
      //                valign="top"
      //              >
      //                &nbsp;
      //              </td>
      //            </tr>
      //          </table>
      //        </body>
      //      </html>`,
      html: `<!DOCTYPE html>
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <title></title>

    <style type="text/css">
      @media only screen and (min-width: 620px) {
        .u-row {
          width: 600px !important;
        }
        .u-row .u-col {
          vertical-align: top;
        }
        .u-row .u-col-100 {
          width: 600px !important;
        }
      }

      @media (max-width: 620px) {
        .u-row-container {
          max-width: 100% !important;
          padding-left: 0px !important;
          padding-right: 0px !important;
        }
        .u-row .u-col {
          min-width: 320px !important;
          max-width: 100% !important;
          display: block !important;
        }
        .u-row {
          width: 100% !important;
        }
        .u-col {
          width: 100% !important;
        }
        .u-col > div {
          margin: 0 auto;
        }
      }

      body {
        margin: 0;
        padding: 0;
      }

      table,
      tr,
      td {
        vertical-align: top;
        border-collapse: collapse;
      }

      p {
        margin: 0;
      }

      .ie-container table,
      .mso-container table {
        table-layout: fixed;
      }

      * {
        line-height: inherit;
      }

      a[x-apple-data-detectors="true"] {
        color: inherit !important;
        text-decoration: none !important;
      }

      table,
      td {
        color: #000000;
      }

      #u_body a {
        color: #0000ee;
        text-decoration: underline;
      }
    </style>

    <!--[if !mso]><!-->
    <link
      href="https://fonts.googleapis.com/css?family=Cabin:400,700"
      rel="stylesheet"
      type="text/css"
    />
    <!--<![endif]-->
  </head>

  <body
    class="clean-body u_body"
    style="
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      background-color: #f9f9f9;
      color: #000000;
    "
  >
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->
    <table
      id="u_body"
      style="
        border-collapse: collapse;
        table-layout: fixed;
        border-spacing: 0;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        vertical-align: top;
        min-width: 320px;
        margin: 0 auto;
        background-color: #f9f9f9;
        width: 100%;
      "
      cellpadding="0"
      cellspacing="0"
    >
      <tbody>
        <tr style="vertical-align: top">
          <td
            style="
              word-break: break-word;
              border-collapse: collapse !important;
              vertical-align: top;
            "
          >
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->

            <div
              class="u-row-container"
              style="padding: 0px; background-color: transparent"
            >
              <div
                class="u-row"
                style="
                  margin: 0 auto;
                  min-width: 320px;
                  max-width: 600px;
                  overflow-wrap: break-word;
                  word-wrap: break-word;
                  word-break: break-word;
                  background-color: transparent;
                "
              >
                <div
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    height: 100%;
                    background-color: transparent;
                  "
                >
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div
                    class="u-col u-col-100"
                    style="
                      max-width: 320px;
                      min-width: 600px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div style="height: 100%; width: 100% !important">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div
                        style="
                          box-sizing: border-box;
                          height: 100%;
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                        "
                      >
                        <!--<![endif]-->

                        <table
                          style="font-family: 'Cabin', sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 10px;
                                  font-family: 'Cabin', sans-serif;
                                "
                                align="left"
                              >
                                <div
                                  style="
                                    font-size: 14px;
                                    color: #afb0c7;
                                    line-height: 170%;
                                    text-align: center;
                                    word-wrap: break-word;
                                  "
                                >
                                  <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-size: 14px;
                                        line-height: 23.8px;
                                      "
                                      >View Email in Browser</span
                                    >
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <div
              class="u-row-container"
              style="padding: 0px; background-color: transparent"
            >
              <div
                class="u-row"
                style="
                  margin: 0 auto;
                  min-width: 320px;
                  max-width: 600px;
                  overflow-wrap: break-word;
                  word-wrap: break-word;
                  word-break: break-word;
                  background-color: #ffffff;
                "
              >
                <div
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    height: 100%;
                    background-color: transparent;
                  "
                >
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div
                    class="u-col u-col-100"
                    style="
                      max-width: 320px;
                      min-width: 600px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div style="height: 100%; width: 100% !important">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div
                        style="
                          box-sizing: border-box;
                          height: 100%;
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                        "
                      >
                        <!--<![endif]-->

                        <table
                          style="font-family: 'Cabin', sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 20px;
                                  font-family: 'Cabin', sans-serif;
                                "
                                align="left"
                              >
                                <table
                                  width="100%"
                                  cellpadding="0"
                                  cellspacing="0"
                                  border="0"
                                >
                                  <tr>
                                    <td
                                      style="
                                        padding-right: 0px;
                                        padding-left: 0px;
                                      "
                                      align="center"
                                    >
                                      <img
                                        align="center"
                                        border="0"
                                        src="https://cdn.templates.unlayer.com/assets/1597218426091-xx.png"
                                        alt="Image"
                                        title="Image"
                                        style="
                                          outline: none;
                                          text-decoration: none;
                                          -ms-interpolation-mode: bicubic;
                                          clear: both;
                                          display: inline-block !important;
                                          border: none;
                                          height: auto;
                                          float: none;
                                          width: 32%;
                                          max-width: 179.2px;
                                        "
                                        width="179.2"
                                      />
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <div
              class="u-row-container"
              style="padding: 0px; background-color: transparent"
            >
              <div
                class="u-row"
                style="
                  margin: 0 auto;
                  min-width: 320px;
                  max-width: 600px;
                  overflow-wrap: break-word;
                  word-wrap: break-word;
                  word-break: break-word;
                  background-color: #003399;
                "
              >
                <div
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    height: 100%;
                    background-color: transparent;
                  "
                >
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #003399;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div
                    class="u-col u-col-100"
                    style="
                      max-width: 320px;
                      min-width: 600px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div style="height: 100%; width: 100% !important">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div
                        style="
                          box-sizing: border-box;
                          height: 100%;
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                        "
                      >
                        <!--<![endif]-->

                        <table
                          style="font-family: 'Cabin', sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 40px 10px 10px;
                                  font-family: 'Cabin', sans-serif;
                                "
                                align="left"
                              >
                                <table
                                  width="100%"
                                  cellpadding="0"
                                  cellspacing="0"
                                  border="0"
                                >
                                  <tr>
                                    <td
                                      style="
                                        padding-right: 0px;
                                        padding-left: 0px;
                                      "
                                      align="center"
                                    >
                                      <img
                                        align="center"
                                        border="0"
                                        src="https://cdn.templates.unlayer.com/assets/1597218650916-xxxxc.png"
                                        alt="Image"
                                        title="Image"
                                        style="
                                          outline: none;
                                          text-decoration: none;
                                          -ms-interpolation-mode: bicubic;
                                          clear: both;
                                          display: inline-block !important;
                                          border: none;
                                          height: auto;
                                          float: none;
                                          width: 26%;
                                          max-width: 150.8px;
                                        "
                                        width="150.8"
                                      />
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family: 'Cabin', sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 10px;
                                  font-family: 'Cabin', sans-serif;
                                "
                                align="left"
                              >
                                <div
                                  style="
                                    font-size: 14px;
                                    color: #e5eaf5;
                                    line-height: 140%;
                                    text-align: center;
                                    word-wrap: break-word;
                                  "
                                >
                                  <p style="font-size: 14px; line-height: 140%">
                                    <strong
                                      >T H A N K S&nbsp; &nbsp;F O R&nbsp;
                                      &nbsp;S I G N I N G&nbsp; &nbsp;U P
                                      !</strong
                                    >
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family: 'Cabin', sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 0px 10px 31px;
                                  font-family: 'Cabin', sans-serif;
                                "
                                align="left"
                              >
                                <div
                                  style="
                                    font-size: 14px;
                                    color: #e5eaf5;
                                    line-height: 140%;
                                    text-align: center;
                                    word-wrap: break-word;
                                  "
                                >
                                  <p style="font-size: 14px; line-height: 140%">
                                    <span
                                      style="
                                        font-size: 28px;
                                        line-height: 39.2px;
                                      "
                                      ><strong
                                        ><span
                                          style="
                                            line-height: 39.2px;
                                            font-size: 28px;
                                          "
                                          >Verify Your E-mail Address
                                        </span></strong
                                      >
                                    </span>
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <div
              class="u-row-container"
              style="padding: 0px; background-color: transparent"
            >
              <div
                class="u-row"
                style="
                  margin: 0 auto;
                  min-width: 320px;
                  max-width: 600px;
                  overflow-wrap: break-word;
                  word-wrap: break-word;
                  word-break: break-word;
                  background-color: #ffffff;
                "
              >
                <div
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    height: 100%;
                    background-color: transparent;
                  "
                >
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div
                    class="u-col u-col-100"
                    style="
                      max-width: 320px;
                      min-width: 600px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div style="height: 100%; width: 100% !important">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div
                        style="
                          box-sizing: border-box;
                          height: 100%;
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                        "
                      >
                        <!--<![endif]-->

                        <table
                          style="font-family: 'Cabin', sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 33px 55px;
                                  font-family: 'Cabin', sans-serif;
                                "
                                align="left"
                              >
                                <div
                                  style="
                                    font-size: 14px;
                                    line-height: 160%;
                                    text-align: center;
                                    word-wrap: break-word;
                                  "
                                >
                                  <p style="font-size: 14px; line-height: 160%">
                                    <span
                                      style="
                                        font-size: 22px;
                                        line-height: 35.2px;
                                      "
                                      >Hi,
                                    </span>
                                  </p>
                                  <p style="font-size: 14px; line-height: 160%">
                                    <span
                                      style="
                                        font-size: 18px;
                                        line-height: 28.8px;
                                      "
                                      >You're almost ready to get started.
                                      Please click on the button below to verify
                                      your email address and enjoy exclusive
                                      cleaning services with us!
                                    </span>
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family: 'Cabin', sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 10px;
                                  font-family: 'Cabin', sans-serif;
                                "
                                align="left"
                              >
                                <!--[if mso
                                  ]><style>
                                    .v-button {
                                      background: transparent !important;
                                    }
                                  </style><!
                                [endif]-->
                                <div align="center">
                                  <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:46px; v-text-anchor:middle; width:235px;" arcsize="8.5%"  stroke="f" fillcolor="#ff6600"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
                                  <a
                                    href=""
                                    target="_blank"
                                    class="v-button"
                                    style="
                                      box-sizing: border-box;
                                      display: inline-block;
                                      text-decoration: none;
                                      -webkit-text-size-adjust: none;
                                      text-align: center;
                                      color: #ffffff;
                                      background-color: #ff6600;
                                      border-radius: 4px;
                                      -webkit-border-radius: 4px;
                                      -moz-border-radius: 4px;
                                      width: auto;
                                      max-width: 100%;
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      word-wrap: break-word;
                                      mso-border-alt: none;
                                      font-size: 14px;
                                    "
                                  >
                                    <span
                                      style="
                                        display: block;
                                        padding: 14px 44px 13px;
                                        line-height: 120%;
                                      "
                                      ><span
                                        style="
                                          font-size: 16px;
                                          line-height: 19.2px;
                                        "
                                        ><strong
                                          ><span
                                            style="
                                              line-height: 19.2px;
                                              font-size: 16px;
                                            "
                                            >VERIFY YOUR EMAIL</span
                                          ></strong
                                        >
                                      </span>
                                    </span>
                                  </a>
                                  <!--[if mso]></center></v:roundrect><![endif]-->
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family: 'Cabin', sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 33px 55px 60px;
                                  font-family: 'Cabin', sans-serif;
                                "
                                align="left"
                              >
                                <div
                                  style="
                                    font-size: 14px;
                                    line-height: 160%;
                                    text-align: center;
                                    word-wrap: break-word;
                                  "
                                >
                                  <p style="line-height: 160%; font-size: 14px">
                                    <span
                                      style="
                                        font-size: 18px;
                                        line-height: 28.8px;
                                      "
                                      >Thanks,</span
                                    >
                                  </p>
                                  <p style="line-height: 160%; font-size: 14px">
                                    <span
                                      style="
                                        font-size: 18px;
                                        line-height: 28.8px;
                                      "
                                      >The Company Team</span
                                    >
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <div
              class="u-row-container"
              style="padding: 0px; background-color: transparent"
            >
              <div
                class="u-row"
                style="
                  margin: 0 auto;
                  min-width: 320px;
                  max-width: 600px;
                  overflow-wrap: break-word;
                  word-wrap: break-word;
                  word-break: break-word;
                  background-color: #e5eaf5;
                "
              >
                <div
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    height: 100%;
                    background-color: transparent;
                  "
                >
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #e5eaf5;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div
                    class="u-col u-col-100"
                    style="
                      max-width: 320px;
                      min-width: 600px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div style="height: 100%; width: 100% !important">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div
                        style="
                          box-sizing: border-box;
                          height: 100%;
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                        "
                      >
                        <!--<![endif]-->

                        <table
                          style="font-family: 'Cabin', sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 41px 55px 18px;
                                  font-family: 'Cabin', sans-serif;
                                "
                                align="left"
                              >
                                <div
                                  style="
                                    font-size: 14px;
                                    color: #003399;
                                    line-height: 160%;
                                    text-align: center;
                                    word-wrap: break-word;
                                  "
                                >
                                  <p style="font-size: 14px; line-height: 160%">
                                    <span
                                      style="font-size: 20px; line-height: 32px"
                                      ><strong>Get in touch</strong></span
                                    >
                                  </p>
                                  <p style="font-size: 14px; line-height: 160%">
                                    <span
                                      style="
                                        font-size: 16px;
                                        line-height: 25.6px;
                                        color: #000000;
                                      "
                                      >+11 111 333 4444</span
                                    >
                                  </p>
                                  <p style="font-size: 14px; line-height: 160%">
                                    <span
                                      style="
                                        font-size: 16px;
                                        line-height: 25.6px;
                                        color: #000000;
                                      "
                                      >Info@YourCompany.com</span
                                    >
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family: 'Cabin', sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 10px 10px 33px;
                                  font-family: 'Cabin', sans-serif;
                                "
                                align="left"
                              >
                                <div align="center">
                                  <div style="display: table; max-width: 244px">
                                    <!--[if (mso)|(IE)]><table width="244" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:244px;"><tr><![endif]-->

                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                    <table
                                      align="left"
                                      border="0"
                                      cellspacing="0"
                                      cellpadding="0"
                                      width="32"
                                      height="32"
                                      style="
                                        width: 32px !important;
                                        height: 32px !important;
                                        display: inline-block;
                                        border-collapse: collapse;
                                        table-layout: fixed;
                                        border-spacing: 0;
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        vertical-align: top;
                                        margin-right: 17px;
                                      "
                                    >
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td
                                            align="left"
                                            valign="middle"
                                            style="
                                              word-break: break-word;
                                              border-collapse: collapse !important;
                                              vertical-align: top;
                                            "
                                          >
                                            <a
                                              href="https://facebook.com/"
                                              title="Facebook"
                                              target="_blank"
                                            >
                                              <img
                                                src="https://cdn.tools.unlayer.com/social/icons/circle-black/facebook.png"
                                                alt="Facebook"
                                                title="Facebook"
                                                width="32"
                                                style="
                                                  outline: none;
                                                  text-decoration: none;
                                                  -ms-interpolation-mode: bicubic;
                                                  clear: both;
                                                  display: block !important;
                                                  border: none;
                                                  height: auto;
                                                  float: none;
                                                  max-width: 32px !important;
                                                "
                                              />
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if (mso)|(IE)]></td><![endif]-->

                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                    <table
                                      align="left"
                                      border="0"
                                      cellspacing="0"
                                      cellpadding="0"
                                      width="32"
                                      height="32"
                                      style="
                                        width: 32px !important;
                                        height: 32px !important;
                                        display: inline-block;
                                        border-collapse: collapse;
                                        table-layout: fixed;
                                        border-spacing: 0;
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        vertical-align: top;
                                        margin-right: 17px;
                                      "
                                    >
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td
                                            align="left"
                                            valign="middle"
                                            style="
                                              word-break: break-word;
                                              border-collapse: collapse !important;
                                              vertical-align: top;
                                            "
                                          >
                                            <a
                                              href="https://linkedin.com/"
                                              title="LinkedIn"
                                              target="_blank"
                                            >
                                              <img
                                                src="https://cdn.tools.unlayer.com/social/icons/circle-black/linkedin.png"
                                                alt="LinkedIn"
                                                title="LinkedIn"
                                                width="32"
                                                style="
                                                  outline: none;
                                                  text-decoration: none;
                                                  -ms-interpolation-mode: bicubic;
                                                  clear: both;
                                                  display: block !important;
                                                  border: none;
                                                  height: auto;
                                                  float: none;
                                                  max-width: 32px !important;
                                                "
                                              />
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if (mso)|(IE)]></td><![endif]-->

                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                    <table
                                      align="left"
                                      border="0"
                                      cellspacing="0"
                                      cellpadding="0"
                                      width="32"
                                      height="32"
                                      style="
                                        width: 32px !important;
                                        height: 32px !important;
                                        display: inline-block;
                                        border-collapse: collapse;
                                        table-layout: fixed;
                                        border-spacing: 0;
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        vertical-align: top;
                                        margin-right: 17px;
                                      "
                                    >
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td
                                            align="left"
                                            valign="middle"
                                            style="
                                              word-break: break-word;
                                              border-collapse: collapse !important;
                                              vertical-align: top;
                                            "
                                          >
                                            <a
                                              href="https://instagram.com/"
                                              title="Instagram"
                                              target="_blank"
                                            >
                                              <img
                                                src="https://cdn.tools.unlayer.com/social/icons/circle-black/instagram.png"
                                                alt="Instagram"
                                                title="Instagram"
                                                width="32"
                                                style="
                                                  outline: none;
                                                  text-decoration: none;
                                                  -ms-interpolation-mode: bicubic;
                                                  clear: both;
                                                  display: block !important;
                                                  border: none;
                                                  height: auto;
                                                  float: none;
                                                  max-width: 32px !important;
                                                "
                                              />
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if (mso)|(IE)]></td><![endif]-->

                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                    <table
                                      align="left"
                                      border="0"
                                      cellspacing="0"
                                      cellpadding="0"
                                      width="32"
                                      height="32"
                                      style="
                                        width: 32px !important;
                                        height: 32px !important;
                                        display: inline-block;
                                        border-collapse: collapse;
                                        table-layout: fixed;
                                        border-spacing: 0;
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        vertical-align: top;
                                        margin-right: 17px;
                                      "
                                    >
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td
                                            align="left"
                                            valign="middle"
                                            style="
                                              word-break: break-word;
                                              border-collapse: collapse !important;
                                              vertical-align: top;
                                            "
                                          >
                                            <a
                                              href="https://youtube.com/"
                                              title="YouTube"
                                              target="_blank"
                                            >
                                              <img
                                                src="https://cdn.tools.unlayer.com/social/icons/circle-black/youtube.png"
                                                alt="YouTube"
                                                title="YouTube"
                                                width="32"
                                                style="
                                                  outline: none;
                                                  text-decoration: none;
                                                  -ms-interpolation-mode: bicubic;
                                                  clear: both;
                                                  display: block !important;
                                                  border: none;
                                                  height: auto;
                                                  float: none;
                                                  max-width: 32px !important;
                                                "
                                              />
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if (mso)|(IE)]></td><![endif]-->

                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
                                    <table
                                      align="left"
                                      border="0"
                                      cellspacing="0"
                                      cellpadding="0"
                                      width="32"
                                      height="32"
                                      style="
                                        width: 32px !important;
                                        height: 32px !important;
                                        display: inline-block;
                                        border-collapse: collapse;
                                        table-layout: fixed;
                                        border-spacing: 0;
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        vertical-align: top;
                                        margin-right: 0px;
                                      "
                                    >
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td
                                            align="left"
                                            valign="middle"
                                            style="
                                              word-break: break-word;
                                              border-collapse: collapse !important;
                                              vertical-align: top;
                                            "
                                          >
                                            <a
                                              href="https://email.com/"
                                              title="Email"
                                              target="_blank"
                                            >
                                              <img
                                                src="https://cdn.tools.unlayer.com/social/icons/circle-black/email.png"
                                                alt="Email"
                                                title="Email"
                                                width="32"
                                                style="
                                                  outline: none;
                                                  text-decoration: none;
                                                  -ms-interpolation-mode: bicubic;
                                                  clear: both;
                                                  display: block !important;
                                                  border: none;
                                                  height: auto;
                                                  float: none;
                                                  max-width: 32px !important;
                                                "
                                              />
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if (mso)|(IE)]></td><![endif]-->

                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <div
              class="u-row-container"
              style="padding: 0px; background-color: transparent"
            >
              <div
                class="u-row"
                style="
                  margin: 0 auto;
                  min-width: 320px;
                  max-width: 600px;
                  overflow-wrap: break-word;
                  word-wrap: break-word;
                  word-break: break-word;
                  background-color: #003399;
                "
              >
                <div
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    height: 100%;
                    background-color: transparent;
                  "
                >
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #003399;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div
                    class="u-col u-col-100"
                    style="
                      max-width: 320px;
                      min-width: 600px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div style="height: 100%; width: 100% !important">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div
                        style="
                          box-sizing: border-box;
                          height: 100%;
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                        "
                      >
                        <!--<![endif]-->

                        <table
                          style="font-family: 'Cabin', sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 10px;
                                  font-family: 'Cabin', sans-serif;
                                "
                                align="left"
                              >
                                <div
                                  style="
                                    font-size: 14px;
                                    color: #fafafa;
                                    line-height: 180%;
                                    text-align: center;
                                    word-wrap: break-word;
                                  "
                                >
                                  <p style="font-size: 14px; line-height: 180%">
                                    <span
                                      style="
                                        font-size: 16px;
                                        line-height: 28.8px;
                                      "
                                      >Copyrights © Company All Rights
                                      Reserved</span
                                    >
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
  </body>
</html>
`,
      attachments: [
        {
          filename: "logo.png",
          path: __dirname + "/logo.png",
          cid: "logo",
        },
      ],
    });

    await sendMail({
      email: email,
      subject: `🎉 Welcome to the Party! 🎉`,
      html: `<!DOCTYPE html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>Simple Transactional Email</title>
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
                              <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 25px;">
                        
                            </div>
                                <p
                                  style="
                                    font-family: sans-serif;
                                    font-size: 14px;
                                    font-weight: normal;
                                    margin: 0;
                                    margin-bottom: 15px;
                                  "
                                >
                                <p style="font-family: Arial, sans-serif; background-color: #f9f9f9; text-align: center;">
    <h1 style="color: #ff6600;">🎉 Welcome to the Party! 🎉</h1>
    <p>Hey [${email}],</p>
    <p>Hold on to your hats because you've just stepped into the wackiest, wildest, and most wonderful online shop in the universe! 🌌🚀</p>
    <p>We're absolutely thrilled to have you join our merry band of misfit subscribers. 🤪🎉 As the newest addition to our family, we promise to keep you entertained, giggling, and perhaps even ROFL-ing (Rolling On the Floor Laughing) from time to time.</p>
    <p>So, what can you expect from our one-of-a-kind shop? Allow us to give you a sneak peek:</p>
    <ul>
        <li>🌈 Whimsical Wares: Unicorns, rainbows, and talking teapots – we've got it all! Our shop is like a magical treasure trove filled with the stuff dreams are made of.</li>
        <li>🤖 Quirky Quandaries: Ever wondered what a dancing robot and a rubber chicken have in common? Neither have we, but we've got 'em both!</li>
        <li>🧠 Brain-Teasing Surprises: Puzzle-solving gurus, rejoice! We'll challenge your wits with mind-bending riddles hidden among our product descriptions.</li>
        <li>🎁 Gifts That Give Giggles: Need a present for a friend or a foe? Fear not! Our quirky collection makes gift-giving an unforgettable experience.</li>
    </ul>
    <p>To kick off your subscription journey with a bang, we've even prepared an exclusive discount code just for you: "<strong>LAUGHOUTLOUD</strong>"! Use it at checkout and prepare to be amazed at the savings! 💰💸</p>
    <p>But wait, there's more! Our resident mascot, Chuckles the Crazy Chameleon, has taken a liking to you already. 🦎 He'll be dropping into your inbox every now and then to share some jokes, funny stories, and, of course, top-secret insider deals.</p>
    <p>So, put on your silliest hat and get ready for a rollercoaster ride of laughter, quirkiness, and extraordinary discoveries. And don't forget to spread the word – share the laughter with your friends, family, and the cat next door (cats love laughter, trust us).</p>
    <p>If you ever have any questions, need assistance, or just want to share a pun, our team is here for you! Reach out to us anytime at <a href="mailto:support@email.com">threedoltscommunications@gmail.com</a>.</p>
    <p>Once again, welcome to our bonkers family! Let the fun begin! 🎉🎈</p>
    <p>Keep laughing and stay quirky!</p>
    <p>Your Friends at 3 dolts - eshop</p>
    <p><em>P.S. Rumor has it that our talking teapots can also dance the tango. But you didn't hear that from us! 😉</em></p>
</p>
                              
                                  <br/>
                                </p>
                                <table
                                  role="presentation"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="btn btn-primary"
                                  style="
                                    border-collapse: separate;
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    box-sizing: border-box;
                                    width: 100%;
                                  "
                                  width="100%"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        align="left"
                                        style="
                                          font-family: sans-serif;
                                          font-size: 14px;
                                          vertical-align: top;
                                          padding-bottom: 15px;
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
                                            width: auto;
                                          "
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                style="
                                                  font-family: sans-serif;
                                                  font-size: 14px;
                                                  vertical-align: top;
                                                  border-radius: 5px;
                                                  text-align: center;
                                                  background-color: #3498db;
                                                "
                                                valign="top"
                                                align="center"
                                                bgcolor="#3498db"
                                              >
                                                
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <p
                                  style="
                                    font-family: sans-serif;
                                    font-size: 14px;
                                    font-weight: normal;
                                    margin: 0;
                                    margin-bottom: 15px;
                                  "
                                >
                                  <b>eShop</b> only contacts you through 0712012113 or email threedoltscommunications@gmail.com
                                </p>
                                <p
                                  style="
                                    font-family: sans-serif;
                                    font-size: 14px;
                                    font-weight: normal;
                                    margin: 0;
                                    margin-bottom: 15px;
                                  "
                                >
                                  Asante Sana! Karibu Tena.
                                </p>
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
                              href=""
                              style="
                                color: #999999;
                                font-size: 12px;
                                text-align: center;
                                text-decoration: none;
                              "
                              >&copy; ${new Date().getFullYear()} eShop. All rights reserved.</a
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
        </html>
        `,
      attachments: [
        {
          filename: "logo.png",
          path: __dirname + "/logo.png",
          cid: "logo", //same cid value as in the html img src
        },
      ],
    });
    res.status(201).json({
      success: true,
      message: "Woohoo, you're subscribed!",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to subscribe." });
  }
});

//get all subscribers
router.get("/get-subscribers", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.status(200).json({
      sucess: true,
      subscribers,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching subscribers." });
  }
});

// Send emails to all subscribers
router.post("/send-emails", async (req, res) => {
  const { subject, message } = req.body;

  try {
    const subscribers = await Subscriber.find();

    if (!subscribers.length) {
      return res.status(404).json({ message: "No subscribers found." });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMPT_HOST,
      port: process.env.SMPT_PORT,
      service: process.env.SMPT_SERVICE,
      auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASSWORD,
      },
    });

    const emails = subscribers.map((subscriber) => subscriber.email);
    const mailOptions = {
      from: process.env.SMPT_MAIL,
      to: emails.join(", "),
      subject: subject,
      html: `<!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>Simple Transactional Email</title>
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
                  <div
                  style="
                    clear: both;
                    margin-top: 10px;
                    text-align: center;
                    width: 100%;
                  "
                >
                  <img
                    src="cid:logo"
                    alt="eShoplogo"
                    style="height: 150px; width: 150px"
                  />
                  <p style="color: #999999; font-size: 12px; text-align: center">
                    We are here to serve
                  </p>
                </div>
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
                            <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 25px;">
                           
                          </div>
                              <p
                                style="
                                  font-family: sans-serif;
                                  font-size: 14px;
                                  font-weight: normal;
                                  margin: 0;
                                  margin-bottom: 15px;
                                "
                              >
                                Hello User,
                              </p>
                             <div>${message}</div>
                              <table
                                role="presentation"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="btn btn-primary"
                                style="
                                  border-collapse: separate;
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  box-sizing: border-box;
                                  width: 100%;
                                "
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      align="left"
                                      style="
                                        font-family: sans-serif;
                                        font-size: 14px;
                                        vertical-align: top;
                                        padding-bottom: 15px;
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
                                          width: auto;
                                        "
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              style="
                                                font-family: sans-serif;
                                                font-size: 14px;
                                                vertical-align: top;
                                                border-radius: 5px;
                                                text-align: center;
                                                background-color: #3498db;
                                              "
                                              valign="top"
                                              align="center"
                                              bgcolor="#3498db"
                                            >

                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <p
                                style="
                                  font-family: sans-serif;
                                  font-size: 14px;
                                  font-weight: normal;
                                  margin: 0;
                                  margin-bottom: 15px;
                                "
                              >
                                <b>eShop</b> only contacts you through 0712012113 or email threedoltscommunications@gmail.com
                              </p>
                              <p
                                style="
                                  font-family: sans-serif;
                                  font-size: 14px;
                                  font-weight: normal;
                                  margin: 0;
                                  margin-bottom: 15px;
                                "
                              >
                                Asante Sana! Karibu Tena.
                              </p>
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
                          Like receive <b>eShop</b> emails Again?
                          <a
                            href="http://localhost:3000/"
                            style="
                              text-decoration: underline;
                              color: #999999;
                              font-size: 12px;
                              text-align: center;
                            "
                            >subscribe</a
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
                            href=""
                            style="
                              color: #999999;
                              font-size: 12px;
                              text-align: center;
                              text-decoration: none;
                            "
                            >&copy; ${new Date().getFullYear()} eShop. All rights reserved.</a
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
      </html>
      `,
      attachments: [
        {
          filename: "logo.png",
          path: __dirname + "/logo.png",
          cid: "logo", //same cid value as in the html img src
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Emails sent successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while sending emails." });
  }
});

//delete/unsubscribe subscriber
router.delete("/delete-subscribe", async (req, res) => {
  const { email } = req.query;

  try {
    await sendMail({
      email: email,
      subject: `UnSubscription`,
      html: `<!DOCTYPE html>
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <title>Simple Transactional Email</title>
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
                      <div
                      style="
                        clear: both;
                        margin-top: 10px;
                        text-align: center;
                        width: 100%;
                      "
                    >
                      <img
                        src="cid:logo"
                        alt="eShoplogo"
                        style="height: 150px; width: 150px"
                      />
                      <p style="color: #999999; font-size: 12px; text-align: center">
                        We are here to serve
                      </p>
                    </div>
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
                                <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 25px;">
                               
                              </div>
                                  <p
                                    style="
                                      font-family: sans-serif;
                                      font-size: 14px;
                                      font-weight: normal;
                                      margin: 0;
                                      margin-bottom: 15px;
                                    "
                                  >
                                    Hello User,
                                  </p>
                                  <p
                                    style="
                                      font-family: sans-serif;
                                      font-size: 14px;
                                      font-weight: normal;
                                      margin: 0;
                                      margin-bottom: 15px;
                                    "
                                  >
                                    You have unsubscribed to our newsletter.<br />
                                    We feel bad to see you leave. <b>Byeeee<b>
                                    You will not hear from us again
                                    <br/>
                                  </p>
                                  <table
                                    role="presentation"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="btn btn-primary"
                                    style="
                                      border-collapse: separate;
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      box-sizing: border-box;
                                      width: 100%;
                                    "
                                    width="100%"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          align="left"
                                          style="
                                            font-family: sans-serif;
                                            font-size: 14px;
                                            vertical-align: top;
                                            padding-bottom: 15px;
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
                                              width: auto;
                                            "
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  style="
                                                    font-family: sans-serif;
                                                    font-size: 14px;
                                                    vertical-align: top;
                                                    border-radius: 5px;
                                                    text-align: center;
                                                    background-color: #3498db;
                                                  "
                                                  valign="top"
                                                  align="center"
                                                  bgcolor="#3498db"
                                                >

                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <p
                                    style="
                                      font-family: sans-serif;
                                      font-size: 14px;
                                      font-weight: normal;
                                      margin: 0;
                                      margin-bottom: 15px;
                                    "
                                  >
                                    <b>eShop</b> only contacts you through 0712012113 or email threedoltscommunications@gmail.com
                                  </p>
                                  <p
                                    style="
                                      font-family: sans-serif;
                                      font-size: 14px;
                                      font-weight: normal;
                                      margin: 0;
                                      margin-bottom: 15px;
                                    "
                                  >
                                    Asante Sana! Karibu Tena.
                                  </p>
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
                              Like receive <b>eShop</b> emails Again?
                              <a
                                href="http://localhost:3000/"
                                style="
                                  text-decoration: underline;
                                  color: #999999;
                                  font-size: 12px;
                                  text-align: center;
                                "
                                >subscribe</a
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
                                href=""
                                style="
                                  color: #999999;
                                  font-size: 12px;
                                  text-align: center;
                                  text-decoration: none;
                                "
                                >&copy; ${new Date().getFullYear()} eShop. All rights reserved.</a
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
          </html>
          `,
      attachments: [
        {
          filename: "logo.png",
          path: __dirname + "/logo.png",
          cid: "logo",
        },
      ],
    });

    const deletedSubscriber = await Subscriber.findOneAndDelete({ email });
    if (!deletedSubscriber) {
      return res.status(404).json({ message: "Subscriber not found." });
    }

    res.status(200).json({ message: "UnSubscription successfully." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the subscriber." });
  }
});

module.exports = router;
