let frameCount = 1;
const draw = async () => {
  const canvas = document.getElementById("4");
  const context = canvas.getContext("2d");

  canvas.height = document.body.clientHeight;
  canvas.width = canvas.height;

  context.fillStyle = "#000";

  const cols = document.getElementById("colCountSlider").value;
  const rows = document.getElementById("rowsCountSlider").value;
  const cells = cols * rows;

  const gridWidth = canvas.width * 0.8;
  const gridHeight = canvas.height * 0.8;
  const cellWidth = gridWidth / cols;
  const cellHeight = gridHeight / rows;

  const marginX = (canvas.width - gridWidth) * 0.5;
  const marginY = (canvas.height - gridHeight) * 0.5;

  for (let i = 0; i < cells; i++) {
    const currentCol = i % cols;
    const currentRow = Math.floor(i / cols);

    const x = currentCol * cellWidth;
    const y = currentRow * cellHeight;
    const w = cellWidth * 0.8;
    const h = cellHeight * 0.8;
    const frequency = document.getElementById("frequencySlider").value;
    const amplitude = document.getElementById("amplitudeSlider").value;
    const n = noise.simplex3(x * frequency, y * frequency, frameCount / 300);
    const angle = n * Math.PI * amplitude;
    const scale = mapRange(n, -1, 1, 1, 20, false);

    context.save();
    context.strokeStyle = "#fff";
    context.translate(x, y);
    context.translate(marginX, marginY);
    context.translate(cellWidth * 0.5, cellHeight * 0.5);
    context.rotate(angle);
    context.lineWidth = scale;
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(w * -0.5, 0);
    context.lineTo(w * 0.5, 0);
    context.stroke();
    context.restore();
  }
  frameCount++;
  window.requestAnimationFrame(draw);
};

draw();
