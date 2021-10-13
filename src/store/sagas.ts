import { fetchBase64Image } from 'api';
import { all, takeEvery, put } from 'redux-saga/effects';
import { API_URL } from 'shared';
import * as thunks from './thunks';

function* fetchImageWorker(
  action: ReturnType<typeof thunks.fetchImage.request>,
): any {
  const imageSize = action.payload.gridSize * action.payload.cellSize;

  const seed = Date.now().valueOf();

  const BASE_URL = `${API_URL}/seed/${seed}`;

  const regularUrl = `${BASE_URL}/${imageSize}/${imageSize}`;

  const blurredUrl = `${BASE_URL}/1920/1080?blur=8`;

  const [regular, blurred] = yield Promise.all([
    fetchBase64Image(regularUrl),
    fetchBase64Image(blurredUrl),
  ]);

  yield put(
    thunks.fetchImage.success({
      blurred,
      regular,
    }),
  );
}

function* fetchImageWatcher() {
  yield takeEvery(thunks.fetchImage.request, fetchImageWorker);
}

export function* rootSaga() {
  yield all([fetchImageWatcher()]);
}
