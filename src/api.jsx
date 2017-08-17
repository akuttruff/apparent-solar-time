import $ from 'jquery';
import { apiKey } from '../config.js';

const fetchLocation = (address) => {
    $.ajax({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`,
        type: 'GET',
        success: function(res) {
            // const coordinates = res[0].geometry;
            // this.setState({ location: coordinates });
            console.log(res);
        }.bind(this)
    });
};

export default fetchLocation;

