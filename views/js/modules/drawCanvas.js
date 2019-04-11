const canvas = document.getElementById('canvas-hang');
const ctx = canvas.getContext('2d');

/* 

See https://en.wikipedia.org/wiki/Hangman_(game) for diagram as well
*/

export function createPole() {


  ctx.beginPath();
  ctx.strokeStyle = 'blue';
  //body
  ctx.moveTo(40, 25);
  ctx.lineTo(40, 100);

  ctx.lineTo(10, 145);
  ctx.moveTo(40, 100);

  ctx.lineTo(70, 145);

  ctx.moveTo(40, 25);
  ctx.lineTo(105, 10);

  ctx.lineTo(105, 55);

  ctx.stroke();
}


// createPole();

export function drawCanvas(aNumber) {
  createPole();
  if (canvas.getContext) {
    switch (aNumber) {
      case 6:
        // clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        break;
        case 5:
        //head
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(105, 65, 10, 0, Math.PI * 2, true); // Outer circle
        ctx.stroke();
        break;

      case 4:
        ctx.beginPath();
        ctx.strokeStyle = 'blue';
        //body
        ctx.moveTo(105, 75);
        ctx.lineTo(105, 100);
        ctx.stroke();
        break;
        case 3:
        //right arm
        ctx.beginPath();
        ctx.moveTo(105, 75);
        ctx.lineTo(125, 100);
        ctx.stroke();
        break;
      case 2:
        ctx.beginPath();
        //left arm
        ctx.moveTo(105, 75);
        ctx.lineTo(85, 100);
        ctx.stroke();
        break;
      case 1:
        ctx.beginPath();
        //right leg
        ctx.moveTo(105, 100);
        ctx.lineTo(130, 125);
        ctx.stroke();
        break;
      case 0:
        //left leg
        ctx.beginPath();
        ctx.moveTo(105, 100);
        ctx.lineTo(80, 125);
        ctx.stroke();
        break;
    }
  }
}


// export  drawCanvas;
// export createPole;




function draw2() {
  var canvas = document.getElementById('canvas-hang');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    switch (aNumber) {
      case 5:
        ctx.beginPath();
        ctx.strokeStyle = 'blue';
        //body
        ctx.moveTo(75, 75);
        ctx.lineTo(75, 100);
        ctx.stroke();
        break;
    }
    ctx.beginPath();
    ctx.strokeStyle = 'blue';

    //body
    ctx.moveTo(75, 75);
    ctx.lineTo(75, 100);

    //right leg
    ctx.moveTo(75, 100);
    ctx.lineTo(100, 125);

    //left leg
    ctx.moveTo(75, 100);
    ctx.lineTo(50, 125);

    //right arm
    ctx.moveTo(75, 75);
    ctx.lineTo(95, 100);

    //left arm
    ctx.moveTo(75, 75);
    ctx.lineTo(55, 100);

    // // // ctx.moveTo(75, 50);
    // ctx.arc(75, 50, 25, 0, Math.PI * 2, true); // Outer circle

    ctx.stroke();

    // ctx.arc(x, y, radius, startAngle, endAngle [, anticlockwise]);
    ctx.beginPath();
    ctx.arc(75, 50, 25, 0, Math.PI * 2, true); // Outer circle

    // ctx.moveTo(110, 75);
    // ctx.arc(75, 60, 10, 0, Math.PI, false);  // Mouth (clockwise)
    ctx.stroke()

    //  ctx.beginPath();
    // ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    // ctx.moveTo(110, 75);
    // ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
    // ctx.moveTo(65, 65);
    // ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
    // ctx.moveTo(95, 65);
    // ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
    // ctx.stroke();

    // ctx.beginPath();
    // ctx.strokeStyle = 'blue';
    // ctx.moveTo(20, 20);
    // ctx.lineTo(200, 20);
    // ctx.stroke();

    // // Second path
    // ctx.beginPath();
    // ctx.strokeStyle = 'green';
    // ctx.moveTo(20, 20);
    // ctx.lineTo(120, 120);
    // ctx.stroke();

  }
}