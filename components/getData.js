// const getData = () => fetch('http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=netherlands&api_key=7ebc4d450f175fa75d3260763df487fb&format=json')
//     .then(response => response.json())
//     .then(function callData(data) {
//         console.log(data);
//         return data;
//     })
//     .catch((error) => {
//         console.log(error)
//     });

// console.log(data);

const getData = fetch("http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=netherlands&api_key=7ebc4d450f175fa75d3260763df487fb&format=json")
    .then((response) => response.json())
    .then((data) => {
        return data;
    });

function test(data) {
    console.log(data);
}

// const getData = async () => {
//     try {
//         const response = await fetch('http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=netherlands&api_key=7ebc4d450f175fa75d3260763df487fb&format=json');
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.log(error)
//     }
// }

export default getData;