const ieee = require('axios');



module.exports.listEvents = async () => {

    try {
        const response = await ieee.get('https://ieeeutd.org/api/events');
        console.log(response.data.dates[0].events);
        // don't do dates[0] because that's for one random day
        // instead loook at the current day use the built in Date library
        // format everything here and send back or format in index
        return JSON.stringify(response.data.dates[0].events);
    } catch (err) {
        console.error(err);
    }
};



// const listEvents = async () => {
//     try {
//         const response = await ieee.get('https://ieeeutd.org/api/events');
//         console.log(response.data.dates);
//     } catch (err) {
//         console.error(err);
//     }
// };

// listEvents();


