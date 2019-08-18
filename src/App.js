import React, { Component } from 'react';


import './App.css';
import './fonts.css';
import SelectImg from './components/SelectImg'
import ImageUploader from  './components/ImageUploader';
import Imagedebase from './assets/images/case.jpg';
import ImageModifiee from './components/ImageModifiee';
import Filter from './components/Filter';

import { Stage, Layer, Image, Text, Rect ,  } from 'react-konva';
import Konva from "konva";
import useImage from 'use-image';
import { render } from 'react-dom';
import InputRange from 'react-input-range';


import {isMobile} from 'react-device-detect';

const INITIAL_STATE = {
  pictures: [],
};


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      pictures: [],
      Images:[],
      currentPicture : Imagedebase,
      dimensions: {width:170, height:105},
      currentFilter : [Konva.Filters],
      color : "rgba(0,0,0,1)",
      valueFilter: 0,
      slider : false,
      minSlider : 0,
      maxSlider : 0,
      zoom : 1,
    };
      this.onDrop = this.onDrop.bind(this);

  }



  onDrop(picture) {
      console.log(picture)
       this.setState({
           pictures: picture,
       });
   }


  onDropFile(e) {
    const files = e.target.files;
    const allFilePromises = [];

    // Iterate over all uploaded files
    for (let i = 0; i < files.length; i++) {
      let f = files[i];
      // Check for file extension
      if (!this.hasExtension(f.name)) {
        const newArray = this.state.notAcceptedFileType.slice();
        newArray.push(f.name);
        this.setState({notAcceptedFileType: newArray});
        continue;
      }
      // Check for file size
      if(f.size > this.props.maxFileSize) {
        const newArray = this.state.notAcceptedFileSize.slice();
        newArray.push(f.name);
        this.setState({notAcceptedFileSize: newArray});
        continue;
      }

      allFilePromises.push(this.readFile(f));
    }

    Promise.all(allFilePromises).then(newFilesData => {
      const dataURLs = this.state.pictures.slice();
      const files = this.state.files.slice();

      newFilesData.forEach(newFileData => {
        dataURLs.push(newFileData.dataURL);
        files.push(newFileData.file);
      });

      this.setState({pictures: dataURLs, files: files});
    });
  }

  readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // Read the image via FileReader API and save image result in state.
      reader.onload = function (e) {
        // Add the file name to the data URL
        let dataURL = e.target.result;
        dataURL = dataURL.replace(";base64", `;name=${file.name};base64`);
        resolve({file, dataURL});
      };

      reader.readAsDataURL(file);
    });
  }

  ClickOnImg(pic) {
    console.log(pic)
    this.setState({
      currentPicture : pic,
    })
  }

  getDimensions = (e) => {
    this.setState({dimensions:{width:e.width, height:e.height}});
    console.log(this.state.dimensions)
  }


  setFilter = (e, n, slider, min, max) => {
    this.setState({
      currentFilter : e,
      nameCurrentFilter : n,
      slider : slider,
      minSlider : min.toString(),
      maxSlider : max.toString(),
      valueFilter : (min+max)/2
    })
  }

  handleChange = (event) => {
    this.setState({valueFilter: event.target.value});
  }

  Zoom = () => {
    this.setState({
      zoom : this.state.zoom+this.state.zoom/10,
    });
  }

  Unzoom = () => {
    this.setState({
      zoom : this.state.zoom-this.state.zoom/10,
    });
  }


  render() {
    var Image = require('./assets/images/case.jpg')
    return (
      <div style={{height:isMobile?"80vh":'100%',}}>
        <header className="App-header" style={{display:"flex", flexDirection:"row", justifyContent:"space-between", position:"absolute", top:0, left:0}}>
            <div style={{fontFamily: 'codelight', width:20, marginLeft : 50, width : 200, textAlign :'left', fontSize:20}}>{this.state.pageName}
            </div>
            <a href="http://yolan-pibrac.com/home/" style={{width:"100%", fontSize: isMobile?10:17, textDecoration:'none', color:'white'}}>
              yolan-pibrac.com
            </a>
            <div className="menu" style={{width:20, marginRight:50}} >

              <div style={{flex:1, width : 200}} >
              </div>
            </div>
        </header>

        <div style={{'height':isMobile?"":'100%', display:'flex', flexDirection:isMobile?"column":'row', marginTop:'5vh'}}>
          <div id='menugauche' style={{height:isMobile?"20vh":'90vh', width:isMobile?"100%":600, backgroundColor:'rgba(244,244,244,1)',  overflowY:isMobile?'hidden':'auto', overflowX:isMobile?"scroll":'hidden'}}>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', paddingTop:isMobile?"2.5vh":20}}>
              <ImageUploader
                  getDimensions={this.getDimensions}
                  ClickOnImg = {(event) => this.ClickOnImg(event)}
                  fileContainerStyle = {{ height:'100%', backgroundColor:'rgba(25,25,255,0)', margin:0, padding:0, display:"flex", flexDirection:isMobile?"row":"column", position:"relative"}}
                  withIcon={false}
                  buttonText=<div>+</div>
                  onChange={this.onDrop}
                  imgExtension={['.jpg', '.gif', '.png', '.gif']}
                  maxFileSize={5242880}
                  withPreview={true}
                  label=""
                  withLabel={false}
                  accept="accept=image/*"
              />
            </div>
          </div>
          <ImageModifiee
            filter={this.state.currentFilter}
            value = {this.state.valueFilter}
            src={this.state.currentPicture}
            width={this.state.dimensions.height/this.state.dimensions.width<1?700:500*this.state.dimensions.width/this.state.dimensions.height}
            height={this.state.dimensions.height/this.state.dimensions.width>=1?500:700*this.state.dimensions.height/this.state.dimensions.width}>
          </ImageModifiee>
          <div style={{width:isMobile?"100vw":"40%", backgroundColor:isMobile?"white":'rgba(255, 237, 209,1)', height:isMobile?"":'90vh'}}>
            <div style={{backgroundColor:isMobile?"white":'rgba(229, 223, 213,1)', paddingTop:isMobile?"1vh":10, width:"100%", height:isMobile?"5vh":"", textAlign:'center', fontFamily: 'codebold', fontSize:25, alignItems:'center'}}>
              {isMobile?
                null
              :
                <div style={{}}>Filters
                </div>
              }
              <div style={{width : "100%",  height :isMobile?"2vh":40}}>
              {this.state.slider ?
                <input
                  id="typeinp"
                  class = "inputRange"
                  type="range"
                  min={this.state.minSlider} max={this.state.maxSlider}
                  value={this.state.valueFilter}
                  onChange={this.handleChange}
                  style = {{marginTop: isMobile?0:15, marginLeft : '0%', height:isMobile?"3vh":20, width: isMobile?"80vw":'70%'}}
                  />:null
                }
              </div>
            </div>

            <div style={{ width : isMobile?"":"100%", display:"flex", flexDirection :"row", justifyContent:"start", marginLeft : isMobile?10:30, marginTop:isMobile?0:30, "flex-wrap": isMobile?"":"wrap", alignItems:'start',  height:isMobile?"15vh":'75vh', overflowX:isMobile?"scroll":'hidden', overflowY:isMobile?"hidden":'scroll'}}>
              <Filter filter={[Konva.Filters]} slider={false} min={0} max={10} value={this.state.valueFilter} setFilter={this.setFilter} name='#NoFilter' src={this.state.currentPicture} current={this.state.nameCurrentFilter}/>
              <Filter filter={[Konva.Filters.Grayscale]} slider={true} min={0} max={100} value={this.state.valueFilter} setFilter={this.setFilter} name='Black & White' src={this.state.currentPicture}  current={this.state.nameCurrentFilter}/>
              <Filter filter={[Konva.Filters.YolanFilter_RetroFuturism]} slider={true} min={0} max={100} value={this.state.valueFilter} setFilter={this.setFilter} name='retro futurist' src={this.state.currentPicture} current={this.state.nameCurrentFilter}/>
              <Filter filter={[Konva.Filters.YolanFilter_MiamiVice]} slider={true} min={0} max={150} value={this.state.valueFilter} setFilter={this.setFilter} name='MiamiVice' src={this.state.currentPicture} current={this.state.nameCurrentFilter}/>
              <Filter filter={[Konva.Filters.YolanFilter_Propaganda]} slider={true} min={0} max={100} value={this.state.valueFilter} setFilter={this.setFilter} name='Propaganda' src={this.state.currentPicture} current={this.state.nameCurrentFilter}/>
              <Filter filter={[Konva.Filters.YolanFilter_Nosedive]} slider={true} min={0} max={100} value={this.state.valueFilter} setFilter={this.setFilter} name='Nodedive' src={this.state.currentPicture} current={this.state.nameCurrentFilter}/>
              <Filter filter={[Konva.Filters.YolanFilter_ColorBlind]} slider={true} min={2} max={50} value={this.state.valueFilter} setFilter={this.setFilter} name='ColorBlind' src={this.state.currentPicture} current={this.state.nameCurrentFilter}/>
              <Filter filter={[Konva.Filters.YolanFilter_ColorBlack]} slider={true} min={2} max={50} value={this.state.valueFilter} setFilter={this.setFilter} name='ColorBlack' src={this.state.currentPicture} current={this.state.nameCurrentFilter}/>
              <Filter filter={[Konva.Filters.YolanFilter_ColorBowl]} slider={true} min={2} max={50} value={this.state.valueFilter} setFilter={this.setFilter} name='ColorBowl' src={this.state.currentPicture} current={this.state.nameCurrentFilter}/>
              <Filter filter={[Konva.Filters.YolanFilter_Barcode]} slider={true} min={0} max={100} value={this.state.valueFilter} setFilter={this.setFilter} name='Barcode' src={this.state.currentPicture} current={this.state.nameCurrentFilter}/>
              <Filter filter={[Konva.Filters.YolanFilter_Smudge]} slider={true} min={0} max={100} value={this.state.valueFilter} setFilter={this.setFilter} name='Smudge' src={this.state.currentPicture} current={this.state.nameCurrentFilter}/>
              <Filter filter={[Konva.Filters.YolanFilter_FlatBeat]} slider={true} min={0} max={100} value={this.state.valueFilter} setFilter={this.setFilter} name='FlatBeat' src={this.state.currentPicture} current={this.state.nameCurrentFilter}/>
              <Filter filter={[Konva.Filters.YolanFilter_Dior]} slider={true} min={0} max={100} value={this.state.valueFilter} setFilter={this.setFilter} name='Dior' src={this.state.currentPicture} current={this.state.nameCurrentFilter}/>
              <Filter filter={[Konva.Filters.YolanFilter_Silver]} slider={true} min={0} max={100} value={this.state.valueFilter} setFilter={this.setFilter} name='Silver' src={this.state.currentPicture} current={this.state.nameCurrentFilter}/>
              <Filter filter={[Konva.Filters.YolanFilter_Blood]} slider={true} min={0} max={100} value={this.state.valueFilter} setFilter={this.setFilter} name='Blood' src={this.state.currentPicture} current={this.state.nameCurrentFilter}/>
              <Filter filter={[Konva.Filters.YolanFilter_Western]} slider={true} min={0} max={100} value={this.state.valueFilter} setFilter={this.setFilter} name='Western' src={this.state.currentPicture} current={this.state.nameCurrentFilter}/>
              <Filter filter={[Konva.Filters.YolanFilter_Ikea]} slider={true} min={0} max={100} value={this.state.valueFilter} setFilter={this.setFilter} name='Ikea' src={this.state.currentPicture} current={this.state.nameCurrentFilter}/>
              <Filter filter={[Konva.Filters.YolanFilter_Disco]} slider={true} min={0} max={100} value={this.state.valueFilter} setFilter={this.setFilter} name='Disco' src={this.state.currentPicture} current={this.state.nameCurrentFilter}/>
              <Filter filter={[Konva.Filters.YolanFilter_Checkboard]} slider={true} min={0} max={100} value={this.state.valueFilter} setFilter={this.setFilter} name='Checkboard' src={this.state.currentPicture} current={this.state.nameCurrentFilter}/>
              <Filter filter={[Konva.Filters.Noise]} slider={true} min={0} max={100} value={this.state.valueFilter} setFilter={this.setFilter} name='Noise' src={this.state.currentPicture} current={this.state.nameCurrentFilter}/>
            </div>


          </div>

        </div>
      </div>

    );
  }
}

export default App;
