var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/matrixUI');
var db = mongoose.connection;

var emojiSchema = mongoose.Schema({ 
	name:  String,
	unicode: String,
	annotations:  [],
	flavors: [{ flavorName: String, fileName: String }],
})

var Emoji = db.model('Emoji', schema)

exports.Emoji = Emoji;