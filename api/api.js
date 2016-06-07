var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var express = require('express');
var api = express();

// set port
var port = process.env.PORT || 8080;


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
      var racerId = parseInt(req.params.r);
      var json = {
        times: [],
        dates: []
      };

      // set url for scrape
      var url = "http://" + trackName + '.clubspeedtiming.com/sp_center/RacerHistory.aspx?CustID=' + racerId;

      // scrape the url
      var test = request(url, function(err, resp, html){
        if(!err){
          var $ = cheerio.load(html);


          $('#Table1 table .Normal td:nth-child(4)').each(function(){
            var time = $(this).text();
            json.times.push(time);
          });

          $('#Table1 table .Normal td:nth-child(2)').each(function(){
            var date = $(this).text().trim();
            json.dates.push(date);
          });

        } else {
          console.log(err);
        }

        res.json(json);
      });

  });


api.use('/api', router);

// start server
api.listen(port);
console.log("API running on port:" + port);
