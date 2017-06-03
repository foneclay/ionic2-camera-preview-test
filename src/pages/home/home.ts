import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cameraStatus: string;
  picture: string;

  constructor(public navCtrl: NavController, private cameraPreview: CameraPreview) {
    this.picture = 'assets/icon/favicon.ico';
  }

  cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y: window.screen.height/4,
    width: window.screen.width,
    height: window.screen.height/2,
    camera: 'front',
    tapPhoto: false,
    previewDrag: false,
    toBack: true,
    alpha: 1
  };

  pictureOpts: CameraPreviewPictureOptions = {
    width: window.screen.width/2,
    height: window.screen.height*0.15,
    quality: 85
  }

  startCamera() {
    this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
      (res) => {
        console.log(res);
        this.cameraStatus = 'camera started';
      },
      (err) => {
        console.log(err);
        this.cameraStatus = 'camera failed to start';
      });  
  }

  stopCamera() {
    this.cameraPreview.stopCamera().then(
      (res) => {
        console.log(res);
        this.cameraStatus = 'camera stopped';
      },
      (err) => {
        console.log(err);
        this.cameraStatus = 'camera failed to stop';
      }
    )
  }

  /*getPictureSizes() {
    this.cameraPreview.getSupportedPictureSizes().then(
      (dimensions) => {
        dimensions.forEach(
          (dimension) => {
            console.log(dimension.width + 'x' + dimension.height);
          },
          (err) => {
            console.log('failed');
          });
      });
  }*/

  takePhoto() {
    this.cameraPreview.takePicture(this.pictureOpts).then(
      (imageData) => {
        this.picture = 'data:image/jpeg;base64,' + imageData;
      },
      (err) => {
        console.log(err);
        this.picture = 'assets/icon/favicon.ico';
      });
  }

}