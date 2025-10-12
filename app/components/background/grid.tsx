"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";

const Grid = () => {
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const gridAnimationFrameRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const gridCanvas = gridCanvasRef.current;
    if (!gridCanvas || dimensions.width === 0) return;

    const ctx = gridCanvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const gridSize = 60;
    const lineWidth = 1;

    const animateGrid = () => {
      timeRef.current += 0.008;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      ctx.strokeStyle = "rgba(60, 60, 60, 0.1)";
      ctx.lineWidth = lineWidth;

      for (let x = 0; x <= dimensions.width; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y <= dimensions.height; y += 5) {
          const distortion =
            Math.sin(y * 0.01 + timeRef.current + x * 0.005) * 8;
          const xPos = x + distortion;
          if (y === 0) {
            ctx.moveTo(xPos, y);
          } else {
            ctx.lineTo(xPos, y);
          }
        }
        ctx.stroke();
      }

      for (let y = 0; y <= dimensions.height; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x <= dimensions.width; x += 5) {
          const distortion =
            Math.sin(x * 0.01 + timeRef.current + y * 0.005) * 8;
          const yPos = y + distortion;
          if (x === 0) {
            ctx.moveTo(x, yPos);
          } else {
            ctx.lineTo(x, yPos);
          }
        }
        ctx.stroke();
      }

      gridAnimationFrameRef.current = requestAnimationFrame(animateGrid);
    };

    animateGrid();

    return () => {
      if (gridAnimationFrameRef.current) {
        cancelAnimationFrame(gridAnimationFrameRef.current);
      }
    };
  }, [dimensions]);

  return (
    <canvas
      ref={gridCanvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="fixed inset-0 pointer-events-none"
    />
  );
};

export { Grid };
