import {config} from 'dotenv';
import { Tent } from "tent-dome";

config();

Tent.init({
  "mongodb uri" : process.env.MONGODB_URI,
  "auth user"   : "User",
  "auth signup" : false,
  "auth email token"    : "email",
  "auth password token" : "password",
  "auth activation token" : "active",
  "auth secret": process.env.JWT_SECRET,
  "permission payload role": "roles",
});

Tent.app().all('*',(req,res,next)=>{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods","GET, PUT, POST, DELETE");
  next();
});

import "./models/users/users";

Tent.register();

Tent.start(parseInt(process.env.PORT || "3000")).then(()=>
{
  console.log("\n\nTent Server has started.");
});