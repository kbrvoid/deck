var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require("path");

var BASE_URL = 'https://mydeck.herokuapp.com/';
//var BASE_URL = 'http://deck-bruhr.c9users.io/';

var cards = {};

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views/public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.get('/form', function(req, res) {
    res.sendFile(path.join(__dirname + "/views/form.html"));
});


app.post("/new", function (req, res) {
    var name = req.body.name;
    var url = req.body.url;
    var bio = req.body.bio;
    var linkText = req.body.linkText;
    var link = req.body.link;
    //console.log('NAME CHECK ' + cards[name]);
    if(cards[url] == undefined) {
    var key = url.toLowerCase();
    cards[key] = {name: name, bio: bio, linkText:linkText, link: link, exists:true};
    console.log('Made Key ' + key);
    /*res.send(`<!DOCTYPE html>
    <html>
    <head>
    <title>Deck</title>
    <link rel='stylesheet' href='./css/styles.css'/>
    </head>
    <body>
    <div class="text-center centered">
    <h3>Your Card is Ready.</h3>
    <h1><a id="cardUrl" href="` + key +`" target="_blank">` + key +`</a></h1>
    </div>
    <footer id="footer">
        Made with <span id="heart" class="animate pulse">&#9825;</span> By <a href="http://kabir.ml" target="_blank">Kabir</a>
    </footer>
    <script src='./js/lib/clipboard.min.js'></script>
    <script src='./js/scripts.js'></script>
    </body>
    </html>`);*/
    res.redirect('/' + key);
    } else {
        res.redirect('/form?taken=true');
    }
});

app.get("/:index", function (req, res) {
    var index = req.params.index;
    if(cards[index] != undefined) {
    res.send(`<!DOCTYPE html>
    <html>
    <head>
    <title>`+ cards[index].name +`</title>
    <link rel='stylesheet' href='./css/styles.css'/>
    </head>
    <body id="card">
    <div class="text-center centered">
    <h1 class="animate fadeIn">`+ cards[index].name +`</h1>
    <p class="animate fadeIn">` + cards[index].bio +`</p>
    <a href="` + cards[index].link + `" target="_blank"><button class="btn btn-outline animate fadeIn">` + cards[index].linkText + `</button></a>
    </div>
    <footer id="footer">
        Made with <a href="/" target="_blank">Deck</a>
    </footer>

    <script src="./js/lib/paint.min.js"></script>
    <script src='./js/scripts.js'></script>
    </body>
    </html>`);
    } else {
        res.send(`<!DOCTYPE html><html><head><title>404</title><link rel='stylesheet' href='./css/styles.css'/></head><body><div class='text-center centered animate fadeIn'><h1>404</h1><br><img id="frown" src='http://emojipedia-us.s3.amazonaws.com/cache/9e/ed/9eed096cb7f1adf49b7495df19945d15.png'/></div></body></html>`);
    }
});



app.listen(process.env.PORT, function (req, res) {
    console.log("Listening");
});