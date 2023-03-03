const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Blog = require('./models/Blog')
app.use(express.static(path.join(__dirname, "public", "JS")))
mongoose.connect('mongodb://localhost:27017/blogsd')
.then(() => console.log("Data base connected")).catch((err) => console.log('error occured'))
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({extended:true}));
app.get('/',(req,res) => {
    res.render('index')
})

app.get('/new',(req,res) => {
    res.render('new_article')
})

app.post('/saved',(req,res) => {
    console.log("here")
    var myData = new Blog(req.body);
    myData.save().then(item => res.send('item saved to database'))
    .catch((err) => console.log(err));
})

// app.post('/:id',(req,res) => {
//     console.log(req.body);
// })
app.listen(5000, () => {
    console.log("Server is running");
})
