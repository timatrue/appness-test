/**
 * Created by artem on 16/06/2017.
 */
var express = require('express');
var app = express();
var path = require('path');

var http = require('http').createServer(app);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){

    res.sendFile('src/index.html');
});

http.listen(process.env.PORT || 2017, function(){
    console.log('listening on *:2017');
});
