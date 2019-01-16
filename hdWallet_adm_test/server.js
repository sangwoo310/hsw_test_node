var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var router1 = require('./router/adm_mnemonic.js')(app);

var server = app.listen(26890, function(){
 console.log("Express server has started on port 26890")
});

