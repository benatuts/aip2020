import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { count: '' };
  }

  async componentDidMount() {
    let result = await fetch('/api/count');
    let json = await result.json();
    this.setState({ count: json.count });
  }

  async increment() {
    let result = await fetch('/api/increment', { method: 'POST' });
    let json = await result.json();
    this.setState({ count: json.count });
  }

  render() {
    return (
      <>
        <h1>Counter</h1>
        <p>Current count: { this.state.count }</p>
        <p><button onClick={() => this.increment()}>+1</button></p>
      </>
    );
  }
}

export default App;
