const { Worker } = require('worker_threads');

const config = require("./config.json");
const array = require('./proxy.json');

const streams = config.streams;
const size = array.length / streams;
const subarray = [];

for (let i = 0; i < Math.ceil(array.length / size); i++) {
    subarray.push(array.slice((i * size), (i * size) + size));
}

for (let i = 1; i < streams + 1; i++) {
    new Worker(`./streams/streams.js`, {
        workerData: {
            link: config.link,
            array: subarray[i - 1],
            stream: i
        }
    });
}

