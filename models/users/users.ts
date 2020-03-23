import { Tent } from "tent-dome";
import { Types, Schema, Document } from "mongoose";
import bcrypt = require('bcrypt-nodejs');

export interface UserSchema{
  email   : string,
  password: string,
  roles   : string[],
  active  : boolean,
	last_edited: Date,

  setPassword: (password: string)=>void
}
export var User = Tent.Entity<UserSchema>("User",{
  email 	 : String,
  password : String,
  roles	 : [ String ],
  active   : Boolean,
	last_edited:  Date
});


User.Schema.method('setPassword', function (this: any, password: string) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8))
});

User.Routes.create()
  .pre("save",(req: any,res,next)=>{
    let document: Document & Partial<UserSchema> = req.tent.document;
    if(document.setPassword)
      document.setPassword(req.tent.document.password);
    next();
  });

User.Routes.update()
  .pre("save",(req: any,res,next)=>{
    let document: Document & Partial<UserSchema> = req.tent.document;
    if(document.setPassword)
      document.setPassword(req.tent.document.password);
    next();
  });

User.Routes.read();
User.Routes.list();
User.Routes.delete();

User.register();