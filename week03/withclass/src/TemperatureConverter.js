import React from 'react';

// Converts Fahrenheit to Celsius when the user clicks "Convert"
class TemperatureConverter extends React.Component {
    constructor(props) {
        super(props);
        // Initially use a temperature of 0
        this.state = { fahrenheit: '0', celsius: '' };
    }


    // Convert the current value of Fahrenheit to Celsius
    // Invalid values for Fahrenheit will be treated as NaN
    convert() {
        let celsius = (parseFloat(this.state.fahrenheit) - 32) * 5 / 9;
        this.setState({celsius});
    }

    render() {
        return (
            <div>
                <p>
                    <label>Fahrenheit:
                        <input type="text" value={this.state.fahrenheit} onChange={(e) => this.setState({fahrenheit: e.target.value})}/>
                    </label>
                </p>
                <p>
                    <button onClick={() => this.convert()}>Convert</button>
                </p>
                <p>
                    <label>Celsius:
                        <input type="text" value={this.state.celsius} readOnly/>
                    </label>
                </p>
            </div>
        );
    }
}

export default TemperatureConverter;
