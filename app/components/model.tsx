"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";

// Define a type for animated ASCII characters
type AnimatedChar = {
  char: string;
  color: string;
  originalX: number;
  originalY: number;
  currentX: number;
  currentY: number;
  velocityX: number;
  velocityY: number;
  floatOffsetX: number;
  floatOffsetY: number;
};

const Model = () => {
  // Set document background to black for portfolio
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.style.backgroundColor = "black";
      document.body.style.backgroundColor = "black";
    }

    return () => {
      if (typeof document !== "undefined") {
        document.documentElement.style.backgroundColor = "";
        document.body.style.backgroundColor = "";
      }
    };
  }, []);

  // Fixed configuration for portfolio background
  const resolution = 0.17;

  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [asciiArt, setAsciiArt] = useState<string>("");
  const [animatedChars, setAnimatedChars] = useState<AnimatedChar[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const asciiContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const outputCanvasRef = useRef<HTMLCanvasElement>(null);
  // Initialize component
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    loadDefaultImage();
  }, [isHydrated]);

  useEffect(() => {
    if (imageLoaded && imageRef.current) {
      convertToAscii();
    }
  }, [imageLoaded]);

  // Load default image for portfolio background
  const loadDefaultImage = () => {
    setLoading(true);
    setError(null);
    setImageLoaded(false);

    const img = new Image();

    img.onload = () => {
      if (img.width === 0 || img.height === 0) {
        setError("Invalid image dimensions");
        setLoading(false);
        return;
      }

      imageRef.current = img;
      setImageLoaded(true);
      setLoading(false);
    };

    img.onerror = () => {
      setError("Failed to load image from /img/ascii2.png");
      setLoading(false);
    };

    img.src = "/img/ascii2.png";
  };

  // Canvas rendering function for animated ASCII
  const renderToCanvas = () => {
    if (!outputCanvasRef.current || animatedChars.length === 0) return;

    const canvas = outputCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Calculate font size to make the ASCII art take up full viewport height
    const targetHeight = window.innerHeight;
    const estimatedRows = asciiArt.split("\n").length;
    const fontSize = Math.max(Math.floor(targetHeight / estimatedRows), 8);

    // Set canvas dimensions based on original layout (not current positions)
    const charWidth = fontSize * 0.6;
    const lineHeight = fontSize;

    // Calculate fixed canvas size based on original character positions
    let maxOriginalX = 0,
      maxOriginalY = 0;
    animatedChars.forEach((char) => {
      maxOriginalX = Math.max(maxOriginalX, char.originalX + charWidth);
      maxOriginalY = Math.max(maxOriginalY, char.originalY + lineHeight);
    });

    canvas.width = maxOriginalX;
    canvas.height = maxOriginalY;

    // Clear canvas with transparent background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set font properties
    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = "top";

    // Render each animated character with padding offset
    animatedChars.forEach((char) => {
      ctx.fillStyle = char.color;
      ctx.fillText(char.char, char.currentX, char.currentY);
    });
  };

  // Animation loop for floating and repel effects
  useEffect(() => {
    if (!imageLoaded || animatedChars.length === 0) return;

    const animate = () => {
      // Update character positions
      setAnimatedChars((prevChars) =>
        prevChars.map((char) => {
          const time = Date.now() * 0.001; // Convert to seconds

          // More aggressive floating animation with varied speeds
          const timeVariation = time * (1 + char.floatOffsetX * 0.3); // Each char has slightly different speed
          const floatX = Math.sin(timeVariation + char.floatOffsetX) * 6; // Increased from 2 to 6
          const floatY = Math.cos(timeVariation * 1.5 + char.floatOffsetY) * 4; // Increased from 1.5 to 4, speed from 0.8 to 1.5

          let targetX = char.originalX + floatX;
          let targetY = char.originalY + floatY;

          // Mouse repel effect
          if (isHovering && asciiContainerRef.current) {
            const containerRect =
              asciiContainerRef.current.getBoundingClientRect();
            const charScreenX = containerRect.left + char.currentX;
            const charScreenY = containerRect.top + char.currentY;

            const dx = mousePosition.x - charScreenX;
            const dy = mousePosition.y - charScreenY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const repelRadius = 150; // Increased from 100 to 150

            if (distance < repelRadius) {
              const force = (repelRadius - distance) / repelRadius;
              const repelX = (dx / distance) * force * -60; // Increased from -30 to -60
              const repelY = (dy / distance) * force * -60; // Increased from -30 to -60

              targetX = char.originalX + floatX + repelX;
              targetY = char.originalY + floatY + repelY;
            }
          }

          // Smooth movement towards target
          const ease = 0.05;
          const newVelocityX = (targetX - char.currentX) * ease;
          const newVelocityY = (targetY - char.currentY) * ease;

          return {
            ...char,
            currentX: char.currentX + newVelocityX,
            currentY: char.currentY + newVelocityY,
            velocityX: newVelocityX,
            velocityY: newVelocityY,
          };
        })
      );

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [imageLoaded, animatedChars.length, isHovering, mousePosition]);

  // Separate effect to render canvas whenever animatedChars changes
  useEffect(() => {
    renderToCanvas();
  }, [animatedChars]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const convertToAscii = () => {
    try {
      if (!canvasRef.current || !imageRef.current) {
        throw new Error("Canvas or image not available");
      }

      const img = imageRef.current;

      // Validate image dimensions
      if (img.width === 0 || img.height === 0) {
        throw new Error("Invalid image dimensions");
      }

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Could not get canvas context");
      }

      // Calculate dimensions based on resolution
      const width = Math.floor(img.width * resolution);
      const height = Math.floor(img.height * resolution);

      // Set canvas dimensions to match the image
      canvas.width = img.width;
      canvas.height = img.height;

      // Clear the canvas first
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw image to canvas
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Get image data - this is where the error was occurring
      let imageData;
      try {
        imageData = ctx.getImageData(0, 0, img.width, img.height);
      } catch (e) {
        throw new Error(
          "Failed to get image data. This might be a CORS issue."
        );
      }

      const data = imageData.data;

      // Choose character set - using standard for portfolio
      const chars = " .:-=+*#%@";

      // Calculate aspect ratio correction for monospace font
      const fontAspect = 0.5; // Width/height ratio of monospace font characters
      const widthStep = Math.ceil(img.width / width);
      const heightStep = Math.ceil(img.height / height / fontAspect);

      // Calculate font size for proper scaling
      const targetHeight = window.innerHeight;
      const estimatedRows = Math.ceil(img.height / heightStep);
      const fontSize = Math.max(Math.floor(targetHeight / estimatedRows), 6);
      const charWidth = fontSize * 0.6;
      const lineHeight = fontSize;

      let result = "";
      const newAnimatedChars: AnimatedChar[] = [];
      let rowIndex = 0;

      // Process the image
      for (let y = 0; y < img.height; y += heightStep) {
        let colIndex = 0;

        for (let x = 0; x < img.width; x += widthStep) {
          const pos = (y * img.width + x) * 4;

          const r = data[pos];
          const g = data[pos + 1];
          const b = data[pos + 2];

          // Calculate brightness using standard grayscale calculation
          const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;

          // Map brightness to character
          const charIndex = Math.floor(brightness * (chars.length - 1));
          const char = chars[charIndex];

          // Skip spaces to reduce DOM elements
          if (char !== " ") {
            const originalX = colIndex * charWidth;
            const originalY = rowIndex * lineHeight;

            // Create animated character with random floating offset
            const animatedChar: AnimatedChar = {
              char,
              color: "white", // Fixed to white for portfolio background
              originalX,
              originalY,
              currentX: originalX,
              currentY: originalY,
              velocityX: 0,
              velocityY: 0,
              floatOffsetX: Math.random() * 6 - 3,
              floatOffsetY: Math.random() * 6 - 3,
            };

            newAnimatedChars.push(animatedChar);
          }

          result += char;
          colIndex++;
        }

        result += "\n";
        rowIndex++;
      }

      setAsciiArt(result);
      setAnimatedChars(newAnimatedChars);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      setAsciiArt("");
      setAnimatedChars([]);
    }
  };

  return (
    <div className="fixed top-0 right-0 z-20 min-h-screen text-white opacity-50">
      <div className="min-h-screen overflow-hidden select-none">
        <div className="flex-1 bg-transparent overflow-hidden flex items-center justify-center relative">
          {/* Hidden canvas for image processing */}
          <canvas ref={canvasRef} style={{ display: "none" }} />

          {loading ? (
            <div className="text-white font-mono select-none">
              Loading image...
            </div>
          ) : error ? (
            <div className="text-red-400 font-mono p-4 text-center select-none">
              {error}
              <div className="mt-2 text-white text-sm">
                Try refreshing the page.
              </div>
            </div>
          ) : (
            <div
              ref={asciiContainerRef}
              className="relative select-text font-mono xl:-left-24 z-30 md:-top-12 w-screen md:w-[70vw] lg:w-[60vw] xl:w-[40vw] h-[100vh] flex items-center justify-center"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <canvas
                ref={outputCanvasRef}
                className="max-w-full max-h-full select-text"
                style={{
                  backgroundColor: "transparent",
                  objectFit: "contain",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { Model };
