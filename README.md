### Ionic 2 Test App for the camera-prevew plugin

This is a Ionic 2 test app for the camera-prevew plugin https://github.com/cordova-plugin-camera-preview/cordova-plugin-camera-preview

To properly setup the cordova-plugin-camera-preview, add the following code to ./plugins/cordova-plugin-camera-preview/www/plugin.xml under the &lt;platform name="ios"> tag
    
    <config-file parent="NSCameraUsageDescription" target="*-Info.plist">
      <string>Test camera usage</string>
    </config-file>
    
If the ios platform has already been added to the project, you must first remove it and then add it again for this change to take effect.
