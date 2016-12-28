import './sass/index.scss';
import React, { Component } from 'react';
import WebFontLoader from 'webfontloader';
import api from './api/books.js';
import BookList from './components/BookList';
import Toolbar from 'react-md/lib/Toolbars';
import Button from 'react-md/lib/Buttons/Button';
import TextField from 'react-md/lib/TextFields';
import FontIcon from 'react-md/lib/FontIcons';

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  }
});

class App extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    totalItems: 0,
    books: [],
    title: 'Resultados Digitais'
  };

  componentDidMount() {
    api.getBooks('tolkien').then((response) => {
      if (response.data) {
        this.setState({ totalItems: response.data.totalItems, books: response.data.items, title: 'tolkien' });
      }
    });
  }

  renderBooks = () => {
    if (this.state.books.length > 0) {
      return (
        <BookList totalItems={this.state.totalItems} title={this.state.title} books={this.state.books} />
      )
    }
    return (
      <div>loading</div>
    )
  }

  newSearch = () => {
    api.getBooks('harry potter').then((response) => {
      this.setState({ books: response.data.items });
    });
  }

  textSearch = (event) => {
    if (event.keyCode === 13) {
      let value = event.target.value;
      api.getBooks(event.target.value).then((response) => {
        console.log(response);
        if (response.data) {
          this.setState({ totalItems: response.data.totalItems, books: response.data.items, title: value });
        }
      }).catch(function (error) {
        console.log('fodeo');
        //return error;
      });
    }
  }

  render() {
    let nav = <Button icon>menu</Button>;
    let title = 'RD Search Books';
    let actions = <Button onClick={this.newSearch} icon>search</Button>;
    let children = (
      <TextField
        className="search-box md-title--toolbar"
        placeholder="Search"
        onKeyDown={this.textSearch}
        block />
    );

    return (
      <div className="app">
        <Toolbar
          colored
          fixed
          nav={nav}
          actions={actions}
          title={title}>
          {children}
        </Toolbar>



        {this.renderBooks()}

      </div>

    )
  }
}

export default App;

