

//takes screenshot of current tab and writes it into the popup.html file

var imageUrl
chrome.tabs.captureVisibleTab(function(dataURL) {
  var capture = "<image src=\"" + dataURL + "\" />";
	document.getElementById("image").innerHTML = capture;
	imageUrl = dataURL;
});


var bgPage = chrome.extension.getBackgroundPage();


bgPage.oauth.authorize(function() {
	console.log("it ran");
  // ... Ready to fetch private data ...
});



function onAuthorized() {
  var method = 'POST';
  var url = 'imageUrl';
  var params = {'alt': 'json'};

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(data) {
    callback(xhr, data);
  };
  xhr.open(method, url + '?' + stringify(params), true);
  xhr.setRequestHeader('GData-Version', '3.0');
  xhr.setRequestHeader('Content-Type', 'application/atom+xml');
  xhr.setRequestHeader('Authorization', oauth.getAuthorizationHeader(url, method, params));
};


//register the app with flickr for oauth tokens
//Key:
//ffe89167fc96586965aaf5186c1440cb

//Secret:
//08223f95d11cb34d

//app garden url
//https://www.flickr.com/services/apps/by/132594185@N08


// https://www.flickr.com/services/oauth/access_token
// ?oauth_nonce=37026218
// &oauth_timestamp=1305586309
// &oauth_verifier=5d1b96a26b494074
// &oauth_consumer_key=ffe89167fc96586965aaf5186c1440cb
// &oauth_signature_method=HMAC-SHA1
// &oauth_version=1.0
// &oauth_token=72157626737672178-022bbd2f4c2f3432
// &oauth_signature=UD9TGXzrvLIb0Ar5ynqvzatM58U%3D






