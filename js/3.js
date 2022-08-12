const canvas = document.getElementById("3");
const colors = ["#FFF", "#EBEAEF", "#8F90A7", "#F2F2F4"];
const context = canvas.getContext("2d");
const points = [];

let width;
let height;

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.velocity = new Vector(
      randomRange(-1, 2, true),
      randomRange(-2, 1, true)
    );
    this.radius = randomRange(4, 16);
    this.color = colors[randomRange(0, 3)];
  }

  draw(context) {
    context.save();
    context.lineWidth = 2;
    context.translate(this.pos.x, this.pos.y);
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.strokeStyle = this.color;
    context.fill();
    context.stroke();
    context.restore();
  }

  update() {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
  }

  bounce(w, h) {
    if (this.pos.x <= 0 || this.pos.x >= w) {
      this.velocity.x *= -1;
    }

    if (this.pos.y <= 0 || this.pos.y >= h) {
      this.velocity.y *= -1;
    }
  }
}

const draw = () => {
	context.fillStyle = "black";
	context.fillRect(0, 0, width, height);
  
	for (let i = 0; i < points.length; i++) {
	  const currentPoint = points[i];
  
	  for (let j = i + 1; j < points.length; j++) {
		const siblingPoint = points[j];
		const dist = currentPoint.pos.getDistance(siblingPoint.pos);
  
		if (dist > 120) continue;
		context.lineWidth = mapRange(dist, 0, 120, 10, 1);
		context.beginPath();
		context.moveTo(currentPoint.pos.x, currentPoint.pos.y);
		context.lineTo(siblingPoint.pos.x, siblingPoint.pos.y);
  
		context.strokeStyle = currentPoint.color;
		context.stroke();
	  }
	}
	points.forEach((p) => {
	  p.update();
	  p.draw(context);
	  p.bounce(width, height);
	});
	window.requestAnimationFrame(draw);
  }

const init = () => {
  canvas.height = document.body.clientHeight - 200;
  canvas.width = canvas.height;

  width = canvas.width;
  height = canvas.height;

  const num = randomRange(10, 50);
  for (let i = 0; i < num; i++) {
    const point = new Agent(
      randomRange(1, canvas.width),
      randomRange(1, height)
    );
    points.push(point);
  }

  window.requestAnimationFrame(draw);
}

init();
