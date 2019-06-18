import React, { Component } from 'react';

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
        <div style = {{cursor:'pointer', 'width':'80%'}}  >
          <img width='100%' id={this.props.id} onLoad={this.onImgLoad} src={this.props.src} onClick={this.selection}
          style={{borderRadius:10, borderWidth:this.props.current ? 1:0, borderStyle:'solid', opacity:this.props.current ? 1:0.5, boxShadow: '0 0 8px 2px rgba(0, 0, 0, 0.2)', backgroundColor:'rgba(255,255,255,1)'}}
          alt ="ImgToSelect"/>
        </div>
    );
  }
}

export default SelectImg;
