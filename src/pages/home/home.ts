import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
declare var CameraPreview:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cameraStatus: string;

  constructor(public navCtrl: NavController) {
  }

  startCameraAbove () {
    const cameraPreviewOpts = {
      x: 50,
      y: 200,
      width: 300,
      height: 300,
      camera: 'front',
      tapPhoto: false,
      previewDrag: false,
      toBack: false
    };
    this.startCamera(cameraPreviewOpts);
  }

  startCameraBelow () {
    const cameraPreviewOpts = {
      x: 50,
      y: 200,
      width: 300,
      height: 300,
      camera: 'front',
      tapPhoto: false,
      previewDrag: false,
      toBack: true
    };
    this.startCamera(cameraPreviewOpts);
  }

  startCamera (opts) {
    // start camera
    // this.cameraStatus = 'camera starting';
    CameraPreview.startCamera(
      opts,
      (res) => {
        console.log('startCamera success: ', res);
        this.cameraStatus = 'camera started';
      },
      (err) => {
        console.log('startCamera error: ', err);
        this.cameraStatus = 'camera failed to start';
      });
  }
    
  stopCamera () {
    // Stop the camera preview
    // this.cameraStatus = 'camera stopping';
    CameraPreview.stopCamera(
      (res) => {
        console.log('stopCamera success: ', res);
        this.cameraStatus = 'camera stopped';
      },
      (err) => {
        console.log('stopCamera error: ', err);
        this.cameraStatus = 'camera failed to stop';
      }
    );

  }

}
