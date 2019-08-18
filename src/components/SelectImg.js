import React, { Component } from 'react';

import {isMobile} from 'react-device-detect';



class SelectImg extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected:false,
      dimensions: {},
    };
  }

  selection = () => {
    this.props.onClick()
    this.setState({
      selected: !this.state.selected,
    })
    this.props.getDimensions(this.state.dimensions);
  }

  onImgLoad = ({target:img}) =>  {
    this.setState({
      dimensions:{
        height:img.offsetHeight,
        width:img.offsetWidth
      }
    });
  }


  render() {

    return (
        <div style = {{cursor:'pointer', width:this.props.width, marginLeft:isMobile?30:0}}  >

          {isMobile?
            <img id={this.props.id} onLoad={this.onImgLoad} src={this.props.src} onClick={this.selection}
            style={{borderRadius:10, borderWidth:this.props.current ? 1:0, borderStyle:'solid', opacity:this.props.current ? 1:0.5, boxShadow: '0 0 8px 2px rgba(0, 0, 0, 0.2)', backgroundColor:'rgba(255,255,255,1)', height:"13vh"}}
            alt ="ImgToSelect"/>
            :
            <img id={this.props.id} onLoad={this.onImgLoad} src={this.props.src} onClick={this.selection}
            style={{borderRadius:10, borderWidth:this.props.current ? 1:0, borderStyle:'solid', opacity:this.props.current ? 1:0.5, boxShadow: '0 0 8px 2px rgba(0, 0, 0, 0.2)', backgroundColor:'rgba(255,255,255,1)', width:'100%'}}
            alt ="ImgToSelect"/>
          }
        </div>
    );
  }
}

export default SelectImg;
