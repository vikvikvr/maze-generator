import { CELL_SIZE } from 'shared/constants';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getImage, thunks } from 'store';
import { useSettings } from './useSettings';

export function useUi() {
  const dispatch = useDispatch();

  const { settings } = useSettings();

  const image = useSelector(getImage());

  const fetchImage = useCallback(() => {
    dispatch(
      thunks.fetchImage.request({
        cellSize: CELL_SIZE,
        gridSize: settings.gridSize,
      }),
    );
  }, [dispatch, settings.gridSize]);

  return {
    image,
    fetchImage,
  };
}
