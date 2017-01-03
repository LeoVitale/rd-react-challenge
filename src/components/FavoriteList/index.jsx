import React, {PureComponent} from 'react';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import Button from 'react-md/lib/Buttons/Button';
import FontIcon from 'react-md/lib/FontIcons';
import Avatar from 'react-md/lib/Avatars';

import './favorite-list.scss';

class FavoriteList extends PureComponent {


  renderFavorites = (key) => {
    const favorites = this.props.favorites;
    const image = `https://books.google.com/books/content/images/frontcover/${favorites[key].id}?fife=w350-rw`;
    
    return (<ListItem key={key}
        leftAvatar={<Avatar src={image} role="presentation" />}
        rightIcon={<FontIcon onClick={() => this.props.removeFavorites(favorites[key])}>delete</FontIcon>}
        primaryText={favorites[key].title}
      />);
  }

  render() {
    const favorites = this.props.favorites;
    const arrFavorites = Object.keys(favorites).map(this.renderFavorites);

    return (
      <div className="md-grid">
        <List className="md-cell md-paper md-paper--0">
          {Object.keys(favorites).map(this.renderFavorites)}
        </List>
      </div>
    );
  }
}

export default FavoriteList;