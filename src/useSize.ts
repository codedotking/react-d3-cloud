import ResizeObserver from "resize-observer-polyfill";
import { useEffect, useState, type RefObject } from "react";

type Size = { width: number; height: number };

function useSize(target: RefObject<Element>): Size | undefined {
  const [state, setState] = useState<Size>({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    if (!target.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { clientWidth, clientHeight } = entry.target;
        setState({ width: clientWidth, height: clientHeight });
      });
    });
    resizeObserver.observe(target.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [target]);
  return state;
}

export default useSize;
