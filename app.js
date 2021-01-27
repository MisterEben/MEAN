const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

const users = require('./routes/users');
const config = require('./config/database');


const app = express();
PORT = process.env.PORT || 4000;


// mongodb connection
mongoose.connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(response => console.log(`Succesfully Connected To Database: ${config.database}`))
    .catch(err => console.log(`An Error Occured: ${err}`));

// cors Middleware
app.use(cors());

// body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use('/users', users)

app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`);
})