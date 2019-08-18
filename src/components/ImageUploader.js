import React from 'react';
import PropTypes from 'prop-types';
import UploadStyle from './UploadStyle.css'
import FlipMove from 'react-flip-move';
import SelectImg from './SelectImg';
import Imagedebase from '../assets/images/case.jpg';
import ImageClose from '../assets/images/quit.png';

import {isMobile} from 'react-device-detect';

class ReactImageUploadComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: props.defaultImage ? [props.defaultImage] : [],
      files: [],
      notAcceptedFileType: [],
      notAcceptedFileSize: [],
      currentPicture : Imagedebase,
    };
    this.inputElement = '';
    this.onDropFile = this.onDropFile.bind(this);
    this.onUploadClick = this.onUploadClick.bind(this);
    this.triggerFileUpload = this.triggerFileUpload.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(prevState.files !== this.state.files){
      this.props.onChange(this.state.files, this.state.pictures);
    }
  }

  /*
   Load image at the beggining if defaultImage prop exists
   */
  componentWillReceiveProps(nextProps){
    if(nextProps.defaultImage){
      this.setState({pictures: [nextProps.defaultImage]});
    }
  }

  /*
	 Check file extension (onDropFile)
	 */
  hasExtension(fileName) {
    const pattern = '(' + this.props.imgExtension.join('|').replace(/\./g, '\\.') + ')$';
    return new RegExp(pattern, 'i').test(fileName);
  }

  /*
   Handle file validation
   */
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

  onUploadClick(e) {
    // Fixes https://github.com/JakeHartnell/react-images-upload/issues/55
    e.target.value = null;
  }

  /*
     Read a file and return a promise that when resolved gives the file itself and the data URL
   */
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

  /*
   Remove the image from state
   */
  removeImage(picture) {
    const removeIndex = this.state.pictures.findIndex(e => e === picture);
    const filteredPictures = this.state.pictures.filter((e, index) => index !== removeIndex);
    const filteredFiles = this.state.files.filter((e, index) => index !== removeIndex);

    this.setState({pictures: filteredPictures, files: filteredFiles}, () => {
      this.props.onChange(this.state.files, this.state.pictures);
    });
  }

  /*
   Check if any errors && render
   */
  renderErrors() {
    let notAccepted = '';
    if (this.state.notAcceptedFileType.length > 0) {
      notAccepted = this.state.notAcceptedFileType.map((error, index) => {
        return (
          <div className={'errorMessage ' + this.props.errorClass} key={index} style={this.props.errorStyle}>
            * {error} {this.props.fileTypeError}
          </div>
        )
      });
    }
    if (this.state.notAcceptedFileSize.length > 0) {
      notAccepted = this.state.notAcceptedFileSize.map((error, index) => {
        return (
          <div className={'errorMessage ' + this.props.errorClass} key={index} style={this.props.errorStyle}>
            * {error} {this.props.fileSizeError}
          </div>
        )
      });
    }
    return notAccepted;
  }

  /*
   Render the upload icon
   */


  /*
   Render label
   */
  renderLabel() {
    if (this.props.withLabel) {
      return <p className={this.props.labelClass} style={this.props.labelStyles}>{this.props.label}</p>
    }
  }

  /*
   Render preview images
   */
  renderPreview() {
    return (
      <div className="uploadPicturesWrapper">
        <FlipMove enterAnimation="fade" leaveAnimation="fade" style={{display: "flex", flexDirection:isMobile?"row":"column", alignItems: "center",justifyContent:isMobile?"flex-start":"center",width: "100%", position: "static"}}>
          {this.renderPreviewPictures()}
        </FlipMove>
      </div>
    );
  }

  renderPreviewPictures() {
    return this.state.pictures.map((picture, index) => {
      return (
        <div key={index} className="uploadPictureContainer">
          <div className="deleteImage" onClick={() => this.removeImage(picture)} style={{backgroundImage: "url("+ ImageClose +")", backgroundSize: 'cover'}}></div>
          <SelectImg id="imageDeBase" src={picture} className="uploadPicture" alt="preview"
              onClick={(event) => {this.props.ClickOnImg(picture);this.ClickOnImg(picture)}}
              current={this.state.currentPicture === picture ? true : false}
              getDimensions={(e) => {this.props.getDimensions(e)}}
              width={isMobile?"100%":"80%"}>
          </SelectImg>
        </div>
      );
    });
  }

  ClickOnImg(pic) {
    console.log(pic)
    this.setState({
      currentPicture : pic,
    })
  }

  /*
   On button click, trigger input file to open
   */
  triggerFileUpload() {
    this.inputElement.click();
  }

  clearPictures() {
    this.setState({pictures: []})
  }

  render() {
    return (
      <div className={"fileUploader " + this.props.className}>
        <div className="errorsContainer">
          {isMobile?null:this.renderErrors()}
        </div>
        <div className="fileContainer" style={this.props.fileContainerStyle}>
          {this.renderLabel()}
          {isMobile ?
            <div style={{backgroundColor:"rgba(100,100,100,1)", marginLeft:20, cursor:"pointer", minWidth:50, height:50, fontSize:30, display:"flex", flexDirection:"row",  alignItems:"center", textAlign:"center", justifyContent:"center", borderRadius:"50%", color:"white", boxShadow:"1px 1px 1px 1px rgba(0,0,0,0.2)"}} onClick={this.triggerFileUpload}>+
            </div>
          :null
          }
          <input
            type="file"
            ref={input => this.inputElement = input}
            name={this.props.name}
            multiple={!this.props.singleImage}
            onChange={this.onDropFile}
            onClick={this.onUploadClick}
            accept={this.props.accept}
          />
          <SelectImg id="imageDeBase" src={Imagedebase} alt="preview"
              onClick={(event) => {this.props.ClickOnImg(Imagedebase);this.ClickOnImg(Imagedebase)}}
              current={this.state.currentPicture === Imagedebase ? true : false}
              getDimensions={(e) => {this.props.getDimensions(e)}}
              width={isMobile?"100%":"80%"}>
          </SelectImg>
          { this.props.withPreview ? this.renderPreview() : null }
          {!isMobile ?
            <button style={{backgroundColor:'rgba(25,25,25,1)', cursor:"pointer", color:"white", fontSize:25, borderRadius:10, width:"80%", marginTop:10, padding:0, height:50}} onClick={this.triggerFileUpload}>
            {this.props.buttonText}
            </button>
          :null
          }
        </div>
      </div>
    )
  }
}

ReactImageUploadComponent.defaultProps = {
  className: '',
  fileContainerStyle: {},
  buttonClassName: "",
  buttonStyles: {},
  withPreview: false,
  accept: "image/*",
  name: "",
  withIcon: true,
  buttonText: "Choose images",
  buttonType: "button",
  withLabel: true,
  label: "Max file size: 5mb, accepted: jpg|gif|png",
  labelStyles: {},
  labelClass: "",
  imgExtension: ['.jpg', '.jpeg', '.gif', '.png'],
  maxFileSize: 5242880,
  fileSizeError: " file size is too big",
  fileTypeError: " is not a supported file extension",
  errorClass: "",
  style: {},
  errorStyle: {},
  singleImage: false,
  onChange: () => {},
  defaultImage: ""
};

ReactImageUploadComponent.propTypes = {
  style: PropTypes.object,
  fileContainerStyle: PropTypes.object,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  buttonClassName: PropTypes.string,
  buttonStyles: PropTypes.object,
  buttonType: PropTypes.string,
  withPreview: PropTypes.bool,
  accept: PropTypes.string,
  name: PropTypes.string,
  withIcon: PropTypes.bool,
  buttonText: PropTypes.string,
  withLabel: PropTypes.bool,
  label: PropTypes.string,
  labelStyles: PropTypes.object,
  labelClass: PropTypes.string,
  imgExtension: PropTypes.array,
  maxFileSize: PropTypes.number,
  fileSizeError: PropTypes.string,
  fileTypeError: PropTypes.string,
  errorClass: PropTypes.string,
  errorStyle: PropTypes.object,
  singleImage: PropTypes.bool,
  defaultImage: PropTypes.string
};

export default ReactImageUploadComponent;
