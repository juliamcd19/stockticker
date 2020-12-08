const MongoClient = require('mongodb').MongoClient;
var csvtojson = require("csvtojson");
const url = "mongodb+srv://juliamcd19:ballup360@cluster0.tn5ll.mongodb.net/stma?retryWrites=true&w=majority";

csvtojson()
    .fromFile("companies-1.csv")
    .then(csvData => {
    console.log(csvData);

MongoClient.connect(url, function(err, db) {
if(err) { return console.log(err); }
console.log("into mongo");

    var dbo = db.db("stma");
    var collection = dbo.collection('companies');
    collection.insertMany(csvData, (err, res) => {
        if (err) throw err;

    console.log(`Inserted: ${res.insertedCount} rows`);
    db.close();
    });
  }
);
});   
 

var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("<h2>Inserting</h2>");
 res.end();
}).listen(8080);






