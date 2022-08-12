const degToRad = (degrees) => {
  return degrees * (Math.PI / 180);
};

const mapRange = (value, inputMin, inputMax, outputMin, outputMax, clamp) => {
  // Reference:
  // https://openframeworks.cc/documentation/math/ofMath/
  if (Math.abs(inputMin - inputMax) < Number.EPSILON) {
    return outputMin;
  } else {
    var outVal =
      ((value - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) +
      outputMin;
    if (clamp) {
      if (outputMax < outputMin) {
        if (outVal < outputMax) outVal = outputMax;
        else if (outVal > outputMin) outVal = outputMin;
      } else {
        if (outVal > outputMax) outVal = outputMax;
        else if (outVal < outputMin) outVal = outputMin;
      }
    }
    return outVal;
  }
};

const randomRange = (min, max, skipZero = false) => {
  let number = Math.floor(Math.random() * (max - min + 1) + min);
  if (skipZero) {
    return number == 0 ? number + 1 : number;
  }
  return number;
};

const waitFor = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
