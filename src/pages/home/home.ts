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
  isTransparent: boolean;
  isTablet: boolean;
  cameraPreviewOpts: CameraPreviewOptions;
  pictureTaken = false;

  constructor(public navCtrl: NavController, private cameraPreview: CameraPreview) {
    this.isTransparent = false;
    if( window.screen.height/window.screen.width === 4/3 ) {
      this.isTablet = true;
      this.cameraPreviewOpts = {
        x: 0,
        y: window.screen.height/4,
        width: window.screen.width,
        height: window.screen.height/2,
        camera: 'rear',
        tapPhoto: false,
        previewDrag: false,
        toBack: true,
        alpha: 1
      };
    }
    else {
      this.isTablet = false;
      this.cameraPreviewOpts = {
        x: 0,
        y: window.screen.height/2 - window.screen.width*2/3,
        width: window.screen.width,
        height: window.screen.width*4/3,
        camera: 'rear',
        tapPhoto: false,
        previewDrag: false,
        toBack: true,
        alpha: 1
      };
    }
  }

  pictureOpts: CameraPreviewPictureOptions = {
    height: 2730,
    width: 2048,
    quality: 100
  };

  startCamera() {
    this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
      (res) => {
        this.isTransparent = true;
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
        this.isTransparent = false;
        console.log(res);
        this.cameraStatus = 'camera stopped';
      },
      (err) => {
        console.log(err);
        this.cameraStatus = 'camera failed to stop';
      }
    )
  }

  getSizes() {
    this.cameraPreview.getSupportedPictureSizes().then(
      dimensions => {
        dimensions.forEach(function(dimension) {
          console.log(dimension.width + 'x' + dimension.height);
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  takePhoto() {
    let tablet = this.isTablet;
    this.cameraPreview.takePicture(this.pictureOpts).then(
      (imageData) => {
        this.isTransparent = false;
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext("2d");
        var image = new Image();
        image.onload = function() {
          console.log('image is ' + image.width + 'x' + image.height);
          if( tablet ) {
            canvas.width = image.width;
            canvas.height = image.height*0.3;
            ctx.drawImage(image, 0, 0.35*image.height, image.width, 0.3*image.height, 0, 0, canvas.width, canvas.height);
          }
          else {
            canvas.width = image.width;
            canvas.height = image.height*0.4;
            ctx.drawImage(image, 0, image.height*0.3, image.width, image.height*0.4, 0, 0, image.width, image.height*0.4);
          }
          this.picture = canvas.toDataURL('image/jpeg');
          this.pictureTaken = true;
        }.bind(this);
        image.src = 'data:image/png;base64,' + imageData;
      },
      (err) => {
        console.log(err);
        this.pictureTaken = false;
      });
  }

  reset() {
    this.isTransparent = true;
    this.pictureTaken = false;
  }

}