import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import Media, { MediaOverlay } from 'react-md/lib/Media';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardText from 'react-md/lib/Cards/CardText';
import './book-detail.scss';

class BookDetail extends PureComponent {
  render() {

    const {volumeInfo} = this.props.detailData;
    console.log(this.props.detailData);
    return (
      <div className="book-detail">
        <Button className="close-btn" icon onClick={() => this.props.closeDrawer()}>close</Button>
        <div className="">
          <Media aspectRatio="1-1" key="media">
            <img src={volumeInfo.imageLinks.large} role="presentation" />
            <MediaOverlay>
              <CardTitle
                title={volumeInfo.title}
                subtitle={volumeInfo.authors[0]}
                />
            </MediaOverlay>
          </Media>
          <CardText>
            <h3>Sinopse</h3>
            {volumeInfo.description}
          </CardText>
        </div>
      </div>
    );
  }
}

export default BookDetail;