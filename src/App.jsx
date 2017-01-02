import React, { PureComponent } from 'react';
import './sass/index.scss';
import WebFontLoader from 'webfontloader';
import api from './api/books.js';
import BooksList from './components/BooksList';
import BookDetail from './components/BookDetail';
import Toolbar from 'react-md/lib/Toolbars';
import Button from 'react-md/lib/Buttons/Button';
import TextField from 'react-md/lib/TextFields';
import Drawer from 'react-md/lib/Drawers';
import base from './api/base';

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  }
});

class App extends PureComponent {

  constructor(props) {
    super(props);
    this.visibilityCount = 0;
  }

  state = {
    totalItems: 0,
    books: [],
    title: '',
    favorites: {},
    visible: false,
    bookDetail: null,
    offset: 0,
    limit: 40,
    term: 'tolkien'
  };

  componentWillMount() {
    this.ref = base.syncState('favorites',
      {
        context: this,
        state: 'favorites'
      });
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    const {term, limit, offset} = this.state;
    api.getBooks(term, offset, limit).then((response) => {
      if (response.data) {
        this.setState({ totalItems: response.data.totalItems, books: response.data.items, title: term });
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  addFavorites = (book) => {
    const favorites = { ...this.state.favorites };
    favorites[book.id] = book;
    this.setState({ favorites });
  }

  removeFavorites = (book) => {
    const favorites = { ...this.state.favorites };
    favorites[book.id] = null;
    this.setState({ favorites });
  }

  renderBooks = () => {
    if (this.state.books.length > 0) {
      return (
        <BooksList
          totalItems={this.state.totalItems}
          title={this.state.title}
          books={this.state.books}
          favoriteList={this.state.favorites}
          addFavorites={this.addFavorites}
          removeFavorites={this.removeFavorites}
          getDetail={this.getDetail} />
      )
    }
    return (
      <div>loading</div>
    )
  }

  textSearch = (event) => {
    if (event.keyCode === 13) {
      let term = event.target.value;
      api.getBooks(term, 0, this.state.limit).then((response) => {
        if (response.data) {
          console.log(response.data);
          this.setState({
            totalItems: response.data.totalItems,
            books: response.data.items,
            title: term,
            term: term
          });
        }
      }).catch(function (error) {
        return error;
      });
    }
  }

  loadMoreBooks = () => {
    const {term, limit, offset} = this.state;
    let newOffset = offset + limit;
    let newBooks;
    api.getBooks(term, newOffset, limit).then((response) => {
      if (response.data) {
        console.log(response.data);
        newBooks = this.state.books.concat(response.data.items);
        this.setState({
          books: newBooks,
          title: term,
          term: term,
          offset: newOffset
        });
      }
    }).catch(function (error) {
      return error;
    });
  }

  getDetail = (id) => {
    api.getDetailBook(id).then((response) => {
      if (response.data) {
        this.setState({ bookDetail: response.data });
        this.openSideDisplay();
      }
    }).catch(function (error) {
      return error;
    });
  }

  closeDrawer = () => {
    this.setState({ visible: false });
  }

  openSideDisplay = () => {
    this.setState({ visible: true });
  }

  handleScroll = () => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight && docHeight !== 0) {
      this.loadMoreBooks();
    }
  }

  render() {
    const { visible } = this.state;
    console.log(visible);
    let nav = <Button icon>menu</Button>;
    let title = 'Search Books';
    let actions = <Button icon>search</Button>;
    let bookDetail;
    let children = (
      <TextField
        className="search-box md-title--toolbar"
        placeholder="Search"
        onKeyDown={this.textSearch}
        block />
    );

    if (this.state.bookDetail) {
      bookDetail = <BookDetail detailData={this.state.bookDetail} closeDrawer={this.closeDrawer} />;
    }

    return (
      <div className="app" style={{ overflow: 'hidden' }}>
        <Toolbar
          colored
          fixed
          nav={nav}
          actions={actions}
          title={title}>
          {children}
        </Toolbar>
        <Drawer
          position="right"
          defaultVisible={false}
          visible={visible}
          style={{ maxWidth: 450, width: '100%', overflow: 'auto' }}
          >
          {bookDetail}
        </Drawer>
        {this.renderBooks()}
      </div>

    )
  }
}

export default App;

