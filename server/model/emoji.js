var mongoose = require( 'mongoose' );

var flavorSchema = mongoose.Schema({ 
	flavorName: String, 
	fileName: String
})

var emojiSchema = mongoose.Schema({ 
	name:  String,
	unicode: String,
	annotations:  [String],
	flavors: [flavorSchema],
})

var Emoji = module.exports = mongoose.model('Emoji', emojiSchema)