var builder;
var Tweens = ISOMERBUILDER.Tweens;
var outExpo = Tweens.outExpo;
var linear = Tweens.linear;

$(document).ready(function(){
  var Builder = ISOMERBUILDER.Builder;
  var Entity = ISOMERBUILDER.Entity;
  builder = new Builder('isomer-builder');

  //PIANO KEYBOARD

  builder.build([blockFour,
    blockTwo,
    blockThree,
    blockOne,
    createKey(2.5, 1200),
    createKey(1.95, 1400),
    createKey(1.4, 1600),
    createKey(0.85, 1800),
    createKey(0.3, 2000),
    createKey(-0.25, 2200),
    createKey(-0.8, 2400),
    createBlackKey(2.77, 2600),
    createBlackKey(2.22, 2800),
    createBlackKey(1.67, 3000),
    createBlackKey(0.57, 3200),
    createBlackKey(0.02, 3400),
    blockOne
    ]);
});

var blockOne = {
  scale: function(){ return {
    x: 0.5,
    y: 2.5,
    z: 1
  };},
  coords: function(current){ return {
    x:outExpo(current - this.startTime, -5, 3.6, 1000),
    y:0,
    z:2
  };},
  color: function(){
    return {
      r:20,
      g:20,
      b:20
    };
  },
  startTime: 200,
};

var blockTwo = {
  scale: function(){ return {
    x: 0.5,
    y: 2,
    z: 1
  };},
  coords: function(current){ return {
    x:outExpo(current - this.startTime, 7, -4, 1000),
    y:0,
    z:2
  };},
  color: function(){
    return {
      r:20,
      g:20,
      b: 20
    };
  },
  startTime:200,
};

var blockThree = {
  scale: function(){ return {
    x:4,
    y:2,
    z:0.5
  }; },
  coords: function(current){
    return{
      x:-1,
      y:0,
      z:outExpo(current - this.startTime, -4, 6, 1000)
    }
  },
  color: function(){
    return {
      r:20,
      g:20,
      b: 20
    };
  },
  startTime:200,
};

var blockFour = {
  scale: function(){
    return{
      x: 4.5,
      y:0.5,
      z:1,
    };
  },
  coords: function(current){
    return{
      x:-1,
      y:outExpo(current - this.startTime, 6, -4, 1000),
      z:2
    };
  },
  color: function(){
    return {
      r:20,
      g:20,
      b: 20
    };
  },
  startTime:200
};

function createKey(x,t){
  return {
    scale: function(){
      return {
        x:0.5,
        y:2,
        z:0.4
      };
    },
    coords: function(current){
      return{
        x:x,
        y:0,
        z:outExpo(current - t, 5, -2.5, 1000)
      };
    },
    color: function(){
      return {
        r:236,
        g:240,
        b:241
      };
    }
  };
};

function createBlackKey(x, t){
  return {
    scale: function(){
      return {
        x:0.25,
        y:1.5,
        z:0.1
      };
    },
    coords: function(current){
      return{
        x:x,
        y:0.9,
        z:outExpo(current - t, 5, -2.5, 1000)
      };
    },
    color: function(){
      return {
        r:20,
        g:20,
        b:20
      };
    },
    startTime: t,
  };
};
