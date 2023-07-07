const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const dotenv=require('dotenv');
const helmet=require('helmet');
const morgan=require('morgan');
const path=require('path');
const {fileURLToPath}=require('url');

const clientRoutes=require('./routes/client');
const generalRoutes=require('./routes/general');
const managementRoutes=require('./routes/management');
const salesRoutes=require('./routes/sales');

//data imports
const User=require("./models/User");
const Product=require("./models/Product");
const ProductStat=require("./models/ProductStat");
const Transaction=require("./models/Transaction");
const OverallStat=require("./models/OverallStat");
const AffiliateStat=require("./models/AffilateStat");
const {dataUser,dataProduct,dataProductStat,dataTransaction,dataOverallStat,dataAffiliateStat}=require("./data/index");

dotenv.config();
const app=express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

//ROUTES-------

app.use("/client",clientRoutes);
app.use("/general",generalRoutes);
app.use("/management",managementRoutes);
app.use("/sales",salesRoutes);

//MONGODB SETUP

const PORT=process.env.PORT||9000;

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is working at port:${PORT}`);
       // Product.insertMany(dataProduct);
      //  ProductStat.insertMany(dataProductStat);
      //  User.insertMany(dataUser);
      //Transaction.insertMany(dataTransaction);
    //  OverallStat.insertMany(dataOverallStat);
   // AffiliateStat.insertMany(dataAffiliateStat);
    })
}).catch((error)=>{console.log(`${error} did not connect`)});