/* Imports */
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
//--routes
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js";
//--models
import KPI from "./models/KPI.js";
import Product from "./models/Product.js";
import Transaction from "./models/Transaction.js";
// seed data
import { kpis, products, transactions } from "./data/data.js";
/* End Imports */



/* Configurations */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
/* End Configurations */



/* Use routes */
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes)
app.use("/transaction", transactionRoutes)



/* DB setup */
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connected Successfully"))
    // use the code below to add data one time only or as needed
    // .then(
    //     async () => {
    //         await mongoose.connection.db.dropDatabase()
    //         KPI.insertMany(kpis)
    //         Product.insertMany(products)
    //         Transaction.insertMany(transactions)
    //     })
    .catch((error) => console.log(error));
/* End DB setup */



/* Start the server */
const port = process.env.PORT || 9000;
app.listen(port, async () => console.log(`Server is running on port ${port}`))