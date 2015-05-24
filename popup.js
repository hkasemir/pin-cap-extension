console.log('popup js started');

var bgPage = chrome.extension.getBackgroundPage();


bgPage.oauth.authorize(function(){
    console.log('authorize ran')
});

console.log('popup js done');


