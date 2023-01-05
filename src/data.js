fetch('https://random-word-api.herokuapp.com/word?length=5')
	.then(response => response.json())
	.then(response => show(response))
	.catch(err => console.error(err));
    console.log('Window Loaded...');
    console.log('response');