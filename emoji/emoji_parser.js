/*
TODO: Make sure Schema definition is complete in db.js
Take parsed data and save to DB via Mongoose model.
*/

var $ = require('cheerio')
var fs = require('fs')
var db = require('../server/db.js')

//Load/Parse HTML from disk
var htmlString = fs.readFileSync('Full_Emoji_Data.html').toString()
var parsedHTML = $.load(htmlString)

// Parse all table rows, except the first one which contains header info
parsedHTML('tr').slice(1).map(parseEmojiRow)


//Parses one TableRow holding emoji data.
function parseEmojiRow(index, emojiRow) {
  // the tr html element into a cheerio object (same pattern as jQuery)
  emojiRow = $(emojiRow)

  //The actual unicode entry for this emoji. Should be unique.
  var unicode = emojiRow.children().eq(1).text()

  //human readable name of emoji
  var name = emojiRow.children().eq(12).text()

  //Array of all annotations (tags) for this emoji
  var annotations = emojiRow.children().eq(15).text().split(', ')

  // save black and white flavor
  var basicFileName = saveEmojiFlavorImage(name, 'basic', emojiRow.children().eq(3).find('img'))

  // save Apple flavor
  var appleFileName = saveEmojiFlavorImage(name, 'apple', emojiRow.children().eq(4).find('img'))

  // save Android flavor
  var androidFileName = saveEmojiFlavorImage(name, 'android', emojiRow.children().eq(5).find('img'))

  // save Twitter flavor
  var twitterFileName = saveEmojiFlavorImage(name, 'twitter', emojiRow.children().eq(6).find('img'))

  // save Windows flavor
  var windowsFileName = saveEmojiFlavorImage(name, 'windows', emojiRow.children().eq(7).find('img'))

}

function saveEmojiFlavorImage(emojiName, flavorName, imgElement){
	var imageSrcElement = imgElement.attr('src')
	if(typeof imageSrcElement !== "undefined")
	{
		var imageName = emojiName+'|'+flavorName+'.png'
  		var base64Data = imageSrcElement.replace(/^data:image\/png;base64,/, "");
		fs.writeFileSync('images/' + imageName, base64Data, 'base64', function(err) {console.log(err);});
		console.log('Saved ' + imageName)
		return imageName
	}

}