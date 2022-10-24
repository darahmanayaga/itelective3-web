var express = require('express');
var app = express();
//  app.use(express.static('assets'));

const port = process.env.PORT || 3000;

app.listen(port,);
app.set('view engine', 'ejs');

var fs = require("firebase-admin");
let serviceAccount;
if (process.env.GOOGLE_CREDENTIALS != null) {
    serviceAccount = JSON.parse(process.env.GOOGLE_CREDENTIALS)
}
else {
    serviceAccount = require("./premiumluxuriouswines-firebase-adminsdk-qjn4q-cc318968ea.json")
}
fs.initializeApp({
    credential: fs.credential.cert(serviceAccount)
});


const db = fs.firestore();
const itemColl = db.collection('items');

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/items', async function(req, res) {
    const items = await itemColl.get();
    console.log(items.docs.length);
    let data = {
        url: req.url,
        itemData: items.docs,
    }
    res.render('items', data);
});