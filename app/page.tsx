'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

// Định nghĩa cấu trúc dữ liệu cho một Game / Bài học
interface GameItem {
  id: string;
  title: string;
  grade: string; // 'Lớp 6', 'Lớp 7', 'Lớp 10', 'Lớp 11', ...
  genre: string; // 'Mê cung', 'Tọa độ & Đồ thị', 'STEM', 'Trắc nghiệm'
  topic: string;
  description: string;
  href: string;
  status: 'ready' | 'coming_soon';
  badge: string;
  icon: string;
}

const GAMES_DATA: GameItem[] = [
  {
    id: 'prime-path',
    title: 'Prime Path Navigator',
    grade: 'Lớp 6',
    genre: 'Mê cung',
    topic: 'Số học & Số nguyên tố',
    description: 'Điều khiển nhân vật vượt mê cung bằng cách tìm các ô số nguyên tố, tránh hợp số.',
    href: '/worlds/prime-path',
    status: 'ready',
    badge: 'Đã sẵn sàng',
    icon: '🧩',
  },
  {
    id: 'stats-mode',
    title: 'Thử Thách Thống Kê & Tần Số',
    grade: 'Lớp 7',
    genre: 'Trắc nghiệm',
    topic: 'Thống kê & Thu thập dữ liệu',
    description: 'Phân tích bảng tần số, biểu đồ đoạn thẳng để vượt qua các chướng ngại vật.',
    href: '#',
    status: 'coming_soon',
    badge: 'Sắp ra mắt',
    icon: '📊',
  },
  {
    id: 'vector-maze',
    title: 'Mê Cung Tọa Độ Vector',
    grade: 'Lớp 10',
    genre: 'Tọa độ & Đồ thị',
    topic: 'Vectơ & Phương pháp tọa độ',
    description: 'Nhập tọa độ vectơ u(x, y) hoặc tính tổng/hiệu vectơ để điều khiển nhân vật di chuyển.',
    href: '#',
    status: 'coming_soon',
    badge: 'Đang phát triển',
    icon: '📐',
  },
  {
    id: 'stem-recycling',
    title: 'Dự Án STEM: Phân Loại Phế Liệu',
    grade: 'Lớp 11',
    genre: 'STEM',
    topic: 'Xác suất & Tối ưu hóa',
    description: 'Tận dụng kiến thức xác suất và hình học không gian để tính toán chi phí tái chế phế liệu.',
    href: '#',
    status: 'coming_soon',
    badge: 'Sắp ra mắt',
    icon: '♻️',
  },
];

const GRADES = ['Tất cả', 'Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9', 'Lớp 10', 'Lớp 11', 'Lớp 12'];
const GENRES = ['Tất cả', 'Mê cung', 'Tọa độ & Đồ thị', 'STEM', 'Trắc nghiệm'];

export default function HomePage() {
  const [selectedGrade, setSelectedGrade] = useState<string>('Tất cả');
  const [selectedGenre, setSelectedGenre] = useState<string>('Tất cả');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Thuật toán lọc bài học theo Khối, Thể loại và Từ khóa tìm kiếm
  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter((game) => {
      const matchGrade = selectedGrade === 'Tất cả' || game.grade === selectedGrade;
      const matchGenre = selectedGenre === 'Tất cả' || game.genre === selectedGenre;
      const matchSearch =
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchGrade && matchGenre && matchSearch;
    });
  }, [selectedGrade, selectedGenre, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between p-4 md:p-10">
      {/* Header */}
      <header className="max-w-6xl mx-auto w-full text-center mb-8">
        <div className="inline-block bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-4 py-1.5 rounded-full font-mono mb-3">
          CỔNG HỌC TẬP TOÁN TƯƠNG TÁC THCS & THPT
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
          Hành Trình Khám Phá Toán Học
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
          Kho game bài học phân loại chi tiết theo khối lớp và chủ đề. Chọn khối học của bạn để bắt đầu thử thách!
        </p>
      </header>

      {/* Thanh Tìm Kiếm & Bộ Lọc */}
      <section className="max-w-6xl mx-auto w-full bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 mb-8 backdrop-blur shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Ô Tìm Kiếm */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">TÌM BÀI HỌC / TỪ KHÓA</label>
            <input
              type="text"
              placeholder="Nhập tên bài, chủ đề (ví dụ: Số nguyên tố, Vector)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          {/* Lọc Khối Lớp */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">KHỐI LỚP</label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 transition cursor-pointer"
            >
              {GRADES.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </div>

          {/* Lọc Thể Loaị Game */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">THỂ LOẠI GAME</label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 transition cursor-pointer"
            >
              {GENRES.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Thống kê kết quả tìm kiếm */}
        <div className="flex justify-between items-center text-xs text-slate-400 border-t border-slate-700/60 pt-3">
          <span>
            Hiển thị <strong className="text-emerald-400">{filteredGames.length}</strong> trò chơi phù hợp
          </span>
          {(selectedGrade !== 'Tất cả' || selectedGenre !== 'Tất cả' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedGrade('Tất cả');
                setSelectedGenre('Tất cả');
                setSearchQuery('');
              }}
              className="text-emerald-400 hover:underline"
            >
              Đặt lại bộ lọc
            </button>
          )}
        </div>
      </section>

      {/* Danh Sách Bài Học / Grid */}
      <main className="max-w-6xl mx-auto w-full flex-1">
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredGames.map((game) => {
              const isReady = game.status === 'ready';

              return (
                <div
                  key={game.id}
                  className={`flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 ${
                    isReady
                      ? 'bg-slate-800/90 border-slate-700 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1'
                      : 'bg-slate-800/40 border-slate-800 opacity-70'
                  }`}
                >
                  <div>
                    {/* Thẻ Phân Loại */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl">{game.icon}</span>
                      <div className="flex gap-2">
                        <span className="text-[11px] px-2 py-0.5 rounded bg-slate-700 text-slate-300 font-mono">
                          {game.grade}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
                          {game.genre}
                        </span>
                      </div>
                    </div>

                    <h2 className="text-lg font-bold text-white mb-1">{game.title}</h2>
                    <p className="text-xs text-emerald-400 font-mono mb-3">{game.topic}</p>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">{game.description}</p>
                  </div>

                  <div>
                    {isReady ? (
                      <Link
                        href={game.href}
                        className="block w-full text-center py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow transition"
                      >
                        Vào thử thách
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="w-full py-2.5 px-4 bg-slate-700/50 text-slate-500 font-semibold rounded-xl cursor-not-allowed text-sm"
                      >
                        Chưa mở khóa ({game.badge})
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-800/30 rounded-2xl border border-slate-800">
            <span className="text-4xl mb-3 block">🔍</span>
            <h3 className="text-lg font-bold text-slate-300 mb-1">Không tìm thấy bài học phù hợp</h3>
            <p className="text-sm text-slate-500">Hãy thử thay đổi từ khóa hoặc đặt lại bộ lọc tìm kiếm.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full text-center border-t border-slate-800 pt-6 text-xs text-slate-500">
        Nền tảng Giáo dục Toán học THCS/THPT &bull; Phát triển cho giảng dạy sáng tạo
      </footer>
    </div>
  );
}