import './sass/index.scss';
import React, {Component} from 'react';
import WebFontLoader from 'webfontloader';
import api from './api/books.js';
import BookList from './components/BookList';

import { Card, CardTitle, CardText, CardActions } from 'react-md/lib/Cards';
import Button from 'react-md/lib/Buttons';

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
    books:[]
  };

  componentDidMount() {
    api.getBooks('tolkien').then((response) => {
      this.setState({books:response.data.items});
    });
  }

  renderBooks = () => {
    if (this.state.books.length > 0) {
      return (
        <BookList books={this.state.books} />
      )
    }
    return (
      <div>loading</div>
    )
  }
  
  render() {

    return (
      <div className="md-grid">
        {this.renderBooks()}
      </div>
    )
  }
}

export default App;

