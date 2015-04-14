

var oauth = ChromeExOAuth.initBackgroundPage({
  'request_url': "https://www.flickr.com/services/oauth/request_token",
  'authorize_url': "https://www.flickr.com/services/oauth/authorize",
  'access_url': "https://www.flickr.com/services/oauth/access_token",
  'oauth_consumer_key': "anonymous",
  'consumer_secret': "anonymous",
  'perms': "write",
  'app_name': "FlickrCap"
});

oauth.authorize(function() {
	console.log("it ran");
  // ... Ready to fetch private data ...
});