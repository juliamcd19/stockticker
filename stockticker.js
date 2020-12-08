var http = require('http');
var url = require('url');
const MongoClient = require('mongodb').MongoClient;
const murl = "mongodb+srv://juliamcd19:ballup360@cluster0.tn5ll.mongodb.net/stma?retryWrites=true&w=majority";

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("<head><style>body{text-align: center;background-color: #99B9FF;font-family: 'Georgia';}</style></head>")
  res.write("<body><h1>Your Results</h1><hr size='10' color='black'></body>");
  var qobj = url.parse(req.url, true).query;
  var choice = qobj.t_or_n;
  var input = qobj.uinput;
  res.write("<p>" + Promise.resolve(doit(choice, input)) + "</p>"); 
  res.end();
}).listen(8080);

client =new MongoClient(murl,{ useUnifiedTopology: true });
async function doit(uchoice, uinput) {
var str= "";
  try {
    await client.connect();
    var dbo = client.db("stma");
    var coll = dbo.collection('companies');
    const options = {
            sort: { Company: 1 },
            projection: { _id: 0, Company: 1, Ticker: 1 },
        };
    //const curs = coll.find({uchoice: {$regex:".*" + uinput + ".*"}});
    var query = {}
    if (uchoice == "Company") {
        query = {"Company": uinput};
        console.log("Company: "+ uinput);
    }
    else {
        query = {"Ticker": uinput};
    }
    const curs = coll.find(query, options);
    // PRINT IF NONE FOUND
    //await curs.forEach(console.dir);
    await curs.forEach(function(item){
        str += item.Company + ", " + item.Ticker +  "<br>";
        console.log("for each");
    });
    console.log(str);
  } 
  catch(err) {
      str += "Database error: " + err;
      console.log("db error");
}
  finally {
    client.close();
    console.log("db closed");
  }
}  //end doit





