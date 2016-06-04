var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var express = require('express');
var api = express();

// set port
var port = process.env.PORT || 8080;

// scrape function
api.get('/scrape', function(req, res){
  // set url for scrape
  url = "http://" + "mscmiramar" + '.clubspeedtiming.com/sp_center/RacerHistory.aspx?CustID=' + "1170635";

  // scrape the url
  request(url, function(err, res, html){
    if(!err){
      var $ = cheerio.load(html);
      var json = {
        dates: []
      }

      $('#Table1 table .Normal td:nth-child(2)').each(function(){
        var date = $(this).text().replace(' ', '');
        json.dates.push(date);
      });


      console.log(json);
    } else {
      console.log();
    }
  });
});

// url route setup
var router = express.Router();

router.get('/', function(req, res) {
  res.json({
    message: "Welcome to the Holcombe Racing API"
  });
});

router.route('/fetch-times/:t/:r')
  .get(function(req, res) {
      var trackName = req.params.t;
      var racerId = req.params.r;

      res.json({
        trackName: "mscmiramar",
        racerId: "1170635"
      });
  });

api.use('/api', router);

// start server
api.listen(port);
console.log("API running on port:" + port);
