
const membersVi = [
  { name: "Nguyễn Bá Ất", role: "MKT / AI Research", avatar: "img/At.png" },
  { name: "Hoàng Văn Dũng", role: "Team Leader - CEO", avatar: "img/Dung.png" },
  { name: "Mai Cẩm Tú", role: "Marketing Lead", avatar: "img/Tu.png" },
  { name: "Ngô Quang Khôi", role: "Developer / Front-end", avatar: "img/Khoi.png" },
  { name: "Nguyễn Thị Kiều Loan", role: "Growth Hacker", avatar: "img/Loan.png" },
  { name: "Đặng Nguyễn Phước Lộc", role: "Developer / Back-end", avatar: "img/Loc.png" }
];

const membersEn = membersVi.map(m => ({ ...m }));
const membersJa = membersVi.map(m => ({ ...m, role: m.role.replace("Developer", "開発者").replace("Lead", "リード") }));
const membersKo = membersVi.map(m => ({ ...m, role: m.role.replace("Developer", "개발자").replace("Lead", "리드") }));
const membersZh = membersVi.map(m => ({ ...m, role: m.role.replace("Developer", "开发者").replace("Lead", "负责人") }));
const membersFr = membersVi.map(m => ({ ...m, role: m.role.replace("Developer", "Développeur").replace("Lead", "Chef") }));
const membersDe = membersVi.map(m => ({ ...m, role: m.role.replace("Developer", "Entwickler").replace("Lead", "Leiter") }));
const membersEs = membersVi.map(m => ({ ...m, role: m.role.replace("Developer", "Desarrollador").replace("Lead", "Líder") }));
const membersIt = membersVi.map(m => ({ ...m, role: m.role.replace("Developer", "Sviluppatore").replace("Lead", "Capo") }));

const problemCardsVi = [
  { title: "Thiếu ngữ cảnh", desc: "Học từ vựng mà không có ngữ cảnh thực tế khiến chúng cực kỳ dễ quên." },
  { title: "Danh sách khô khan", desc: "Ghi nhớ các danh sách từ vựng không phản ánh cách sử dụng trong đời thực." },
  { title: "Sự nhàm chán", desc: "Các bài học lặp đi lặp lại làm mất đi động lực." }
];

export const translations: Record<string, any> = {
  vi: {
    nav: { how: "Giới thiệu", about: "Đội ngũ", demo: "Dùng thử demo", cta: "Tải Milingo" },
    languages: { vi: "Tiếng Việt", en: "Tiếng Anh", ja: "Tiếng Nhật", zh: "Tiếng Trung", ko: "Tiếng Hàn", fr: "Tiếng Pháp", de: "Tiếng Đức", es: "Tiếng Tây Ban Nha", it: "Tiếng Ý" },
    hero: { badge: "Coming Soon", title1: "Milingo", title2: "Chụp-Kể-Hiểu", desc: "Milingo – một ứng dụng học ngoại ngữ tích hợp Camera và Trí tuệ nhân tạo ( AI ). Chỉ cần mở camera, ghi lại khoảnh khắc và bắt đầu học ngay.", btn1: "Dùng thử Demo", btn2: "Xem cách hoạt động", floatingTitle: "Học từ khoảnh khắc này" },
    aboutPage: { title: "Chúng tôi là MiLingo.", subtitle: "Milingo Team", description: "Chúng tôi là MiLingo — ứng dụng EdTech ứng dụng AI giúp người dùng học ngoại ngữ thông qua ngữ cảnh thực tế, biến mọi vật xung quanh thành bài học sống động và dễ ghi nhớ.", teamTitle: "Đội ngũ phát triển", fptTag: "From 6ACE with love <3", members: membersVi },
    visionMission: { visionTitle: "Tầm nhìn", visionText: "Trở thành nền tảng học ngôn ngữ qua trải nghiệm đời sống hàng ngày dành cho mọi lứa tuổi.", missionTitle: "Sứ mệnh", missionText: "Ứng dụng giúp người học “nhìn thấy - hiểu được - ghi nhớ lâu” ngôn ngữ thông qua thế giới thực và công nghệ AI." },
    multi: { title: "Khám phá thế giới đa ngôn ngữ", desc: "MiLingo hỗ trợ những ngôn ngữ phổ biến nhất hiện nay." },
    problem: { badge: "Vấn đề", title: "Tại sao việc học ngoại ngữ lại khó đến thế?", subtitle: "Học là bằng trải nghiệm của bạn.", cards: problemCardsVi },
    demo: { badge: "Khám phá tính năng", title: "Trải nghiệm MiLingo ngay", desc: "Chụp ảnh hoặc tải lên bất kỳ thứ gì để học ngay.", upload: "Nhấp để chụp hoặc tải ảnh lên", hint: "Cà phê, sách, máy tính, cửa sổ...", analyzing: "Mi đang suy nghĩ, bạn chờ Mi xíu xiu nhé... ✨", placeholder: "Hãy chọn ngôn ngữ mục tiêu và tải ảnh lên.", keyword: "Từ khóa", sentence: "Mẫu câu MiLingo", targetLang: "Tôi muốn học tiếng:", genConv: "Tạo hội thoại mẫu", convTitle: "Hội thoại thực tế", generatingConv: "Mi đang tạo đoạn hội thoại chờ xíu xiu nhé <3" },
    cta: { title: "Tải MiLingo ngay", desc: "Coming Soon", apkBtn: "Tải APK Demo ứng dụng" },
    footer: { aboutTitle: "Về chúng tôi", whatTitle: "MiLingo là gì?", whatDesc: "MiLingo là ứng dụng học ngôn ngữ đột phá sử dụng AI.", followTitle: "Theo dõi Milingo", contact: "Liên hệ chúng tôi", privacy: "Chính sách bảo mật", terms: "Điều khoản sử dụng", copyright: "Milingo 2026" }
  },
  en: {
    nav: { how: "About", about: "Team", demo: "Try Demo", cta: "Download" },
    languages: { vi: "Vietnamese", en: "English", ja: "Japanese", zh: "Chinese", ko: "Korean", fr: "French", de: "German", es: "Spanish", it: "Italian" },
    hero: { badge: "Launching July 2026", title1: "Milingo", title2: "Snap-Speak-Learn", desc: "Milingo – an AI-powered language app. Capture your world and start learning instantly.", btn1: "Try Demo", btn2: "How it works", floatingTitle: "Learn from now" },
    aboutPage: { title: "We are MiLingo.", subtitle: "Milingo Team", description: "MiLingo turns the real world into your classroom using AI and camera technology.", teamTitle: "The Team", fptTag: "From 6ACE with love", members: membersEn },
    visionMission: { visionTitle: "Vision", visionText: "Leading platform for experiential language learning for all ages.", missionTitle: "Mission", missionText: "Helping learners see and understand the world through AI." },
    multi: { title: "Multilingual Support", desc: "Milingo supports the world's most popular languages." },
    problem: { badge: "Problem", title: "Why is learning so hard?", subtitle: "Context is everything.", cards: [ { title: "No Context", desc: "Abstract learning is easy to forget." }, { title: "Dry Lists", desc: "Lists don't reflect real usage." }, { title: "Boring", desc: "Traditional methods kill motivation." } ] },
    demo: { badge: "Demo", title: "Experience Now", desc: "Snap or upload to learn.", upload: "Click to snap or upload", hint: "Coffee, book, laptop...", analyzing: "Mi is thinking... ✨", placeholder: "Choose target language and upload.", keyword: "Keyword", sentence: "Sentence", targetLang: "I want to learn:", genConv: "Generate Conversation", convTitle: "Practice", generatingConv: "Generating conversation..." },
    cta: { title: "Download Now", desc: "Coming July 2026", apkBtn: "Download APK Demo" },
    footer: { aboutTitle: "About", whatTitle: "What is Milingo?", whatDesc: "AI language learning app.", followTitle: "Follow Us", contact: "Contact", privacy: "Privacy", terms: "Terms", copyright: "Milingo 2026" }
  },
  ko: {
    nav: { how: "소개", about: "팀", demo: "데모", cta: "다운로드" },
    languages: { vi: "베트남어", en: "영어", ja: "일본어", zh: "중국어", ko: "한국어", fr: "프랑스어", de: "독일어", es: "스페인어", it: "이탈리아어" },
    hero: { badge: "2026년 7월 출시", title1: "Milingo", title2: "찍고-말하고-배우기", desc: "AI 카메라 언어 학습 앱. 세상을 찍고 즉시 학습을 시작하세요.", btn1: "데모 체험", btn2: "작동 방식", floatingTitle: "지금부터 학습" },
    aboutPage: { title: "우리는 MiLingo입니다.", subtitle: "Milingo 팀", description: "AI와 카메라로 실제 문맥에서 어휘를 배웁니다.", teamTitle: "팀원", fptTag: "6ACE에서 사랑을 담아", members: membersKo },
    visionMission: { visionTitle: "비전", visionText: "체험형 언어 학습의 선두주자.", missionTitle: "사명", missionText: "AI를 통해 세상을 보고 이해하도록 돕습니다." },
    multi: { title: "다국어 지원", desc: "전 세계 인기 언어를 모두 지원합니다." },
    problem: { badge: "문제", title: "왜 학습이 어려울까요?", subtitle: "문맥이 핵심입니다.", cards: [ { title: "문맥 부족", desc: "연결 고리 없는 학습은 쉽게 잊힙니다." }, { title: "지루함", desc: "전통적인 방식은 동기를 잃게 합니다." }, { title: "비실용적", desc: "단어장은 실제 대화를 담지 못합니다." } ] },
    demo: { badge: "데모", title: "지금 체험하기", desc: "찍거나 올려서 바로 배우세요.", upload: "클릭하여 촬영 또는 업로드", hint: "커피, 책, 노트북...", analyzing: "Mi가 생각 중입니다... ✨", placeholder: "언어를 선택하고 사진을 올리세요.", keyword: "키워드", sentence: "예문", targetLang: "배우고 싶은 언어:", genConv: "대화 생성", convTitle: "연습", generatingConv: "대화를 생성 중입니다..." },
    cta: { title: "지금 다운로드", desc: "2026년 7월 공개", apkBtn: "APK 데모 다운로드" },
    footer: { aboutTitle: "소개", whatTitle: "MiLingo란?", whatDesc: "AI 언어 학습 앱.", followTitle: "팔로우", contact: "문의", privacy: "개인정보", terms: "이용약관", copyright: "Milingo 2026" }
  },
  ja: {
    nav: { how: "紹介", about: "チーム", demo: "デモ", cta: "ダウンロード" },
    languages: { vi: "ベトナム語", en: "英語", ja: "日本語", zh: "中国語", ko: "韓国語", fr: "フランス語", de: "ドイツ語", es: "スペイン語", it: "イタリア語" },
    hero: { badge: "2026年7月開始", title1: "Milingo", title2: "撮る・話す・学ぶ", desc: "AIカメラと言語学習の融合。世界を撮って、今すぐ学び始めましょう。", btn1: "デモを試す", btn2: "仕組み", floatingTitle: "今から学ぶ" },
    aboutPage: { title: "私たちはMiLingoです。", subtitle: "チーム", description: "AIとカメラで、現実の文脈から語彙を学びます。", teamTitle: "チーム紹介", fptTag: "6ACEより愛を込めて", members: membersJa },
    visionMission: { visionTitle: "ビジョン", visionText: "体験型言語学習の最高峰へ。", missionTitle: "使命", missionText: "AIを通じて世界を見て理解する手助けをします。" },
    multi: { title: "多言語対応", desc: "世界中で使われている主要言語をサポート。" },
    problem: { badge: "問題", title: "なぜ学習は難しいのか？", subtitle: "文脈こそがすべてです。", cards: [ { title: "文脈不足", desc: "文脈がないとすぐに忘れます." }, { title: "退屈", desc: "従来の方法では続きません." }, { title: "実用性なし", desc: "単語帳は生きた会話を反映しません." } ] },
    demo: { badge: "デモ", title: "今すぐ体験", desc: "撮るかアップロードして学びましょう。", upload: "クリックして撮影・選択", hint: "コーヒー、本、ノートPC...", analyzing: "Miが考えています... ✨", placeholder: "言語を選んでアップロードしてください。", keyword: "キーワード", sentence: "例文", targetLang: "学びたい言語:", genConv: "会話生成", convTitle: "練習", generatingConv: "会話を作成中..." },
    cta: { title: "今すぐダウンロード", desc: "2026年7月登場", apkBtn: "APKデモをダウンロード" },
    footer: { aboutTitle: "詳細", whatTitle: "MiLingoとは？", whatDesc: "AI言語学習アプリ。", followTitle: "フォローする", contact: "連絡先", privacy: "プライバシー", terms: "規約", copyright: "Milingo 2026" }
  },
  zh: {
    nav: { how: "介绍", about: "团队", demo: "演示", cta: "下载" },
    languages: { vi: "越南语", en: "英语", ja: "日语", zh: "中文", ko: "韩语", fr: "法语", de: "德语", es: "西班牙语", it: "意大利语" },
    hero: { badge: "2026年7月发布", title1: "Milingo", title2: "拍照-说话-学习", desc: "AI 相机语言学习应用。拍摄你的世界，开启即时学习。", btn1: "试用演示", btn2: "了解原理", floatingTitle: "从现在开始" },
    aboutPage: { title: "我们是 MiLingo。", subtitle: "团队", description: "利用 AI 和相机在真实语境中学习单词。", teamTitle: "团队成员", fptTag: "来自 6ACE 的爱", members: membersZh },
    visionMission: { visionTitle: "愿景", visionText: "成为体验式语言学习的领先平台。", missionTitle: "使命", missionText: "通过 AI 帮助学习者看懂并理解世界。" },
    multi: { title: "多语言支持", desc: "支持全球最流行的语言。" },
    problem: { badge: "问题", title: "为什么学习这么难？", subtitle: "语境决定一切。", cards: [ { title: "缺乏语境", desc: "无关联的学习极易遗忘。" }, { title: "枯燥", desc: "传统方法让人失去动力。" }, { title: "死板", desc: "单词表无法反映真实用法。" } ] },
    demo: { badge: "演示", title: "立即体验", desc: "拍照或上传即可学习。", upload: "点击拍照或上传", hint: "咖啡、书籍、电脑...", analyzing: "Mi 正在思考... ✨", placeholder: "选择目标语言并上传照片。", keyword: "关键词", sentence: "例句", targetLang: "我想学习:", genConv: "生成对话", convTitle: "练习", generatingConv: "正在生成对话..." },
    cta: { title: "立即下载", desc: "2026年7月发布", apkBtn: "下载 APK 演示版" },
    footer: { aboutTitle: "关于", whatTitle: "什么是 MiLingo？", whatDesc: "AI 语言学习应用。", followTitle: "关注我们", contact: "联系", privacy: "隐私", terms: "条款", copyright: "Milingo 2026" }
  },
  fr: {
    nav: { how: "Présentation", about: "Équipe", demo: "Essayer Démo", cta: "Télécharger" },
    languages: { vi: "Vietnamien", en: "Anglais", ja: "Japonais", zh: "Chinois", ko: "Coréen", fr: "Français", de: "Allemand", es: "Espagnol", it: "Italien" },
    hero: { badge: "Lancement Juillet 2026", title1: "Milingo", title2: "Capter-Parler-Apprendre", desc: "Milingo – une application de langue assistée par IA. Capturez votre monde et apprenez instantanément.", btn1: "Essayer la Démo", btn2: "Fonctionnement", floatingTitle: "Apprendre maintenant" },
    aboutPage: { title: "Nous sommes MiLingo.", subtitle: "Équipe Milingo", description: "MiLingo utilise l'IA et la caméra pour apprendre du vocabulaire en contexte réel.", teamTitle: "L'Équipe", fptTag: "Avec amour de 6ACE", members: membersFr },
    visionMission: { visionTitle: "Vision", visionText: "Devenir la plateforme leader de l'apprentissage par l'expérience.", missionTitle: "Mission", missionText: "Aider à comprendre le monde via l'IA." },
    multi: { title: "Support Multilingue", desc: "Milingo supporte les langues les plus populaires au monde." },
    problem: { badge: "Problème", title: "Pourquoi est-ce si difficile ?", subtitle: "Le contexte est la clé.", cards: [ { title: "Manque de Contexte", desc: "L'apprentissage abstrait s'oublie vite." }, { title: "Ennui", desc: "Les méthodes traditionnelles tuent la motivation." }, { title: "Peu Pratique", desc: "Les listes de mots ne reflètent pas l'usage réel." } ] },
    demo: { badge: "Démo", title: "Expérience Immédiate", desc: "Prenez une photo pour apprendre.", upload: "Cliquer pour capturer", hint: "Café, livre, ordi...", analyzing: "Mi réfléchit... ✨", placeholder: "Choisissez une langue et envoyez une photo.", keyword: "Mot-clé", sentence: "Phrase", targetLang: "Je veux apprendre :", genConv: "Générer Dialogue", convTitle: "Pratique", generatingConv: "Génération en cours..." },
    cta: { title: "Télécharger", desc: "Sortie Juillet 2026", apkBtn: "Télécharger l'APK de démo" },
    footer: { aboutTitle: "À Propos", whatTitle: "C'est quoi Milingo ?", whatDesc: "App d'apprentissage IA.", followTitle: "Nous Suivre", contact: "Contact", privacy: "Confidentialité", terms: "Conditions", copyright: "Milingo 2026" }
  },
  de: {
    nav: { how: "Über uns", about: "Team", demo: "Demo testen", cta: "Download" },
    languages: { vi: "Vietnamesisch", en: "Englisch", ja: "Japanisch", zh: "Chinesisch", ko: "Koreanisch", fr: "Französisch", de: "Deutsch", es: "Spanisch", it: "Italienisch" },
    hero: { badge: "Start im Juli 2026", title1: "Milingo", title2: "Knipsen-Sprechen-Lernen", desc: "Milingo – eine KI-gestützte Sprach-App. Erfasse deine Welt und lerne sofort.", btn1: "Demo ausprobieren", btn2: "Wie es funktioniert", floatingTitle: "Jetzt lernen" },
    aboutPage: { title: "Wir sind MiLingo.", subtitle: "Milingo Team", description: "MiLingo nutzt KI und Kamera für kontextuelles Vokabellernen.", teamTitle: "Das Team", fptTag: "Von 6ACE mit Liebe", members: membersDe },
    visionMission: { visionTitle: "Vision", visionText: "Die führende Plattform für erlebnisbasiertes Sprachenlernen.", missionTitle: "Mission", missionText: "Die Welt durch KI verstehen helfen." },
    multi: { title: "Mehrsprachig", desc: "Milingo unterstützt die beliebtesten Sprachen weltweit." },
    problem: { badge: "Problem", title: "Warum ist Lernen so schwer?", subtitle: "Kontext ist alles.", cards: [ { title: "Kein Kontext", desc: "Abstraktes Lernen wird schnell vergessen." }, { title: "Langeweile", desc: "Traditionelle Methoden töten die Motivation." }, { title: "Unpraktisch", desc: "Wortlisten spiegeln không den realen Gebrauch wider." } ] },
    demo: { badge: "Demo", title: "Jetzt Erleben", desc: "Foto machen und lerne.", upload: "Klicken zum Aufnehmen", hint: "Kaffee, Buch, Laptop...", analyzing: "Mi denkt nach... ✨", placeholder: "Sprache wählen und Foto hochladen.", keyword: "Stichwort", sentence: "Satz", targetLang: "Ich möchte lernen:", genConv: "Gespräch generieren", convTitle: "Praxis", generatingConv: "Gespräch wird erstellt..." },
    cta: { title: "Jetzt Downloaden", desc: "Erscheint Juli 2026", apkBtn: "APK-Demo herunterladen" },
    footer: { aboutTitle: "Über", whatTitle: "Was ist Milingo?", whatDesc: "KI-Sprachlern-App.", followTitle: "Folgen Sie uns", contact: "Kontakt", privacy: "Datenschutz", terms: "AGB", copyright: "Milingo 2026" }
  },
  es: {
    nav: { how: "Acerca de", about: "Equipo", demo: "Probar Demo", cta: "Descargar" },
    languages: { vi: "Vietnamita", en: "Inglés", ja: "Japonés", zh: "Chino", ko: "Coreano", fr: "Francés", de: "Alemán", es: "Español", it: "Italiano" },
    hero: { badge: "Lanzamiento Julio 2026", title1: "Milingo", title2: "Captura-Habla-Aprende", desc: "Milingo – una app de idiomas con IA. Captura tu mundo y aprende al instante.", btn1: "Probar Demo", btn2: "Cómo funciona", floatingTitle: "Aprender ahora" },
    aboutPage: { title: "Somos MiLingo.", subtitle: "Equipo Milingo", description: "MiLingo usa IA y cámara para aprender vocabulario en contexto real.", teamTitle: "El Equipo", fptTag: "De 6ACE con amor", members: membersEs },
    visionMission: { visionTitle: "Visión", visionText: "La plataforma líder en aprendizaje experiencial de idiomas.", missionTitle: "Misión", missionText: "Ayudar a entender el mundo a través de la IA." },
    multi: { title: "Soporte Multilingüe", desc: "Milingo soporta los idiomas más populares del mundo." },
    problem: { badge: "Problema", title: "¿Por qué es tan difícil?", subtitle: "El contexto lo es todo.", cards: [ { title: "Sin Contexto", desc: "Lo abstracto se olvida fácilmente." }, { title: "Aburrimiento", desc: "Métodos tradicionales matan la motivación." }, { title: "Poco Práctico", desc: "Listas de palabras no reflejan uso real." } ] },
    demo: { badge: "Demo", title: "Experiencia Ya", desc: "Captura o sube para aprender.", upload: "Clic para capturar", hint: "Café, libro, laptop...", analyzing: "Mi está pensando... ✨", placeholder: "Elige idioma y sube una foto.", keyword: "Palabra clave", sentence: "Frase", targetLang: "Quiero aprender:", genConv: "Generar Diálogo", convTitle: "Práctica", generatingConv: "Generando diálogo..." },
    cta: { title: "Descargar Ya", desc: "Disponible Julio 2026", apkBtn: "Descargar APK de demostración" },
    footer: { aboutTitle: "Acerca", whatTitle: "¿Qué es Milingo?", whatDesc: "App de aprendizaje con IA.", followTitle: "Síguenos", contact: "Contacto", privacy: "Privacidad", terms: "Términos", copyright: "Milingo 2026" }
  },
  it: {
    nav: { how: "Info", about: "Team", demo: "Prova Demo", cta: "Scarica" },
    languages: { vi: "Vietnamita", en: "Inglese", ja: "Giapponese", zh: "Cinese", ko: "Coreano", fr: "Francese", de: "Tedesco", es: "Spagnolo", it: "Italiano" },
    hero: { badge: "Lancio Luglio 2026", title1: "Milingo", title2: "Scatta-Parla-Impara", desc: "Milingo – un'app linguistica con IA. Scatta foto al tuo mondo e impara subito.", btn1: "Prova la Demo", btn2: "Come funziona", floatingTitle: "Impara ora" },
    aboutPage: { title: "Siamo MiLingo.", subtitle: "Team Milingo", description: "MiLingo usa IA e fotocamera per imparare vocaboli nel contesto reale.", teamTitle: "Il Team", fptTag: "Da 6ACE con amore", members: membersIt },
    visionMission: { visionTitle: "Visione", visionText: "La piattaforma leader per l'apprendimento esperienziale.", missionTitle: "Missione", missionText: "Aiutare a capire il mondo tramite l'IA." },
    multi: { title: "Supporto Multilingue", desc: "Milingo supporta le lingue più diffuse al mondo." },
    problem: { badge: "Problema", title: "Perché è così difficile?", subtitle: "Il contesto è tutto.", cards: [ { title: "Senza Contesto", desc: "L'apprendimento astratto si dimentica presto." }, { title: "Noia", desc: "I metodi classici uccidono la motivazione." }, { title: "Poco Pratico", desc: "Le liste di parole non riflettono l'uso reale." } ] },
    demo: { badge: "Demo", title: "Esperienza Subito", desc: "Scatta o carica per imparare.", upload: "Clicca per scattare", hint: "Caffè, libro, laptop...", analyzing: "Mi sta pensando... ✨", placeholder: "Scegli la lingua e carica una foto.", keyword: "Parola chiave", sentence: "Frase", targetLang: "Voglio imparare:", genConv: "Genera Dialogo", convTitle: "Pratica", generatingConv: "Generazione dialogo..." },
    cta: { title: "Scarica Ora", desc: "Disponibile Luglio 2026", apkBtn: "Scarica l'APK demo" },
    footer: { aboutTitle: "Info", whatTitle: "Cos'è Milingo?", whatDesc: "App di apprendimento IA.", followTitle: "Seguici", contact: "Contatti", privacy: "Privacy", terms: "Termini", copyright: "Milingo 2026" }
  }
};
