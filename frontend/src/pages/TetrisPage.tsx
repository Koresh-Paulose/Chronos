import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { PlanView } from '@/components/plan/PlanView';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Play, Pause, RotateCcw, ArrowLeft, Trophy, ArrowRight, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// Board size
const COLS = 10;
const ROWS = 20;

// Tetromino definitions
const SHAPES = {
  I: [[1, 1, 1, 1]],
  O: [
    [1, 1],
    [1, 1]
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1]
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0]
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1]
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1]
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1]
  ]
};

const COLORS = {
  I: 'bg-accent-info border-accent-info/50 shadow-glow-sm',
  O: 'bg-accent-warn border-accent-warn/50 shadow-glow-sm',
  T: 'bg-accent-primary border-accent-primary/50 shadow-glow-sm',
  S: 'bg-accent-success border-accent-success/50 shadow-glow-sm',
  Z: 'bg-accent-danger border-accent-danger/50 shadow-glow-sm',
  J: 'bg-blue-500 border-blue-400/50 shadow-glow-sm',
  L: 'bg-indigo-500 border-indigo-400/50 shadow-glow-sm'
};

const SHAPE_NAMES = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'] as const;

type PieceType = keyof typeof SHAPES;

interface CurrentPiece {
  shape: number[][];
  type: PieceType;
  x: number;
  y: number;
}

// Retro synthesized game sound effects using Web Audio API
const playSFX = (type: 'rotate' | 'clear' | 'gameover') => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === 'rotate') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.08);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'clear') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.06); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.12); // G5
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'gameover') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(45, now + 0.5);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    }
  } catch {}
};

export function TetrisPage() {
  const navigate = useNavigate();

  const [board, setBoard] = useState<(PieceType | null)[][]>(
    Array(ROWS).fill(null).map(() => Array(COLS).fill(null))
  );
  const [currentPiece, setCurrentPiece] = useState<CurrentPiece | null>(null);
  const [nextPieceType, setNextPieceType] = useState<PieceType>('I');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('chronos-tetris-highscore') || '0');
  });
  const [lines, setLines] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const spawnPiece = useCallback((nextType: PieceType) => {
    const shape = SHAPES[nextType];
    const newPiece: CurrentPiece = {
      shape,
      type: nextType,
      x: Math.floor((COLS - shape[0].length) / 2),
      y: 0
    };

    // Pick next piece
    const newNext = SHAPE_NAMES[Math.floor(Math.random() * SHAPE_NAMES.length)];
    setNextPieceType(newNext);

    return newPiece;
  }, []);

  const checkCollision = useCallback((piece: CurrentPiece, nextX: number, nextY: number, currentBoard: (PieceType | null)[][]) => {
    for (let r = 0; r < piece.shape.length; r++) {
      for (let c = 0; c < piece.shape[r].length; c++) {
        if (piece.shape[r][c]) {
          const boardX = nextX + c;
          const boardY = nextY + r;

          if (boardX < 0 || boardX >= COLS || boardY >= ROWS) {
            return true;
          }

          if (boardY >= 0 && currentBoard[boardY][boardX]) {
            return true;
          }
        }
      }
    }
    return false;
  }, []);

  const resetGame = () => {
    setBoard(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
    const firstType = SHAPE_NAMES[Math.floor(Math.random() * SHAPE_NAMES.length)];
    const secondType = SHAPE_NAMES[Math.floor(Math.random() * SHAPE_NAMES.length)];
    setCurrentPiece(spawnPiece(firstType));
    setNextPieceType(secondType);
    setScore(0);
    setLines(0);
    setIsGameOver(false);
    setIsPaused(false);
    setIsPlaying(true);
  };

  const mergePiece = useCallback((piece: CurrentPiece) => {
    setBoard((prevBoard) => {
      const nextBoard = prevBoard.map((row) => [...row]);
      for (let r = 0; r < piece.shape.length; r++) {
        for (let c = 0; c < piece.shape[r].length; c++) {
          if (piece.shape[r][c]) {
            const boardY = piece.y + r;
            const boardX = piece.x + c;
            if (boardY >= 0 && boardY < ROWS) {
              nextBoard[boardY][boardX] = piece.type;
            }
          }
        }
      }

      // Check for line clears
      let cleared = 0;
      const filteredBoard = nextBoard.filter((row) => {
        const isFull = row.every((cell) => cell !== null);
        if (isFull) cleared++;
        return !isFull;
      });

      while (filteredBoard.length < ROWS) {
        filteredBoard.unshift(Array(COLS).fill(null));
      }

      if (cleared > 0) {
        playSFX('clear');
        setLines((prev) => prev + cleared);
        setScore((prev) => {
          const points = [0, 100, 300, 500, 800];
          const nextScore = prev + points[cleared];
          if (nextScore > highScore) {
            setHighScore(nextScore);
            localStorage.setItem('chronos-tetris-highscore', nextScore.toString());
          }
          return nextScore;
        });
      }

      return filteredBoard;
    });
  }, [highScore]);

  const moveDown = useCallback(() => {
    if (!currentPiece || isPaused || isGameOver) return;

    setCurrentPiece((prev) => {
      if (!prev) return null;
      const nextY = prev.y + 1;
      if (checkCollision(prev, prev.x, nextY, board)) {
        // Merge piece and spawn next
        mergePiece(prev);
        
        // Check game over
        const nextNext = nextPieceType;
        const nextShape = SHAPES[nextNext];
        const spawned = {
          shape: nextShape,
          type: nextNext,
          x: Math.floor((COLS - nextShape[0].length) / 2),
          y: 0
        };

        if (checkCollision(spawned, spawned.x, spawned.y, board)) {
          setIsGameOver(true);
          setIsPlaying(false);
          playSFX('gameover');
          return null;
        }

        // Delay spawn a tiny bit
        return spawnPiece(nextPieceType);
      }
      return { ...prev, y: nextY };
    });
  }, [currentPiece, board, isPaused, isGameOver, nextPieceType, mergePiece, spawnPiece, checkCollision]);

  const moveLeft = () => {
    if (!currentPiece || isPaused || isGameOver) return;
    const nextX = currentPiece.x - 1;
    if (!checkCollision(currentPiece, nextX, currentPiece.y, board)) {
      setCurrentPiece((prev) => prev && { ...prev, x: nextX });
    }
  };

  const moveRight = () => {
    if (!currentPiece || isPaused || isGameOver) return;
    const nextX = currentPiece.x + 1;
    if (!checkCollision(currentPiece, nextX, currentPiece.y, board)) {
      setCurrentPiece((prev) => prev && { ...prev, x: nextX });
    }
  };

  const rotate = () => {
    if (!currentPiece || isPaused || isGameOver) return;
    const nRows = currentPiece.shape.length;
    const nCols = currentPiece.shape[0].length;
    
    // Rotate matrix
    const rotated = Array(nCols).fill(0).map(() => Array(nRows).fill(0));
    for (let r = 0; r < nRows; r++) {
      for (let c = 0; c < nCols; c++) {
        rotated[c][nRows - 1 - r] = currentPiece.shape[r][c];
      }
    }

    const testPiece = { ...currentPiece, shape: rotated };
    if (!checkCollision(testPiece, testPiece.x, testPiece.y, board)) {
      playSFX('rotate');
      setCurrentPiece(testPiece);
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying || isPaused || isGameOver) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        moveLeft();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        moveRight();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        moveDown();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        rotate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isPaused, isGameOver, currentPiece, board, moveDown, checkCollision]);

  // Game loop interval
  useEffect(() => {
    if (isPlaying && !isPaused && !isGameOver) {
      gameLoopRef.current = setInterval(() => {
        moveDown();
      }, 700);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isPlaying, isPaused, isGameOver, moveDown]);

  // Start initial game state
  useEffect(() => {
    const firstType = SHAPE_NAMES[Math.floor(Math.random() * SHAPE_NAMES.length)];
    setCurrentPiece(spawnPiece(firstType));
  }, [spawnPiece]);

  // Render game cells
  const displayBoard = board.map((row) => [...row]);
  if (currentPiece) {
    for (let r = 0; r < currentPiece.shape.length; r++) {
      for (let c = 0; c < currentPiece.shape[r].length; c++) {
        if (currentPiece.shape[r][c]) {
          const boardY = currentPiece.y + r;
          const boardX = currentPiece.x + c;
          if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
            displayBoard[boardY][boardX] = currentPiece.type;
          }
        }
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <PlanView>
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/plan')}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Planner
          </button>
          <span className="badge bg-accent-primary/10 text-accent-primary border-accent-primary/20 px-3 py-1 text-sm">
            CALENDAR TETRIS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Game controls and score */}
          <div className="md:col-span-4 space-y-6">
            <Card variant="glass" className="p-6 text-center space-y-4">
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Score</p>
                <p className="font-mono text-3xl font-bold text-accent-primary">{score}</p>
              </div>

              <div className="flex justify-around border-t border-border-subtle pt-4">
                <div>
                  <p className="text-[10px] text-text-muted uppercase mb-0.5">Lines</p>
                  <p className="font-mono text-lg font-semibold text-text-primary">{lines}</p>
                </div>
                <div>
                  <p className="text-[10px] text-text-muted uppercase mb-0.5">High Score</p>
                  <p className="font-mono text-lg font-semibold text-text-primary flex items-center justify-center gap-1">
                    <Trophy className="h-4 w-4 text-accent-warn shrink-0" />
                    {highScore}
                  </p>
                </div>
              </div>
            </Card>

            <Card variant="glass" className="p-6 text-center space-y-4">
              <p className="text-xs text-text-muted uppercase tracking-wider">Next Piece</p>
              <div className="flex justify-center items-center py-2 h-16">
                <div className="grid grid-cols-4 gap-0.5">
                  {SHAPES[nextPieceType].map((row, r) => (
                    <div key={r} className="flex gap-0.5">
                      {row.map((cell, c) => (
                        <div
                          key={c}
                          className={cn(
                            "w-4 h-4 rounded border border-border-subtle transition-all",
                            cell ? COLORS[nextPieceType] : "bg-transparent border-transparent"
                          )}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <div className="flex flex-col gap-2">
              {!isPlaying && !isGameOver ? (
                <Button variant="primary" size="lg" className="w-full" onClick={resetGame} leftIcon={<Play className="h-5 w-5" />}>
                  Start Break Game
                </Button>
              ) : isGameOver ? (
                <Button variant="primary" size="lg" className="w-full" onClick={resetGame} leftIcon={<RotateCcw className="h-5 w-5" />}>
                  Play Again
                </Button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="ghost"
                    className="border border-border-glow"
                    onClick={() => setIsPaused((p) => !p)}
                    leftIcon={isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                  >
                    {isPaused ? 'Resume' : 'Pause'}
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setIsPlaying(false);
                      setIsGameOver(true);
                      playSFX('gameover');
                    }}
                    leftIcon={<RotateCcw className="h-4 w-4" />}
                  >
                    Quit
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Game board render grid */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative p-2 bg-bg-card/75 border border-border-glow shadow-glow-lg rounded-3xl backdrop-blur-md overflow-hidden">
              <div className="grid grid-cols-10 gap-0.5 bg-bg-deep rounded-2xl p-1.5 border border-border-subtle">
                {displayBoard.map((row, r) =>
                  row.map((cell, c) => (
                    <div
                      key={`${r}-${c}`}
                      className={cn(
                        "w-6 h-6 sm:w-8 sm:h-8 rounded-lg border transition-all",
                        cell
                          ? `${COLORS[cell]} border-t-white/20`
                          : "bg-bg-deep border-border-subtle/5"
                      )}
                    />
                  ))
                )}
              </div>

              {/* Pause overlay */}
              {isPaused && (
                <div className="absolute inset-0 bg-bg-deep/80 backdrop-blur-md flex items-center justify-center rounded-3xl animate-fade-in">
                  <div className="text-center">
                    <p className="font-display text-2xl font-bold text-text-primary mb-2">Game Paused</p>
                    <p className="text-xs text-text-muted">Click Resume to continue stacking your blocks</p>
                  </div>
                </div>
              )}

              {/* Game over overlay */}
              {isGameOver && (
                <div className="absolute inset-0 bg-bg-deep/80 backdrop-blur-md flex items-center justify-center rounded-3xl animate-fade-in">
                  <div className="text-center space-y-4">
                    <div>
                      <p className="font-display text-3xl font-black text-accent-danger mb-1">Game Over</p>
                      <p className="text-xs text-text-muted">Final Score: <span className="font-mono text-accent-primary font-bold">{score}</span></p>
                    </div>
                    <Button variant="primary" size="sm" onClick={resetGame} leftIcon={<RotateCcw className="h-4 w-4" />}>
                      Restart Game
                    </Button>
                  </div>
                </div>
              )}

              {/* Idle overlay before starting */}
              {!isPlaying && !isGameOver && !isPaused && (
                <div className="absolute inset-0 bg-bg-deep/85 backdrop-blur-md flex items-center justify-center rounded-3xl animate-fade-in">
                  <div className="text-center space-y-4 p-6">
                    <div className="w-12 h-12 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center mx-auto text-2xl">🎮</div>
                    <div>
                      <p className="font-display text-xl font-bold text-text-primary">Calendar Tetris</p>
                      <p className="text-xs text-text-muted mt-1 leading-relaxed max-w-[200px] mx-auto">Stack energy blocks, clear calendar rows, and recharge your focus during break sprints.</p>
                    </div>
                    <Button variant="primary" size="sm" onClick={resetGame} leftIcon={<Play className="h-4 w-4" />}>
                      Start Game
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Guide and rules */}
          <div className="md:col-span-3 space-y-6">
            <Card variant="glass" className="p-5 space-y-4 text-sm">
              <p className="font-display font-semibold text-text-primary text-xs uppercase tracking-wider border-b border-border-subtle pb-2">Controls</p>
              <div className="space-y-2 text-xs text-text-secondary">
                <div className="flex justify-between"><kbd className="font-mono text-text-primary bg-bg-card px-1.5 py-0.5 rounded border border-border-subtle">Arrow Up</kbd> Rotate Piece</div>
                <div className="flex justify-between"><kbd className="font-mono text-text-primary bg-bg-card px-1.5 py-0.5 rounded border border-border-subtle">Arrow Left</kbd> Move Left</div>
                <div className="flex justify-between"><kbd className="font-mono text-text-primary bg-bg-card px-1.5 py-0.5 rounded border border-border-subtle">Arrow Right</kbd> Move Right</div>
                <div className="flex justify-between"><kbd className="font-mono text-text-primary bg-bg-card px-1.5 py-0.5 rounded border border-border-subtle">Arrow Down</kbd> Drop Faster</div>
              </div>
            </Card>

            {/* Mobile / Screen Pad Controls */}
            <Card variant="glass" className="p-5 space-y-4 text-center md:hidden block">
              <p className="font-display font-semibold text-text-primary text-xs uppercase tracking-wider">Screen Pad</p>
              <div className="flex flex-col items-center gap-2">
                <Button size="icon" variant="ghost" className="border border-border-subtle" onClick={rotate} aria-label="Rotate"><RotateCcw className="h-4 w-4" /></Button>
                <div className="flex gap-4">
                  <Button size="icon" variant="ghost" className="border border-border-subtle" onClick={moveLeft} aria-label="Move left"><ArrowLeft className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" className="border border-border-subtle" onClick={moveDown} aria-label="Move down"><ArrowDown className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" className="border border-border-subtle" onClick={moveRight} aria-label="Move right"><ArrowRight className="h-4 w-4" /></Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </PlanView>
    </div>
  );
}
