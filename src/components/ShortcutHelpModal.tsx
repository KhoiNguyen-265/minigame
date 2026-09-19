import React from 'react';
import { Keyboard, X } from 'lucide-react';

interface ShortcutHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutHelpModal: React.FC<ShortcutHelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const sections = [
    {
      title: 'Điều khiển trình chiếu (như PowerPoint)',
      shortcuts: [
        { keys: ['→', 'PageDown'], desc: 'Tiến slide tiếp theo (hoặc bấm nút mũi tên phải)' },
        { keys: ['←', 'PageUp'], desc: 'Lùi slide trước đó (hoặc bấm nút mũi tên trái)' },
        { keys: ['F', 'F5'], desc: 'Bật / Tắt toàn màn hình máy chiếu' },
        { keys: ['M'], desc: 'Bật / Tắt âm thanh hiệu ứng' },
        { keys: ['?', 'H'], desc: 'Bật / Tắt bảng phím tắt này' },
      ],
    },
    {
      title: 'Thao tác trong Slide Câu hỏi (Chơi cá nhân hội trường)',
      shortcuts: [
        { keys: ['Enter', 'R'], desc: 'Lật mở / Ẩn đáp án (hoặc bấm nút Đáp Án)' },
        { keys: ['Space'], desc: 'Lật mở đáp án / Tiến sang slide tiếp theo' },
        { keys: ['G'], desc: 'Bật / Tắt gợi ý ô chữ (ở Vòng 1 Đuổi hình)' },
        { keys: ['P'], desc: 'Phát / Tạm dừng nhạc bài hát (ở Vòng 2 Đoán bài)' },
      ],
    },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-2xl bg-cyber-dark/95 border border-cyber-cyan/40 p-6 shadow-cyan-lg backdrop-blur-xl text-white"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-cyber-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-xl text-white">Bảng phím tắt trình chiếu</h3>
              <p className="text-xs font-sans text-slate-400">Điều khiển thuần phím và chuột trực quan cho MC</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Shortcuts list */}
        <div className="py-4 space-y-5">
          {sections.map((sec) => (
            <div key={sec.title}>
              <h4 className="font-sans text-xs uppercase font-bold text-cyber-cyan tracking-wider mb-2.5">
                {sec.title}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {sec.shortcuts.map((sc, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-cyber-card/60 border border-cyber-border/60 text-xs"
                  >
                    <span className="font-sans text-slate-300">{sc.desc}</span>
                    <div className="flex items-center gap-1">
                      {sc.keys.map((k) => (
                        <kbd
                          key={k}
                          className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-cyber-darkest text-cyber-cyan border border-cyber-cyan/40 shadow-sm"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer tip */}
        <div className="pt-3 border-t border-cyber-border text-center">
          <p className="font-sans text-xs text-slate-500">
            Bấm phím <kbd className="px-1.5 py-0.5 rounded font-mono bg-black border border-slate-700 text-slate-300">Esc</kbd> hoặc <kbd className="px-1.5 py-0.5 rounded font-mono bg-black border border-slate-700 text-slate-300">?</kbd> để đóng bảng này
          </p>
        </div>
      </div>
    </div>
  );
};
export default ShortcutHelpModal;