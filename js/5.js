let text = "5";
let fontSize = 800;
const fontFamily = "Consolas, monaco, monospace";

const typeCanvas = document.createElement("canvas");
const typeContext = typeCanvas.getContext("2d");

const draw = async () => {
  var canvas = document.getElementById("5");
  canvas.height = document.body.clientHeight;
  canvas.width = canvas.height;

  const width = canvas.width;
  const height = canvas.height;

  const cell = 20;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;
  typeCanvas.width = cols;
  typeCanvas.height = rows;

  fontSize = cols;

  var context = typeContext; // canvas.getContext("2d");
  context.fillStyle = "#000";
  context.strokeStyle = "#FFF";
  context.fillRect(0, 0, cols, rows);

  context.fillStyle = "#FFF";
  context.font = `${fontSize}px ${fontFamily}`;
  context.textBaseline = "top";

  const dims = context.measureText(text);
  const dimx = dims.actualBoundingBoxLeft * -1;
  const dimy = dims.actualBoundingBoxAscent * -1;
  const dimw = dims.actualBoundingBoxLeft + dims.actualBoundingBoxRight;
  const dimh = dims.actualBoundingBoxAscent + dims.actualBoundingBoxDescent;

  const x = (cols - dimw) * 0.5 - dimx;
  const y = (rows - dimh) * 0.5 - dimy;

  context.save();
  context.translate(x, y);

  context.beginPath();
  context.rect(dimx, dimy, dimw, dimh);
  context.fillText(text, 0, 0);
  context.restore();

  const typeData = typeContext.getImageData(0, 0, cols, rows).data;

  const originalContex = canvas.getContext("2d");
  originalContex.textBaseline = "middle";
  originalContex.textAlign = "center";

  for (let i = 0; i < numCells; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);

    const ix = col * cell;
    const iy = row * cell;

    const r = typeData[i * 4];
    const g = typeData[i * 4 + 1];
    const b = typeData[i * 4 + 2];

    const glyph = getGlyph(r);
    originalContex.font = `${cell * 2}px ${fontFamily}`;
    if (Math.random() < 0.1)
      originalContex.font = `${cell * 4}px ${fontFamily}`;

    originalContex.fillStyle = `rgb(${r}, ${g}, ${b})`;

    originalContex.save();
    originalContex.translate(ix, iy);
    originalContex.translate(cell * 0.5, cell * 0.5);

    originalContex.fillText(glyph, 0, 0);

    originalContex.restore();
  }
};

const getGlyph = (v) => {
  if (v < 50) return "";
  if (v < 100) return ".";
  if (v < 150) return "-";
  if (v < 200) return "+";

  const glyphs = "_=/".split("");

  return glyphs[randomRange(0, glyphs.length - 1)];
};

const onKeyUp = async (e) => {
	if (e.key.length == 1) {
	  text = e.key;
	  draw();
	}
};

document.addEventListener("keyup", onKeyUp);
draw();
