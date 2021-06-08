// importing the dependencies
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require("express-fileupload")
const port = process.env.PORT || 3000;



const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
connectDB();

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))




const adminAuth = require('./routes/admin.auth.route');
const article = require('./routes/articles.route');
const comment = require('./routes/comments.articles.route');

app.use('/admin', adminAuth);
app.use('/blog', article);
app.use('/comment', comment);

// checking whether app is working
app.get('/', (req, res) => {
    res.send('this app works')
});

app.listen(port, () => {
    console.log('server is running');
});