import React, { useEffect, useRef } from 'react';

export const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize handler
    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix Configuration
    const fontSize = 14;
    const columns = Math.ceil(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);
    
    // Characters: Hex + Matrix-like Katakana equivalent or numbers
    // Using numbers and tech-looking chars for "Structural Precision"
    const chars = "0123456789ABCDEF<>/\\*+=$"; 

    const draw = () => {
      // Trail effect: translucency paints over previous frame
      ctx.fillStyle = 'rgba(2, 6, 23, 0.1)'; // Matches slate-950 background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars.charAt(Math.floor(Math.random() * chars.length));

        // Color Logic: 
        // Mostly "Matrix Green" (#0ea5e9 is sky, let's use a tech green #10b981)
        // With occasional "Bright White/Cyan" highlights for activity
        const isHighlight = Math.random() > 0.98;
        
        if (isHighlight) {
          ctx.fillStyle = '#ffffff'; // Sparkle
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#ffffff';
        } else {
          // Gradient between Brand Cyan and Matrix Green
          ctx.fillStyle = Math.random() > 0.5 ? '#14b8a6' : '#22c55e'; 
          ctx.shadowBlur = 0;
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly after it has crossed the screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33); // ~30FPS

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full opacity-90 mix-blend-screen"
    />
  );
};