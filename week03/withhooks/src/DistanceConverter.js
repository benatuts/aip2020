import React, { useState } from 'react';

// Converts Miles to Kilometers when the user clicks "Convert"
function DistanceConverter() {

    // Initially use a distance of 0
    let [ miles, setMiles ] = useState('0');
    let [ kilometers, setKilometers ] = useState('');

    // Convert the current value of miles to kilometers
    // Invalid values for miles will be treated as NaN
    const convert = () => {
        let kilometers = parseFloat(miles) * 1.609344;
        setKilometers(kilometers);
    }

    return (
        <div>
            <p>
                <label>Miles:
                    <input type="text" value={miles} onChange={(e) => setMiles(e.target.value)}/>
                </label>
            </p>
            <p>
                <button onClick={convert}>Convert</button>
            </p>
            <p>
                <label>Kilometers:
                    <input type="text" value={kilometers} readOnly/>
                </label>
            </p>
        </div>
    );
}

export default DistanceConverter;
