import './sass/index.scss';
import React, {Component} from 'react';
import WebFontLoader from 'webfontloader';

import { Card, CardTitle, CardText, CardActions } from 'react-md/lib/Cards';
import Button from 'react-md/lib/Buttons';

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

class App extends Component {
  render() {
    return (
      <div className="md-grid">
        <Card className="md-cell">
          <CardTitle title="Hello, World!"  />
          <CardText>
            Lorem ipsum... pretend more ...
          </CardText>
          <CardActions>
            <Button flat label="Action 1" />
            <Button flat label="Action 2" />
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default App;