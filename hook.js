var express = require('express');
var bodyParser = require('body-parser');
var exec = require('child_process').exec;
var router = express.Router();

router.use(bodyParser.json());
router.post('/', function(req, res) {
  // console.log(req.body);
  console.log('hook called');
  if (req.body.ref && req.body.ref == 'refs/heads/master') {
    console.log('master pushed, deploy update');
    exec('git pull -q --ff-only anon master', (error) => {
      if (error) {
        console.error('git pull failed');
        return;
      }
      exec('pm2 restart cc-turtlecon', (error) => {
        if (error) {
          console.error('pm2 restart failed');
          return;
        }
        console.log('cc-turtlecon upgraded');
      });
    });
  }
  res.send('Thanks!');
});

module.exports = router;
