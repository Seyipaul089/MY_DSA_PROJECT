import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    name:{type:String, require:true},
    email:{type:String, require:true, unigue:true},
    password:{type:String, require:true, unigue:true},
    role:{type:String, require:true,
        enum:["admin", "mentor", "mentee"],
        default:"mentee"
    },
},
     {timestamps:true},
    {minime:false},
)

const AuthModel = mongoose.model.users || mongoose.model("users", authSchema);
export default AuthModel;
