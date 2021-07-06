const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/library',{ useNewUrlParser: true,useUnifiedTopology: true });
mongoose.set('useFindAndModify', false); 

const Schema=mongoose.Schema;
const Userschema=new Schema({
    username:String,
    password:String,
    email:String
});

var userdata=mongoose.model('userdata',Userschema);

module.exports=userdata;