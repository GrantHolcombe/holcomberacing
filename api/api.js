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
      var racerId = req.params.r;

      res.json({
        trackName: trackName,
        racerId: racerId
      });
  });

api.use('/api', router);

// start server
api.listen(port);
console.log("API running on port:" + port);
