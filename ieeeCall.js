const ieee = require('axios');

const listEvents = async () => {
    try {
        const res = await ieee.get('https://ieeeutd.org/api/events');
        console.log(res.data.dates);
    } catch (err) {
        console.error(err);
    }
};

listEvents();

module.exports.listEvents = function() {
    console.log("ieeeCall.js addedd successfully");
};

