import React, { Component } from 'react';
import './App.css';
import {Navbar, Row, Input, Icon} from 'react-materialize';

class App extends Component {
  constructor(){
    super();
    this.state={
      pictures:[],
    };
  }
  componentDidMount(){
    fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=f63db179912eb2f803402be03918f60a&tags=dogi&format=json&nojsoncallback=1')
    .then(function(response){
      return response.json();
    })
.then(function(j){
   let picArray =j.photos.photo.map((pic,index)=>{
    console.log(pic)
     var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
     
     return(

     <img alt='j' key={index}  className="imglayout " src={srcPath}     onClick={() => {
      window.Materialize.toast('I am a toast!', 1000)}
}>
</img>
     )
  })
  this.setState({pictures: picArray})

}.bind(this))
  }
  render() {
    return (
      <div>
<Navbar  className="navbar" >
<Row>

  <Input s={6} label="Busqueda de Imagenes" validate><Icon>search</Icon></Input>
</Row>
</Navbar>        
        <Row className=" masonry-layout">

          <p  className="App-intro masonry-layout__panel-content ">
          
            {this.state.pictures}
          </p>
        </Row>
        </div>
    );
  }
}

export default App;
