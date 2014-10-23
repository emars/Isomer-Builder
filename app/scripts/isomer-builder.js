var IsomerBuilder = function(div){
  this.div = div;
  var Point = Isomer.Point;
  var Path = Isomer.Path;
  var Shape = Isomer.Shape;
  var Color = Isomer.Color;
  var self = this;
  this.bg = document.createElement('canvas');
  this.bg.width = 800;
  this.bg.height = 600;
  this.bg.style.position = "absolute";
  this.bg.ctx = this.bg.getContext('2d');
  this.bg.ctx.fillRect(0,0,800,600,"#000000");
  this.bg.style["z-index"] = "0";
  this.fg = document.createElement('canvas');
  this.fg.width = 800;
  this.fg.height = 600;
  this.fg.style.position = "absolute";
  this.fg.style["z-index"] = "1";
  div.appendChild(this.fg);
  div.appendChild(this.bg);
  this.isobg = new Isomer(this.bg);
  this.isofg = new Isomer(this.fg);

  var Cube = function(coords, startTime, color, scale){
    this.coords = coords;
    this.startTime = startTime;
    this.color = color;
    this.scale = scale;
  };

  this._buildShape = function(cube, t){
    return self._settings.shape.scale(Point.ORIGIN,
      cube.scale.x,
      cube.scale.y,
      cube.scale.z)
      .translate(cube.coords.x, cube.coords.y,
      self._settings.easing(t - cube.startTime,5,-5+cube.coords.z,1));
  };

  this._placeShape = function(cube){
    return self._settings.shape.scale(Point.ORIGIN,
      cube.scale.x,
      cube.scale.y,
      cube.scale.z)
      .translate(cube.coords.x, cube.coords.y, cube.coords.z);
  };

  this._render = function(cubes, elapsedTime){
    var removefg = [];
    for(var i = 0; i < self.cubes.length; i++){
      var currentCube = self.cubes[i];
      if (elapsedTime > currentCube.startTime){
        self.isofg.add(self._buildShape(currentCube, elapsedTime), self._settings.color);
      }
      if (elapsedTime > (currentCube.startTime + 1)){
        self.isobg.add(self._placeShape(currentCube))
        removefg.push(i);
      }
    };
    for(var i = 0; i < removefg.length; i++){
      self.cubes.splice(removefg[i], 1);
    }
  };

  this._scene = function(){
    self.canvas.width = self.canvas.width;
    self._render(self.shapes, self.time);
    self.time += 1.0 / self._settings.fps;
  };


  this.build = function(shapes, settings){
    //declare default settings
    if (typeof settings === 'undefined'){
      var settings = {
        color: new Isomer.Color(50, 60, 160),
        scale:{
          x: 1,
          y: 1,
          z: 1
        } ,
        shape: Shape.Prism(Point.ORIGIN, new Isomer.Color(50, 60, 160)),
        //easeOutExpo
        easing: function (t, b, c, d) {
          return (t>=d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },


        interval: 0.10,
        fps: 30
      };
    }

    self.time = 0;
    self._settings = settings;

    self.cubes = [];
    self.timeCounter = 0;
    for (var i = 0; i < shapes.length; i++){
      var p = shapes[i];
      var coords = {
        x: p.x,
        y: p.y,
        z: p.z
      };
      if (! p.scale){
        p.scale = {
          x: 0.25,
          y: 0.25,
          z: 0.25
        };
      }
      self.cubes.push(new Cube(coords, self.timeCounter, self._settings.color, p.scale));
      self.timeCounter += self._settings.interval;
    }


    self.totalTime = 0;
    var time;
    var draw = function(){
      requestAnimationFrame(draw);
      var now = new Date().getTime(),
          dt = now - (time || now);

      time = now;
      self.time += parseFloat(dt) / 1000;
      self.fg.width = self.fg.width;
      self._render(self.shapes, self.time);
    }

    draw();
  };

  this.stop = function(){
    clearInterval(self._intervalId);
  };
};
