import React, {PureComponent, PropTypes} from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import Media, { MediaOverlay } from 'react-md/lib/Media';
import Button from 'react-md/lib/Buttons';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';

import './book.scss';

class Book extends PureComponent {
  constructor(props) {
    super(props);

  }

  checkedFavorite = (checked) => {
    const book = {
      id: this.props.book.id,
      title: this.props.book.volumeInfo.title
    }
    if(checked) {
      this.props.addFavorites(book);
    }else{
      this.props.removeFavorites(book);
    }
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
                  checked={this.props.favorite}
                  onChange={this.checkedFavorite}
                  />
            </MediaOverlay>
            
          </Media>
          <CardTitle title={volumeInfo.title} subtitle={volumeInfo.title} />
          <Button className="invisible-btn" flat onClick={() => this.props.getDetail(id)} />

        </Card>
      </div>
    );
  }
}

export default Book;