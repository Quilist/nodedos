
const { workerData } = require("worker_threads")

const fetch = require('node-fetch');

const HttpsProxyAgent = require('https-proxy-agent');

const link = workerData.link;

const order = Number(__filename.slice(__dirname.length + 1, -3));

let subarray = workerData.array

const platf = ["Android", "Chrome OS", "iOS", "Linux", "macOS", "Windows", "Unknown"]

const param = {
    n: 0,
    i: 0,
    proxyAgent: new HttpsProxyAgent(subarray[0])
}

setInterval(() => {

    fetch(link, {
        "agent": param.proxyAgent,
        "headers": {
            "sec-ch-ua-platform": platf[Math.floor(Math.random() * 7)]
        }
    }
    ).then(res => res.text()).then(res => {
        param.n++
        console.log(`Успех! ${order} ${param.n}`);
    }).catch(err => {
        let lastI = param.i
        param.i++

        if (param.i > subarray.length - 1) param.i = 0;

        param.proxyAgent = new HttpsProxyAgent(subarray[param.i]);
        console.log(`Смена прокси! ${order} (старый ${subarray[lastI]} новый ${subarray[param.i]})`);
    });

}, 20);
