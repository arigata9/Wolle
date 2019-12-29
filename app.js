const wol = require('wol');
const express = require('express');
const config = require('./config.json');
const basicAuth = require('express-basic-auth');
var app = express();

app.use(basicAuth({
    users: config.users,
    unauthorizedResponse: getUnauthorizedResponse,
    challenge: true
}));

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
            res.sendFile(__dirname + "/static/" + "wolsent.html");
        } else {
            console.log('ERROR :: could not send Wol! Please check MAC in config.json');
            res.send('Konnte Wolle nicht versenden, Sir! Check config');
        }
    });
});

app.get('/logout', function(req, res) {
    res.status(401).end();
})

function getUnauthorizedResponse(req) {
    return req.auth
        ? ('<h3>Provided credentials for ' + req.auth.user + ' rejected!</h3>')
        : '<h3>Unauthorized (401)</h3>'
}

var server = app.listen(1337, config.serverAddr, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log(`App is online and listening at http://${host}:${port}`);
});