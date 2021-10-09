import { MAZE_OPTIONS } from 'components/App';
import { CELL_SIZE } from 'components/Cell';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getImage, thunks } from 'store';

export function useUi() {
  const dispatch = useDispatch();

  const image = useSelector(getImage());

  const fetchImage = useCallback(() => {
    dispatch(
      thunks.fetchImage.request({
        cellSize: CELL_SIZE,
        gridSize: MAZE_OPTIONS.gridSize,
      }),
    );
  }, [dispatch]);

  return {
    image,
    fetchImage,
  };
}
