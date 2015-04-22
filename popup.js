

//takes screenshot of current tab and writes it into the popup.html file

var imageURL
chrome.tabs.captureVisibleTab(function(dataURL) {
  var capture = "<image src=\"" + dataURL + "\" />";
	document.getElementById("image").innerHTML = capture;
	imageURL = dataURL;
});


var bgPage = chrome.extension.getBackgroundPage();


bgPage.oauth.authorize(onAuthorized);

function createSignature(secret, args) {
  var sortedArgs = args.sort();
  console.log(secret + args.join('').replace(/=/g, ''))
  console.log(bgPage.md5(secret + args.join('').replace(/=/g, '')))
  return bgPage.md5(secret + args.join('').replace(/=/g, ''));
}


function upload(uploadArgs){
  var xhr = new XMLHttpRequest();
  var secret = '08223f95d11cb34d';
  var args = [];
  args.push('api_key=' + uploadArgs['api_key']);
  // args.push('auth_token=' + uploadArgs['auth_token']);
  args.push('perms=write');
  var apiSig = createSignature(secret, args)
  args.push('api_sig=' + apiSig);
  var url = 'https://up.flickr.com/services/upload/';

  xhr.open('POST', url, true);

  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
  // xhr.setRequestHeader("Content-length", args.join('&').length);
  // xhr.setRequestHeader("Connection", "close");


  xhr.onreadystatechange = function()
    {
            console.log(xhr.responseText);
            console.log(xhr.status);
    }; 


  xhr.send(args.join('&'));
}



function onAuthorized() {
  console.log("It ran");

  //   var request = {
  //   'method': 'POST',
  //   'headers': {
  //     'flickrcap-Version': '1.0',
  //     'Content-Type': 'application/atom+xml'
  //   },
  //   'parameters': uploadArgs,
  //   'body': 'imageURL'
  // };

  // Send: POST https://docs.google.com/feeds/default/private/full?alt=json
  // oauth.sendSignedRequest(url, callback, request);

  var uploadArgs = {
    'photo': imageURL,
    'auth_token': localStorage["oauth_tokenundefined"],
    'api_key': "ffe89167fc96586965aaf5186c1440cb"
  };

 // document.getElementById('upload-button').onClick(upload(uploadArgs))

  upload(uploadArgs);
};




//arguments for posting to https://up.flickr.com/services/upload/

// photo
// The file to upload.
// ^can this be the imageURL variable I set up? - base64...
// 
// 
// title (optional)
// The title of the photo.
// ^I'd like this to be the name of the website the shot was taken of
// 
// 
// description (optional)
// A description of the photo. May contain some limited HTML.
// ^perhaps can allow user input for this?
// 
// 
// tags (optional)
// A space-seperated list of tags to apply to the photo.
// ^perhaps can allow user input for this?
// 
// 
// is_public, is_friend, is_family (optional)
// Set to 0 for no, 1 for yes. Specifies who can view the photo.
// ^perhaps can allow user input for this?
// 
// 
// safety_level (optional)
// Set to 1 for Safe, 2 for Moderate, or 3 for Restricted.
// 
// 
// content_type (optional)
// Set to 1 for Photo, 2 for Screenshot, or 3 for Other.
// ^2
// 
// 
// hidden (optional)
// Set to 1 to keep the photo in global search results, 2 to hide from public searches.


//registered the app with flickr for oauth tokens
//Key:
//ffe89167fc96586965aaf5186c1440cb

//Secret:
//08223f95d11cb34d

//app garden url
//https://www.flickr.com/services/apps/by/132594185@N08









