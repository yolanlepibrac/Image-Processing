
import React, { Component } from 'react';
import { Stage, Layer, Image, Text, Rect ,  } from 'react-konva';
import Konva from "konva";
import URLImage from "./URLImage";
import ImagePlus from '../assets/images/plus.png';
import ImageMoins from '../assets/images/moins.png';
import ImageDownload from '../assets/images/download.png';



class ImageModifiee extends Component {

  constructor(props) {
    super(props);
    this.uRLImage = React.createRef();
    this.state = {
      selected:false,
      dimensions: {},
      positionX : 1,
      positionY: 1,
      zoom : 1,
    };
  }

  onMouseWheel(e){

    var bounds = e.target.getBoundingClientRect();
    var x = (e.clientX - bounds.left)/this.props.width;
    var y = (e.clientY - bounds.top)/this.props.height;
    if (e.ctrlKey) {
      e.preventDefault();
        if (e.deltaY < 0) {
          this.setState({
            positionX : x,
            positionY: y,
            zoom : this.state.zoom-this.state.zoom/10,
          })
        }else{
          this.setState({
            positionX : x,
            positionY: y,
            zoom : this.state.zoom+this.state.zoom/10,
          })
        }
      //console.log(this.state.positionX)
    }
  }


  zoom(){
    this.setState({
      zoom : this.state.zoom-this.state.zoom/10,
    });
    console.log(this.state.zoom)
    this.uRLImage.current.rerender();
  }

  unzoom(){
    this.setState({
      zoom : this.state.zoom+this.state.zoom/10,
    });
    console.log(this.state.zoom)
    this.uRLImage.current.rerender();
  }

  download(){
    var canvas = document.getElementsByClassName("konvajs-content")[0].childNodes[0];
    var dataURL = canvas.toDataURL();
    console.log(dataURL)
    this.downloadURI(dataURL, 'myImage.png');
  }

  downloadURI = (uri, name) => {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    //delete link;
  }

  render() {

    return (

      <div style={{'width':'100%', display:'flex', height : '90vh', overflow : 'scroll', backgroundColor:'rgba(255, 221, 235,1)', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
        <div style={{ display:'flex', flexDirection:'column', overflowX:'hidden', justifyContent:'center', alignItems:'center', }}>
          <div style={{ display:'flex', flexDirection:'column', overflowX:'hidden', justifyContent:'center', alignItems:'center', }}>
            <Stage  height={this.props.height} width={this.props.width}>
              <Layer>
                <URLImage
                  ref={this.uRLImage}
                  src={this.props.src}
                  height={this.props.height}
                  width={this.props.width}
                  positionY = {this.state.positionY}
                  positionX = {this.state.positionX}
                  zoom = {this.state.zoom}
                  filter={this.props.filter}
                  value = {this.props.value}
                  />
              </Layer>
            </Stage>
          </div>

          <div style={{  position:'absolute', bottom:'7vh', left:'calc(50vw - 100px)', marginTop:20, height:50, width:200, display:'flex', flexDirection:"row", justifyContent:"center", borderRadius:"50%"}}>
            {/* zoom buttons
            <div style={{ width:40, height:40, backgroundColor:"#222222", borderRadius:"50%", backgroundImage: "url("+ ImageMoins +")", backgroundSize: 'cover',}}
                  onClick={() => {this.zoom()}}>
            </div>
            <div style={{ width:40, height:40, backgroundColor:"#222222", borderRadius:"50%", backgroundImage: "url("+ ImagePlus +")", backgroundSize: 'cover'}}
                  onClick={() => {this.unzoom()}}>
            </div>
            */}
            <div style={{cursor:'pointer', width:40, height:40, backgroundColor:"#222222", borderRadius:"50%", backgroundImage: "url("+ ImageDownload +")", backgroundSize: 'cover'}}
                  onClick={() => {this.download()}}>
            </div>
          </div>
        </div>
      </div>

      )
  }
}


export default ImageModifiee;
