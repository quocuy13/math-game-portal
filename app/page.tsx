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
  color: string; // Gradient accent color for light mode
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
    color: 'from-emerald-100 to-teal-50 border-emerald-200 text-emerald-700 shadow-emerald-100/50',
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
    color: 'from-sky-100 to-blue-50 border-sky-200 text-sky-700 shadow-sky-100/50',
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
    color: 'from-indigo-100 to-purple-50 border-indigo-200 text-indigo-700 shadow-indigo-100/50',
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
    color: 'from-amber-100 to-orange-50 border-amber-200 text-amber-700 shadow-amber-100/50',
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
    color: 'from-pink-100 to-rose-50 border-pink-200 text-pink-700 shadow-pink-100/50',
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
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-200 selection:text-slate-900">
      {/* Background Subtle Gradient for Light Mode */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-emerald-100/50 via-sky-50/30 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Header / Hero Section */}
      <header className="max-w-6xl mx-auto px-4 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-emerald-600 text-xs px-4 py-1.5 rounded-full shadow-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold tracking-wide">CỔNG HỌC TẬP TOÁN TƯƠNG TÁC</span>
        </div>
        
        {/* Tiêu đề mới bằng tiếng Anh */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 mb-5">
          Math Quest: <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Unlock Your Potential</span>
        </h1>
        
        <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          Nền tảng bài học trực quan, biến công thức khô khan thành các thử thách game nhập vai kịch tính cho học sinh từ Lớp 6 đến Lớp 12.
        </p>

        {/* Quick Stats Badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-8 text-xs font-medium text-slate-600">
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-emerald-600 text-lg">📚</span> 100% Chuẩn GDPT
          </div>
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-emerald-600 text-lg">🎮</span> Học tập Gamified
          </div>
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-emerald-600 text-lg">🤖</span> AI Gợi ý thông minh
          </div>
        </div>
      </header>

      {/* Bảng Điều Khiển Bộ Lọc & Tìm Kiếm */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-[2rem] shadow-xl shadow-slate-200/50">
          {/* Ô Tìm Kiếm Chính */}
          <div className="relative mb-8">
            <span className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 text-lg">
              🔍
            </span>
            <input
              type="text"
              placeholder="Tìm theo tên bài học, từ khóa (ví dụ: Số nguyên tố, Vector, Thống kê)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-12 py-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-slate-600 font-semibold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Dãy Thẻ Chọn Chủ Đề Học Hot */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold text-slate-500 tracking-wider uppercase flex items-center gap-1.5">
                <span>🏷️</span> CHỦ ĐỀ TRỌNG TÂM
              </label>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {HOT_TOPICS.map((topic) => {
                const isActive = selectedTopic === topic;
                return (
                  <button
                    key={topic}
                    onClick={() => setSelectedTopic(topic)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-105'
                        : 'bg-white border-2 border-slate-100 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {topic}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bộ Lọc Theo Khối Lớp & Thể Loại */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-6 border-t border-slate-100">
            {/* Chọn Khối Lớp */}
            <div>
              <label className="block text-xs font-bold text-slate-500 tracking-wider uppercase mb-2">
                🎓 KHỐI LỚP
              </label>
              <div className="relative">
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full bg-white border-2 border-slate-100 rounded-xl pl-4 pr-10 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer transition-colors"
                >
                  {GRADES.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                  ▼
                </div>
              </div>
            </div>

            {/* Chọn Thể Loại Game */}
            <div>
              <label className="block text-xs font-bold text-slate-500 tracking-wider uppercase mb-2">
                🎮 THỂ LOẠI
              </label>
              <div className="relative">
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="w-full bg-white border-2 border-slate-100 rounded-xl pl-4 pr-10 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer transition-colors"
                >
                  {GENRES.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                  ▼
                </div>
              </div>
            </div>
          </div>

          {/* Thanh trạng thái bộ lọc */}
          <div className="flex flex-wrap justify-between items-center text-sm font-medium text-slate-500 pt-6 mt-6 border-t border-slate-100">
            <span>
              Tìm thấy <strong className="text-emerald-600 text-base">{filteredGames.length}</strong> trò chơi
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
                className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                ↺ Đặt lại bộ lọc
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Danh Sách Thẻ Bài Học / Games Grid */}
      <main className="max-w-6xl mx-auto px-4 mb-20 flex-1">
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGames.map((game) => {
              const isReady = game.status === 'ready';

              return (
                <div
                  key={game.id}
                  className={`group relative flex flex-col justify-between p-7 rounded-[2rem] bg-white transition-all duration-300 ${
                    isReady
                      ? 'border border-slate-200 hover:border-emerald-300 shadow-md hover:shadow-xl hover:shadow-emerald-100/50 hover:-translate-y-1.5'
                      : 'border border-slate-100 opacity-80 shadow-sm'
                  }`}
                >
                  <div>
                    {/* Header Thẻ: Icon & Badges */}
                    <div className="flex items-start justify-between mb-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl bg-gradient-to-br ${game.color} border shadow-inner`}>
                        {game.icon}
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span className="text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                          {game.grade}
                        </span>
                        <span className="text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700">
                          {game.genre}
                        </span>
                      </div>
                    </div>

                    {/* Tiêu đề & Chủ đề */}
                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-2">
                      {game.title}
                    </h2>
                    <div className="inline-block text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg mb-4">
                      {game.topic}
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed mb-8">
                      {game.description}
                    </p>
                  </div>

                  {/* Nút thao tác */}
                  <div className="mt-auto">
                    {isReady ? (
                      <Link
                        href={game.href}
                        className="block w-full text-center py-3.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-200 transition-all transform active:scale-[0.98]"
                      >
                        Bắt đầu ngay 🚀
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="w-full py-3.5 px-4 bg-slate-50 text-slate-400 font-semibold text-sm rounded-xl border border-slate-200 cursor-not-allowed"
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
          <div className="text-center py-24 bg-white rounded-[2rem] border border-slate-200 shadow-sm">
            <span className="text-6xl mb-6 block opacity-50">🔍</span>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Không tìm thấy bài học</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-8">
              Chúng tôi không tìm thấy kết quả phù hợp với bộ lọc hiện tại. Vui lòng thử lại với từ khóa hoặc tùy chọn khác.
            </p>
            <button
              onClick={() => {
                setSelectedGrade('Tất cả');
                setSelectedGenre('Tất cả');
                setSelectedTopic('Tất cả chủ đề');
                setSearchQuery('');
              }}
              className="px-6 py-3 bg-white hover:bg-slate-50 text-emerald-600 font-bold text-sm rounded-xl border-2 border-slate-200 transition-colors shadow-sm"
            >
              Đặt lại tất cả bộ lọc
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 py-8 text-center border-t border-slate-200 text-sm font-medium text-slate-500">
        Nền tảng Giáo dục Toán học THCS & THPT &bull; Xây dựng bằng Next.js & Tailwind CSS
      </footer>
    </div>
  );
}