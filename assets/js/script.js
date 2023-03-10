// Client credentials
// Replace these with your key/secret
var key = 'i1H9NJybBiX2WXs257QX7yUzCR0ixMDP5JdxHhOK0dX6qEcFGp';
var secret = 'qkwXTx7MPxTxfnJhmsQnGqwmnMAAztGEpzWqWnD4';
// Call the API
// This is a POST request, because we need the API to generate a new token for us
fetch('https://api.petfinder.com/v2/oauth2/token', {
	method: 'POST',
	body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
}).then(function (resp) {
	// Return the response as JSON
	return resp.json();
}).then(function (data) {
	// Log the API data
	console.log('token', data);
	// Return a second API call
	// This one uses the token we received for authentication
	return fetch("https://api.petfinder.com/v2/animals?type=cat", {
		headers: {
			'Authorization': data.token_type + ' ' + data.access_token,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});
}).then(function (resp) {
	// Return the API response as JSON
	return resp.json();
}).then(function (data) {
    // Log the pet data
	console.log('pets', data);

    var catImages = data.animals
    .filter(function (animal) {
      return animal.photos.length > 0;
    })
    .map(function (animal) {
      return {
        url: animal.url,
        photos: animal.photos[0].medium
      };
    });
  
      catImages.forEach(function (cat) {
        var img = document.createElement('img');
        img.src = cat.photos;
        var link = document.createElement('a');
        link.href = cat.url;
        link.appendChild(img);
        document.body.appendChild(link);
      });

}).catch(function (err) {
	// Log any errors
	console.log('something went wrong', err);
});
