const draw = async () => {
  const canvas = document.getElementById("1");
  const context = canvas.getContext("2d");

  canvas.height = document.body.clientHeight;
  canvas.width = canvas.height;

  context.fillStyle = "#000";
  context.strokeStyle = "#FFF";
  context.lineWidth = 4;

  const squareWidth = canvas.width * 0.1;
  const squareHeight = canvas.height * 0.1;
  const gap = canvas.width * 0.03;
  const ix = canvas.width * 0.17;
  const iy = canvas.height * 0.17;

  while (true) {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const x = ix + (squareWidth + gap) * i;
        const y = iy + (squareHeight + gap) * j;

        context.beginPath();
        context.rect(x, y, squareWidth, squareHeight);
        context.stroke();

        if (Math.random() > 0.5) {
          context.fillStyle = "#FFF";
          const size = randomRange(6, 26);
          context.beginPath();
          context.rect(
            x + size,
            y + size,
            squareWidth - size * 2,
            squareHeight - size * 2
          );
          context.fill();
        }
      }
    }
    await waitFor(1000);
  }
};

draw();
