

//takes screenshot of current tab and writes it into the popup.html file

var imageUrl
chrome.tabs.captureVisibleTab(function(dataURL) {
  var capture = "<image src=\"" + dataURL + "\" />";
	document.getElementById("image").innerHTML = capture;
	imageUrl = dataUrl;
});
