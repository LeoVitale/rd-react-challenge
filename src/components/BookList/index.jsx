import React, { Component, PropTypes } from 'react';


import Book from '../Book';

class BookList extends Component {
  constructor(props) {
    super(props);
  }

  renderBookItem = (book, index) => {
    return (
      <Book key={book.id} book={book} index={index} />
    );
  }

  render() {
    const books = this.props.books;
    return (
      <div className="result-container md-grid">
        
        <h2>{this.props.title}</h2>
        <h4>{this.props.totalItems} resultados</h4>
        <div className="md-grid">
          {books.map((book, index) => {
            return this.renderBookItem(book, index);
          })}
        </div>
      </div>
    );
  }
}

BookList.propTypes = {

};

export default BookList;