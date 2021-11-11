// fetch LastFM api
let listenersArr = [];

const getData = () => fetch('http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=netherlands&api_key=7ebc4d450f175fa75d3260763df487fb&format=json')
    .then(response => response.json())
    .then(function callData(data) {
        let getData = data.topartists.artist;
        let showArtists = getData.map((data) => data);
        showArtists.map(artist => {
            const listeners = artist.listeners;
            if (typeof listeners === 'string') {
                listenersArr.push(listeners);
            }
        });
        return cleanData(listenersArr)
    })
    .catch((error) => {
        console.log(error)
    });

// sort all values
function cleanData(listenersArr) {
    let StrToNum = listenersArr.map((i) => Number(i));
    StrToNum = StrToNum.sort((a, b) => b - a);
    StrToNum = Object.values(StrToNum);
    return StrToNum;
}
async function returnData() {
    let data = await getData()
    data = cleanData(data);
    return data;
}

export default returnData;