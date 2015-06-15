#A Flicker React Client

## about
- reactjs (client react)
- “reapp run” to serve our app with ES6 and hot reloading
- Routing and requests packages
- Builds to Cordova(http://reapp.io/docs-builds.html)

## set up
```shellscript
sudo npm install -g reapp
cd reapp-flicker
npm install
reapp run
```
##build to ios
```shellscript
#files will be built to ./build/ios.
reapp build ios

#Install cordova cli
sudo npm install -g cordova

#Creating a new cordova project
cordova create flickr-cordova

#customize config.xml
cd flickr-cordova/
cordova platform add ios

#install cordova plugins
cordova plugin add com.telerik.plugins.wkwebview org.apache.cordova.console org.apache.cordova.device org.apache.cordova.inappbrowser org.apache.cordova.statusbar

#in current dir(cordova app)
rm -r www
#make a new symbol link
ln -s ../build/ios www

#prepare the app
cordova prepare

#Open the .xcodeproj in Xcode (it's in your platforms folder)
open ./platforms/ios/HelloCordova.xcodeproj
```

## documentation
This is the repository used to start new reapp apps from the CLI.

It's copied into a new folder when you run the command `reapp new`.

To see more documentation on reapp, try [our getting started docs](http://reapp.io/start.html).
