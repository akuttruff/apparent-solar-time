import React from 'react';

function AddressForm({ address, handleChange }) {
    return (
        <div className="address">
            <div className="header">Calculate Apparent Solar Time</div>
            <label>
                1. Enter an address as close as possible to the desired area
            </label>
            <input type="text" value={address} onChange={handleChange}/>
            <span className="example-text">
                                Example: 2206 N Skidmore Ct, Portland, OR 97217
                            </span>
            <label>
                2. Enter a date range of up to 14 days
            </label>
        </div>
    )
}

export default AddressForm;