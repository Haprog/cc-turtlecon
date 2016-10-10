var bodyParser = require('body-parser');
var connect = require('camo').connect;

var uri = `nedb://${__dirname}/data`;

var Document = require('camo').Document;
class LogMessage extends Document {
  constructor() {
    super();

    this.date = {
      type: Date,
      default: Date.now
    };
    this.msg = String;
  }
}

exports.view = function (req, res) {
  connect(uri).then(function(db) {
    return LogMessage.find({}, {sort: '-date', limit: 100});
  }).then(function(log) {
    res.json(log);
  }).catch(function(error) {
    res.status(500).json({error: error});
  });
};

exports.post = [bodyParser.json(), function (req, res) {
  connect(uri).then(function(db) {
    var msg = LogMessage.create({ msg: req.body.msg });
    return msg.save();
  }).then(function(msg) {
    res.json({msg: 'Message logged', id: msg._id});
  }).catch(function(error) {
    res.status(500).json({error: 'Error logging message'});
  });
}];
