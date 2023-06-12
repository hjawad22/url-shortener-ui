import React, { Component } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      errorMessage: ''
    }
  }

  componentDidMount() {
  getUrls()
      .then(urlData => {
        this.setState({
         urls: urlData.urls,
        });
      })
      .catch(error => {
        this.setState({
          errorMessage: error.message
        })
      })
    }
  
    addUrl = (newUrl) => {
      fetch("http://localhost:3001/api/v1/urls", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUrl)
      })
        .then(res => {
          if (!res.ok) {
            throw new Error("Failed to add URL. Please try again.");
          }
          return res.json();
        })
        .then(url => {
          this.setState({ urls: [...this.state.urls, url], errorMessage: "" });
        })
        .catch(error => {
          this.setState({
            errorMessage: error.message
          });
        });
    }

  render() {
    console.log(this.state.urls)
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm addUrl= {this.addUrl}/>
        </header>

        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}


export default App;
