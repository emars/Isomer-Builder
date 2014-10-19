var canvas;
var iso;
var cubes;
var motionFn = function(t){
  //Should return a quadratic value that starts fast and starts goin slow
  var res = ((8 - t)*Math.sqrt(t));
  return res;
};

$(document).ready(function(){
  canvas = document.getElementById('isomer-test');
  var ctx = canvas.getContext('2d');
  iso = new Isomer(document.getElementById('isomer-test'));
  var Point = Isomer.Point;
  var Path = Isomer.Path;
  var Shape = Isomer.Shape;
  var Color = Isomer.Color;
  var cube = Shape.Prism(Point.ORIGIN).scale(Point.ORIGIN,0.25,0.25,0.25);
  var blue = new Isomer.Color(50, 60, 160);


  var Cube = function(points, startTime, color){
    this.points = points;
    this.startTime = startTime;
    this.color = color;
  };

  // t: current time, b: begInnIng value, c: change In value, d: duration
  var easeOutExpo = function (t, b, c, d) {
    return (t>=d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  };

  var renderCubes = function(cubes, time){
    for(var i = 0; i < cubes.length; i++){
      var currentCube = cubes[i];
      var points = currentCube.points;
      if (currentCube.startTime < time){
          iso.add(cube.translate(points.x, points.y, easeOutExpo(time - currentCube.startTime, 5, -5,1)), currentCube.color);
      }
    }
  };


  var createCubes = function(n){
    var cubes = [];
    var startTime = 0;
    for(var i= n; i > 0; i-=0.25){
      cubes.push(new Cube({x:i, y:0, z:0}, startTime, blue));
      startTime += 0.1;
    }
    startTime = 0;
    for(var i = n; i > 0; i-=0.25){
      cubes.push(new Cube({x:0, y:i, z:0}, startTime, blue));
      startTime += 0.1;
    }
    for(var i = n; i > 0; i-= 0.25){
      cubes.push(new Cube({x:(n+0.5), y:i, z:0}, startTime, blue));
      startTime += 0.1;
    }
    for(var i = n; i > 0; i-= 0.25){
      cubes.push(new Cube({x:i, y:(n+0.5), z:0}, startTime, blue));
      startTime += 0.1;
    }
    return cubes;
  };



  var time = 0.01;
  cubes = createCubes();

  var scene = function(){
    canvas.width = canvas.width;
    renderCubes(createCubes(5), time);
    time += 1.0/30;
  };


  setInterval(scene, 1000/30);



});
