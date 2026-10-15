import Link from 'next/link';

export default function HomePage() {
  const worlds = [
    {
      id: 'prime-path',
      title: 'Thế giới 1: Prime Path Navigator',
      topic: 'Số học & Số nguyên tố (Lớp 6 - 7)',
      description: 'Điều khiển nhân vật tìm đường thoát khỏi mê cung bằng cách di chuyển qua các ô số nguyên tố.',
      href: '/worlds/prime-path',
      status: 'ready',
      badge: 'Đã sẵn sàng',
      icon: '🧩',
    },
    {
      id: 'vector-maze',
      title: 'Thế giới 2: Mê cung Vector',
      topic: 'Hình học & Tọa độ Vector (Lớp 10)',
      description: 'Nhập tọa độ vector u(x, y) để nhảy qua các chướng ngại vật và tối ưu hóa quãng đường.',
      href: '#',
      status: 'coming_soon',
      badge: 'Đang phát triển',
      icon: '📐',
    },
    {
      id: 'stem-recycling',
      title: 'Thế giới 3: Trạm Thống Kê & STEM',
      topic: 'Thống kê & Toán ứng dụng thực tế',
      description: 'Giải các bài toán xác suất, trung bình cộng để tối ưu chi phí phân loại phế liệu tái chế.',
      href: '#',
      status: 'coming_soon',
      badge: 'Sắp ra mắt',
      icon: '♻️',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between p-6 md:p-12">
      {/* Header */}
      <header className="max-w-5xl mx-auto w-full text-center mb-12">
        <div className="inline-block bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-4 py-1.5 rounded-full font-mono mb-4">
          PORTAL HỌC TẬP TOÁN TƯƠNG TÁC
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
          Hành Trình Khám Phá Toán Học
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
          Hệ thống bài học hóa game (Gamified Learning) dành cho học sinh Trung học. Hãy chọn một chiến dịch để bắt đầu thử thách!
        </p>
      </header>

      {/* Danh sách bài học / World Grid */}
      <main className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {worlds.map((world) => {
          const isReady = world.status === 'ready';

          return (
            <div
              key={world.id}
              className={`flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 ${
                isReady
                  ? 'bg-slate-800/80 border-slate-700 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1'
                  : 'bg-slate-800/40 border-slate-800 opacity-70'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{world.icon}</span>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      isReady
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {world.badge}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mb-1">{world.title}</h2>
                <p className="text-xs text-emerald-400 font-mono mb-3">{world.topic}</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{world.description}</p>
              </div>

              <div>
                {isReady ? (
                  <Link
                    href={world.href}
                    className="block w-full text-center py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow transition"
                  >
                    Vào thử thách
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full py-2.5 px-4 bg-slate-700/50 text-slate-500 font-semibold rounded-xl cursor-not-allowed"
                  >
                    Chưa mở khóa
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto w-full text-center border-t border-slate-800 pt-6 text-xs text-slate-500">
        Nền tảng Giáo dục Toán học THCS/THPT &bull; Xây dựng bằng Next.js & Tailwind CSS
      </footer>
    </div>
  );
}