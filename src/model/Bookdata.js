const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/library',{ useNewUrlParser: true,useUnifiedTopology: true });

mongoose.set('useFindAndModify', false); 

const Schema=mongoose.Schema;
const Bookschema=new Schema({
    title:String,
    author:String,
    genre:String,
    image:String

});



var Bookdata=mongoose.model('bookdata',Bookschema);

module.exports=Bookdata;