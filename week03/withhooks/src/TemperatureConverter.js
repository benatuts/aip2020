import React, { useState } from 'react';

// Converts Fahrenheit to Celsius when the user clicks "Convert"
function TemperatureConverter() {
    // Initially use a temperature of 0
    let [ fahrenheit, setFahrenheit ] = useState('0');
    let [ celsius, setCelsius ] = useState('');

    // Convert the current value of Fahrenheit to Celsius
    // Invalid values for Fahrenheit will be treated as NaN
    const convert = () => {
        let celsius = (parseFloat(fahrenheit) - 32) * 5 / 9;
        setCelsius(String(celsius));
    };

    return (
        <div>
            <p>
                <label>Fahrenheit:
                    <input type="text" value={fahrenheit} onChange={(e) => setFahrenheit(e.target.value)}/>
                </label>
            </p>
            <p>
                <button onClick={convert}>Convert</button>
            </p>
            <p>
                <label>Celsius:
                    <input type="text" value={celsius} readOnly/>
                </label>
            </p>
        </div>
    );
}

export default TemperatureConverter;
