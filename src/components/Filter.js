import React, { Component } from 'react';

import { Stage, Layer, Image, Text, Rect ,  } from 'react-konva';
import Konva from "konva";
import URLImage from "./URLImage";

import {isMobile} from 'react-device-detect';


class Filter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      border:0
    };
  }

  setFilter = () => {
    this.props.setFilter(this.props.filter, this.props.name, this.props.slider, this.props.min, this.props.max)
  }


  render() {

    return (
        isMobile?
          <div style={{position:"relative", marginRight:30, marginBottom: 30, textAlign:'center'}}>
            <div style = {{ height :50, width:100,  borderWidth: this.props.current === this.props.name ? 1 : 0, borderStyle:'solid', opacity: 0.8, backgroundColor:isMobile?"white":'rgba(100,100,100,1)'}}>
              <div>
                <Stage  height={50} width={100}>
                  <Layer>
                    <URLImage
                      value = {(this.props.min+this.props.max)/2}
                      src={this.props.src}
                      height={50}
                      width={100}
                      filter={this.props.filter}
                      />
                  </Layer>
                </Stage>
            </div>

            </div>
            <div style={{position:"absolute", display:"flex", flexDirection:"row", alignItems:"center", textAlign:"center",  justifyContent:"center", width:"100%", height:30, top:30, left:0, backgroundColor:"rgba(230,230,230,1)", color:"rgba(100,100,100,1)", cursor:"pointer", borderRadius:5, borderStyle:"solid", borderWidth:1, fontSize:12, borderColor:"rgba(100,100,100,1)"}} onClick={this.setFilter}>
              {this.props.name}
            </div>
            </div>
          :
          <div style={{ marginRight:30, marginBottom: 30, textAlign:'center'}}>
            <div style = {{height :50, width:100, cursor:'pointer',  borderWidth: this.props.current === this.props.name ? 1 : 0, borderStyle:'solid', opacity: 0.8, backgroundColor:isMobile?"white":'rgba(100,100,100,1)'}}
              onClick={this.setFilter}>
              <Stage  height={50} width={100}>
                <Layer>
                  <URLImage
                    value = {(this.props.min+this.props.max)/2}
                    src={this.props.src}
                    height={50}
                    width={100}
                    filter={this.props.filter}
                    />
                </Layer>
              </Stage>
            </div>
            {this.props.name}
            </div>

    );
  }
}


export default Filter;
