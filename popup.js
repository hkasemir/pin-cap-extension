if (!HTMLCanvasElement.prototype.toBlob) {
 Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
  value: function (callback, type, quality) {

    var binStr = atob( this.toDataURL(type, quality).split(',')[1] ),
        len = binStr.length,
        arr = new Uint8Array(len);

    for (var i=0; i<len; i++ ) {
     arr[i] = binStr.charCodeAt(i);
    }

    callback( new Blob( [arr], {type: type || 'image/png'} ) );
  }
 });
}

var bgPage = chrome.extension.getBackgroundPage();


bgPage.oauth.authorize(function(){
    console.log('authorize ran')
    capTab();
});




var imageBlob

function capTab(){
    chrome.tabs.captureVisibleTab({"format":"jpeg"}, function(dataURL) {
      var image = new Image();
      image.addEventListener("load", function(){
        var canvas = document.getElementById("image");
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0);
        
        canvas.toBlob(function(blob){
          imageBlob = blob;
        }, "image/jpeg", 0.95);
      });
                             
      image.src = dataURL;
       
    });
};

function onSubmit(){
  console.log("submit button pressed");
  submitImage();
}


var button = document.getElementById("upload-button");
button.addEventListener("click", onSubmit);


function onImageSubmitted(evt){
  console.log("image has been submitted!");
  console.log(evt);
}


function submitImage(){
  var url = "https://up.flickr.com/services/upload/";
  var request = {
    "method": "POST",
    "parameters": {
      "photo": imageBlob,
    }
  }
  bgPage.oauth.sendSignedRequest(url, onImageSubmitted, request);
}

function submitImageOld(){
  
  var data = new FormData();
  console.log(md5(bgPage.oauth["consumer_secret"]));
  data.append("api_sig", md5(bgPage.oauth["consumer_secret"]));
  data.append("photo", imageBlob);
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", onImageSubmitted);
  xhr.open("POST", "https://up.flickr.com/services/upload/", true);
  xhr.send(data);
}

