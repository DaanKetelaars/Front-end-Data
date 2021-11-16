// fetch LastFM api
let listenersArr = [];
let artistArr = [];
const getData = () => fetch('http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=netherlands&api_key=7ebc4d450f175fa75d3260763df487fb&format=json')
    .then(response => response.json())
    .then(function callData(data) {
        let getData = data.topartists.artist;
        let showArtists = getData.map((data) => data);
        showArtists.map(artist => {
            const listeners = artist.listeners;
            const artistName = artist.name;
            if (typeof listeners === 'string' || typeof artistName === 'string') {
                listenersArr.push(listeners);
                artistArr.push(artistName);
            }
        });
        cleanData(showArtists);
        console.log(showArtists);
    })
    .catch((error) => {
        console.log(error)
    });

function cleanData(showArtists) {
    // combine values to 1 array
    let combinedArr = showArtists;
    console.log(combinedArr);
    // combinedArr = artistArr.map((artist, index) => {
    //     return {
    //         artist: artist,
    //         listeners: listenersArr[index],
    //     }
    // });
    // console.log(combinedArr);
    // let selectNum = combinedArr.map((x) => {
    //     return x.listeners = +x.listeners;
    // });
    // combinedArr.sort((a, b) => a.listeners - b.listeners);

}

// async function returnData() {
//     let data = await getData()
//     data = cleanData(data);
//     return data;
// }

export default returnData;