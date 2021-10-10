import { all, takeEvery, put } from 'redux-saga/effects';
import * as thunks from './thunks';

function* fetchImageWorker(
  action: ReturnType<typeof thunks.fetchImage.request>,
) {
  const imageSize = action.payload.gridSize * action.payload.cellSize;

  const seed = Date.now().valueOf();

  const BASE_URL = 'https://picsum.photos/seed';

  const regularUrl = `${BASE_URL}/${seed}/${imageSize}/${imageSize}`;

  const blurredUrl = `${BASE_URL}/${seed}/1920/1080?blur=8`;

  yield Promise.all([fetch(blurredUrl), fetch(regularUrl)]);

  yield put(
    thunks.fetchImage.success({
      blurred: blurredUrl,
      regular: regularUrl,
    }),
  );
}

function* fetchImageWatcher() {
  yield takeEvery(thunks.fetchImage.request, fetchImageWorker);
}

export function* rootSaga() {
  yield all([fetchImageWatcher()]);
}
