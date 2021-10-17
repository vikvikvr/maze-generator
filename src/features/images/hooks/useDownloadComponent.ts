import { exportComponentAsPNG } from 'react-component-export-image';
import { useCallback } from 'react';

export function useDownloadComponent(ref: React.RefObject<HTMLCanvasElement>) {
  const download = useCallback(() => {
    exportComponentAsPNG(ref, { fileName: 'maze.png' });
  }, [ref]);

  return {
    download,
  };
}
