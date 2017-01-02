import React, { PureComponent, PropTypes } from 'react';
import Book from '../Book';
import './books-list.scss';

const favoriteList = ['XsJ645BbokAC', 'M7IQ4jTC0esC'];

class BooksList extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderBookItem = (book, index) => {
    let favorite = this.props.favoriteList[book.id] !== undefined ? true : false;
    
    return (
      <Book 
      key={book.id} 
      book={book} 
      index={index} 
      favorite={favorite} 
      addFavorites={this.props.addFavorites}
      removeFavorites={this.props.removeFavorites}
      getDetail={this.props.getDetail}
      />
    )
  }

  render() {
    const {books} = this.props;
    return (
      <div className="books-list md-grid">
        <div className="md-grid">
          <div className="md-cell term-results-container">
            <h2 className="term-results">{this.props.title}</h2>
            <p>{this.props.totalItems} resultados</p>
          </div>
        </div>
        
        <div className="md-grid">
          {books.map((book, index) => {
            return this.renderBookItem(book, index);
          })}
        </div>
      </div>
    );
  }
}

export default BooksList;