// // import data
import returnData from './components/data.js'
import createGraph from './components/createGraph.js'

returnData()
    .then(data => {
        createGraph(data)
    });