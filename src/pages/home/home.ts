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

  constructor(public navCtrl: NavController, private cameraPreview: CameraPreview) {
    this.picture = 'assets/icon/favicon.ico';
    this.isTransparent = false;
  }

  cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y: window.screen.height/2 - window.screen.width*4/6,
    width: window.screen.width,
    height: window.screen.width*4/3,
    camera: 'front',
    tapPhoto: false,
    previewDrag: false,
    toBack: true,
    alpha: 1
  };

  pictureOpts: CameraPreviewPictureOptions = {

  };

  startCamera() {
    this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
      (res) => {
        this.isTransparent = true;
        console.log(res);
        this.cameraStatus = 'camera started';
        console.log('screen is ' + window.screen.width + 'x' + window.screen.height);
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

  convert() {

  }

  takePhoto() {
    this.cameraPreview.takePicture().then(
      (imageData) => {
        this.isTransparent = false;
        this.picture = 'data:image/jpeg;base64,' + imageData;
        var canvas = <HTMLCanvasElement> document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var image = new Image();
        image.onload = function() {
          console.log('image is ' + image.width + 'x' + image.height);
          ctx.drawImage(image, 0, image.height*0.3, image.width, image.height*0.4, 0, 0, canvas.width, canvas.height);
        };
        image.src = 'data:image/png;base64,' + imageData;
      },
      (err) => {
        console.log(err);
        this.picture = 'assets/icon/favicon.ico';
      });
  }

  reset() {
    this.isTransparent = true;
    var canvas = <HTMLCanvasElement> document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

}