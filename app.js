// Get data
d3.json('http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=netherlands&api_key=7ebc4d450f175fa75d3260763df487fb&format=json').then((data) => {
    console.log(data);
});