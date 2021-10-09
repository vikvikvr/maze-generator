import { FetchImageRequestPayload, FetchImageSuccessPayload } from 'types';
import { createAsyncAction } from 'typesafe-actions';

export const fetchImage = createAsyncAction(
  'fetch-image/REQUEST',
  'fetch-image/SUCCESS',
  'fetch-image/FAILURE',
)<FetchImageRequestPayload, FetchImageSuccessPayload>();
