#Isomer Builder
NOTE: STILL UNDER HEAVY DEVELOPMENT, USE AT YOUR OWN RISK

An animation library for [Isomerjs](https://github.com/jdan/isomer)

Official project page is under construction

##About
Isomer Builder is a library that runs on top of isomerjs to enable animations.

Future working example:
ex: Make a single cube that descends down from z axis
```
var Builder = ISOMERBUILDER.Builder;
var Tween = ISOMERBUILDER.Tween;
var builder = new Builder('my-div-id');
var cube = {
  coods: function(t){
    return {
      x: Tween.outExpo('down', 1000),
      y: 0,
      z: 0
    };
  }
};
builder.build([cube]);
```

##Getting Started
First, grab a copy of isomer.min.js from [Isomerjs](https://github.com/jdan/isomer) or
```
bower install isomer
```
Now get a copy of isomer-builder.min.js and include both scripts
```
<script src="/path/to/isomer.min.js"></script>
<script src="/path/to/isomer-builder.min.js"></script>
```
Next, create a div with a set width and height.
```
<div id="isomer-builder-div" style="width:600px;height:400px"></div>
```
