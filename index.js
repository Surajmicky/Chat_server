const express= require('express');
const cors= require('cors');
const mongoose= require('mongoose');
const userRoutes= require('./routes/userRoutes.js');
const app= express();
const cookieParser= require('cookie-parser')
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use('/api/auth',userRoutes);
app.use(cookieParser())
// console.log(userRoutes);
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('connected to mongoose')
}).catch((err)=>{
    console.log(err.message)
})

app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`);
})
