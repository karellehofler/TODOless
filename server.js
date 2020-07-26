const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const config = require('config');
const items = require('./routes/api/items');
const auth = require('./routes/api/auth');
const lists = require('./routes/api/lists');
const users = require('./routes/api/users');
const path = require('path');
const app = express();

//Body Parser Middleware
// app.use(express.json());
app.use(bodyParser.json());

//Db config
// const db = config.get('mongoURI');
const db = require('./config/database').mongoURI;

mongoose.connect(db, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
    })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.use('/api/items', items);
app.use('/api/auth', auth);
app.use('/api/lists', lists);
app.use('/api/users', users);

//Server static assets if in production
if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));