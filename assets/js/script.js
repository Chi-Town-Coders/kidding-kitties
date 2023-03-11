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

		// Creates a container for cat images, appends it to document, and gives it a class for CSS purposes.
		var catContainer = document.createElement('div');
		var catImage = document.createElement('img');

		catImage.src = cat.photos;
		catContainer.classList.add('cat-container');


		document.querySelector("#main-container").append(catContainer);

		// Sources and creates images inside the catContainers and sources them.



		// Appends catImages to catContainers
		catContainer.appendChild(catImage);


		catImage.onclick = function (event) {

			var parentContainer = event.target.parentElement;
			console.log(parentContainer)

			var numberOfChildren = parentContainer.children.length;

			console.log(numberOfChildren)

			if (numberOfChildren == 1) {
				fetch('https://joke.deno.dev', {
					method: 'GET',
				}).then(function (resp) {
					return resp.json();

				}).then(function (joke) {

					console.log(joke);



					var jokeContainer = document.createElement('div');
					jokeContainer.classList.add('joke-container');

					var jokeText = document.createElement('p');
					jokeText.innerText = joke.setup + " " + joke.punchline;

					var button = document.createElement('button');
					button.innerText = 'Adopt Me!';
					button.onclick = function () {
						window.open(cat.url);
					};

					jokeContainer.appendChild(jokeText);
					jokeContainer.appendChild(button);
					catContainer.appendChild(jokeContainer);
				});
			}

		};
	});
});