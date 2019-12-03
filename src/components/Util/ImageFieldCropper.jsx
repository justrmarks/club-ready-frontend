import React, { Component, Fragment } from 'react'
import Slider from '@material-ui/core/Slider'
import Cropper from 'react-easy-crop'


class ImageFieldCropper extends Component {

  state = {
    imageSrc: null,
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: 4 / 3,
  }

  style = {
      position: 'relative',
      height: '60vh',
      width: '80vh',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column'

  }

  onCropChange = crop => {
    this.setState({ crop })
  }

  onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedAreaPixels)
    const {x,y,width,height} = croppedAreaPixels
    // this.props.setPicture(e.target.files[0])
    const img = document.createElement("img");
    img.src = this.state.imageSrc
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, x, y, width, height);
    canvas.toBlob(blob=> {
      this.props.setPicture(blob)
    })
  }

  onZoomChange = zoom => {
    this.setState({ zoom })
  }

  onFileChange = async e => {
    if (e.target.files && e.target.files.length > 0) {
        
        const imageDataUrl = await readFile(e.target.files[0])
        this.setState({
        imageSrc: imageDataUrl,
        crop: { x: 0, y: 0 },
        zoom: 1,
        })
      
      
    }
  }

  render() {

    return (<div className="ImageFieldCropper" style={this.style}>
            <input type="file" onChange={this.onFileChange} style={{margin: '10px'}}/>
            
            <div className="cropContainer" style={{position: 'relative',height: '60%', width:'80%', border: '1px solid gainsboro', borderRadius: '5px'}} >
            {this.state.imageSrc && (
            <Fragment>
                    <Cropper
                        image={this.state.imageSrc}
                        crop={this.state.crop}
                        zoom={this.state.zoom}
                        aspect={this.state.aspect}
                        onCropChange={this.onCropChange}
                        onCropComplete={this.onCropComplete}
                        onZoomChange={this.onZoomChange}
                    />
                    
                
                
                
            </Fragment>)}
            </div>
            <div className="controls" style={{width: '100%'}}>
                    {this.state.imageSrc ? <Slider
                    value={this.state.zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e, zoom) => this.onZoomChange(zoom)}
                    /> : undefined}
                
            </div> 
    </div>) 
            }
        }

export function readFile(file) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}


export default ImageFieldCropper