const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/library',{ useNewUrlParser: true,useUnifiedTopology: true });

mongoose.set('useFindAndModify', false); 

const Schema=mongoose.Schema;
const Authorsschema=new Schema({
    name:String,
    DOB:String,
    Book:String,
    image:String

});



var Authorsdata=mongoose.model('authorsdata',Authorsschema);

module.exports=Authorsdata;