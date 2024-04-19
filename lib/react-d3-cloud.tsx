import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";
import { type Word } from "../src/vite-env";
import useSize from "../src/useSize";

interface IWordDiv {
  width?: string;
  height?: string;
}

interface reactD3CloudProps extends IWordDiv {
  words: string[];
}

export const ReactD3Cloud = ({
  words,
  width = "100%",
  height = "500px",
}: reactD3CloudProps) => {
  const d3cloudRef = useRef<HTMLDivElement>(null);
  const domSize = useSize(d3cloudRef);
  const memoizedWords = useMemo(
    () => words.map((item) => item as Word),
    [words]
  );

  useEffect(() => {
    d3.select(d3cloudRef.current).select("svg").remove();
    cloud()
      .size([domSize?.width || 0, domSize?.height || 0]) // 词云大小
      .padding(5)
      .words(memoizedWords)
      // 旋转
      .rotate(() => 0)
      // 文字大小
      .fontSize((d: Word) => d.size)
      .font("Impact")
      .on("end", (words) => {
        const svg = d3
          .select(d3cloudRef.current)
          .append("svg")
          .attr("width", domSize?.width || 0)
          .attr("height", domSize?.height || 0);
        const g = svg
          .append("g")
          .attr("width", domSize?.width || 0)
          .attr("height", domSize?.height || 0)
          .attr(
            "transform",
            `translate(${(domSize?.width || 0) / 2},${
              (domSize?.height || 0) / 2
            })`
          );
        g.selectAll("text")
          .data(words)
          .enter()
          .append("text")
          .style("font-size", (d) => `${d.size}px`)
          .style("cursor", "pointer")
          .attr("text-anchor", "middle") // 默认居中
          .attr(
            "fill",
            () =>
              "rgb(" +
              [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
              ].join(",") +
              ")"
          )
          .attr(
            "transform",
            (d) => `translate(${d.x}, ${d.y})rotate(${d.rotate})`
          )
          .text((d) => d.text || "");
      })
      .start();
  }, [domSize, memoizedWords]);

  if (!domSize) {
    return null;
  }

  return (
    <>
      <div
        ref={d3cloudRef}
        style={{
          width,
          height,
        }}></div>
    </>
  );
};
