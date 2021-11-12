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
        const combinedArr = artistArr.map((artist, index) => {
            return {
                artist: artist,
                listeners: listenersArr[index],
            }
        });
        const newCombinedArr = combinedArr.map(item => {
            const group = {};
            item.listeners = +item.listeners;
            group[item.artist] = item.listeners;
            return group;
        })
        cleanData(newCombinedArr)
        console.log(newCombinedArr)
    })
    .catch((error) => {
        console.log(error)
    });

// sort all values
function cleanData(newCombinedArr) {
    let sortData = newCombinedArr;
    sortData = sortData.sort((a, b) => b - a);
    return sortData;
}
async function returnData() {
    let data = await getData()
    data = cleanData(data);
    return data;
}

export default returnData;