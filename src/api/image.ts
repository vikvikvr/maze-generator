type PicsumResponse = {
  url: string;
};

type FetchImageOptions = {
  gridSize: number;
};

const GET_IMAGE_URL = 'https://picsum.photos/seed/';

export async function fetchImage({ gridSize }: FetchImageOptions) {
  const seed = Date.now();

  const urlSmall = `${GET_IMAGE_URL}/${seed}/${gridSize * 20}/${gridSize * 20}`;
  const urlBig = `${GET_IMAGE_URL}/${seed}/1920/1080?blur=8`;

  const [{}, res2] = await Promise.all([fetch(urlSmall), fetch(urlBig)])

  let response: PicsumResponse = await fetch(urlSmall);
  let response2 = await fetch(urlBig);
}

// await sleep(500);
// $('#maze').css('width', gridSize * 20);
// $('#maze').css('height', gridSize * 20);
// let grid;
// while (true) {
//   $(document.body).css('background', `url(${response2.url})`);
//   imageUrl = response.url;
//   grid = createGridStructure(gridSize);
//   await makeMaze(grid, renderGrid);
// }
