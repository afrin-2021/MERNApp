const express = require("express");
const bodyParser = require("body-parser");
var multer = require('multer');
var upload = multer();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const XLSX = require("xlsx");
const cors = require("cors");

app.use(cors());
app.use(upload.array()); 
app.use(express.static('public'));
var type = upload.single('file');
var MongoClient = require("mongodb").MongoClient;

var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {

    var dbo = db.db("HealthDatabase");

    app.post("/insert/provider-details", (req, res) => {
      try {
        
     
        var fileName = req.body.name;
        
        var workbook = XLSX.readFile(fileName);
        var sheetList = workbook.SheetNames;
        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetList[0]]);
        dbo.collection("ProviderCollection").insertMany(xlData, function (err, res) {
          if (err) throw err;
        });
        res.send("File uploaded successfully");
      } catch (error) {
        res.send("Error")
      }
      });


  app.get("/get/location_details",(req,res) =>{
    try {
        dbo.collection("ProviderCollection")
      .aggregate(
        [
          { $group:
              {
              _id:"$Address1",
              Provider:{$addToSet:{first:"$First Name",last:"$Last Name",Desg:"$Professional Designation",Gender:"$Gender"}},
              BusinessInfo:{$addToSet:{BusinessName:"$Practice Name",Type:"$Practice Type",City:"$City",State:"$State",Phone:"$Phone",Fax:"$Fax"}},
              count:{$sum:1}	
          }
        }
    ]).toArray(function(err,result){
      dbo.collection("LocationCollection").insertMany(result, function (err, res) {
        if (err) {
          result = "error"
        }
      });
      res.send(result)
    })
    } catch (error) {
        res.send("Error")
    }
  })

  app.get("/get/location",(req,res) => {
    dbo
    .collection("LocationCollection")
    .find().toArray(function(err,result){
      if (err) throw err;
      res.send(result)
    })
  })
})

app.listen(5001);