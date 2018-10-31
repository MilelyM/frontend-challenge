import React, { Component } from 'react';
import './App.css';
import {  Row } from 'react-materialize';
import InfiniteScroll from 'react-infinite-scroller';
class App extends Component {
  constructor() {
    super();
    this.state = {
      pictures: [],
    };
    this.verimagen = this.verimagen.bind(this);
    this.loadFunc = this.loadFunc.bind(this);
  }

  loadFunc() {
    console.log('cargar mas');
    

  }
  

  verimagen(data) {
    // console.log(data);
    fetch(data.urlget)
      .then(function (response) {
        return response.json();
      }).then(data => {
        // console.log('Fectch:', data);
        let datos = data.photo;
        let dates = datos.dates;
        let taken = dates.taken;
        //  console.log(datos)
        let owner= datos.owner;
        let owner2= owner.username;
        let title= datos.title._content;
        let tagss = datos.tags.tag
          let tagAll= tagss.length;
        //  console.log(tagAll)
       window.Materialize.toast(
         " USERNAME : " + owner2 +
          " TITLE : " + title +
           " TAKEN : " + taken + 
           " TAG : " + tagAll
           , 5000);

      })
  }

  componentDidMount() {
    fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=f63db179912eb2f803402be03918f60a&tags=dog&format=json&nojsoncallback=1&per_page=20')
      .then(function (response) {
        return response.json();
      })
      .then(function (j) {
        let picArray = j.photos.photo.map((pic, index) => {
          //console.log(pic)
          var srcPath = 'https://farm' + pic.farm + '.staticflickr.com/' + pic.server + '/' + pic.id + '_' + pic.secret + '.jpg';
          var urlget = 'https://api.flickr.com/services/rest/?method=flickr.photos.getinfo&api_key=f63db179912eb2f803402be03918f60a&photo_id=' + pic.id + '&secret=92ad3c3d65470592&tags=dog&format=json&nojsoncallback=1&per_page=20';
          pic.urlget = urlget;
          return (

            <img alt='j' key={index} value={index} className="imglayout " src={srcPath} onClick={this.verimagen.bind(this, pic)}>
            </img>
          )
        })
        this.setState({ pictures: picArray })

      }.bind(this))
  }
  render() {
    return (
      <div>
        <Row className=" masonry-layout">

          {/* <InfiniteScroll
            pageStart={0}
            loadMore={this.loadFunc.bind(this)}
            hasMore={true || false}
            loader={<div className="loader" key={0}>Loading ...</div>}
          > */}
            <p className="App-intro masonry-layout__panel-content ">

              {this.state.pictures}
            </p>
          {/* </InfiniteScroll> */}

         
        </Row>
        </div>
    );
  }
}

export default App;
