import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { Searchbar } from './index';
import { searchImages } from 'services/pixabay-api';

export class App extends Component {
  state = {
    status: 'idle',
    query: '',
    images: [],
    activeImage: null,
    page: 1,
    totalPages: 1,
  };

  handleSearchQuery = query => {
    this.setState({
      query,
      page: 1,
      images: [],
      totalPages: 1,
      status: 'idle',
    });
  };

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSearch={this.handleSearchQuery} />
        <ToastContainer theme="colored" autoClose={3000} />
      </div>
    );
  }
}
