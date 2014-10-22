var builder;

$(document).ready(function(){
  var div = document.getElementById('isomer-builder');
  builder = new IsomerBuilder(div);
  builder.build(createPoints());
});



function createRowX(length, direction, y, z, size){

}



function createPoints(){
    var points = [];
    for (var j = -1; j < 1; j+=0.25){
        for (var i = 3; i > 0; i-=0.25){
          var point = {
            x: i,
            y: 3,
            z: j
          };
          points.push(point);
        }
        for (i = 2.75; i > 0; i-=0.25){
          var point = {
            x:3,
            y:i,
            z:j
          };
          points.push(point);
        }
        for (i = 3; i > -0; i-=0.25){
          var point = {
            x:0,
            y:i,
            z:j
          };
          points.push(point);
        }
        for (var i = 3; i > -0.25; i-=0.25){
          var point = {
            x: i,
            y: 0,
            z: j
          };
          points.push(point);
        }

    }
    return points;
}
