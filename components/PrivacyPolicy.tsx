import React, { useEffect } from 'react';

interface Props { onBack: () => void; }

const Section: React.FC<{ n: string; title: string; children: React.ReactNode }> = ({ n, title, children }) => (
  <div className="bg-white dark:bg-[#1A1D24] rounded-3xl overflow-hidden shadow-sm border border-stone-100 dark:border-white/5">
    <div className="flex items-center gap-5 px-8 py-6 border-b border-stone-100 dark:border-white/5">
      <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#e6332a] to-[#f9b233] flex items-center justify-center text-white font-black text-sm shrink-0">{n}</span>
      <h2 className="text-lg font-black text-[#2D2926] dark:text-white tracking-tight uppercase" style={{ fontFamily: "'Quicksand',sans-serif", letterSpacing: '0.04em' }}>{title}</h2>
    </div>
    <div className="px-8 py-7 space-y-4 text-stone-600 dark:text-stone-400 leading-relaxed text-[15px]">{children}</div>
  </div>
);

const CheckList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-3">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#e6332a] shrink-0 mt-2" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const Note: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mt-4 p-4 bg-[#e6332a]/5 border-l-4 border-[#e6332a] rounded-r-2xl text-sm text-stone-600 dark:text-stone-400">{children}</div>
);

const PrivacyPolicy: React.FC<Props> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Chính Sách Bảo Mật – Milingo';
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
      <div className="relative overflow-hidden bg-gradient-to-br from-[#e6332a] to-[#f9b233] py-20 px-4 text-center">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-white/70 text-xs font-bold uppercase tracking-[0.2em] mb-4">Cập nhật lần cuối: 20/05/2026</p>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none" style={{ fontFamily: "'Quicksand',sans-serif" }}>Chính Sách<br />Bảo Mật</h1>
          <div className="w-16 h-1 bg-white/40 mx-auto mt-6 rounded-full" />
          <p className="text-white/80 mt-6 text-base max-w-xl mx-auto leading-relaxed">
            Milingo cam kết bảo vệ quyền riêng tư của người dùng theo tiêu chuẩn quốc tế GDPR và COPPA.
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-3xl mx-auto px-4 py-14 space-y-6">

        <div className="bg-white dark:bg-[#1A1D24] rounded-3xl p-8 border border-stone-100 dark:border-white/5 shadow-sm">
          <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-base">
            Chính sách này giải thích cách <strong className="text-[#2D2926] dark:text-white">Milingo</strong> thu thập, sử dụng và bảo vệ thông tin cá nhân khi bạn truy cập <strong className="text-[#2D2926] dark:text-white">milingo.vn</strong> hoặc sử dụng ứng dụng Milingo. Bằng cách sử dụng dịch vụ, bạn đồng ý với nội dung chính sách này.
          </p>
        </div>

        <Section n="1" title="Thông Tin Chúng Tôi Thu Thập">
          <p className="font-semibold text-[#2D2926] dark:text-white">Thông tin bạn cung cấp trực tiếp</p>
          <CheckList items={[
            'Địa chỉ email và thông tin tài khoản (tên hiển thị, mật khẩu đã mã hóa)',
            'Ngôn ngữ mẹ đẻ và ngôn ngữ mục tiêu bạn muốn học',
            'Phản hồi, đánh giá và nội dung tương tác trong ứng dụng',
          ]} />
          <p className="font-semibold text-[#2D2926] dark:text-white mt-5">Dữ liệu thu thập tự động</p>
          <CheckList items={[
            'Dữ liệu học tập: tiến trình, lỗi sai, thời gian phiên, kết quả bài kiểm tra',
            'Thông tin thiết bị: loại máy, hệ điều hành, phiên bản trình duyệt',
            'Dữ liệu kết nối: địa chỉ IP, múi giờ, thống kê truy cập ở mức ẩn danh',
          ]} />
          <p className="font-semibold text-[#2D2926] dark:text-white mt-5">Dữ liệu từ Camera và AI</p>
          <CheckList items={[
            'Hình ảnh bạn chụp để nhận diện vật thể — gửi đến AI xử lý tức thì, không lưu trữ lâu dài',
            'Dữ liệu giọng nói (nếu có tính năng luyện phát âm) — chỉ xử lý trong phiên học',
            'Dữ liệu ẩn danh hóa có thể dùng cải thiện mô hình AI với sự đồng ý của bạn',
          ]} />
          <Note>Milingo không thu thập hình ảnh khuôn mặt, giấy tờ tùy thân hay thông tin thanh toán.</Note>
        </Section>

        <Section n="2" title="Mục Đích Sử Dụng Dữ Liệu">
          <CheckList items={[
            'Cung cấp, vận hành và liên tục cải thiện các tính năng học ngôn ngữ bằng AI',
            'Cá nhân hóa lộ trình học dựa trên tiến trình, điểm mạnh và điểm yếu của bạn',
            'Phân tích ẩn danh nhằm nâng cao độ chính xác của mô hình nhận diện vật thể',
            'Gửi thông báo cập nhật tính năng mới — bạn có thể hủy đăng ký bất kỳ lúc nào',
            'Phát hiện, ngăn chặn gian lận và các hành vi lạm dụng hệ thống',
            'Tuân thủ nghĩa vụ pháp lý theo quy định của pháp luật Việt Nam và quốc tế',
          ]} />
        </Section>

        <Section n="3" title="Cơ Sở Pháp Lý (GDPR)">
          <p className="mb-3">Milingo xử lý dữ liệu cá nhân dựa trên các cơ sở pháp lý sau:</p>
          <CheckList items={[
            'Thực hiện hợp đồng dịch vụ mà bạn đã chấp thuận khi đăng ký',
            'Lợi ích hợp pháp: cải thiện dịch vụ, đảm bảo an ninh, ngăn chặn lạm dụng',
            'Sự đồng ý rõ ràng của bạn đối với dữ liệu tùy chọn như marketing hoặc cải thiện AI',
            'Nghĩa vụ pháp lý khi cơ quan có thẩm quyền yêu cầu cung cấp thông tin',
          ]} />
        </Section>

        <Section n="4" title="Chia Sẻ Dữ Liệu Với Bên Thứ Ba">
          <p className="mb-4"><strong className="text-[#2D2926] dark:text-white">Milingo không bán dữ liệu người dùng.</strong> Chúng tôi chỉ chia sẻ trong các trường hợp sau:</p>
          <CheckList items={[
            'Google Gemini API — xử lý hình ảnh để tạo bài học theo hợp đồng bảo mật nghiêm ngặt, Google không được dùng dữ liệu cho mục đích riêng',
            'Nhà cung cấp dịch vụ đám mây (hosting, phân tích) — chỉ nhận dữ liệu tối thiểu cần thiết',
            'Cơ quan pháp luật — chỉ khi có yêu cầu hợp lệ theo quy định pháp luật',
            'Đối tác mới trong trường hợp Milingo được sáp nhập — bạn sẽ được thông báo trước',
          ]} />
        </Section>

        <Section n="5" title="Lưu Trữ và Bảo Mật">
          <CheckList items={[
            'Toàn bộ dữ liệu truyền tải được mã hóa bằng HTTPS/TLS',
            'Dữ liệu lưu trữ nhạy cảm được mã hóa AES-256',
            'Quyền truy cập nội bộ được kiểm soát theo nguyên tắc "chỉ ai cần mới được xem"',
            'Kiểm tra bảo mật định kỳ và vá lỗ hổng trong vòng 72 giờ sau khi phát hiện',
          ]} />
          <Note>Dữ liệu tài khoản được lưu đến khi bạn xóa tài khoản. Dữ liệu phân tích ẩn danh được giữ tối đa 24 tháng.</Note>
        </Section>

        <Section n="6" title="Quyền Của Bạn">
          <p className="mb-3">Bạn có đầy đủ các quyền theo quy định GDPR:</p>
          <CheckList items={[
            'Quyền truy cập — yêu cầu bản sao dữ liệu chúng tôi đang lưu giữ về bạn',
            'Quyền chỉnh sửa — cập nhật thông tin không chính xác hoặc lỗi thời',
            'Quyền xóa — yêu cầu xóa tài khoản và toàn bộ dữ liệu liên quan',
            'Quyền phản đối — từ chối xử lý dữ liệu cho mục đích marketing',
            'Quyền di chuyển dữ liệu — nhận dữ liệu học tập theo định dạng có thể đọc được',
            'Quyền thu hồi đồng ý — rút lại bất kỳ sự đồng ý nào bạn đã cấp trước đó',
          ]} />
          <p className="mt-4 text-sm">Để thực hiện quyền của mình, gửi yêu cầu đến <strong className="text-[#e6332a]">milingo.vn@gmail.com</strong>. Chúng tôi phản hồi trong vòng <strong>30 ngày làm việc</strong>.</p>
        </Section>

        <Section n="7" title="Bảo Vệ Trẻ Em">
          <p>Milingo không cố ý thu thập thông tin từ trẻ em dưới 13 tuổi theo tiêu chuẩn COPPA. Người dùng từ 13 đến 17 tuổi cần có sự đồng ý và giám sát từ phụ huynh hoặc người giám hộ hợp pháp.</p>
          <p className="mt-3">Nếu bạn là phụ huynh và phát hiện con mình đã đăng ký không có phép, vui lòng liên hệ ngay để chúng tôi xóa dữ liệu trong vòng <strong className="text-[#2D2926] dark:text-white">72 giờ</strong>.</p>
        </Section>

        <Section n="8" title="Cookie">
          <p className="mb-3">Milingo sử dụng ba loại cookie:</p>
          <CheckList items={[
            'Cookie cần thiết — duy trì phiên đăng nhập và bảo mật tài khoản. Không thể tắt.',
            'Cookie phân tích — đo lường hiệu suất trang và trải nghiệm người dùng. Có thể tắt.',
            'Cookie cá nhân hóa — ghi nhớ ngôn ngữ và cài đặt giao diện. Có thể tắt.',
          ]} />
          <p className="mt-4 text-sm">Quản lý cookie qua cài đặt trình duyệt hoặc trang tùy chọn trong ứng dụng.</p>
        </Section>

        <Section n="9" title="Thay Đổi Chính Sách">
          <p>Chúng tôi có thể cập nhật chính sách này định kỳ để phản ánh thay đổi pháp lý hoặc tính năng mới. Khi có thay đổi quan trọng, Milingo sẽ thông báo qua email ít nhất <strong className="text-[#2D2926] dark:text-white">7 ngày trước</strong> khi có hiệu lực. Ngày cập nhật luôn được ghi rõ ở đầu trang.</p>
        </Section>

        {/* Contact CTA */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#e6332a] to-[#f9b233] p-10 text-white">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-2" style={{ fontFamily: "'Quicksand',sans-serif" }}>Liên Hệ Milingo</h3>
            <p className="text-white/80 mb-6 text-sm">Có thắc mắc về quyền riêng tư? Chúng tôi luôn sẵn sàng hỗ trợ.</p>
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
          Chính sách áp dụng cho toàn bộ người dùng milingo.vn và ứng dụng Milingo. © Milingo 2026
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
