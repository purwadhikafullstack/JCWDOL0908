const { join } = require("path");
require("dotenv").config({ path: join(__dirname, "../.env") });
const express = require("express");
const cors = require("cors");
const {
  UserRouter,
  AdminRouter,
  AdminLoginRouter,
  AdminWarehouseRouter,
  AuthRouter,
  CategoryRouter,
  CartRouter,
  ProductRouter,
  AddressRouter,
  ProductWarehouseRltRouter,
  MutationRouter,
  CheckoutRouter,
  ProductJournalRouter,
} = require("./router");
const db = require("./model");
const bearerToken = require("express-bearer-token");
const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(bearerToken());

// Init Database
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use(express.json());
app.use("/", express.static(__dirname + "/public"));

//#region API ROUTES
app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});
// ===========================
// NOTE : Add your routes here

app.use("/api/users", UserRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/admin-login", AdminLoginRouter);
app.use("/api/admin-warehouse", AdminWarehouseRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/categories", CategoryRouter);
app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);
app.use("/api/address", AddressRouter);
app.use("/api/products-stocks", ProductWarehouseRltRouter);
app.use("/api/mutation", MutationRouter);
app.use("/api/checkout", CheckoutRouter);
app.use("/api/products-journal", ProductJournalRouter);

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err);
    if (err.statusCode && err.message) {
      return res.status(err.statusCode).send(err.message);
    }
    return res.status(500).send(err);
  } else {
    next();
  }
});

// access storage
app.use("/storage", express.static(join(__dirname, "storage")));

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
