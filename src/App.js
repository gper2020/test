import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import {actionFetchBands, actionToggleAll, actionToggleAlbum} from './redux/actions';
import Album from './components/Album/Album';
import './css/app.css';

class App extends Component {

  componentDidMount() {
    this.props.actionFetchBands();
  }

  render() {
    const albumsArray = [];
    for(let band of this.props.bands) {
        for(let album of band.albums) {
            const albumPanelName = `${band.name}-${album.name}`;
            const isAlbumExpanded = this.props.albumPanels.find(albumItem => albumItem.name === albumPanelName).isExpanded;
            albumsArray.push(<Album 
                                key={`${band.name}${album.name}`}
                                bandName={band.name} 
                                album={album} 
                                isExpanded={isAlbumExpanded}
                                onToggledCallbackFn={() => this.props.actionToggleAlbum(albumPanelName)}
                              />);
        }
    }

    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Button onClick={this.props.actionToggleAll} bsStyle="primary" style={{ marginTop: "1em"}}>
              Albums <Glyphicon glyph={this.props.shouldExpandAll? "chevron-down" : "chevron-right"}/> 
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div id="albumsContainer">
              {albumsArray}  
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
    bands: state.bands.bandsList,
    albumPanels: state.bands.albumPanels,
    shouldExpandAll: state.bands.shouldExpandAll
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({actionFetchBands, actionToggleAll, actionToggleAlbum}, dispatch);
} 

export default connect(mapStateToProps, mapDispatchToProps)(App);
