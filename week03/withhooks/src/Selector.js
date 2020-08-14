import React, { useState } from 'react';
import TemperatureConverter from './TemperatureConverter';
import DistanceConverter from './DistanceConverter';

const TEMPERATURE = 'Temperature';
const DISTANCE = 'Distance';

// A "tabbed" switcher between temperature and distance conversion
function Selector() {

    // Initally show the temperature tab
    let [ show, setShow ] = useState(TEMPERATURE);

    // Switch between tabs
    let converter;
    if (show === TEMPERATURE)
        converter = <TemperatureConverter/>;
    else
        converter = <DistanceConverter/>;

    return (
        <div>
            <h1>Imperial to Metric Converter</h1>
            <div>
                <button onClick={() => setShow(TEMPERATURE)}>{TEMPERATURE}</button>
                <button onClick={() => setShow(DISTANCE)}>{DISTANCE}</button>
            </div>
            { converter }
        </div>
    );
}

export default Selector;
