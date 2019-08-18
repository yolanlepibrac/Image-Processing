
import React, { Component } from 'react';
import { Stage, Layer, Image, Text, Rect ,  } from 'react-konva';
import Konva from "konva";

class URLImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      positionX : this.props.positionX,
      positionY : this.props.positionY,
      zoom : this.props.zoom,
    };
  }

  componentDidMount = () => {
    this.setState({
      width:this.props.width,
      height:this.props.height,
    });
    this.loadImage();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate = (oldProps) => {
    if(this.state.positionX !== this.props.positionX || this.state.positionY !== this.props.positionY){
      this.setState({
        positionX : this.props.positionX,
        positionY : this.props.positionY,
        zoom : this.props.zoom,
      })
      this.myImage.cache();
      //this.myImage.getLayer().draw();
    }
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    };
  }

  componentWillUnmount = () =>  {
    this.image.removeEventListener('load', this.handleLoad);
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event) => {
    let scrollTop = event.srcElement.body.scrollTop;
    console.log(scrollTop)
  }

  loadImage = () => {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.addEventListener('load', this.handleLoad);

  }

  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.image,
    },
    () => {
            this.myImage.cache();
            this.myImage.getLayer().draw();
          });
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  };

  rerender = () => {
      this.forceUpdate();
      this.setState({
        zoom : this.props.zoom
      })
      console.log(this)
  }

  render() {
    var x = this.props.positionX
    var y = this.props.positionY
    var width = this.props.width
    var height = this.props.height
    return (
        <Image
          className = "ImageDisplayed"
          style = {{borderRadius:10}}
          image={this.state.image}
          filters={this.props.filter}
          YolanFilter_1={this.props.value}
          Noise={this.props.value}
          BlurRadius={this.props.value}
          Grayscale={this.props.value}
          RetroFuturism={this.props.value}
          Propaganda={this.props.value}
          HighLight={this.props.value}
          Nosedive={this.props.value}
          Contrast={this.props.value}
          ColorBlind={this.props.value}
          ColorBlack={this.props.value}
          Dior={this.props.value}
          NeonGod={this.props.value}
          Blood={this.props.value}
          Silver={this.props.value}
          barcode={this.props.value}
          Western={this.props.value}
          Smudge={this.props.value}
          MiamiVice={this.props.value}
          Ikea={this.props.value}
          Disco={this.props.value}
          ColorBowl={this.props.value}
          FlatBeat={this.props.value}
          Checkboard={this.props.value}

          ref={node => {
            this.myImage = node;
          }}
          width={width}
          height={height}
          x = {x}
          y = {y}
        />
    );
  }
}

export default URLImage;
