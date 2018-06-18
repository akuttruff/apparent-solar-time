Apparent-Solar-Time
-------------------

This application calculates solar data for a specific location and time range. It leverages the [Google Maps API](https://developers.google.com/maps/documentation/javascript/get-api-key) and the [Sunrise-Sunset API](https://sunrise-sunset.org/api). 

In order to run an instance of this demo application, you'll need to generate your own API keys, and export them from a `~/config.js` file:  

```
const geocodeApiKey = 'YOUR_OWN_GEOCODE_KEY';
const timezoneApiKey = 'YOUR_OWN_TIMEZONE_KEY';

export { geocodeApiKey, timezoneApiKey };
```

## Installation

To install the dependencies needed in this app, make sure you have Node.js and a JavaScript package manager installed on your machine. I used npm, but you could also use yarn:
 
```
npm install 
```
To run the app locally, start the node server with the following command, open your browser, and navigate to `localhost:3000`:

```
npm start
```

To run the accompanying test suite:

```
npm test
```