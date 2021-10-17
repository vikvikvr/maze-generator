import { ActionHandler, ThunkHandler } from 'types';

export const setImage: ThunkHandler<'fetchImage', 'success'> = (
  state,
  action,
) => ({
  ...state,
  ui: {
    ...state.ui,
    image: {
      ...action.payload,
      loading: false,
    },
  },
});

export const startLoading: ThunkHandler<'fetchImage', 'request'> = (state) => ({
  ...state,
  ui: {
    ...state.ui,
    image: {
      ...state.ui.image,
      loading: true,
    },
  },
});

export const stopLoading: ThunkHandler<'fetchImage', 'success' | 'failure'> = (
  state,
) => ({
  ...state,
  ui: {
    ...state.ui,
    image: {
      ...state.ui.image,
      loading: false,
    },
  },
});
