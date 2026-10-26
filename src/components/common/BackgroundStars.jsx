import { useEffect, useRef } from "react";

/**
 * High-performance cosmic background with canvas-driven twinkling stars,
 * shooting stars, nebula glows, and floating celestial hearts.
 */
export default function BackgroundStars({ reducedMotion = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Generate stars
    const starCount = Math.floor(Math.min(width, 1600) * 0.12);
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      speed: (Math.random() * 0.02 + 0.005) * (reducedMotion ? 0.2 : 1),
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
      color:
        Math.random() > 0.7
          ? "#fde047" // subtle gold
          : Math.random() > 0.4
          ? "#c084fc" // lavender
          : "#ffffff", // white
    }));

    // Floating glowing particles / hearts
    const heartCount = reducedMotion ? 4 : 12;
    const hearts = Array.from({ length: heartCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 8,
      speedY: (Math.random() * 0.4 + 0.15) * (reducedMotion ? 0.1 : 1),
      speedX: (Math.sin(Math.random() * Math.PI) * 0.2) * (reducedMotion ? 0.1 : 1),
      alpha: Math.random() * 0.35 + 0.1,
      angle: Math.random() * 360,
    }));

    // Shooting stars
    const shootingStars = [];
    const maybeSpawnShootingStar = () => {
      if (reducedMotion) return;
      if (Math.random() < 0.015 && shootingStars.length < 2) {
        shootingStars.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * height * 0.4,
          length: Math.random() * 100 + 60,
          speed: Math.random() * 9 + 8,
          angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
          alpha: 1,
        });
      }
    };

    // Draw heart path helper
    const drawHeart = (c, x, y, size, alpha) => {
      c.save();
      c.translate(x, y);
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      c.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      c.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size * 1.2);
      c.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      c.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      c.closePath();
      c.fillStyle = `rgba(244, 114, 182, ${alpha})`;
      c.shadowColor = "#f472b6";
      c.shadowBlur = 8;
      c.fill();
      c.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep space gradient backdrop
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.8
      );
      bgGrad.addColorStop(0, "#16192b");
      bgGrad.addColorStop(0.5, "#0e1322");
      bgGrad.addColorStop(1, "#070a12");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Cosmic nebula soft glows
      const nebula1 = ctx.createRadialGradient(width * 0.25, height * 0.3, 0, width * 0.25, height * 0.3, width * 0.35);
      nebula1.addColorStop(0, "rgba(192, 132, 252, 0.08)");
      nebula1.addColorStop(1, "rgba(192, 132, 252, 0)");
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, width, height);

      const nebula2 = ctx.createRadialGradient(width * 0.75, height * 0.6, 0, width * 0.75, height * 0.6, width * 0.4);
      nebula2.addColorStop(0, "rgba(244, 114, 182, 0.06)");
      nebula2.addColorStop(1, "rgba(244, 114, 182, 0)");
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, width, height);

      // Render Stars
      stars.forEach((star) => {
        star.alpha += star.speed * star.twinkleDir;
        if (star.alpha > 0.95) {
          star.alpha = 0.95;
          star.twinkleDir = -1;
        } else if (star.alpha < 0.15) {
          star.alpha = 0.15;
          star.twinkleDir = 1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = star.radius > 1.2 ? 6 : 2;
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Render Floating Hearts
      hearts.forEach((h) => {
        h.y -= h.speedY;
        h.x += h.speedX;
        if (h.y < -30) {
          h.y = height + 30;
          h.x = Math.random() * width;
        }
        drawHeart(ctx, h.x, h.y, h.size, h.alpha);
      });

      // Render Shooting Stars
      maybeSpawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.015;

        if (s.alpha <= 0 || s.x > width || s.y > height) {
          shootingStars.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;
        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, "rgba(255, 255, 255, 0)");
        grad.addColorStop(1, `rgba(255, 255, 255, ${s.alpha})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.shadowColor = "#fde047";
        ctx.shadowBlur = 10;
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
