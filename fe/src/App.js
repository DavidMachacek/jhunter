
import React, { Component } from 'react';
import React, { Component } from 'react';

class App extends Component {

    state = {
        contacts: []
    }
    componentDidMount() {
        fetch('http://localhost:8080/api')
            .then(res => res.json())
            .then((data) => {
                this.setState({ contacts: data })
            })
            .catch(console.log)
    }
}

function App() {
  return (
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Steve Jobs</h5>
          <h6 class="card-subtitle mb-2 text-muted">steve@apple.com</h6>
          <p class="card-text">Stay Hungry, Stay Foolish</p>
        </div>
      </div>
  );
}

export default App;
