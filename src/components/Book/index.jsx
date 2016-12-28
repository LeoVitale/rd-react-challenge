import React, {Component, PropTypes} from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardText from 'react-md/lib/Cards/CardText';
import Media, { MediaOverlay } from 'react-md/lib/Media';
import Button from 'react-md/lib/Buttons';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';

import './book.scss';

class Book extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    
    const {id, volumeInfo} = this.props.book;
    const image = `https://books.google.com/books/content/images/frontcover/${id}?fife=w350-rw`;

    return (
      <div key={id} className="md-cell md-cell--2-desktop md-cell--2-tablet md-cell--12-phone">
        <Card className="book md-block-centered">
          <Media aspectRatio="1-1" className="oppp">
            <img src={image} role="presentation" />
            
            <MediaOverlay>
              <Checkbox
                  id="favorite"
                  name="favorite"
                  className="md-cell--right"
                  checkedIconChildren="favorite"
                  uncheckedIconChildren="favorite_border"
                  value="favorite"
                  />
            </MediaOverlay>
            
          </Media>
          <CardTitle title={volumeInfo.title} subtitle={volumeInfo.title} />

        </Card>
      </div>
    );
  }
}

Book.propTypes = {

};

export default Book;