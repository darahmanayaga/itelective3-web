var express = require('express');
var app = express();
//  app.use(express.static('assets'));

const port = process.env.PORT || 3000;
app.set('port', port);

app.use(express.json()); //NEEDED
app.use(express.urlencoded()); //NEEDED

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
    let data = {
        url: req.url,
        itemData: items.docs,
    }
    res.render('items', data);
});

app.get('/itempage/:itemid', async function (req, res) {
    try {
        console.log(req.params.itemid);

    } catch (e) {
    }
    const db = fs.firestore();
    const item_id = req.params.itemid;
    const item_ref = itemColl.doc(item_id);
    const doc = await item_ref.get();

    if (!doc.exists) {
        console.log('No such document!');
    } else {
        console.log('Document data:', doc.data());
    }

    const citiesRef = db.collection('items').doc(item_id).collection('procurement');
    const snapshot = await citiesRef.get();
    proc_array = []
    snapshot.forEach(doc => {
        console.log(doc.data());
        proc_array.push(doc.data())
    });

    let data = {
        url: req.url,
        itemData: doc.data(),
        id: item_id,
        procid: doc.id,
        proc_array: proc_array,
        fs: fs
    }

    res.render('itempage', data);
});


app.post('/itempage/:itemid', async function (req, res) {
    try {
        console.log(req.params.itemid);

    } catch (e) {
    }
    const item_id = req.params.itemid;
    const item_ref = itemColl.doc(item_id);
    const doc = await item_ref.get();

    if (!doc.exists) {
        console.log('No such document!');
    } else {
        console.log('Document data:', doc.data());
    }

    console.log(req.body)
    // const items = await ingColl.get();
    var datainput = {
        procurementTrans: Number(req.body.quantity),
        dateCreated : new Date()
    }

    const db = fs.firestore();
    const item_proc = db.collection('items').doc(item_id).collection('procurement').add(datainput);

    let data = {
        url: req.url,
        itemData: doc.data(),
        id: item_id,
        fs:fs
    }
    res.render('itempage', data);
});

app.use((req,res) => {
    res.render('404');
});