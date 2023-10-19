const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./model/user");
const session = require("express-session");

app.use(
  session({
    secret: "JHYTRQfgftrcxz$%^874322dsffSDSS%%iiiioi", // Replace with a secure secret key
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");

  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");

  next();
});

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

const GOOGLE_CLIENT_ID =
  "997894008076-ls9fbuseh8al9ik3mfm4o86m15871lav.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          // Add any other fields you need
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch((error) => done(error, null));
});

app.options(
  "*",
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Credentials",
    ],
    credentials: true,
  })
);

app.use(
  cors({
    origin: [
      "https://onlineshop-2xjp.vercel.app",
      "http://localhost:3000",
      "https://onlineshop-delta.vercel.app",
    ],
    // origin: ["https://eshop-tutorial-cefl.vercel.app", "http://localhost:3000"],
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(cookieParser());
// app.use("/", express.static(path.join(__dirname, "./tmp")));
// app.use("/", express.static(path.join(__dirname, "../uploads")));
app.use("/test", (req, res) => {
  res.send("Hello world!");
});

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// import routes
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const coupon = require("./controller/coupounCode");
const payment = require("./controller/payment");
const order = require("./controller/order");
const conversation = require("./controller/conversation");
const message = require("./controller/message");
const withdraw = require("./controller/withdraw");
const mpesaRoutes = require("./controller/mpesa");
const statementsRoutes = require("./controller/statements");
const category = require("./controller/categories");
const carousel = require("./controller/carousel");
const subscribe = require("./controller/subscribers");
const location = require("./controller/location");
const flashSale = require("./controller/flashSale");

app.use("/api/v2/user", user);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);
app.use("/api/v2/order", order);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/payment", payment);
app.use("/api/v2/withdraw", withdraw);
app.use("/api/v2/pesa", mpesaRoutes);
app.use("/api/v2/statements", statementsRoutes);
app.use("/api/v2/category", category);
app.use("/api/v2/carousel", carousel);
app.use("/api/v2/subscribe", subscribe);
app.use("/api/v2/location", location);
app.use("/api/v2/flashsale", flashSale);

// it's for ErrorHandling
app.use(ErrorHandler);
app.use(express.static("public"));

module.exports = app;
