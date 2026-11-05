'use strict';

/* =====================================================================
   NỘI DUNG CÓ THỂ SỬA
   Dự án và báo chí đều lấy từ hai danh sách dưới đây.
   Chữ có hai ngôn ngữ viết dạng { en: '...', vi: '...', ja: '...' }; chữ giống nhau
   ở cả hai ngôn ngữ (tên công nghệ, tên riêng) viết thẳng là được.
   Link nào chưa có thì bỏ trống: nút tương ứng sẽ tự ẩn.
   Thứ tự trong danh sách là thứ tự hiển thị; wide: true cho thẻ rộng gấp đôi.
   Ảnh bài báo nên có tỉ lệ 3:2.
   Nội dung được chèn thẳng vào HTML nên đừng dán dữ liệu từ nguồn lạ,
   và viết "dưới 500 ms" thay vì dùng dấu nhỏ hơn.
   ===================================================================== */

const projects = [
  {
    id: 'shope',
    wide: true,
    title: 'Multi-Vendor <span class="nowrap">E-Commerce</span>',
    meta: {
      en: 'Semester 4 project · Team Lead · Mar–Jun 2026',
      vi: 'Đồ án học kỳ 4 · Team Lead · 03–06/2026',
      ja: '4 学期のプロジェクト・チームリーダー・2026年3月〜6月',
    },
    score: '99/100',
    image: 'assets/img/project-shope.webp',
    imageSize: [1600, 800],
    imageAlt: {
      en: 'SwiftCart storefront in a browser next to the buyer app and the delivery rider app',
      vi: 'Trang chủ SwiftCart trên trình duyệt, bên cạnh app người mua và app shipper',
      ja: 'ブラウザの SwiftCart ストアと、購入者アプリ、配達員アプリの画面',
    },
    summary: {
      en: 'A multi-vendor marketplace for buyers, sellers and admins, from multi-shop checkout to the money ledger and shipping.',
      vi: 'Nền tảng thương mại điện tử đa nhà bán cho người mua, người bán và quản trị viên: từ checkout nhiều gian hàng đến sổ cái tiền và vận chuyển.',
      ja: '購入者・出品者・管理者向けのマルチベンダー EC プラットフォーム。複数店舗の一括決済から資金台帳、配送までを扱います。',
    },
    numbers: [
      ['~380', 'API endpoints'],
      ['142', 'Flyway migrations'],
      ['~680', 'test classes'],
      ['10', { en: 'parallel CI shards', vi: 'CI shards song song', ja: '並列 CI シャード' }],
    ],
    stack: ['Spring Boot', 'ReactJS', 'MySQL', 'Redis', 'Docker', 'AWS', 'GitHub Actions'],
    items: {
      en: [
        'REST API of about 380 endpoints: multi-shop checkout, vouchers with the Strategy pattern, loyalty coins, returns, disputes, and seller payouts held until the return window closes.',
        'VNPay integration with HMAC-SHA512 signature checks and idempotent IPN handling, plus COD and an in-app wallet.',
        'Money ledger: every wallet balance is backed by a platform custody account, with idempotent transfers, a fixed lock order against deadlocks, and MySQL triggers that reject unbacked wallet writes.',
        'Two-layer overselling guard: a Redis availability gate plus an atomic conditional SQL update with an optimistic version column.',
        'JWT refresh-token rotation with reuse detection, Redis-based rate limiting, and AES-GCM encryption for seller ID numbers.',
        'GHN shipping API integration and a self-built GHN Simulator for delivery, COD collection and remittance.',
        'S3 for public media and a private KYC bucket, SES, SQS queues for rule-based and Claude AI product moderation, and Parameter Store. Real-time chat over WebSocket and MongoDB.',
        'About 680 test classes on Testcontainers MySQL using production migrations, with CI split across 10 parallel shards.',
      ],
      vi: [
        'REST API khoảng 380 endpoints: checkout nhiều gian hàng, voucher theo Strategy pattern, loyalty coins, đổi trả, tranh chấp, và thanh toán cho người bán sau thời hạn đổi trả.',
        'Tích hợp VNPay với kiểm tra chữ ký HMAC-SHA512 và xử lý IPN idempotent, cùng COD và ví trong ứng dụng.',
        'Sổ cái tiền: mọi số dư ví đều có tài khoản custody của nền tảng đứng sau, chuyển khoản idempotent, thứ tự khóa cố định để tránh deadlock, trigger MySQL chặn ghi ví không có bảo chứng.',
        'Chống bán vượt tồn kho bằng hai lớp: cổng kiểm tra trên Redis và câu lệnh SQL có điều kiện với cột optimistic version.',
        'JWT refresh-token rotation và phát hiện tái sử dụng, rate limiting qua Redis, mã hóa AES-GCM cho số giấy tờ của người bán.',
        'Tích hợp API GHN và tự viết GHN Simulator cho giao hàng, thu hộ và đối soát.',
        'S3 cho media công khai và bucket KYC riêng tư, SES, SQS cho kiểm duyệt sản phẩm theo quy tắc và bằng Claude AI, Parameter Store. Chat thời gian thực qua WebSocket và MongoDB.',
        'Khoảng 680 test classes trên Testcontainers MySQL dùng migration thật, CI chia 10 shard chạy song song.',
      ],
      ja: [
        '約 380 エンドポイントの REST API:複数店舗の一括決済、Strategy パターンによるクーポン、ポイント、返品、紛争対応、返品期間終了まで保留する出品者への支払い。',
        'HMAC-SHA512 署名検証とべき等な IPN 処理を備えた VNPay 連携に加え、代金引換とアプリ内ウォレットに対応しました。',
        '資金台帳:すべてのウォレット残高をプラットフォームの預かり口座で裏付け、べき等な送金、デッドロックを防ぐ固定のロック順序、裏付けのない書き込みを拒否する MySQL トリガーを実装しました。',
        '二段構えの過剰販売対策:Redis による在庫チェックと、楽観的バージョン列を使った条件付きのアトミックな SQL 更新。',
        '再利用検知付きの JWT リフレッシュトークンローテーション、Redis によるレート制限、出品者の身分証番号の AES-GCM 暗号化を実装しました。',
        'GHN 配送 API と連携し、配達・代金引換・送金のための GHN シミュレーターを自作しました。',
        '公開メディアと非公開の KYC バケットに S3、SES、ルールベースと Claude AI による商品審査用の SQS キュー、Parameter Store を利用。WebSocket と MongoDB でリアルタイムチャットを実装しました。',
        '本番と同じマイグレーションを使う Testcontainers MySQL 上で約 680 のテストクラスを実行し、CI を 10 並列シャードに分割しました。',
      ],
    },
    links: {
      // Bật lại khi canhle.dev đã trỏ DNS và demo chạy.
      // live: 'https://canhle.dev/shop-e',
      github: 'https://github.com/canhle1993/ShopE-showcase',
    },
  },
  {
    id: 'caption',
    title: { en: 'Neural Image Captioning', vi: 'Sinh mô tả ảnh tự động', ja: '画像キャプション自動生成' },
    meta: {
      en: 'ACNPRO-AI capstone · Team of 2 · Apr 2026',
      vi: 'Đồ án cuối khóa ACNPRO-AI · Nhóm 2 người · 04/2026',
      ja: 'ACNPRO-AI 卒業制作・2 名チーム・2026年4月',
    },
    score: '94/100',
    image: { en: 'assets/img/project-caption-en.webp', vi: 'assets/img/project-caption.webp', ja: 'assets/img/project-caption-en.webp' },
    imageSize: [1400, 700],
    imageAlt: {
      en: 'Three sample photos with captions written by the model: a man doing a trick on a skateboard, a motorcyclist is riding a motorcycle, a man is climbing on a rock',
      vi: 'Ba ảnh mẫu kèm câu do mô hình tự sinh: a man doing a trick on a skateboard, a motorcyclist is riding a motorcycle, a man is climbing on a rock',
      ja: 'モデルが生成したキャプション付きのサンプル写真 3 枚:a man doing a trick on a skateboard、a motorcyclist is riding a motorcycle、a man is climbing on a rock',
    },
    summary: {
      en: 'Give it a photo and the model writes an English sentence describing it. The project builds an Encoder-Decoder architecture with Bahdanau Attention and compares three encoders on the Flickr30k dataset.',
      vi: 'Đưa vào một bức ảnh, mô hình tự viết câu mô tả tiếng Anh. Đồ án xây kiến trúc Encoder-Decoder với Bahdanau Attention và so sánh ba encoder trên bộ dữ liệu Flickr30k.',
      ja: '写真を入れると、その内容を英語の文で説明するモデルです。Bahdanau Attention 付きの Encoder-Decoder を構築し、Flickr30k で 3 種類のエンコーダーを比較しました。',
    },
    numbers: [
      [{ en: '24.8%', vi: '24,8%', ja: '24.8%' }, { en: 'best BLEU-4', vi: 'BLEU-4 tốt nhất', ja: '最高 BLEU-4' }],
      ['3', { en: 'encoders compared', vi: 'encoder được so sánh', ja: '比較したエンコーダー' }],
      [{ en: '31,783', vi: '31.783', ja: '31,783' }, { en: 'Flickr30k images', vi: 'ảnh Flickr30k', ja: 'Flickr30k の画像' }],
      [{ en: '1,000', vi: '1.000', ja: '1,000' }, { en: 'test images', vi: 'ảnh trong tập test', ja: 'テスト画像' }],
    ],
    stack: ['Python', 'PyTorch', 'ResNet-101', 'CLIP', 'VGG16', 'LSTM', 'GloVe', 'Streamlit'],
    results: {
      caption: {
        en: 'BLEU scores on the 1,000-image test set, same LSTM + Attention decoder',
        vi: 'Điểm BLEU trên tập test 1.000 ảnh, cùng decoder LSTM + Attention',
        ja: 'テスト画像 1,000 枚での BLEU スコア(デコーダーはすべて LSTM + Attention)',
      },
      head: ['Encoder', 'BLEU-1', 'BLEU-2', 'BLEU-3', 'BLEU-4'],
      rows: [
        ['ResNet-101', 68.1, 49.5, 35.0, 24.8],
        ['CLIP', 66.0, 48.3, 34.4, 24.3],
        ['VGG16', 61.6, 43.6, 30.5, 21.3],
      ],
    },
    itemsTitle: { en: 'About the project', vi: 'Nội dung đồ án', ja: 'プロジェクト概要' },
    items: {
      en: [
        'Built an Encoder-Decoder architecture: the encoder extracts image features at 49 spatial positions, and an LSTM decoder with Bahdanau Attention writes the caption word by word.',
        'Compared VGG16, ResNet-101 and CLIP ViT-B/32 on the same dataset and test set.',
        'Initialized embeddings with GloVe 300d, trained with Teacher Forcing and label smoothing, and generated captions with Beam Search (k=5).',
        'ResNet-101 reached the highest BLEU-4. CLIP came close at about half the training time per epoch.',
        'Built a Streamlit demo app: upload a photo and get a caption.',
      ],
      vi: [
        'Xây kiến trúc Encoder-Decoder: encoder trích đặc trưng ảnh tại 49 vị trí không gian, decoder LSTM với Bahdanau Attention sinh câu theo từng từ.',
        'So sánh VGG16, ResNet-101 và CLIP ViT-B/32 trên cùng bộ dữ liệu và cùng tập test.',
        'Khởi tạo embedding bằng GloVe 300d, huấn luyện với Teacher Forcing và label smoothing, sinh câu bằng Beam Search (k=5).',
        'ResNet-101 đạt BLEU-4 cao nhất. CLIP bám sát với thời gian huấn luyện mỗi epoch chỉ bằng khoảng một nửa.',
        'Làm app demo Streamlit: tải ảnh lên và nhận câu mô tả.',
      ],
      ja: [
        'Encoder-Decoder 構成を構築しました。エンコーダーが 49 か所の空間位置から画像特徴を抽出し、Bahdanau Attention 付きの LSTM デコーダーが 1 語ずつキャプションを生成します。',
        '同じデータセット・テストセットで VGG16、ResNet-101、CLIP ViT-B/32 を比較しました。',
        '埋め込みを GloVe 300d で初期化し、Teacher Forcing とラベルスムージングで学習、Beam Search(k=5)でキャプションを生成しました。',
        'BLEU-4 は ResNet-101 が最高でした。CLIP は 1 エポックあたり約半分の学習時間でそれに迫りました。',
        '写真をアップロードするとキャプションを返す Streamlit デモアプリを作りました。',
      ],
    },
    note: {
      en: 'ResNet-101 and CLIP were trained for only 10 epochs and had not converged, so the gap between models may still change. Sample photos are from the Flickr30k dataset.',
      vi: 'ResNet-101 và CLIP mới huấn luyện 10 epoch và chưa hội tụ, nên khoảng cách giữa các mô hình có thể còn thay đổi. Ảnh mẫu thuộc bộ dữ liệu Flickr30k.',
      ja: 'ResNet-101 と CLIP は 10 エポックしか学習しておらず収束していないため、モデル間の差は変わる可能性があります。サンプル写真は Flickr30k データセットのものです。',
    },
    links: {
      // Repo image_caption_model đang private. Khi public hoặc có repo showcase thì thêm:
      // github: 'https://github.com/canhle1993/...',
    },
  },
  {
    id: 'breathesafe',
    title: 'BreatheSafe',
    meta: {
      en: 'TechWiz 6 · 1st Place IoT Ignite · Nov 2025',
      vi: 'TechWiz 6 · Giải Nhất IoT Ignite · 11/2025',
      ja: 'TechWiz 6・IoT Ignite 部門 1 位・2025年11月',
    },
    image: 'assets/img/project-breathesafe.webp',
    imageSize: [2000, 876],
    imageAlt: {
      en: 'BreatheSafe system diagram: MQ2, MQ7 and DHT11 sensors connected to a Raspberry Pi 5, with data sent to MongoDB, ThingSpeak and a website',
      vi: 'Sơ đồ hệ thống BreatheSafe: cảm biến MQ2, MQ7, DHT11 nối Raspberry Pi 5, dữ liệu đưa lên MongoDB, ThingSpeak và trang web',
      ja: 'BreatheSafe のシステム図:MQ2・MQ7・DHT11 センサーを Raspberry Pi 5 に接続し、データを MongoDB、ThingSpeak、Web サイトへ送信',
    },
    summary: {
      en: 'A real-time air quality monitoring system, from sensors to a web dashboard, built during a 5-day competition.',
      vi: 'Hệ thống giám sát chất lượng không khí thời gian thực, từ cảm biến đến bảng điều khiển web, hoàn thành trong cuộc thi 5 ngày.',
      ja: 'センサーから Web ダッシュボードまでをつなぐリアルタイム大気質モニタリングシステム。5 日間の大会で開発しました。',
    },
    stack: ['Raspberry Pi 5', 'Python', 'Flask', 'WebSocket', 'MongoDB', 'ThingSpeak'],
    items: {
      en: [
        'Collects gas readings (MQ2, MQ7), temperature and humidity (DHT11) on a Raspberry Pi 5.',
        'On-site alerts through a buzzer and an LCD screen.',
        'Stores data in MongoDB and ThingSpeak, shown on a web dashboard with login.',
        'Streams data in real time through Flask and WebSocket with under 500 ms latency.',
      ],
      vi: [
        'Thu dữ liệu khí (MQ2, MQ7), nhiệt độ và độ ẩm (DHT11) trên Raspberry Pi 5.',
        'Cảnh báo tại chỗ bằng còi buzzer và màn hình LCD.',
        'Lưu dữ liệu lên MongoDB và ThingSpeak, hiển thị trên bảng điều khiển web có đăng nhập.',
        'Truyền dữ liệu thời gian thực qua Flask và WebSocket với độ trễ dưới 500 ms.',
      ],
      ja: [
        'Raspberry Pi 5 でガス(MQ2・MQ7)、温度・湿度(DHT11)を計測します。',
        'ブザーと LCD 画面で現場に警告を出します。',
        'データを MongoDB と ThingSpeak に保存し、ログイン付きの Web ダッシュボードに表示します。',
        'Flask と WebSocket で 500 ms 未満の遅延でリアルタイムにデータを配信します。',
      ],
    },
    links: {
      video: 'https://www.youtube.com/watch?v=dPhdDVpcNyU',
      article: 'https://aptechvietnam.com.vn/hoat-dong-ngoai-khoa/khep-lai-mua-giai-techwiz-6-voi-nhung-thanh-tich-an-tuong/',
    },
  },
  {
    id: 'pharmatech',
    title: 'PharmaTech',
    meta: { en: 'Semester 3 project · Full-stack', vi: 'Đồ án học kỳ 3 · Full-stack', ja: '3 学期のプロジェクト・フルスタック' },
    image: 'assets/img/project-pharmatech.webp',
    imageSize: [1280, 640],
    imageAlt: {
      en: 'PharmaTech overview image with the customer storefront, order management, quote management and recruitment analytics',
      vi: 'Ảnh giới thiệu PharmaTech gồm trang khách hàng, quản lý đơn hàng, quản lý báo giá và phân tích tuyển dụng',
      ja: '顧客向けストア、注文管理、見積もり管理、採用分析を示した PharmaTech の紹介画像',
    },
    summary: {
      en: 'A platform for a pharmaceutical equipment business: machine catalog, quotes, deposits, payments, recruitment and admin analytics.',
      vi: 'Nền tảng cho doanh nghiệp thiết bị dược phẩm: giới thiệu máy móc, báo giá, đặt cọc, thanh toán, tuyển dụng và phân tích quản trị.',
      ja: '製薬機器メーカー向けのプラットフォーム。製品カタログ、見積もり、手付金、決済、採用、管理者向け分析を備えています。',
    },
    stack: ['Angular', 'NestJS', 'MongoDB', 'Socket.IO', 'Stripe', 'GitHub Actions', 'Nginx'],
    items: {
      en: [
        'Built the customer-facing pages: home, shop, product detail, service, career, contact and account.',
        'Worked on admin modules for products, orders, stock, quotes, content and recruitment.',
        'Connected frontend and backend across the product, order, quote, service, career and chat flows.',
        'Handled deployment: CI/CD with GitHub Actions, publishing to a VPS with PM2 and Nginx, and fixing post-deploy issues.',
      ],
      vi: [
        'Xây các trang phía khách hàng: trang chủ, cửa hàng, chi tiết sản phẩm, dịch vụ, tuyển dụng, liên hệ và tài khoản.',
        'Phát triển module quản trị cho sản phẩm, đơn hàng, tồn kho, báo giá, nội dung và tuyển dụng.',
        'Kết nối frontend và backend cho các luồng sản phẩm, đơn hàng, báo giá, dịch vụ, tuyển dụng và chat.',
        'Phụ trách triển khai: CI/CD bằng GitHub Actions, đưa lên VPS với PM2 và Nginx, xử lý lỗi sau triển khai.',
      ],
      ja: [
        '顧客向けページ(トップ、ショップ、商品詳細、サービス、採用、お問い合わせ、アカウント)を開発しました。',
        '商品、注文、在庫、見積もり、コンテンツ、採用の管理モジュールを担当しました。',
        '商品、注文、見積もり、サービス、採用、チャットの各フローでフロントエンドとバックエンドを連携しました。',
        'デプロイを担当しました。GitHub Actions による CI/CD、PM2 と Nginx を使った VPS への公開、デプロイ後の不具合修正を行いました。',
      ],
    },
    links: {
      live: 'http://103.153.72.209:4201/home',
      video: 'https://www.youtube.com/watch?v=Zsyu2Iy9UbY',
      github: 'https://github.com/canhle1993/PharmaTech-showcase',
      article: 'https://aptechvietnam.com.vn/san-pham-hoc-vien/do-an-pharmaceutical-giai-phap-chuyen-doi-so-cho-nganh-thiet-bi-duoc-pham/',
    },
  },
  {
    id: 'library',
    title: 'Library Management',
    meta: { en: 'Semester 2 project · Team Leader', vi: 'Đồ án học kỳ 2 · Nhóm trưởng', ja: '2 学期のプロジェクト・チームリーダー' },
    score: '98/100',
    image: 'assets/img/project-library.webp',
    imageSize: [1600, 900],
    imageAlt: {
      en: 'Library Management overview image with book loan charts, the rental flow and warehouse QR scanning',
      vi: 'Ảnh giới thiệu ứng dụng Library Management với biểu đồ mượn sách, luồng cho thuê và quét mã QR kho',
      ja: '貸出グラフ、貸出フロー、倉庫の QR スキャンを示した Library Management の紹介画像',
    },
    summary: {
      en: 'A Java Swing desktop app for running a library: rentals and returns, inventory and shelf locations, QR scanning, spoken book descriptions and reports.',
      vi: 'Ứng dụng desktop Java Swing cho vận hành thư viện: mượn trả, kho và vị trí sách, quét QR, mô tả sách bằng giọng nói và báo cáo.',
      ja: '図書館運営のための Java Swing デスクトップアプリ。貸出・返却、在庫と棚位置の管理、QR スキャン、本の説明の音声読み上げ、レポート機能を備えています。',
    },
    stack: ['Java SE 21', 'Java Swing', 'Maven', 'SQL Server', 'ZXing', 'JasperReports', 'Vbee API'],
    items: {
      en: [
        'Led a team of 4 and coordinated delivery across the semester.',
        'Designed the database and built the book management, rental and inventory flows.',
        'Managed book locations by floor, row, shelf and shelf level.',
        'Added QR-based stock checks using a phone camera through DroidCam.',
        'Integrated the Vbee API to read book descriptions aloud.',
      ],
      vi: [
        'Dẫn dắt nhóm 4 người và điều phối tiến độ cả học kỳ.',
        'Thiết kế cơ sở dữ liệu, xây luồng quản lý sách, mượn trả và tồn kho.',
        'Quản lý vị trí sách theo tầng, dãy, kệ và ngăn.',
        'Kiểm kho bằng mã QR, dùng camera điện thoại qua DroidCam.',
        'Tích hợp API Vbee để đọc mô tả sách bằng giọng nói.',
      ],
      ja: [
        '4 名のチームを率い、学期を通して進行を管理しました。',
        'データベースを設計し、書籍管理・貸出・在庫のフローを開発しました。',
        'フロア・列・棚・段ごとに本の位置を管理しました。',
        'DroidCam 経由のスマホカメラで QR による在庫確認を実装しました。',
        'Vbee API を連携し、本の説明を音声で読み上げられるようにしました。',
      ],
    },
    links: {
      video: 'https://www.youtube.com/watch?v=oornKFK1SJk',
      github: 'https://github.com/canhle1993/LibraryManagement-showcase',
      article: 'https://aptechvietnam.com.vn/san-pham-hoc-vien/do-an-he-thong-quan-ly-thu-vien-library-management/',
    },
  },
  {
    id: 'bakerz',
    title: 'Bakerz Bite',
    meta: { en: 'Semester 1 project · Full-stack', vi: 'Đồ án học kỳ 1 · Full-stack', ja: '1 学期のプロジェクト・フルスタック' },
    image: 'assets/img/project-bakerz.webp',
    imageSize: [1600, 900],
    imageAlt: {
      en: 'Bakerz Bite overview image with the storefront, health-based suggestions, order management and Power BI reports',
      vi: 'Ảnh giới thiệu Bakerz Bite gồm trang bán hàng, gợi ý theo sức khỏe, quản trị đơn hàng và báo cáo Power BI',
      ja: 'ストア画面、健康状態に応じた提案、注文管理、Power BI レポートを示した Bakerz Bite の紹介画像',
    },
    summary: {
      en: 'A Laravel bakery and coffee store with product suggestions based on BMI and health conditions, VNPay payment and Power BI reports.',
      vi: 'Website bán bánh và cà phê trên Laravel, có gợi ý sản phẩm theo chỉ số BMI và tình trạng sức khỏe, thanh toán VNPay và báo cáo Power BI.',
      ja: 'Laravel で作ったパンとコーヒーのオンラインストア。BMI や健康状態に合わせた商品提案、VNPay 決済、Power BI レポートに対応しています。',
    },
    stack: ['Laravel 11', 'PHP 8.2', 'MySQL', 'VNPay', 'Power BI', 'GitHub Actions'],
    items: {
      en: [
        'Built the customer-facing pages: home, product presentation, categories, cart and order history.',
        'Developed the product suggestion flow based on BMI and health conditions.',
        'Built the Deal of the Day, Workshop, Blog, Coming Soon and Bakerz Bite Rewards modules.',
        'On the admin side: Power BI reports, health type management and product quantity management.',
        'Supported feature integration and the CI/CD deployment flow.',
      ],
      vi: [
        'Xây các trang phía khách hàng: trang chủ, trình bày sản phẩm, danh mục, giỏ hàng và lịch sử đơn.',
        'Phát triển luồng gợi ý sản phẩm theo BMI và tình trạng sức khỏe.',
        'Làm các module Deal of the Day, Workshop, Blog, Coming Soon và Bakerz Bite Rewards.',
        'Phía quản trị: báo cáo Power BI, quản lý loại sức khỏe và số lượng sản phẩm.',
        'Hỗ trợ tích hợp tính năng và luồng triển khai CI/CD.',
      ],
      ja: [
        '顧客向けページ(トップ、商品紹介、カテゴリ、カート、注文履歴)を開発しました。',
        'BMI と健康状態に基づく商品提案フローを開発しました。',
        '本日のお買い得、ワークショップ、ブログ、近日発売、Bakerz Bite Rewards の各モジュールを開発しました。',
        '管理画面では Power BI レポート、健康タイプ管理、商品数量管理を担当しました。',
        '機能の統合と CI/CD デプロイの流れを支援しました。',
      ],
    },
    links: {
      live: 'http://103.153.72.209/filter',
      video: 'https://www.youtube.com/watch?v=FIMq_x9z6Uc',
      github: 'https://github.com/canhle1993/Bakerz-showcase',
      article: 'https://aptechvietnam.com.vn/san-pham-hoc-vien/website-ban-banh-va-ca-phe-truc-tuyen-tien-loi-bakerz-bite/',
    },
  },
  {
    id: 'erp',
    wide: true,
    title: { en: 'Construction Site ERP', vi: 'ERP quản lý công trường', ja: '建設現場管理 ERP' },
    meta: {
      en: 'Nichietsu · Full-Stack Developer · Sep 2024–Mar 2025',
      vi: 'Nichietsu · Full-Stack Developer · 09/2024–03/2025',
      ja: 'Nichietsu・フルスタック開発者・2024年9月〜2025年3月',
    },
    summary: {
      en: 'The Construction Site Management module in a live ERP system, connected to quotation, warehouse, sales and debt workflows.',
      vi: 'Module Construction Site Management trong hệ thống ERP đang vận hành, nối với các quy trình báo giá, kho, bán hàng và công nợ.',
      ja: '稼働中の ERP における建設現場管理モジュール。見積もり、倉庫、販売、債権管理の業務フローと連携しています。',
    },
    numbers: [
      ['50+', { en: 'daily users', vi: 'người dùng mỗi ngày', ja: '1 日の利用者' }],
      ['~40%', { en: 'less manual scheduling', vi: 'giảm lập lịch thủ công', ja: '手作業のスケジュール調整を削減' }],
      ['12+', 'RESTful APIs'],
    ],
    stack: ['Java', 'Spring Boot', 'ReactJS', 'Oracle'],
    items: {
      en: [
        'Integrated the site module with quotation, warehouse, sales and debt management across 6 connected modules.',
        'Designed 12+ RESTful APIs in a layered architecture, with validation, exception handling and transactional consistency.',
        'Built a ReactJS interface with approval workflows, cutting manual scheduling by about 40%.',
        'No critical post-release bugs during my tenure.',
        'Applied clean code, modular design and reusable components to keep the module maintainable.',
      ],
      vi: [
        'Tích hợp module công trường với báo giá, kho, bán hàng và công nợ trong hệ thống 6 module liên kết.',
        'Thiết kế hơn 12 RESTful APIs theo layered architecture, có validation, xử lý ngoại lệ và bảo đảm nhất quán giao dịch.',
        'Xây giao diện ReactJS với luồng phê duyệt, giảm khoảng 40% thao tác lập lịch thủ công.',
        'Không có lỗi nghiêm trọng sau phát hành trong thời gian làm việc.',
        'Áp dụng clean code, thiết kế theo module và component tái sử dụng để dễ bảo trì.',
      ],
      ja: [
        '現場モジュールを見積もり・倉庫・販売・債権管理と連携し、6 つのモジュールをつなぎました。',
        'レイヤードアーキテクチャで 12 以上の RESTful API を設計し、入力検証、例外処理、トランザクション整合性を確保しました。',
        '承認ワークフロー付きの ReactJS 画面を作り、手作業のスケジュール調整を約 40% 削減しました。',
        '在籍中、リリース後の重大な不具合はゼロでした。',
        'クリーンコード、モジュール設計、再利用可能なコンポーネントで保守しやすいモジュールにしました。',
      ],
    },
    map: {
      label: {
        en: 'The Construction Site module connects to Quotation, Warehouse, Sales and Debt',
        vi: 'Module Công trường nối với Báo giá, Kho, Bán hàng và Công nợ',
        ja: '建設現場モジュールは見積もり、倉庫、販売、債権管理と連携しています',
      },
      nodes: {
        en: ['Quotation', 'Warehouse', 'Sales', 'Debt'],
        vi: ['Báo giá', 'Kho', 'Bán hàng', 'Công nợ'],
        ja: ['見積もり', '倉庫', '販売', '債権管理'],
      },
      hub: { en: 'Construction site', vi: 'Công trường', ja: '建設現場' },
    },
    note: {
      en: 'This is an internal company system, so this page only describes my contribution, with no screenshots, source code or customer data.',
      vi: 'Đây là hệ thống nội bộ của doanh nghiệp, nên trang này chỉ mô tả phần đóng góp của tôi, không có ảnh chụp, mã nguồn hay dữ liệu khách hàng.',
      ja: '社内システムのため、このページでは私の担当部分のみを紹介しています。画面、ソースコード、顧客データは掲載していません。',
    },
    links: {},
  },
];

/* Bài gốc đều bằng tiếng Việt: tiêu đề vi giữ đúng bản gốc, tiêu đề en là bản dịch. */
const press = [
  {
    date: '2026-10-28',
    title: {
      en: 'Aptech Graduation 2026 “DEVELOP TO SHINE”: honoring hands-on grit, breaking through to shine and shape the future',
      vi: 'Lễ Tốt Nghiệp Aptech 2026 “DEVELOP TO SHINE”: Tôn vinh bản lĩnh thực chiến, bứt phá để toả sáng và kiến tạo tương lai',
      ja: 'Aptech 卒業式 2026「DEVELOP TO SHINE」:実践力を称え、輝き、未来を切り開く',
    },
    about: {
      en: 'Valedictorian Lê Văn Cảnh spoke on behalf of the graduates',
      vi: 'Thủ khoa Lê Văn Cảnh đại diện tân khoa phát biểu',
      ja: '首席の Lê Văn Cảnh が卒業生代表としてスピーチ',
    },
    image: 'assets/img/bao-chi-tot-nghiep.webp',
    imageSize: [1000, 667],
    imageAlt: {
      en: 'Lê Văn Cảnh in a graduation gown on stage, with Thủ khoa, meaning valedictorian, on the screen behind',
      vi: 'Lê Văn Cảnh mặc áo cử nhân trên sân khấu, màn hình phía sau ghi Thủ khoa',
      ja: '卒業ガウン姿で壇上に立つ Lê Văn Cảnh。後ろの画面には首席を意味する「Thủ khoa」の文字',
    },
    url: 'https://aptechvietnam.com.vn/le-tot-nghiep-aptech-2026-develop-to-shine-ton-vinh-ban-linh-thuc-chien-but-pha-de-toa-sang-va-kien-tao-tuong-lai/',
  },
  {
    date: '2026-01-27',
    title: {
      en: 'The “Pharmaceutical” project: a digital transformation solution for the pharmaceutical equipment industry',
      vi: 'Đồ án “Pharmaceutical” giải pháp chuyển đổi số cho ngành thiết bị dược phẩm',
      ja: '製薬機器業界の DX ソリューション「Pharmaceutical」',
    },
    about: { en: 'PharmaTech project, semester 3', vi: 'Dự án PharmaTech, học kỳ 3', ja: 'PharmaTech(3 学期のプロジェクト)' },
    image: 'assets/img/bao-chi-pharmatech.webp',
    imageSize: [800, 533],
    imageAlt: {
      en: 'The four-person PharmaTech team giving thumbs up in front of a Project Semester 3 screen',
      vi: 'Nhóm PharmaTech bốn người giơ ngón cái trước màn hình Project Semester học kỳ 3',
      ja: 'Project Semester 3 の画面の前で親指を立てる PharmaTech チームの 4 人',
    },
    url: 'https://aptechvietnam.com.vn/san-pham-hoc-vien/do-an-pharmaceutical-giai-phap-chuyen-doi-so-cho-nganh-thiet-bi-duoc-pham/',
  },
  {
    date: '2025-12-10',
    title: {
      en: 'Closing the TechWiz 6 season with impressive results',
      vi: 'Khép lại mùa giải TechWiz 6 với những thành tích ấn tượng',
      ja: 'TechWiz 6 シーズン閉幕、印象的な成果を残して',
    },
    about: {
      en: 'Team 404 Not Found, winner of the IoT Ignite track',
      vi: 'Đội 404 Not Found, quán quân hạng mục IoT Ignite',
      ja: 'IoT Ignite 部門優勝のチーム 404 Not Found',
    },
    image: 'assets/img/bao-chi-techwiz.webp',
    imageSize: [800, 533],
    imageAlt: {
      en: 'Team 404 Not Found holding a Gold Winner board and certificates',
      vi: 'Đội 404 Not Found cầm bảng Gold Winner và giấy chứng nhận',
      ja: 'Gold Winner のボードと賞状を持つチーム 404 Not Found',
    },
    url: 'https://aptechvietnam.com.vn/hoat-dong-ngoai-khoa/khep-lai-mua-giai-techwiz-6-voi-nhung-thanh-tich-an-tuong/',
  },
  {
    date: '2025-05-24',
    title: {
      en: 'The “Library Management” library system project',
      vi: 'Đồ án hệ thống quản lý thư viện “Library Management”',
      ja: '図書館管理システム「Library Management」',
    },
    about: { en: 'Library Management project, semester 2', vi: 'Dự án Library Management, học kỳ 2', ja: 'Library Management(2 学期のプロジェクト)' },
    image: 'assets/img/bao-chi-library.webp',
    imageSize: [800, 533],
    imageAlt: {
      en: 'The four-person Library Management team giving thumbs up in front of a Project Semester screen',
      vi: 'Nhóm Library Management bốn người giơ ngón cái trước màn hình Project Semester',
      ja: 'Project Semester の画面の前で親指を立てる Library Management チームの 4 人',
    },
    url: 'https://aptechvietnam.com.vn/san-pham-hoc-vien/do-an-he-thong-quan-ly-thu-vien-library-management/',
  },
  {
    date: '2024-11-04',
    title: {
      en: 'Bakerz Bite: a convenient online bakery and coffee store',
      vi: 'Website bán bánh và cà phê trực tuyến tiện lợi – Bakerz Bite',
      ja: '便利なパンとコーヒーのオンラインストア「Bakerz Bite」',
    },
    about: { en: 'Bakerz Bite project, semester 1', vi: 'Dự án Bakerz Bite, học kỳ 1', ja: 'Bakerz Bite(1 学期のプロジェクト)' },
    image: 'assets/img/bao-chi-bakerz.webp',
    imageSize: [800, 534],
    imageAlt: {
      en: 'The four-person Bakerz Bite team giving thumbs up in front of a Project Semester 1 screen',
      vi: 'Nhóm Bakerz Bite bốn người giơ ngón cái trước màn hình Project Semester học kỳ 1',
      ja: 'Project Semester 1 の画面の前で親指を立てる Bakerz Bite チームの 4 人',
    },
    url: 'https://aptechvietnam.com.vn/san-pham-hoc-vien/website-ban-banh-va-ca-phe-truc-tuyen-tien-loi-bakerz-bite/',
  },
];

/* Chữ giao diện dùng trong JavaScript */
const ui = {
  description: {
    en: 'Lê Văn Cảnh, Java Full-Stack Developer in Ho Chi Minh City. Seven years leading a production line at Samsung, ADSE valedictorian at Aptech 2026, 1st place at TechWiz 6 in the IoT Ignite track.',
    vi: 'Lê Văn Cảnh, Java Full-Stack Developer tại TP.HCM. Bảy năm dẫn dắt dây chuyền ở Samsung, thủ khoa ADSE Aptech 2026, giải Nhất TechWiz 6 hạng mục IoT Ignite.',
    ja: 'ホーチミン市の Java フルスタック開発者、Lê Văn Cảnh。Samsung で 7 年間生産ラインを統括、Aptech ADSE 2026 首席卒業、TechWiz 6 IoT Ignite 部門 1 位。',
  },
  more: { en: 'View details', vi: 'Xem chi tiết', ja: '詳細を見る' },
  score: { en: 'project score', vi: 'điểm đồ án', ja: 'プロジェクト評価' },
  itemsTitle: { en: 'What I worked on', vi: 'Phần tôi phụ trách', ja: '担当した内容' },
  stack: { en: 'Tech stack', vi: 'Công nghệ', ja: '使用技術' },
  readArticle: { en: 'Read article', vi: 'Đọc bài viết', ja: '記事を読む' },
  mailSubject: { en: 'Message from', vi: 'Tin nhắn từ', ja: 'お問い合わせ:' },
  form: {
    sending: { en: 'Sending…', vi: 'Đang gửi…', ja: '送信中…' },
    sent: { en: 'Message sent. I will reply soon.', vi: 'Đã gửi tin nhắn. Tôi sẽ trả lời sớm.', ja: '送信しました。近日中にご返信します。' },
    failed: {
      en: 'Could not send. Please try again, or email aplevancanh1993@gmail.com directly.',
      vi: 'Chưa gửi được. Hãy thử lại, hoặc gửi thẳng tới aplevancanh1993@gmail.com.',
      ja: '送信できませんでした。もう一度お試しいただくか、aplevancanh1993@gmail.com へ直接メールしてください。',
    },
  },
  menuOpen: { en: 'Menu', vi: 'Menu', ja: 'メニュー' },
  menuClose: { en: 'Close', vi: 'Đóng', ja: '閉じる' },
  copied: { en: 'Email copied', vi: 'Đã sao chép email', ja: 'メールアドレスをコピーしました' },
  copyFailed: { en: 'Could not copy. Email:', vi: 'Không sao chép được. Email:', ja: 'コピーできませんでした。メールアドレス:' },
  links: {
    live: { en: 'Open live demo', vi: 'Mở bản chạy thử', ja: 'デモを開く' },
    video: { en: 'Watch video demo', vi: 'Xem video demo', ja: 'デモ動画を見る' },
    github: { en: 'GitHub showcase', vi: 'GitHub showcase', ja: 'GitHub ショーケース' },
    article: { en: 'Read article', vi: 'Đọc bài viết', ja: '記事を読む' },
  },
};

/* =====================================================================
   NGÔN NGỮ
   Mặc định tiếng Anh. ?lang=vi trên đường dẫn được ưu tiên, sau đó đến
   lựa chọn đã lưu của người xem.
   ===================================================================== */

const LANGS = ['en', 'vi', 'ja'];
const DEFAULT_LANG = 'en';

function readLang() {
  const fromUrl = new URLSearchParams(location.search).get('lang');
  if (LANGS.includes(fromUrl)) return fromUrl;
  try {
    const saved = localStorage.getItem('lang');
    if (LANGS.includes(saved)) return saved;
  } catch {
    /* Trình duyệt chặn bộ nhớ: dùng ngôn ngữ mặc định */
  }
  return DEFAULT_LANG;
}

let lang = readLang();
const t = (value) => (value && value.en !== undefined ? value[lang] ?? value.en : value);

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

/* Đổi chữ tĩnh trong index.html: data-vi cho nội dung, data-vi-<tên> cho thuộc tính */
const STATIC_ATTRS = ['alt', 'aria-label', 'title', 'placeholder', 'data-caption', 'data-alt'];

function applyStatic() {
  const pick = (el, prefix) =>
    lang === 'en' ? el.getAttribute(`data-en${prefix}`) : el.getAttribute(`data-${lang}${prefix}`) ?? el.getAttribute(`data-en${prefix}`);
  $$('[data-vi]').forEach((el) => {
    if (!el.hasAttribute('data-en')) el.setAttribute('data-en', el.innerHTML);
    el.innerHTML = pick(el, '');
  });
  STATIC_ATTRS.forEach((attr) => {
    $$(`[data-vi-${attr}]`).forEach((el) => {
      if (!el.hasAttribute(`data-en-${attr}`)) el.setAttribute(`data-en-${attr}`, el.getAttribute(attr));
      el.setAttribute(attr, pick(el, `-${attr}`));
    });
  });
}

/* =====================================================================
   HIỂN THỊ
   ===================================================================== */

const pad = (n) => String(n).padStart(2, '0');
function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  if (lang === 'vi') return `${pad(d)}/${pad(m)}/${y}`;
  if (lang === 'ja') return `${y}年${m}月${d}日`;
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
const percent = (value) => {
  const text = value.toFixed(1);
  return `${lang === 'vi' ? text.replace('.', ',') : text}%`;
};

const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const chips = (list) => `<ul class="chips">${list.map((item) => `<li>${item}</li>`).join('')}</ul>`;
const numbers = (list) =>
  `<dl class="nums">${list.map(([n, label]) => `<div><dd>${t(n)}</dd><dt>${t(label)}</dt></div>`).join('')}</dl>`;
const thumb = (p, lazy = true) =>
  `<div class="thumb"><img src="${t(p.image)}" alt="${t(p.imageAlt)}" width="${p.imageSize[0]}" height="${p.imageSize[1]}" ${lazy ? 'loading="lazy" decoding="async"' : ''}/>${p.imageNote ? `<span class="thumb-note">${t(p.imageNote)}</span>` : ''}</div>`;
const erpMap = (p) => `
  <div class="thumb thumb-map">
    ${numbers(p.numbers)}
    <div class="erp-map" role="img" aria-label="${t(p.map.label)}">
      <ul>${t(p.map.nodes).map((node) => `<li>${node}</li>`).join('')}</ul>
      <span class="erp-hub">${t(p.map.hub)}</span>
    </div>
  </div>`;
const workFoot = (p) => `
  <div class="work-foot">
    <div>
      <h3 class="work-title"><button type="button" data-project="${p.id}" aria-haspopup="dialog">${t(p.title)}</button></h3>
      <p class="work-meta">${t(p.meta)}</p>
      ${p.score ? `<span class="score"><b>${p.score}</b> ${t(ui.score)}</span>` : ''}
    </div>
    <span class="go" aria-hidden="true">${icon('out')}</span>
  </div>`;

function renderWork() {
  $('#work').innerHTML = projects
    .map(
      (p) => `
    <article class="work${p.wide ? ' work-wide' : ''}">
      ${p.map ? erpMap(p) : thumb(p, !p.wide)}
      ${workFoot(p)}
    </article>`
    )
    .join('');
}

function renderPress() {
  $('#press-list').innerHTML = press
    .map(
      (a) => `
    <li>
      <a class="press-card" href="${a.url}" target="_blank" rel="noopener noreferrer">
        ${a.image ? `<span class="press-photo"><img src="${a.image}" alt="${t(a.imageAlt)}" width="${a.imageSize[0]}" height="${a.imageSize[1]}" loading="lazy" decoding="async"/></span>` : ''}
        <span class="press-body">
          <time datetime="${a.date}">${formatDate(a.date)}</time>
          <strong>${t(a.title)}</strong>
          <span class="press-about">${t(a.about)}</span>
          <span class="press-go">${t(ui.readArticle)} ${icon('out')}</span>
        </span>
      </a>
    </li>`
    )
    .join('');
}

/* Chi tiết dự án */
const resultsTable = (r) => `
  <div class="results-wrap">
    <table class="results">
      <caption>${t(r.caption)}</caption>
      <thead><tr>${r.head.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead>
      <tbody>${r.rows
        .map(([name, ...vals]) => `<tr><th scope="row">${name}</th>${vals.map((v) => `<td>${percent(v)}</td>`).join('')}</tr>`)
        .join('')}</tbody>
    </table>
  </div>`;
const linkIcons = { live: 'out', video: 'play', github: 'code', article: 'doc' };
const sheet = $('#sheet');

function openProject(id) {
  const p = projects.find((item) => item.id === id);
  if (!p) return;
  const links = Object.keys(linkIcons)
    .filter((key) => p.links[key])
    .map(
      (key, i) =>
        `<a class="btn ${i === 0 ? 'btn-dark' : 'btn-glass'}" href="${p.links[key]}" target="_blank" rel="noopener noreferrer">${icon(linkIcons[key])} ${t(ui.links[key])}</a>`
    )
    .join('');
  $('#sheet-meta').textContent = t(p.meta);
  $('#sheet-body').innerHTML = `
    <h2 id="sheet-title">${t(p.title)}</h2>
    <p class="sheet-lead">${t(p.summary)}</p>
    ${links ? `<div class="sheet-links">${links}</div>` : ''}
    ${p.image ? thumb(p, false) : ''}
    ${p.numbers ? numbers(p.numbers) : ''}
    ${p.results ? resultsTable(p.results) : ''}
    <h3>${t(p.itemsTitle || ui.itemsTitle)}</h3>
    <ul class="ticks">${t(p.items).map((item) => `<li>${item}</li>`).join('')}</ul>
    <h3>${t(ui.stack)}</h3>
    ${chips(p.stack)}
    ${p.note ? `<p class="sheet-note">${t(p.note)}</p>` : ''}`;
  sheet.showModal();
  sheet.scrollTop = 0;
}

$('#work').addEventListener('click', (event) => {
  const article = event.target.closest('.work');
  if (!article || event.target.closest('a')) return;
  const button = $('[data-project]', article);
  openProject(button.dataset.project);
});

/* Xem ảnh lớn */
const lightbox = $('#lightbox');
document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-lightbox]');
  if (!button) return;
  const img = $('#lightbox-img');
  img.src = button.dataset.lightbox;
  img.alt = button.dataset.alt || '';
  $('#lightbox-cap').textContent = button.dataset.caption || '';
  lightbox.showModal();
});

/* Đóng hộp thoại: nút đóng hoặc bấm ra ngoài */
$$('dialog').forEach((dialog) =>
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog || event.target.closest('[data-close]')) dialog.close();
  })
);

/* Menu thu gọn */
const menuToggle = $('.menu-toggle');
const menu = $('#menu');
const setMenu = (open) => {
  menu.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = t(open ? ui.menuClose : ui.menuOpen);
};
menuToggle.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
menu.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.classList.contains('is-open')) {
    setMenu(false);
    menuToggle.focus();
  }
});

/* Đánh dấu mục đang xem trên menu */
const navLinks = $$('#menu a');
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const active = link.hash === `#${entry.target.id}`;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
$$('main > section[id]').forEach((section) => navObserver.observe(section));

/* Hàng công nghệ: lấy danh sách từ hộp thoại "Xem tất cả", nhân đôi để vòng chạy nối liền */
const marqueeTrack = $('#tech-track');
const techItems = $$('#tech-all .tech li');
techItems.forEach((item) => marqueeTrack.append(item.cloneNode(true)));
techItems.forEach((item) => {
  const copy = item.cloneNode(true);
  copy.setAttribute('aria-hidden', 'true');
  marqueeTrack.append(copy);
});
marqueeTrack.style.setProperty('--marquee-time', `${Math.round(techItems.length * 3.4)}s`);

/* Nút mở hộp thoại theo id */
$$('[data-open]').forEach((button) =>
  button.addEventListener('click', () => {
    const dialog = document.getElementById(button.dataset.open);
    dialog.showModal();
    dialog.scrollTop = 0;
  })
);

/* Nút chuyển bài báo: ẩn nút khi đã ở đầu hoặc cuối dải */
/* Các dải cuộn ngang (báo chí, chứng nhận): nút ‹ › nằm cùng .rail-wrap với dải */
const rails = $$('.rail-wrap').map((wrap) => ({ rail: $('.rail', wrap), buttons: $$('[data-rail]', wrap) }));
const updateRailButtons = () =>
  rails.forEach(({ rail, buttons }) => {
    const max = rail.scrollWidth - rail.clientWidth - 2;
    buttons.forEach((button) => {
      button.disabled = Number(button.dataset.rail) < 0 ? rail.scrollLeft <= 2 : rail.scrollLeft >= max;
    });
  });
/* Tự cuộn bằng requestAnimationFrame: scroll mượt của trình duyệt hay bị chặn khi dải có scroll-snap */
function slideRail(rail, direction) {
  const step = rail.querySelector('li').getBoundingClientRect().width + 16;
  const from = rail.scrollLeft;
  const to = Math.max(0, Math.min(rail.scrollWidth - rail.clientWidth, from + direction * step));
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    rail.scrollLeft = to;
    return;
  }
  rail.style.scrollSnapType = 'none';
  const start = performance.now();
  const frame = (now) => {
    const t = Math.min(1, (now - start) / 420);
    rail.scrollLeft = from + (to - from) * (1 - Math.pow(1 - t, 3));
    if (t < 1) requestAnimationFrame(frame);
    else rail.style.scrollSnapType = '';
  };
  requestAnimationFrame(frame);
}
rails.forEach(({ rail, buttons }) => {
  buttons.forEach((button) => button.addEventListener('click', () => slideRail(rail, Number(button.dataset.rail))));
  rail.addEventListener('scroll', updateRailButtons, { passive: true });
});
window.addEventListener('resize', updateRailButtons);

/* Nút về đầu trang */
const toTop = $('#to-top');
const updateToTop = () => toTop.classList.toggle('is-on', window.scrollY > window.innerHeight * 0.8);
window.addEventListener('scroll', updateToTop, { passive: true });
updateToTop();

/* Thông báo */
const toast = $('#toast');
let toastTimer;
const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add('is-on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-on'), 3200);
};

/* Sao chép email */
async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      /* Trình duyệt từ chối: thử cách dự phòng bên dưới */
    }
  }
  const temp = document.createElement('textarea');
  temp.value = text;
  temp.style.cssText = 'position:fixed;opacity:0';
  document.body.append(temp);
  temp.select();
  const ok = document.execCommand('copy');
  temp.remove();
  return ok;
}
$('#copy-email').addEventListener('click', async (event) => {
  const email = event.currentTarget.dataset.email;
  showToast((await copyText(email)) ? t(ui.copied) : `${t(ui.copyFailed)} ${email}`);
});

/* Form liên hệ: gửi qua Web3Forms, tin nhắn về thẳng email của Cảnh */
const contactForm = $('#contact-form');
const formStatus = $('#form-status');
const setFormStatus = (key, state) => {
  formStatus.textContent = key ? t(ui.form[key]) : '';
  formStatus.dataset.state = state || '';
  formStatus.dataset.key = key || '';
};
contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = $('button[type="submit"]', contactForm);
  const data = Object.fromEntries(new FormData(contactForm));
  if (!data.subject) data.subject = `${t(ui.mailSubject)} ${data.name}`;
  data.replyto = data.email;
  button.disabled = true;
  setFormStatus('sending');
  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.message || 'send failed');
    contactForm.reset();
    setFormStatus('sent', 'ok');
    showToast(t(ui.form.sent));
  } catch {
    setFormStatus('failed', 'error');
  } finally {
    button.disabled = false;
  }
});

$('#year').textContent = new Date().getFullYear();

/* Chuyển ngôn ngữ */
const langButtons = $$('.lang button');

function render() {
  document.documentElement.lang = lang;
  $('meta[name="description"]').setAttribute('content', t(ui.description));
  applyStatic();
  if (formStatus.dataset.key) formStatus.textContent = t(ui.form[formStatus.dataset.key]);
  renderWork();
  renderPress();
  updateRailButtons();
  langButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.lang === lang)));
  setMenu(menu.classList.contains('is-open'));
}

function setLang(next) {
  lang = next;
  try {
    localStorage.setItem('lang', lang);
  } catch {
    /* Không lưu được thì lần sau dùng ngôn ngữ mặc định */
  }
  try {
    const url = new URL(location.href);
    if (lang === DEFAULT_LANG) url.searchParams.delete('lang');
    else url.searchParams.set('lang', lang);
    history.replaceState(null, '', url);
  } catch {
    /* Một số trình duyệt không cho đổi đường dẫn khi mở file trực tiếp */
  }
  render();
}

langButtons.forEach((button) =>
  button.addEventListener('click', () => {
    if (button.dataset.lang !== lang) setLang(button.dataset.lang);
  })
);

render();
