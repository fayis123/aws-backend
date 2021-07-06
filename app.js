const express = require('express');
const BookData = require('./src/model/Bookdata');
const UserData=require('./src/model/userdata')
 const AuthorsData = require('./src/model/Authorsdata')
const cors = require('cors');
var bodyparser=require('body-parser');
const jwt = require('jsonwebtoken');
var app = new express();
app.use(cors());
app.use(bodyparser.json());
email='fayizc9@gmail.com';
password='12345678';


function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }

 function checkuser(req,res, next){
   useremail=req.body.email;
   userpassword=req.body.password;
   userData=req.body;
  UserData.findOne({email:useremail})
  .then(function(data){
    if(email == useremail && password == userpassword){
      console.log("You are in Admin");
      next()
    } else if (useremail==data?.email && userpassword == data?.password){
      console.log("you are in user")
      next()
    }else{
      res.status(401).send('Invalid Login Attempt')
    }
})
 }
  
  
app.post('/login',checkuser, (req, res) => {
  useremail=req.body.email;
  userpassword=req.body.password;
if(useremail==email && userpassword==password){

    
        let payload = {subject: email+password}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
}else{
  let payload = {subject: userpassword+useremail}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
}
  
  })

  //signup

   //adding userdata in server

app.post('/signup', function(req,res){
  
console.log(req.body)
   
    var items={
        username:req.body.user.uname,
        email:req.body.user.email,
        password:req.body.user.password
        
    }
    var users=new UserData(items);
    users.save();
    console.log(" user record was added");

  
})

//authors


app.post('/authors/insert',verifyToken,function(req,res){
   
    console.log(req.body);
   
    var Author = {       
        name : req.body.authors.name,
        DOB : req.body.authors.DOB,
        Book : req.body.authors.Book,
        image : req.body.authors.image,
   }       
   var product = new AuthorsData(Author);
   product.save();
});
app.get('/authors',function(req,res){
    
    AuthorsData.find()
                .then(function(authors){
                    res.send(authors);
                });
});


app.get('/authors/:id',  (req, res) => {
  
  const id = req.params.id;
    AuthorsData.findOne({"_id":id})
    .then((authors)=>{
        res.send(authors);
    });
})

    app.put('/authors/update',(req,res)=>{
      console.log(req.body)
      id=req.body._id,
      name= req.body.name
      DOB = req.body.DOB,
      Book = req.body.Book,
      image = req.body.image,
     AuthorsData.findByIdAndUpdate({"_id":id},
                                  {$set:{"name" : name,
                                  "DOB" : DOB,
                                  "Book" : Book,
                                  "image" : image}})
     .then(function(){
         res.send();
     })
   })
   
app.delete('/authorsremove/:id',(req,res)=>{
   
     id = req.params.id;
     AuthorsData.findByIdAndDelete({"_id":id})
     .then(()=>{
         console.log('success')
         res.send();
     })
   })
     
//Books

   app.post('/insert',verifyToken,function(req,res){
   
    console.log(req.body);
   
    var Book = {       
        title : req.body.books.title,
        author : req.body.books.author,
        genre : req.body.books.genre,
        image : req.body.books.image,
   }       
   var product = new BookData(Book);
   product.save();
});
app.get('/books',function(req,res){
    
    BookData.find()
                .then(function(Books){
                    res.send(Books);
                });
});
app.get('/:id',  (req, res) => {
  
  const id = req.params.id;
    BookData.findOne({"_id":id})
    .then((book)=>{
        res.send(book);
    });
})

app.put('/update',(req,res)=>{
  console.log(req.body)
  id=req.body._id,
  title = req.body.title,
  author = req.body.author,
  genre = req.body.genre,
  image = req.body.image,
 BookData.findByIdAndUpdate({"_id":id},
                              {$set:{"title" : title,
                              "author" : author,
                              "genre" : genre,
                              "image" : image}})
 .then(function(){
     res.send();
 })
})

app.delete('/remove/:id',(req,res)=>{

 id = req.params.id;
 BookData.findByIdAndDelete({"_id":id})
 .then(()=>{
     console.log('success')
     res.send();
 })
})
 



app.listen(3000, function(){
    console.log('listening to port 3000');
});


