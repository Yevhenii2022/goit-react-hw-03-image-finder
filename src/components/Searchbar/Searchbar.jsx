import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  };

  handleSubmit = event => {
    event.preventDefault();

    const { query } = this.state;
    const normilizedQuery = query.toLocaleLowerCase().trim();

    this.props.onSearch(normilizedQuery);
    this.setState({ query: normilizedQuery });

    if (!normilizedQuery) {
      toast.warning('Please, enter your search query.');
    }
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { query } = this.state;
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            name="query"
            value={query}
            onChange={this.handleInputChange}
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}
