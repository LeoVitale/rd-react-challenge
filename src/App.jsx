import './sass/index.scss';
import React, { Component } from 'react';
import WebFontLoader from 'webfontloader';
import api from './api/books.js';
import BookList from './components/BookList';
import Toolbar from 'react-md/lib/Toolbars';
import Button from 'react-md/lib/Buttons/Button';
import TextField from 'react-md/lib/TextFields';
import FontIcon from 'react-md/lib/FontIcons';
import base from './api/base';

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
    title: 'Resultados Digitais',
    favorites: {}
  };

  
  componentWillMount() {
    this.ref = base.syncState('favorites', 
    {
      context: this,
      state: 'favorites'
    });
  }
  
  componentDidMount() {
    api.getBooks('tolkien').then((response) => {
      if (response.data) {
        this.setState({ totalItems: response.data.totalItems, books: response.data.items, title: 'tolkien' });
      }
    });
  }

  addFavorites = (book) => {

    const favorites = {...this.state.favorites};
    favorites[book.id] = book;
    this.setState({ favorites });
  }

  removeFavorites = (book) => {
    
    const favorites = {...this.state.favorites };
    favorites[book.id] = null;

    this.setState({ favorites });
    
  }

  renderBooks = () => {
    if (this.state.books.length > 0) {
      return (
        <BookList 
        totalItems={this.state.totalItems} 
        title={this.state.title} 
        books={this.state.books}
        favoriteList={this.state.favorites}
        addFavorites={this.addFavorites}
        removeFavorites={this.removeFavorites}/>
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
        return error;
      });
    }
  }

  render() {
    let nav = <Button icon>menu</Button>;
    let title = 'Search Books';
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

