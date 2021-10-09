import { useSelector } from 'react-redux';
import { getImageId } from 'store';

export function useUi() {
  const imageId = useSelector(getImageId());

  return {
    imageId,
  };
}
