const draw = async () => {
  const canvas = document.getElementById("2");
  const context = canvas.getContext("2d");

  canvas.height = document.body.clientHeight;
  canvas.width = canvas.height;

  context.fillStyle = "#000";

  const cx = canvas.width * 0.5;
  const cy = canvas.height * 0.5;
  const w = canvas.width * 0.01;
  const h = canvas.height * 0.1;
  let x, y;

  const my_gradient = context.createLinearGradient(0, 0, w, h);
  my_gradient.addColorStop(0.33, "#FFF");
  my_gradient.addColorStop(0.66, "#EBEAEF");
  my_gradient.addColorStop(1, "#8F90A7");

  context.strokeStyle = my_gradient;

  const num = randomRange(10, 50);
  const radius = canvas.width * 0.3;

  for (let i = 0; i < num; i++) {
    const angle = degToRad(i * (360 / num));

    x = cx + radius * Math.sin(angle);
    y = cy + radius * Math.cos(angle);

    context.save();
    context.translate(x, y);
    context.rotate(-angle);
    context.scale(randomRange(0.1, 2), randomRange(0.2, 0.5));
    context.beginPath();
    context.rect(-w * 0.5, randomRange(0, h * 0.5), w, h);
    context.fill();
    context.restore();

    context.save();
    context.lineWidth = randomRange(5, 10);
    context.translate(cx, cy);
    context.rotate(-angle);
    context.beginPath();
    context.arc(
      0,
      0,
      randomRange(radius * 0.7, radius * 1.3),
      degToRad(360 / num) * randomRange(1, -8),
      degToRad(360 / num) * randomRange(1, 5)
    );
    context.stroke();
    context.restore();
  }
};

draw();
