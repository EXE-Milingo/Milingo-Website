import React, { useEffect } from 'react';

interface Props { onBack: () => void; }

const Section: React.FC<{ n: string; title: string; children: React.ReactNode }> = ({ n, title, children }) => (
  <div className="bg-white dark:bg-[#1A1D24] rounded-3xl overflow-hidden shadow-sm border border-stone-100 dark:border-white/5">
    <div className="flex items-center gap-5 px-8 py-6 border-b border-stone-100 dark:border-white/5">
      <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#f9b233] to-[#e6332a] flex items-center justify-center text-white font-black text-sm shrink-0">{n}</span>
      <h2 className="text-lg font-black text-[#2D2926] dark:text-white tracking-tight uppercase" style={{ fontFamily: "'Quicksand',sans-serif", letterSpacing: '0.04em' }}>{title}</h2>
    </div>
    <div className="px-8 py-7 space-y-4 text-stone-600 dark:text-stone-400 leading-relaxed text-[15px]">{children}</div>
  </div>
);

const List: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-3">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#f9b233] shrink-0 mt-2" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const Note: React.FC<{ children: React.ReactNode; variant?: 'warn' | 'info' }> = ({ children, variant = 'info' }) => (
  <div className={`mt-4 p-4 rounded-r-2xl text-sm border-l-4 ${variant === 'warn' ? 'bg-amber-50 dark:bg-amber-900/10 border-[#f9b233] text-amber-800 dark:text-amber-300' : 'bg-[#e6332a]/5 border-[#e6332a] text-stone-600 dark:text-stone-400'}`}>
    {children}
  </div>
);

const TermsOfUse: React.FC<Props> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Điều Khoản Sử Dụng – Milingo';
    return () => { document.title = 'Milingo - Ứng Dụng Học Ngoại Ngữ Qua Camera Tích Hợp AI'; };
  }, []);

  return (
    <div className="min-h-screen bg-[#FEF3E2]/40 dark:bg-[#0F1115]" style={{ fontFamily: "'Inter',sans-serif" }}>

      {/* Sticky nav */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#0F1115]/90 backdrop-blur-xl border-b border-stone-200/60 dark:border-white/5 px-6 py-4 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-[#e6332a] font-bold text-sm hover:gap-3 transition-all duration-200">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Quay lại
        </button>
        <span className="font-black text-[#2D2926] dark:text-white text-sm tracking-widest uppercase" style={{ fontFamily: "'Quicksand',sans-serif" }}>Milingo</span>
        <div className="w-20" />
      </nav>

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#f9b233] to-[#e6332a] py-20 px-4 text-center">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 80% 80%, white 1px, transparent 1px), radial-gradient(circle at 20% 20%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-white/70 text-xs font-bold uppercase tracking-[0.2em] mb-4">Cập nhật lần cuối: 20/05/2026</p>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none" style={{ fontFamily: "'Quicksand',sans-serif" }}>Điều Khoản<br />Sử Dụng</h1>
          <div className="w-16 h-1 bg-white/40 mx-auto mt-6 rounded-full" />
          <p className="text-white/80 mt-6 text-base max-w-xl mx-auto leading-relaxed">
            Vui lòng đọc kỹ trước khi sử dụng Milingo. Việc tiếp tục sử dụng dịch vụ đồng nghĩa bạn đã chấp thuận các điều khoản dưới đây.
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-3xl mx-auto px-4 py-14 space-y-6">

        {/* Intro */}
        <div className="bg-white dark:bg-[#1A1D24] rounded-3xl p-8 border border-stone-100 dark:border-white/5 shadow-sm">
          <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-base italic">
            Chào mừng bạn đến với <strong className="text-[#2D2926] dark:text-white not-italic">Milingo</strong> — ứng dụng học ngoại ngữ tích hợp Camera và Trí tuệ nhân tạo. Các điều khoản này điều chỉnh mối quan hệ giữa bạn và Milingo khi sử dụng dịch vụ tại <strong className="text-[#2D2926] dark:text-white not-italic">milingo.vn</strong> và trên ứng dụng di động.
          </p>
        </div>

        <Section n="1" title="Chấp Thuận Điều Khoản">
          <p>Bằng cách truy cập hoặc sử dụng bất kỳ phần nào của dịch vụ Milingo, bạn xác nhận rằng bạn đã đọc, hiểu và đồng ý bị ràng buộc bởi các điều khoản này. Nếu bạn không đồng ý, vui lòng ngừng sử dụng dịch vụ ngay lập tức.</p>
          <p className="mt-3">Các điều khoản này có thể được cập nhật định kỳ. Milingo sẽ thông báo cho bạn về các thay đổi quan trọng ít nhất <strong className="text-[#2D2926] dark:text-white">7 ngày</strong> trước khi có hiệu lực.</p>
        </Section>

        <Section n="2" title="Điều Kiện Sử Dụng">
          <p className="mb-3">Để sử dụng Milingo, bạn phải đáp ứng các điều kiện sau:</p>
          <List items={[
            'Từ 13 tuổi trở lên. Người dùng dưới 13 tuổi không được phép đăng ký.',
            'Người dùng từ 13 đến 17 tuổi cần có sự đồng ý và giám sát của phụ huynh hoặc người giám hộ hợp pháp.',
            'Cung cấp thông tin đăng ký chính xác và cập nhật khi có thay đổi.',
            'Chỉ sử dụng dịch vụ cho mục đích cá nhân, phi thương mại.',
            'Không tạo nhiều tài khoản để lách các giới hạn dịch vụ.',
          ]} />
        </Section>

        <Section n="3" title="Tài Khoản Người Dùng">
          <p className="mb-3">Bạn chịu trách nhiệm bảo mật tài khoản của mình:</p>
          <List items={[
            'Giữ bí mật mật khẩu và không chia sẻ với bất kỳ ai.',
            'Thông báo ngay cho Milingo nếu phát hiện truy cập trái phép vào tài khoản.',
            'Chịu hoàn toàn trách nhiệm với mọi hoạt động diễn ra dưới tài khoản của bạn.',
            'Milingo có quyền tạm khóa tài khoản nếu nghi ngờ có hoạt động bất thường.',
          ]} />
        </Section>

        <Section n="4" title="Nội Dung Người Dùng">
          <p className="mb-3">Khi tải nội dung lên Milingo (bao gồm hình ảnh từ camera), bạn cam kết:</p>
          <List items={[
            'Không tải lên nội dung vi phạm pháp luật, khiêu dâm, bạo lực hoặc phân biệt đối xử.',
            'Không tải lên hình ảnh xâm phạm quyền riêng tư của người khác mà không có sự đồng ý.',
            'Không phát tán thông tin sai lệch, spam hoặc nội dung gây hiểu nhầm.',
            'Không tải lên nội dung vi phạm bản quyền, nhãn hiệu hoặc quyền sở hữu trí tuệ của bên thứ ba.',
          ]} />
          <Note>Milingo không chịu trách nhiệm pháp lý đối với nội dung do người dùng tạo ra. Chúng tôi có quyền xóa bất kỳ nội dung nào vi phạm các điều khoản này mà không cần thông báo trước.</Note>
        </Section>

        <Section n="5" title="Sử Dụng Dịch Vụ AI và Camera">
          <p className="mb-3">Tính năng nhận diện hình ảnh AI của Milingo được cung cấp bởi Google Gemini API. Khi sử dụng tính năng này:</p>
          <List items={[
            'Hình ảnh được gửi lên máy chủ để xử lý và tạo bài học ngôn ngữ phù hợp.',
            'Bạn cấp cho Milingo quyền sử dụng hình ảnh đó trong phạm vi phiên học tập.',
            'Không sử dụng tính năng camera để ghi lại hình ảnh người khác mà không có sự cho phép.',
            'Milingo không lưu trữ hình ảnh sau khi phiên học kết thúc, trừ khi bạn lưu vào thư viện cá nhân.',
          ]} />
        </Section>

        <Section n="6" title="Quyền Sở Hữu Trí Tuệ">
          <p className="mb-4">Toàn bộ nội dung, tính năng và công nghệ của Milingo thuộc quyền sở hữu độc quyền của đội ngũ Milingo, được bảo hộ theo pháp luật Việt Nam và quốc tế về quyền sở hữu trí tuệ.</p>
          <p className="font-semibold text-[#2D2926] dark:text-white mb-3">Điều bạn được phép làm:</p>
          <List items={[
            'Sử dụng dịch vụ cho mục đích học tập cá nhân của bạn.',
            'Chia sẻ kết quả học tập trên mạng xã hội với credit đề cập đến Milingo.',
          ]} />
          <p className="font-semibold text-[#2D2926] dark:text-white mt-5 mb-3">Điều bạn không được phép làm:</p>
          <List items={[
            'Sao chép, phân phối hoặc tái sử dụng nội dung Milingo cho mục đích thương mại.',
            'Dịch ngược, giải mã hoặc cố gắng trích xuất mã nguồn ứng dụng.',
            'Tạo sản phẩm phái sinh dựa trên công nghệ hoặc nội dung của Milingo.',
            'Sử dụng tên thương hiệu, logo hoặc giao diện Milingo mà không được phép bằng văn bản.',
          ]} />
          <Note variant="warn">Vi phạm quyền sở hữu trí tuệ có thể dẫn đến chấm dứt tài khoản và hành động pháp lý.</Note>
        </Section>

        <Section n="7" title="Giới Hạn Trách Nhiệm">
          <p className="mb-3">Trong phạm vi tối đa được pháp luật cho phép, Milingo không chịu trách nhiệm về:</p>
          <List items={[
            'Gián đoạn dịch vụ do bảo trì, lỗi kỹ thuật hoặc nguyên nhân bất khả kháng.',
            'Tính chính xác tuyệt đối của bản dịch và nội dung học tập do AI tạo ra.',
            'Thiệt hại gián tiếp, ngẫu nhiên hoặc hậu quả phát sinh từ việc sử dụng dịch vụ.',
            'Nội dung từ các liên kết bên ngoài mà Milingo dẫn đến.',
          ]} />
          <p className="mt-4">Kết quả học tập phụ thuộc vào sự nỗ lực và cam kết của từng cá nhân. Milingo không đảm bảo kết quả học tập cụ thể.</p>
        </Section>

        <Section n="8" title="Chấm Dứt Dịch Vụ">
          <p className="mb-3">Milingo có quyền tạm khóa hoặc chấm dứt tài khoản của bạn nếu:</p>
          <List items={[
            'Vi phạm bất kỳ điều khoản nào được nêu trong tài liệu này.',
            'Có hành vi gian lận, lừa đảo hoặc lạm dụng hệ thống.',
            'Nhận được yêu cầu hợp lệ từ cơ quan pháp luật.',
            'Tài khoản không hoạt động trong thời gian dài (trên 24 tháng).',
          ]} />
          <p className="mt-4">Bạn cũng có thể xóa tài khoản bất kỳ lúc nào bằng cách liên hệ <strong className="text-[#e6332a]">milingo.vn@gmail.com</strong>.</p>
        </Section>

        <Section n="9" title="Luật Điều Chỉnh">
          <p>Các điều khoản này được điều chỉnh bởi pháp luật nước Cộng hòa xã hội chủ nghĩa Việt Nam. Mọi tranh chấp phát sinh từ hoặc liên quan đến các điều khoản này sẽ được giải quyết tại Tòa án có thẩm quyền tại Việt Nam.</p>
          <p className="mt-3">Nếu bất kỳ điều khoản nào bị tuyên bố vô hiệu theo quy định pháp luật, các điều khoản còn lại vẫn có hiệu lực đầy đủ.</p>
        </Section>

        {/* Contact CTA */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#f9b233] to-[#e6332a] p-10 text-white">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-2" style={{ fontFamily: "'Quicksand',sans-serif" }}>Cần Hỗ Trợ?</h3>
            <p className="text-white/80 mb-6 text-sm">Nếu có thắc mắc về điều khoản sử dụng, đội ngũ Milingo luôn sẵn sàng giải đáp.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="mailto:milingo.vn@gmail.com" className="flex items-center gap-3 bg-white/15 hover:bg-white/25 transition-all border border-white/20 px-5 py-3 rounded-2xl text-sm font-bold">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                milingo.vn@gmail.com
              </a>
              <a href="https://facebook.com/milingo.vn" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white/15 hover:bg-white/25 transition-all border border-white/20 px-5 py-3 rounded-2xl text-sm font-bold">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z"/></svg>
                facebook.com/milingo.vn
              </a>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-stone-400 dark:text-stone-600 pb-4">
          Điều khoản áp dụng cho toàn bộ người dùng milingo.vn và ứng dụng Milingo. © Milingo 2026
        </p>
      </div>
    </div>
  );
};

export default TermsOfUse;
