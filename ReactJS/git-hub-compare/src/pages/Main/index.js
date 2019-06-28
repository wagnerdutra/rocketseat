import React, { Component } from 'react';
import moment from 'moment';
import api from '../../services/api';
import { Container, Form } from './style';

import logo from '../../assets/logo.png';

import CompareList from '../../components/CompareList';

export default class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    respositoryInput: '',
    repositories: [],
  };

  handleAddRepository = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    const { respositoryInput } = this.state;

    try {
      const { data: repository } = await api.get(`repos/${respositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState(state => ({
        respositoryInput: '',
        repositories: [...state.repositories, repository],
        repositoryError: false,
      }));
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      repositories, respositoryInput, repositoryError, loading,
    } = this.state;
    return (
      <Container>
        <img src={logo} alt="Github Compare" />
        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={respositoryInput}
            onChange={e => this.setState({ respositoryInput: e.target.value })}
          />
          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
        </Form>
        {repositories.length > 0 && <CompareList repositorires={repositories} />}
      </Container>
    );
  }
}
