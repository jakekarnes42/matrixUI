//Cheerio for parsing HTML
var $ = require('cheerio')
//fs for saving images to disk
var fs = require('fs')
//Connect to MonogDB via Mongoose
var db = require('../server/model/db.js')
//Get our custom Emoji Model
var mongoose = require( 'mongoose' )
var Emoji = mongoose.model('Emoji')

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

  //An initially empty array of all the flavors we found.
  var flavors = []

  //Add black and white flavor 
  addEmojiFlavor(emojiRow, name, 'basic', 3, flavors)

  // add Apple flavor
  addEmojiFlavor(emojiRow, name, 'apple', 4, flavors)

  // save Android flavor
  addEmojiFlavor(emojiRow, name, 'android', 5, flavors)

  // save Twitter flavor
  addEmojiFlavor(emojiRow, name, 'twitter', 6, flavors)

  // save Windows flavor
  addEmojiFlavor(emojiRow, name, 'windows', 7, flavors)

  //Save to database
  Emoji.create({ 
    name: name, 
    unicode: unicode, 
    annotations: annotations,
    flavors: flavors
    }, function (err, emoji) {
      if (err) return handleError(err);
    // saved!
  })

}

// Checks if this flavor exists for this emoji. 
// If it does exist, it saves the flavor image to disk and adds metadata to flavors array.
function addEmojiFlavor(emojiRow, emojiName, flavorName, columnIndex, flavors){
  var imageElement = emojiRow.children().eq(columnIndex).find('img')
  var imageSrcElement = imageElement.attr('src')

  //Only continue if this flavor exists. Otherwise, do nothing.
  if(typeof imageSrcElement !== "undefined"){
    var imageName = emojiName+'|'+flavorName+'.png'
    //Save image to disk
    saveEmojiFlavorImage(imageName, imageSrcElement)
    //Add to array of found flavors.
    flavors.push({flavorName: flavorName, fileName:imageName})
  } 
}

//Save the Base64 encoded PNG to disk and return the filename.
function saveEmojiFlavorImage(imageName, imageSrcElement){
 var base64Data = imageSrcElement.replace(/^data:image\/png;base64,/, "");
 fs.writeFileSync('images/' + imageName, base64Data, 'base64', function(err) {console.log(err);});
 console.log('Saved ' + imageName)
}

console.log('All done with emojis.')