const { Worker } = require('worker_threads');
const fs = require('fs');

const config = require("./config.json");

const streams = config.streams

for (let i = 2; i < streams + 1; i++) {
    fs.copyFile('./streams/1.js', `./streams/${i}.js`, err => {
        if (err) throw err; 
    });
}

const array = require('./proxy.json');

const size = array.length / streams;
const subarray = [];

for (let i = 0; i < Math.ceil(array.length / size); i++) {
    subarray[i] = array.slice((i * size), (i * size) + size);
}

for (let i = 1; i < streams + 1; i++) {
    new Worker(`./streams/${i}.js`, {
        workerData: {
            link: config.link,
            array: subarray[i - 1]
        }
    })
}
