import React, { Component } from 'react';

import { Stage, Layer, Image, Text, Rect ,  } from 'react-konva';
import Konva from "konva";
import URLImage from "./URLImage";




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
      <div style={{ marginRight:30, marginBottom: 30, textAlign:'center'}}>
        <div style = {{height : 50, width:100, cursor:'pointer',  borderWidth: this.props.current === this.props.name ? 1 : 0, borderStyle:'solid', opacity: 0.8, backgroundColor:'rgba(100,100,100,1)', }}
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
