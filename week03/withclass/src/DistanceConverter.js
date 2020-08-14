import React from 'react';

// Converts Miles to Kilometers when the user clicks "Convert"
class DistanceConverter extends React.Component {
    constructor(props) {
        super(props);
        
        // Initially use a distance of 0
        this.state = { miles: '0', kilometers: '' };
    }

    // Convert the current value of miles to kilometers
    // Invalid values for miles will be treated as NaN
    convert() {
        let kilometers = parseFloat(this.state.miles) * 1.609344;
        this.setState({kilometers});
    }

    render() {
        return (
            <div>
                <p>
                    <label>Miles:
                        <input type="text" value={this.state.miles} onChange={(e) => this.setState({miles: e.target.value})}/>
                    </label>
                </p>
                <p>
                    <button onClick={() => this.convert()}>Convert</button>
                </p>
                <p>
                    <label>Kilometers:
                        <input type="text" value={this.state.kilometers} readOnly/>
                    </label>
                </p>
            </div>
        );
    }
}

export default DistanceConverter;
