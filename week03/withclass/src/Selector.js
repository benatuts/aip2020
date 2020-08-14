import React from 'react';
import TemperatureConverter from './TemperatureConverter';
import DistanceConverter from './DistanceConverter';

const TEMPERATURE = 'Temperature';
const DISTANCE = 'Distance';

// A "tabbed" switcher between temperature and distance conversion
class Selector extends React.Component {

    constructor(props) {
        super(props);
        
        // Initally show the temperature tab
        this.state = { show: TEMPERATURE };
    }

    render() {
        // Switch between tabs based on the state.show
        let converter;
        if (this.state.show === TEMPERATURE)
            converter = <TemperatureConverter/>;
        else
            converter = <DistanceConverter/>;

        return (
            <div>
                <h1>Imperial to Metric Converter</h1>
                <div>
                    <button onClick={() => this.setState({show: TEMPERATURE})}>{TEMPERATURE}</button>
                    <button onClick={() => this.setState({show: DISTANCE})}>{DISTANCE}</button>
                </div>
                { converter }
            </div>
        );
    }
}

export default Selector;
