/**
 * @see https://codepen.io/influxweb/pen/LpoXba
 */
export function getAverageRGB(imgEl: HTMLImageElement): number {
  const blockSize = 1; // only visit every X pixels
  const canvas = document.createElement('canvas');
  const context = canvas.getContext && canvas.getContext('2d');

  let data: any;
  let i = -4;

  const rgb = { r: 0, g: 0, b: 0 };
  let count = 0;

  if (!context) {
    return 0;
  }

  const height = (canvas.height =
    imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height);
  const width = (canvas.width =
    imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width);

  context.drawImage(imgEl, 0, 0);

  try {
    data = context.getImageData(0, 0, width, height);
  } catch (e) {
    return 0;
  }

  const length = data.data.length;

  while ((i += blockSize * 4) < length) {
    ++count;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  rgb.r = rgb.r / count;
  rgb.g = rgb.g / count;
  rgb.b = rgb.b / count;

  const average = (rgb.r + rgb.g + rgb.b) / 3;

  return Math.round(average);
}
