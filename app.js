const express = require('express');
const bodyParser = require('body-parser');
require('ejs');
const app = express();
const router = require('./router');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

