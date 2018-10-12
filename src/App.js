import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import './app.style';
import Repo from './components/repo/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', repos: [], errorMessage: '' };
  }
  handleChange = (event) => {
    this.setState({ username: event.target.value }, () => {
      this.getRepos();
    });
  }

  getRepos = debounce((e) => {
    const repoUrl = `https://api.github.com/users/${this.state.username}/repos`;
    axios.get(repoUrl).then((responses) => {
      const repos = responses.data.map(({ name, language, html_url, created_at, description }) => {
        return { name, language, html_url, created_at, description };
      })
      this.setState({ repos });
    }).catch(error => {
      console.log(`inside getrepos error: ${error}`)
      this.setState({
        errorMessage: error.response.statusText
      })
    })
  }, 1000)

  displayRepos() {
    return this.state.repos.map(repo => <Repo key={repo.name} repo={repo} />);
  }

  render() {
    const RepoStyle = styled.ul`
      list-style-type: none;
      margin: 0;
      padding: 20px;

      >li {
        padding: 10px 0;
      }

      > li + li {
        border-top: 1px solid #ddd;
    }`;

    const InputGroup = styled.div`
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
    `;

    const Input = styled.input`     
      width: 70%;
      height: 34px;
      padding: 10px 10px;
      box-sizing: border-box;
    `;

    const Button = styled.button`
      font-size: 1rem;
      background-color: #87bdd8;
      padding: 2px 10px;
      font-weight: 400;
      height: 34px;
      border: 1px solid #87bdd8;
      `;

    return (
      <React.Fragment>
        <InputGroup>
          <Input value={this.state.username}
            placeholder="Enter your github username"
            onChange={this.handleChange}>
          </Input>
          <Button onClick={this.getRepos}> Get repos</Button>
        </InputGroup>
        {this.state.repos.length > 0 && <RepoStyle>{this.displayRepos()}</RepoStyle>}
        {(this.state.repos.length === 0) && <div>{this.state.errorMessage}</div>}
      </React.Fragment >
    );
  }
}

export default App;
