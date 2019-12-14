const wol = require('wol');
const express = require('express');
const config = require('./config.json');
var app = express();

app.use(express.static('static'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/" + "index.html");
});

app.get('/get_wol', function(req, res) {
    console.log('A new wol package was requested.');
    var mac = config.mac_to_wake;
    wol.wake(mac, function(err, result) {
        if(result === true) {
            console.log('SUCCESS :: Wol was sent!');
            res.send('Wolle versendet, Sir!');
        } else {
            console.log('ERROR :: could not send Wol! Please check MAC in config.json');
            res.send('Konnte Wolle nicht versenden, Sir! Ceck config');
        }
    });
});

var server = app.listen(1337, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log(`App is online and listening at Port ${port}`);
});