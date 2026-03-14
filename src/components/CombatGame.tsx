import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, RotateCcw, ShieldAlert, Zap } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

interface Enemy {
  id: number;
  pos: Point;
  size: number;
  speed: number;
  color: string;
  isPopping: boolean;
}

type GameState = 'START' | 'PLAYING' | 'GAMEOVER';

export const CombatGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('START');
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [shake, setShake] = useState(false);

  // Refs for high-performance tracking (avoids React re-renders)
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerPos = useRef<Point>({ x: 0, y: 0 });
  const enemies = useRef<Enemy[]>([]);
  const requestRef = useRef<number>(0);
  const lastSpawnTime = useRef<number>(0);
  const nextId = useRef<number>(0);

  // Handle mouse movement to update player position
  const handleMouseMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      playerPos.current = {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }
  }, []);

  const spawnEnemy = (width: number, height: number) => {
    const side = Math.floor(Math.random() * 4);
    let x = 0, y = 0;
    
    // Spawn at edges
    if (side === 0) { x = Math.random() * width; y = -20; } // Top
    else if (side === 1) { x = width + 20; y = Math.random() * height; } // Right
    else if (side === 2) { x = Math.random() * width; y = height + 20; } // Bottom
    else { x = -20; y = Math.random() * height; } // Left

    const size = 20 + Math.random() * 20;
    const speed = 1 + Math.random() * 2;
    
    enemies.current.push({
      id: nextId.current++,
      pos: { x, y },
      size,
      speed,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      isPopping: false
    });
  };

  const update = (time: number) => {
    if (gameState !== 'PLAYING') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Spawn logic
    if (time - lastSpawnTime.current > 1000) {
      spawnEnemy(canvas.width, canvas.height);
      lastSpawnTime.current = time;
    }

    // Update and draw enemies
    enemies.current = enemies.current.filter(enemy => {
      // Move toward player
      const dx = playerPos.current.x - enemy.pos.x;
      const dy = playerPos.current.y - enemy.pos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist > 1) {
        enemy.pos.x += (dx / dist) * enemy.speed;
        enemy.pos.y += (dy / dist) * enemy.speed;
      }

      // Collision detection
      const playerRadius = 15;
      if (dist < playerRadius + enemy.size / 2 && !enemy.isPopping) {
        setHealth(prev => {
          const next = prev - 10;
          if (next <= 0) setGameState('GAMEOVER');
          return next;
        });
        setShake(true);
        setTimeout(() => setShake(false), 200);
        return false; // Remove enemy on hit
      }

      // Draw enemy
      ctx.save();
      ctx.shadowBlur = 15;
      ctx.shadowColor = enemy.color;
      ctx.fillStyle = enemy.color;
      ctx.fillRect(enemy.pos.x - enemy.size / 2, enemy.pos.y - enemy.size / 2, enemy.size, enemy.size);
      ctx.restore();

      return true;
    });

    // Draw player
    ctx.save();
    ctx.beginPath();
    ctx.arc(playerPos.current.x, playerPos.current.y, 15, 0, Math.PI * 2);
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#10b981';
    ctx.fillStyle = '#10b981';
    ctx.fill();
    ctx.restore();

    requestRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    if (gameState === 'PLAYING') {
      requestRef.current = requestAnimationFrame(update);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameState]);

  const startGame = () => {
    setGameState('PLAYING');
    setScore(0);
    setHealth(100);
    enemies.current = [];
    lastSpawnTime.current = performance.now();
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (gameState !== 'PLAYING') return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Clear enemies on click
    enemies.current = enemies.current.filter(enemy => {
      const dx = clickX - enemy.pos.x;
      const dy = clickY - enemy.pos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < enemy.size) {
        setScore(prev => prev + 100);
        return false; // Clear enemy
      }
      return true;
    });
  };

  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-center bg-black overflow-hidden rounded-xl border border-emerald-900/30 ${shake ? 'animate-shake' : ''}`}>
      {/* HUD */}
      {gameState === 'PLAYING' && (
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
          <div className="flex items-center gap-4">
            <div className="w-32 h-2 bg-emerald-900/30 rounded-full overflow-hidden border border-emerald-500/20">
              <div 
                className="h-full bg-red-500 transition-all duration-300" 
                style={{ width: `${health}%` }}
              />
            </div>
            <span className="text-xs font-mono text-emerald-500 uppercase tracking-widest">Health: {health}%</span>
          </div>
          <div className="text-xl font-bold text-emerald-400 font-mono">
            SCORE: {score.toString().padStart(6, '0')}
          </div>
        </div>
      )}

      {/* Game Canvas */}
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
        onClick={handleCanvasClick}
        className="w-full h-full cursor-none touch-none"
      />

      {/* Overlays */}
      {gameState === 'START' && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20 p-8 text-center">
          <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <Zap size={40} />
          </div>
          <h2 className="text-4xl font-black text-emerald-400 mb-2 tracking-tighter uppercase">Combat Training</h2>
          <p className="text-emerald-900 mb-8 max-w-md font-mono text-sm">
            Smash the bugs before they reach your core. Use your cursor to move and click to eliminate threats.
          </p>
          <button
            onClick={startGame}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 text-black rounded-xl font-black tracking-widest hover:scale-105 transition-transform shadow-[0_0_30px_rgba(16,185,129,0.3)]"
          >
            <Play size={20} fill="currentColor" />
            INITIALIZE
          </button>
        </div>
      )}

      {gameState === 'GAMEOVER' && (
        <div className="absolute inset-0 bg-red-950/90 flex flex-col items-center justify-center z-20 p-8 text-center">
          <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center text-red-500 mb-6">
            <ShieldAlert size={40} />
          </div>
          <h2 className="text-4xl font-black text-red-400 mb-2 tracking-tighter uppercase">System Failure</h2>
          <p className="text-red-900/80 mb-2 font-mono text-sm uppercase tracking-widest">Final Score</p>
          <div className="text-6xl font-black text-white mb-8 font-mono tracking-tighter">{score}</div>
          <button
            onClick={startGame}
            className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-xl font-black tracking-widest hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <RotateCcw size={20} />
            REBOOT
          </button>
        </div>
      )}
    </div>
  );
};
