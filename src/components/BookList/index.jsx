import React, { PureComponent, PropTypes } from 'react';
import Book from '../Book';

const favoriteList = ['XsJ645BbokAC', 'M7IQ4jTC0esC'];

class BookList extends PureComponent {
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
      removeFavorites={this.props.removeFavorites} />
    )
  }

  render() {
    const {books} = this.props;
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