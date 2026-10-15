'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 5;

// Hàm kiểm tra số nguyên tố
function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// Tạo bảng số ngẫu nhiên đảm bảo luôn có ít nhất một đường đi toàn số nguyên tố
function generateBoard() {
  const board: number[][] = Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0));
  
  // Tạo đường đi an toàn ngẫu nhiên từ (0,0) tới (GRID_SIZE-1, GRID_SIZE-1)
  let r = 0, c = 0;
  const safePath: [number, number][] = [[0, 0]];
  while (r < GRID_SIZE - 1 || c < GRID_SIZE - 1) {
    if (r === GRID_SIZE - 1) c++;
    else if (c === GRID_SIZE - 1) r++;
    else if (Math.random() < 0.5) r++;
    else c++;
    safePath.push([r, c]);
  }

  // Danh sách các số nguyên tố và hợp số gợi ý
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
  const composites = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30, 32, 33, 34, 35, 36];

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const isSafe = safePath.some(([sr, sc]) => sr === row && sc === col);
      if (isSafe) {
        board[row][col] = primes[Math.floor(Math.random() * primes.length)];
      } else {
        // Cho 70% cơ hội là hợp số để thử thách học sinh
        if (Math.random() < 0.7) {
          board[row][col] = composites[Math.floor(Math.random() * composites.length)];
        } else {
          board[row][col] = primes[Math.floor(Math.random() * primes.length)];
        }
      }
    }
  }

  return board;
}

export default function PrimePathPage() {
  const [board, setBoard] = useState<number[][]>([]);
  const [playerPos, setPlayerPos] = useState<[number, number]>([0, 0]);
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [message, setMessage] = useState<string>('Bắt đầu bằng cách chọn một ô kề bên chứa SỐ NGUYÊN TỐ!');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);

  // Audio Context cho âm thanh 8-bit
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playSound = (type: 'move' | 'hit' | 'win' | 'lose') => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === 'move') {
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'hit') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.2);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'win') {
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.1);
      osc.frequency.setValueAtTime(783.99, now + 0.2);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    }
  };

  const initGame = useCallback(() => {
    const newBoard = generateBoard();
    setBoard(newBoard);
    setPlayerPos([0, 0]);
    setScore(0);
    setLives(3);
    setGameOver(false);
    setGameWon(false);
    setMessage('Hãy chọn các ô kề bên chứa SỐ NGUYÊN TỐ để đi tới ĐÍCH (ô cờ vàng)!');
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleTileClick = (r: number, c: number) => {
    if (gameOver || gameWon) return;

    const [pr, pc] = playerPos;
    const isAdjacent = Math.abs(pr - r) + Math.abs(pc - c) === 1;

    if (!isAdjacent) {
      setMessage('⚠️ Bạn chỉ có thể di chuyển sang ô ngay kề bên (trên, dưới, trái, phải)!');
      return;
    }

    const val = board[r][c];
    if (isPrime(val)) {
      setPlayerPos([r, c]);
      setScore((prev) => prev + 10);
      playSound('move');

      if (r === GRID_SIZE - 1 && c === GRID_SIZE - 1) {
        setGameWon(true);
        playSound('win');
        setMessage('🎉 CHÚC MỪNG! Bạn đã xuất sắc vượt qua Mê Cung Số Nguyên Tố!');
      } else {
        setMessage(`✅ Chính xác! ${val} là số nguyên tố. Tiếp tục nào!`);
      }
    } else {
      playSound('hit');
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives <= 0) {
        setGameOver(true);
        setMessage(`💥 RẤT TIẾC! ${val} là HỢP SỐ (chia hết cho các số khác 1 và chính nó). Bạn đã hết mạng!`);
      } else {
        setMessage(`❌ Sai rồi! ${val} là HỢP SỐ. Bạn bị mất 1 mạng! (Còn ${newLives} mạng)`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-emerald-400 mb-2">
          🧩 Prime Path Navigator
        </h1>
        <p className="text-slate-400 text-sm">
          Thế giới 1: Mê cung Số Nguyên Tố (Toán THCS)
        </p>
      </header>

      {/* Thông số chơi */}
      <div className="flex gap-6 mb-4 bg-slate-800 px-6 py-3 rounded-lg border border-slate-700">
        <div>Điểm: <span className="font-bold text-yellow-400">{score}</span></div>
        <div>Mạng: <span className="font-bold text-red-400">{"❤️".repeat(lives)}</span></div>
      </div>

      {/* Thông báo status */}
      <div className="mb-6 max-w-md text-center bg-slate-800/80 p-3 rounded-md border border-slate-700 text-sm text-emerald-300 min-h-[48px] flex items-center justify-center">
        {message}
      </div>

      {/* Bảng game */}
      <div className="grid grid-cols-5 gap-2 bg-slate-800 p-4 rounded-xl border-2 border-slate-700 shadow-2xl">
        {board.map((row, r) =>
          row.map((val, c) => {
            const isPlayer = playerPos[0] === r && playerPos[1] === c;
            const isStart = r === 0 && c === 0;
            const isEnd = r === GRID_SIZE - 1 && c === GRID_SIZE - 1;

            let bgColor = 'bg-slate-700 hover:bg-slate-600';
            if (isPlayer) bgColor = 'bg-emerald-500 text-slate-950 font-extrabold ring-4 ring-emerald-300';
            else if (isEnd) bgColor = 'bg-amber-500/80 text-slate-950 font-bold border-2 border-amber-300';

            return (
              <button
                key={`${r}-${c}`}
                onClick={() => handleTileClick(r, c)}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg text-lg font-mono flex flex-col items-center justify-center transition-all shadow ${bgColor}`}
              >
                <span>{val}</span>
                {isStart && !isPlayer && <span className="text-[10px] text-slate-300">START</span>}
                {isEnd && !isPlayer && <span className="text-[10px] text-slate-900 font-bold">🏁 GOAL</span>}
                {isPlayer && <span className="text-[10px] uppercase">PLAYER</span>}
              </button>
            );
          })
        )}
      </div>

      {/* Nút điều khiển */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={initGame}
          className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 font-semibold rounded-lg shadow-lg transition"
        >
          {gameOver || gameWon ? 'Chơi lại' : 'Tạo màn mới'}
        </button>
      </div>
    </div>
  );
}