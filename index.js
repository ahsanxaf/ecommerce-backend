const express = require("express");
const server = express();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const productsRouter = require("./routes/Products");
const categoriesRouter = require("./routes/Categories");
const brandsRouter = require("./routes/Brands");
const cors = require("cors");
const usersRouter = require("./routes/Users");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Carts");
const orderRouter = require("./routes/Orders");
const { User } = require("./model/User");
const crypto = require("crypto");
const { isAuth, sanitizeUser, cookieExtractor } = require("./services/common");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
var jwt = require("jsonwebtoken");
const SECRET_KEY = "SECRET_KEY";
const cookieParser = require('cookie-parser');

//ExtractJwt.fromAuthHeaderAsBearerToken();
// jwt options
const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY; // TODO: should not be in code

// middlewares
server.use(express.static('build'));
server.use(cookieParser());
server.use(
  session({
    secret: "keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);
server.use(passport.authenticate("session"));
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use(express.json()); // to parse req.body
server.use("/products", isAuth(), productsRouter.router);
server.use("/brands", isAuth(), brandsRouter.router);
server.use("/categories", isAuth(), categoriesRouter.router);
server.use("/users", isAuth(), usersRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", isAuth(), cartRouter.router);
server.use("/orders", isAuth(), orderRouter.router);

// passport stratigies
passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: "Email or Password is incorrect" });
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, {
              message: "Email or Password is incorrect",
            });
          }
          const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
          done(null, {id: user.id, role: user.role, token}); // this line send to serializer
        }
      );
    } catch (error) {
        return done(error);
    }
  })
);

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log('jwt_payload: ',  jwt_payload );
    try {
      const user = await User.findById( jwt_payload.id );
      if (user) {
        return done(null, sanitizeUser(user)); //this calls serializer
      } else {
        return done(null, false);
      }
    } catch (error) {
        done(error, false);
    }
  })
);

// this creates a session variable req.user on being called from callback
passport.serializeUser(function (user, cb) {
  console.log("Serialize", user);
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});

// this changes a session variable req.user on being called from authorized request
passport.deserializeUser(function (user, cb) {
  console.log("De-Serialize", user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

main().catch((error) => console.log(error));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerceDB");
  console.log("Database connected");
}

server.get("/", (req, res) => {
  res.json({ status: "success" });
});

server.listen(8080, () => {
  console.log("Server Started");
});
