import { exportComponentAsPNG } from 'react-component-export-image';
import { useRef, useCallback, ReactInstance } from 'react';

export function useDownloadComponent<I extends ReactInstance>() {
  const ref = useRef<I>(null);

  const download = useCallback(() => {
    exportComponentAsPNG(ref, { fileName: 'maze.png' });
  }, []);

  return {
    ref,
    download,
  };
}
