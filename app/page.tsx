'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

// Cấu trúc dữ liệu bài học / trò chơi
interface GameItem {
  id: string;
  title: string;
  grade: string; // 'Lớp 6', 'Lớp 7', ...
  genre: string; // 'Mê cung', 'Tọa độ & Đồ thị', 'STEM', 'Trắc nghiệm'
  topic: string; // Chủ đề bài học
  description: string;
  href: string;
  status: 'ready' | 'coming_soon';
  badge: string;
  icon: string;
  color: string; // Gradient accent color
}

const GAMES_DATA: GameItem[] = [
  {
    id: 'prime-path',
    title: 'Prime Path Navigator',
    grade: 'Lớp 6',
    genre: 'Mê cung',
    topic: 'Số nguyên tố',
    description: 'Băng qua mê cung bằng cách nhận diện chính xác các ô số nguyên tố và né tránh hợp số.',
    href: '/worlds/prime-path',
    status: 'ready',
    badge: 'Đã sẵn sàng',
    icon: '🧩',
    color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
  },
  {
    id: 'stats-mode',
    title: 'Đấu Trường Thống Kê',
    grade: 'Lớp 7',
    genre: 'Trắc nghiệm',
    topic: 'Thống kê',
    description: 'Giải nhanh các câu hỏi phân tích bảng tần số, biểu đồ đoạn thẳng để mở khóa kho báu.',
    href: '#',
    status: 'coming_soon',
    badge: 'Sắp ra mắt',
    icon: '📊',
    color: 'from-sky-500/20 to-blue-500/10 border-sky-500/30 text-sky-400',
  },
  {
    id: 'vector-maze',
    title: 'Mê Cung Tọa Độ Vector',
    grade: 'Lớp 10',
    genre: 'Tọa độ & Đồ thị',
    topic: 'Vectơ',
    description: 'Sử dụng các phép toán cộng/trừ vectơ và tọa độ u(x, y) để điều khiển nhân vật bay qua chướng ngại vật.',
    href: '#',
    status: 'coming_soon',
    badge: 'Đang phát triển',
    icon: '📐',
    color: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/30 text-indigo-400',
  },
  {
    id: 'prob-recycling',
    title: 'Dự Án STEM: Phế Liệu Xanh',
    grade: 'Lớp 11',
    genre: 'STEM',
    topic: 'Xác suất',
    description: 'Áp dụng công thức xác suất và hình học không gian để tính toán mô hình phân loại rác tái chế.',
    href: '#',
    status: 'coming_soon',
    badge: 'Sắp ra mắt',
    icon: '♻️',
    color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
  },
  {
    id: 'geometry-bisector',
    title: 'Bí Mật Đường Trung Trực',
    grade: 'Lớp 7',
    genre: 'Mê cung',
    topic: 'Hình học',
    description: 'Khám phá tính chất cách đều của đường trung trực để định vị vị trí xây trạm tiếp tế tối ưu.',
    href: '#',
    status: 'coming_soon',
    badge: 'Dự kiến Q4',
    icon: '📏',
    color: 'from-pink-500/20 to-rose-500/10 border-pink-500/30 text-pink-400',
  },
];

const GRADES = ['Tất cả', 'Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9', 'Lớp 10', 'Lớp 11', 'Lớp 12'];
const GENRES = ['Tất cả', 'Mê cung', 'Tọa độ & Đồ thị', 'STEM', 'Trắc nghiệm'];

// Danh sách gợi ý các chủ đề trọng tâm
const HOT_TOPICS = ['Tất cả chủ đề', 'Số nguyên tố', 'Vectơ', 'Thống kê', 'Xác suất', 'Hình học'];

export default function HomePage() {
  const [selectedGrade, setSelectedGrade] = useState<string>('Tất cả');
  const [selectedGenre, setSelectedGenre] = useState<string>('Tất cả');
  const [selectedTopic, setSelectedTopic] = useState<string>('Tất cả chủ đề');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Thuật toán lọc thông minh
  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter((game) => {
      const matchGrade = selectedGrade === 'Tất cả' || game.grade === selectedGrade;
      const matchGenre = selectedGenre === 'Tất cả' || game.genre === selectedGenre;
      const matchTopic = selectedTopic === 'Tất cả chủ đề' || game.topic === selectedTopic;
      const matchSearch =
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchGrade && matchGenre && matchTopic && matchSearch;
    });
  }, [selectedGrade, selectedGenre, selectedTopic, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Background Glow Deco */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-600/15 via-indigo-600/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Header / Hero Section */}
      <header className="max-w-6xl mx-auto px-4 pt-12 pb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-slate-800 text-emerald-400 text-xs px-4 py-1.5 rounded-full shadow-inner mb-6 backdrop-blur">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>CỔNG HỌC TẬP TOÁN TƯƠNG TÁC THCS & THPT</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
          Chơi Để Giỏi Toán
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          Nền tảng bài học trực quan, biến công thức khô khan thành các thử thách game nhập vai kịch tính cho học sinh từ Lớp 6 đến Lớp 12.
        </p>

        {/* Quick Stats Badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="text-emerald-400 font-bold">100%</span> Chuẩn chương trình GDPT
          </div>
          <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="text-emerald-400 font-bold">Gamified</span> Học tập trải nghiệm
          </div>
          <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="text-emerald-400 font-bold">AI Tutor</span> Gợi ý thông minh
          </div>
        </div>
      </header>

      {/* Bảng Điều Khiển Bộ Lọc & Tìm Kiếm */}
      <section className="max-w-6xl mx-auto px-4 mb-10">
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl shadow-2xl backdrop-blur-xl">
          {/* Ô Tìm Kiếm Chính */}
          <div className="relative mb-6">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
              🔍
            </span>
            <input
              type="text"
              placeholder="Tìm theo tên bài học, từ khóa (ví dụ: Số nguyên tố, Vector, Thống kê)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/20 transition shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-slate-500 hover:text-slate-300"
              >
                Xóa
              </button>
            )}
          </div>

          {/* Dãy Thẻ Chọn Chủ Đề Học Hot */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-400 tracking-wider uppercase flex items-center gap-1.5">
                <span>🏷️</span> CHỦ ĐỀ HỌC TRỌNG TÂM
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              {HOT_TOPICS.map((topic) => {
                const isActive = selectedTopic === topic;
                return (
                  <button
                    key={topic}
                    onClick={() => setSelectedTopic(topic)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20 scale-105'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {topic}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bộ Lọc Theo Khối Lớp & Thể Loại */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
            {/* Chọn Khối Lớp */}
            <div>
              <label className="block text-xs font-bold text-slate-400 tracking-wider uppercase mb-2">
                🎓 KHỐI LỚP
              </label>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                {GRADES.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>

            {/* Chọn Thể Loại Game */}
            <div>
              <label className="block text-xs font-bold text-slate-400 tracking-wider uppercase mb-2">
                🎮 THỂ LOẠI GAME
              </label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                {GENRES.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Thanh trạng thái bộ lọc */}
          <div className="flex flex-wrap justify-between items-center text-xs text-slate-500 pt-4 mt-4 border-t border-slate-800/50">
            <span>
              Tìm thấy <strong className="text-emerald-400 font-bold">{filteredGames.length}</strong> trò chơi phù hợp
            </span>
            {(selectedGrade !== 'Tất cả' ||
              selectedGenre !== 'Tất cả' ||
              selectedTopic !== 'Tất cả chủ đề' ||
              searchQuery) && (
              <button
                onClick={() => {
                  setSelectedGrade('Tất cả');
                  setSelectedGenre('Tất cả');
                  setSelectedTopic('Tất cả chủ đề');
                  setSearchQuery('');
                }}
                className="text-emerald-400 hover:text-emerald-300 transition underline underline-offset-4"
              >
                Đặt lại tất cả bộ lọc
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Danh Sách Thẻ Bài Học / Games Grid */}
      <main className="max-w-6xl mx-auto px-4 mb-16 flex-1">
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => {
              const isReady = game.status === 'ready';

              return (
                <div
                  key={game.id}
                  className={`group relative flex flex-col justify-between p-6 rounded-3xl border transition-all duration-300 ${
                    isReady
                      ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:shadow-2xl hover:-translate-y-1'
                      : 'bg-slate-900/30 border-slate-900/80 opacity-60'
                  }`}
                >
                  <div>
                    {/* Header Thẻ: Icon & Badges */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br ${game.color} border shadow-inner`}>
                        {game.icon}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                          {game.grade}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-slate-950 text-emerald-400 border border-emerald-900/50">
                          {game.genre}
                        </span>
                      </div>
                    </div>

                    {/* Tiêu đề & Chủ đề */}
                    <h2 className="text-lg font-bold text-white group-hover:text-emerald-400 transition mb-1">
                      {game.title}
                    </h2>
                    <div className="inline-block text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 mb-3">
                      Chủ đề: {game.topic}
                    </div>

                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                      {game.description}
                    </p>
                  </div>

                  {/* Nút thao tác */}
                  <div>
                    {isReady ? (
                      <Link
                        href={game.href}
                        className="block w-full text-center py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-500/20 transition transform active:scale-95"
                      >
                        Bắt đầu thử thách 🚀
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="w-full py-3 px-4 bg-slate-800/50 text-slate-500 font-semibold text-xs rounded-2xl cursor-not-allowed border border-slate-800"
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
          /* Trạng thái không tìm thấy bài học */
          <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-slate-800">
            <span className="text-5xl mb-4 block">🔍</span>
            <h3 className="text-lg font-bold text-slate-200 mb-1">Không tìm thấy bài học nào phù hợp</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mb-6">
              Hãy thử chọn từ khóa khác hoặc bấm nút đặt lại bộ lọc để tìm kiếm lại.
            </p>
            <button
              onClick={() => {
                setSelectedGrade('Tất cả');
                setSelectedGenre('Tất cả');
                setSelectedTopic('Tất cả chủ đề');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-medium text-xs rounded-xl border border-slate-700 transition"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 py-8 text-center border-t border-slate-900 text-xs text-slate-600">
        Nền tảng Giáo dục Toán học Tương tác THCS & THPT &bull; Xây dựng bằng Next.js, Tailwind CSS & Vercel
      </footer>
    </div>
  );
}