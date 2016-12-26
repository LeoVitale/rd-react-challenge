import React, { Component, PropTypes } from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import CardText from 'react-md/lib/Cards/CardText';
import Media, { MediaOverlay } from 'react-md/lib/Media';
import Avatar from 'react-md/lib/Avatars';
import Button from 'react-md/lib/Buttons';

class BookList extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const books = this.props.books;
    return (
      <div>
        {books.map((book, index) => {
          const image = `https://books.google.com/books/content/images/frontcover/${book.id}?fife=w250-rw`;
          return (
            <div key={book.id}>
              <Card style={{ maxWidth: 400 }} className="md-block-centered">
                <Media aspectRatio="4-3">
                  <img src={image} role="presentation" />
                  <MediaOverlay>
                    <CardTitle title={book.volumeInfo.title} subtitle="Wow!">
                      <Button className="md-cell--right" icon>star_outline</Button>
                    </CardTitle>
                  </MediaOverlay>
                </Media>
                <CardTitle
                  title={book.volumeInfo.title}
                  subtitle="Card Subtitle"
                  />
                <CardActions expander>
                  <Button flat label="Action 1" />
                  <Button flat label="Action 2" />
                </CardActions>
                <CardText expandable>
                  
                </CardText>
              </Card>
            </div>
          )
        })}

      </div>
    );
  }
}

BookList.propTypes = {

};

export default BookList;