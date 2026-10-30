/* =========================================================
   DỮ LIỆU NỘI DUNG WEBSITE – CÔNG TY XÂY LẮP CÁT TƯỜNG
   Sửa nội dung tại đây (hoặc qua trang quản trị admin.html),
   không cần chỉnh giao diện.
   Các mục đánh dấu  [CẦN XÁC NHẬN]  là thông tin tạm, cần
   doanh nghiệp kiểm tra lại trước khi đưa lên chính thức.
   ========================================================= */

window.CT_DEFAULTS = {
  company: {
    name: "Công ty Cổ phần Xây lắp Cát Tường",
    shortName: "Xây lắp Cát Tường",
    slogan: "Cho đi điều bạn muốn",
    values: ["An toàn", "Chất lượng", "Tiến độ"],
    hotline: "082.937.6666",
    email: "lienhe@cattuonggroup.vn",            // [CẦN XÁC NHẬN]
    address: "TP. Bắc Ninh, tỉnh Bắc Ninh",       // [CẦN XÁC NHẬN] địa chỉ chi tiết
    website: "cattuonggroup.vn",
    workingHours: "Thứ 2 – Thứ 7: 8:00 – 17:30"   // [CẦN XÁC NHẬN]
  },

  /* Lĩnh vực hoạt động & dịch vụ */
  services: [
    { id: "tong-thau", icon: "crane", title: "Tổng thầu thi công nhà cao tầng",
      summary: "Tổ chức thi công trọn gói chung cư, nhà ở xã hội, tổ hợp thương mại – từ móng cọc đến bàn giao.",
      body: "Ban chỉ huy công trường điều phối toàn bộ nhà thầu phụ, vật tư và thiết bị theo một tiến độ tổng. Kinh nghiệm thi công đồng thời nhiều khối nhà 9–25 tầng tại Bắc Ninh.",
      image: "assets/img/site-pano-1.jpg", hidden: false },
    { id: "ket-cau", icon: "frame", title: "Kết cấu & phần thô",
      summary: "Cọc khoan nhồi, móng, khung bê tông cốt thép toàn khối, tầng hầm.",
      body: "Thi công cốt thép, cốp pha, đổ bê tông bằng bơm cần và cẩu tháp; kiểm soát chất lượng theo từng tầng, nghiệm thu có biên bản và hình ảnh.",
      image: "assets/img/site-rebar.jpg", hidden: false },
    { id: "hoan-thien", icon: "brush", title: "Hoàn thiện & nội thất",
      summary: "Xây trát, ốp lát, sơn bả, cửa, thiết bị vệ sinh và nội thất căn hộ bàn giao.",
      body: "Hoàn thiện đồng bộ hàng nghìn căn hộ theo căn mẫu; phối hợp đơn vị nội thất để bàn giao căn hộ đúng tiêu chuẩn đã cam kết với khách hàng.",
      image: "assets/img/ctn-int-1.jpg", hidden: false },
    { id: "co-dien", icon: "bolt", title: "Lắp đặt cơ điện (MEP)",
      summary: "Điện, cấp thoát nước, phòng cháy chữa cháy, thông gió và thang máy.",
      body: "Lắp đặt và chạy thử hệ thống kỹ thuật tòa nhà, phối hợp nghiệm thu PCCC và vận hành trước khi bàn giao.",
      image: "assets/img/site-frame.jpg", hidden: false },
    { id: "ha-tang", icon: "road", title: "Hạ tầng kỹ thuật & cảnh quan",
      summary: "San nền, đường nội khu, vỉa hè, cây xanh, chiếu sáng cho khu đô thị.",
      body: "Thi công hạ tầng đồng bộ cùng các khối nhà để khu đô thị có thể đưa vào sử dụng theo từng giai đoạn.",
      image: "assets/img/scy-1.jpg", hidden: false },
    { id: "quan-ly", icon: "clipboard", title: "Quản lý dự án & bảo hành",
      summary: "Lập kế hoạch, kiểm soát chi phí – chất lượng – an toàn, bảo hành sau bàn giao.",
      body: "Nhật ký thi công hằng ngày, báo cáo tiến độ định kỳ cho chủ đầu tư; đội bảo hành tiếp nhận và xử lý phản ánh của cư dân sau bàn giao.",
      image: "assets/img/ctn-handover.jpg", hidden: false }
  ],

  /* Danh mục lọc dự án */
  projectCategories: ["Nhà ở xã hội", "Chung cư & đô thị", "Thương mại – khách sạn", "Y tế – nghỉ dưỡng"],
  projectStatuses: ["Đang thi công", "Đã hoàn thành", "Chuẩn bị triển khai"],

  /* Dự án. year = năm khởi công; progress = các mốc tiến độ */
  projects: [
    {
      id: "cat-tuong-smart-city", name: "Cát Tường Smart City",
      category: "Nhà ở xã hội", status: "Đang thi công", year: 2019,
      location: "Yên Phong, Bắc Ninh", featured: true, hidden: false,
      facts: { "Tổng diện tích": "94.075 m²", "Quy mô": "9 khối nhà", "Số căn hộ": "khoảng 1.040 căn", "Hạng mục": "Chung cư NOXH, shophouse 6 tầng, hạ tầng" },
      summary: "Khu nhà ở xã hội quy mô 94.075 m² với 9 khối nhà và khoảng 1.040 căn hộ. Tòa M đã đưa vào sử dụng, các tòa còn lại đang hoàn thiện.",
      description: "Cát Tường Smart City là dự án trọng điểm tại huyện Yên Phong, tỉnh Bắc Ninh. Công trường được tổ chức thi công cuốn chiếu: hoàn thiện và bàn giao từng khối nhà, song song thi công kết cấu các khối tiếp theo và hạ tầng nội khu. Dãy shophouse 6 tầng 2 mặt tiền dọc trục đường chính đã hoàn thiện mặt ngoài.",
      cover: "assets/img/hero-1.jpg",
      gallery: ["assets/img/hero-1.jpg", "assets/img/hero-2.jpg", "assets/img/scy-2.jpg", "assets/img/scy-1.jpg", "assets/img/scy-3.jpg", "assets/img/hero-4.jpg", "assets/img/site-pano-1.jpg", "assets/img/site-aerial-2.jpg", "assets/img/scy-formwork.jpg", "assets/img/scy-piling.jpg", "assets/img/scy-6.jpg", "assets/img/scy-render.jpg"],
      progress: [
        { date: "2019", title: "Khởi công xây dựng", state: "done" },
        { date: "07/2023", title: "Lãnh đạo Chính phủ thăm công trường", state: "done" },
        { date: "08/2024", title: "Hoàn thiện mặt ngoài dãy shophouse & các khối đầu tiên", state: "done" },
        { date: "—", title: "Tòa M đưa vào sử dụng", state: "done" },
        { date: "06/2026", title: "Thi công kết cấu và hoàn thiện các khối còn lại", state: "current" },
        { date: "Sắp tới", title: "Bàn giao toàn bộ dự án", state: "next" }
      ]
    },
    {
      id: "thong-nhat-smart-city", name: "Thống Nhất Smart City",
      category: "Nhà ở xã hội", status: "Đang thi công", year: 2019,
      location: "Bắc Ninh", featured: true, hidden: false,
      facts: { "Loại hình": "Nhà ở xã hội & trung tâm thương mại", "Đã bàn giao": "Cụm tòa D – E" },
      summary: "Dự án nhà ở xã hội đã tổ chức lễ bàn giao cụm tòa D – E cho cư dân; trung tâm thương mại đang được thi công hoàn thiện.",
      description: "Thống Nhất Smart City khởi công năm 2019. Cụm tòa D – E đã được nghiệm thu và bàn giao căn hộ cho cư dân. Hạng mục trung tâm thương mại của dự án đang trong giai đoạn thi công.",
      cover: "assets/img/tnsc-render.jpg",
      gallery: ["assets/img/tnsc-render.jpg", "assets/img/tnsc-1.jpg", "assets/img/tnsc-2.jpg", "assets/img/tnsc-handover.jpg", "assets/img/tnsc-handover-2.jpg"],
      progress: [
        { date: "2019", title: "Khởi công xây dựng", state: "done" },
        { date: "—", title: "Bàn giao căn hộ cụm tòa D – E", state: "done" },
        { date: "Hiện tại", title: "Thi công trung tâm thương mại", state: "current" }
      ]
    },
    {
      id: "cat-tuong-thong-nhat", name: "Cát Tường Thống Nhất",
      category: "Nhà ở xã hội", status: "Đã hoàn thành", year: 2018,
      location: "Bắc Ninh", featured: true, hidden: false,
      facts: { "Số căn hộ": "1.080 căn", "Đã bàn giao": "Tòa N3 – N4" },
      summary: "Dự án 1.080 căn hộ, khởi công năm 2018. Tòa N3 – N4 đã tổ chức lễ bàn giao căn hộ cho khách hàng.",
      description: "Cát Tường Thống Nhất gồm 1.080 căn hộ nhà ở xã hội. Ngày 22/9/2024, dự án vinh dự được lãnh đạo Chính phủ đến thăm và ghi nhận. Căn hộ được bàn giao hoàn thiện nội thất cơ bản theo căn mẫu.",
      cover: "assets/img/ctn-1.jpg",
      gallery: ["assets/img/ctn-1.jpg", "assets/img/ctn-render.jpg", "assets/img/ctn-handover.jpg", "assets/img/ctn-int-1.jpg", "assets/img/ctn-int-2.jpg"],
      progress: [
        { date: "2018", title: "Khởi công xây dựng 1.080 căn hộ", state: "done" },
        { date: "22/09/2024", title: "Lãnh đạo Chính phủ thăm dự án", state: "done" },
        { date: "—", title: "Bàn giao căn hộ tòa N3 – N4", state: "done" }
      ]
    },
    {
      id: "cat-tuong-eco", name: "Cát Tường Eco",
      category: "Chung cư & đô thị", status: "Đã hoàn thành", year: 2016,
      location: "Bắc Ninh", featured: false, hidden: false,
      facts: { "Số căn hộ": "1.080 căn", "Hoàn thành": "2018" },
      summary: "Tổ hợp 1.080 căn hộ với vườn cảnh quan trên mái khối đế, khởi công 2016 và bàn giao xong năm 2018.",
      description: "Cát Tường Eco khởi công năm 2016 với quy mô 1.080 căn hộ, hoàn thành và bàn giao năm 2018 – đúng hai năm thi công.",
      cover: "assets/img/eco-render.jpg",
      gallery: ["assets/img/eco-render.jpg", "assets/img/eco-2.jpg", "assets/img/eco-3.jpg", "assets/img/eco-int.jpg"],
      progress: [
        { date: "2016", title: "Khởi công 1.080 căn hộ", state: "done" },
        { date: "2018", title: "Bàn giao xong dự án", state: "done" }
      ]
    },
    {
      id: "cat-tuong-tnt", name: "Cát Tường TNT",
      category: "Nhà ở xã hội", status: "Đã hoàn thành", year: 2012,
      location: "Bắc Ninh", featured: false, hidden: false,
      facts: { "Loại hình": "Nhà ở cho người thu nhập thấp", "Hoàn thành": "2016" },
      summary: "Dự án nhà ở thu nhập thấp đầu tiên, khởi công 2012, bàn giao tòa CT1 năm 2014 và hoàn thành năm 2016.",
      description: "Cát Tường TNT (thu nhập thấp) đánh dấu chặng đường kiến tạo nhà ở xã hội tại Bắc Ninh. Dự án khởi công năm 2012, bàn giao tòa CT1 năm 2014 và bàn giao xong toàn bộ năm 2016.",
      cover: "assets/img/tnt-1.jpg",
      gallery: ["assets/img/tnt-1.jpg", "assets/img/tnt-2.jpg"],
      progress: [
        { date: "2012", title: "Khởi công xây dựng", state: "done" },
        { date: "2014", title: "Bàn giao căn hộ tòa CT1", state: "done" },
        { date: "2016", title: "Bàn giao xong dự án", state: "done" }
      ]
    },
    {
      id: "cat-tuong-new", name: "Cát Tường New",
      category: "Chung cư & đô thị", status: "Đã hoàn thành", year: 2012,
      location: "Bắc Ninh", featured: false, hidden: false,
      facts: { "Loại hình": "Tòa nhà hỗn hợp cao tầng" },
      summary: "Tòa nhà cao tầng khởi công năm 2012 – một trong những công trình đầu tiên của Cát Tường.",
      description: "Cát Tường New khởi công năm 2012 cùng với dự án TNT, gồm khối tháp cao tầng và khối đế thương mại.",
      cover: "assets/img/new-1.jpg",
      gallery: ["assets/img/new-1.jpg", "assets/img/new-render.jpg", "assets/img/new-2.jpg"],
      progress: [
        { date: "2012", title: "Khởi công xây dựng", state: "done" },
        { date: "—", title: "Hoàn thành, đưa vào sử dụng", state: "done" }
      ]
    },
    {
      id: "dai-hung-phat", name: "Đại Hưng Phát",
      category: "Chung cư & đô thị", status: "Chuẩn bị triển khai", year: null,
      location: "Bắc Ninh", featured: false, hidden: false,
      facts: { "Loại hình": "Chung cư cao tầng & nhà liền kề" },
      summary: "Tổ hợp chung cư cao tầng và nhà phố liền kề, đang hoàn thiện hồ sơ chuẩn bị triển khai.",
      description: "Dự án gồm hai tháp chung cư và các dãy nhà phố liền kề. Thông tin quy mô chi tiết sẽ được cập nhật khi dự án chính thức khởi công.",
      cover: "assets/img/dhp-render.jpg",
      gallery: ["assets/img/dhp-render.jpg", "assets/img/dhp-2.jpg", "assets/img/dhp-3.jpg"],
      progress: [{ date: "Hiện tại", title: "Chuẩn bị đầu tư, hoàn thiện hồ sơ", state: "current" }]
    },
    {
      id: "cat-tuong-sky", name: "Cát Tường Sky",
      category: "Chung cư & đô thị", status: "Chuẩn bị triển khai", year: null,
      location: "Bắc Ninh", featured: false, hidden: false,
      facts: { "Loại hình": "Tháp căn hộ cao tầng" },
      summary: "Tháp căn hộ cao tầng mặt kính, đang trong giai đoạn chuẩn bị triển khai.",
      description: "Cát Tường Sky là tháp căn hộ cao tầng. Thông tin chi tiết sẽ được cập nhật.",
      cover: "assets/img/sky-1.jpg", gallery: ["assets/img/sky-1.jpg"],
      progress: [{ date: "Hiện tại", title: "Chuẩn bị đầu tư", state: "current" }]
    },
    {
      id: "cat-tuong-korea", name: "Cát Tường Korea",
      category: "Thương mại – khách sạn", status: "Chuẩn bị triển khai", year: null,
      location: "Bắc Ninh", featured: false, hidden: false,
      facts: { "Loại hình": "Khách sạn" },
      summary: "Công trình khách sạn 11 tầng, đang trong giai đoạn chuẩn bị triển khai.",
      description: "Thông tin chi tiết sẽ được cập nhật.",
      cover: "assets/img/korea-1.jpg", gallery: ["assets/img/korea-1.jpg"],
      progress: [{ date: "Hiện tại", title: "Chuẩn bị đầu tư", state: "current" }]
    },
    {
      id: "vien-duong-lao-cat-tuong", name: "Viện dưỡng lão Cát Tường",
      category: "Y tế – nghỉ dưỡng", status: "Chuẩn bị triển khai", year: null,
      location: "Bắc Ninh", featured: false, hidden: false,
      facts: { "Loại hình": "Khu nghỉ dưỡng phức hợp cho người cao tuổi" },
      summary: "Khu nghỉ dưỡng phức hợp cho người cao tuổi với khối căn hộ, phòng khám và vườn cảnh quan.",
      description: "Viện dưỡng lão Cát Tường hướng tới mô hình khu nghỉ dưỡng phức hợp: căn hộ nghỉ dưỡng, phòng khám, khu trị liệu và cảnh quan xanh.",
      cover: "assets/img/vdl-2.jpg", gallery: ["assets/img/vdl-2.jpg", "assets/img/vdl-1.jpg", "assets/img/vdl-3.jpg"],
      progress: [{ date: "Hiện tại", title: "Chuẩn bị đầu tư", state: "current" }]
    }
  ],

  /* Tin tức */
  newsCategories: ["Tiến độ dự án", "Hoạt động doanh nghiệp", "Văn hóa doanh nghiệp", "Trách nhiệm xã hội"],
  news: [
    { id: "nhat-ky-cong-truong-t6-2026", title: "Nhật ký công trường tháng 6/2026: tăng tốc thi công các khối còn lại",
      category: "Tiến độ dự án", date: "2026-06-30", image: "assets/img/site-pano-2.jpg", hidden: false,
      excerpt: "Các mũi thi công kết cấu, xây trát và vận chuyển vật tư được tổ chức song song để giữ tiến độ tổng của dự án.",
      body: ["Trong tháng 6/2026, Ban chỉ huy công trường tiếp tục tổ chức thi công song song nhiều mũi: kết cấu khung các khối nhà mới, xây trát hoàn thiện và vận chuyển vật tư bằng xe nâng tới từng khu vực.", "Công tác vệ sinh công trường, phân luồng phương tiện và trang bị bảo hộ lao động được kiểm tra hằng ngày, bảo đảm mục tiêu An toàn – Chất lượng – Tiến độ."],
      gallery: ["assets/img/site-pano-2.jpg", "assets/img/site-bricks.jpg", "assets/img/site-forklift.jpg", "assets/img/site-workers.jpg", "assets/img/site-clean.jpg"] },
    { id: "year-end-party-2025", title: "Year End Party 2025: nhìn lại một năm cùng nhau xây dựng",
      category: "Văn hóa doanh nghiệp", date: "2025-01-18", image: "assets/img/yep.jpg", hidden: false,
      excerpt: "Toàn thể cán bộ nhân viên cùng nhìn lại chặng đường một năm và vinh danh các tập thể, cá nhân xuất sắc.",
      body: ["Chương trình Year End Party 2025 là dịp để toàn thể cán bộ nhân viên nhìn lại một năm làm việc, vinh danh các cá nhân và tập thể có thành tích nổi bật.", "Những tiết mục văn nghệ do chính nhân viên dàn dựng đã góp phần làm nên một đêm tiệc ấm cúng, gắn kết."],
      gallery: ["assets/img/yep.jpg"] },
    { id: "dao-tao-ai-10-2024", title: "Đào tạo ứng dụng AI trong công việc cho cán bộ nhân viên",
      category: "Hoạt động doanh nghiệp", date: "2024-10-12", image: "assets/img/ai-training.jpg", hidden: false,
      excerpt: "Khóa đào tạo hai ngày 12–13/10/2024 giúp nhân viên ứng dụng công cụ AI vào quản lý hồ sơ và báo cáo.",
      body: ["Trong hai ngày 12–13/10/2024, công ty tổ chức khóa đào tạo ứng dụng trí tuệ nhân tạo trong công việc văn phòng và quản lý dự án.", "Học viên được hướng dẫn cách sử dụng công cụ để soạn báo cáo, tổng hợp hồ sơ và tra cứu tiêu chuẩn nhanh hơn."],
      gallery: ["assets/img/ai-training.jpg", "assets/img/training.jpg"] },
    { id: "thien-nguyen-bat-xat-2024", title: "Hành trình thiện nguyện tại Bát Xát, Lào Cai",
      category: "Trách nhiệm xã hội", date: "2024-10-08", image: "assets/img/charity.jpg", hidden: false,
      excerpt: "Đoàn công tác trao quà, hỗ trợ bà con và các em nhỏ vùng cao huyện Bát Xát sau mùa mưa lũ.",
      body: ["Ngày 08/10/2024, đoàn thiện nguyện của công ty đã đến huyện Bát Xát, tỉnh Lào Cai trao quà hỗ trợ bà con và các em học sinh vùng cao.", "Hoạt động được địa phương ghi nhận và trao thư cảm ơn, tiếp nối truyền thống \"Cho đi điều bạn muốn\" của Cát Tường."],
      gallery: ["assets/img/charity.jpg"] },
    { id: "le-ban-giao-cum-toa-d-e", title: "Lễ bàn giao căn hộ cụm tòa D – E dự án Thống Nhất Smart City",
      category: "Tiến độ dự án", date: "2024-09-28", image: "assets/img/tnsc-handover.jpg", hidden: false,
      excerpt: "Những gia đình đầu tiên nhận chìa khóa căn hộ tại cụm tòa D – E sau quá trình thi công và nghiệm thu.",
      body: ["Lễ bàn giao căn hộ cụm tòa D – E dự án nhà ở xã hội Thống Nhất Smart City đã diễn ra trong không khí phấn khởi.", "Các căn hộ được kiểm tra, nghiệm thu từng hạng mục trước khi bàn giao cho cư dân."],
      gallery: ["assets/img/tnsc-handover.jpg", "assets/img/tnsc-handover-2.jpg"] },
    { id: "le-ban-giao-n3-n4", title: "Bàn giao căn hộ tòa N3 – N4 dự án Cát Tường Thống Nhất",
      category: "Tiến độ dự án", date: "2024-08-20", image: "assets/img/ctn-handover.jpg", hidden: false,
      excerpt: "Khách hàng tòa N3 – N4 nhận chìa khóa căn hộ hoàn thiện theo đúng căn mẫu đã cam kết.",
      body: ["Lễ bàn giao căn hộ tòa N3 – N4 dự án Cát Tường Thống Nhất đã được tổ chức cho các khách hàng đủ điều kiện nhận nhà.", "Căn hộ bàn giao hoàn thiện sàn gỗ, tủ bếp, thiết bị vệ sinh và nội thất cơ bản theo căn mẫu."],
      gallery: ["assets/img/ctn-handover.jpg", "assets/img/ctn-int-1.jpg", "assets/img/ctn-int-2.jpg"] },
    { id: "doan-dai-bieu-quoc-hoi", title: "Đoàn đại biểu Quốc hội làm việc với doanh nghiệp",
      category: "Hoạt động doanh nghiệp", date: "2024-05-05", image: "assets/img/qh-visit.jpg", hidden: false,
      excerpt: "Đoàn đại biểu Quốc hội tìm hiểu tình hình triển khai các dự án nhà ở xã hội của Cát Tường tại Bắc Ninh.",
      body: ["Ngày 05/5, đoàn đại biểu Quốc hội đã đến làm việc, nghe báo cáo về tình hình đầu tư, thi công các dự án nhà ở xã hội và những kiến nghị của doanh nghiệp."],
      gallery: ["assets/img/qh-visit.jpg"] },
    { id: "lanh-dao-chinh-phu-tham-yen-phong", title: "Lãnh đạo Chính phủ thăm, động viên công nhân công trường Yên Phong",
      category: "Tiến độ dự án", date: "2023-07-30", image: "assets/img/gov-visit.jpg", hidden: false,
      excerpt: "Đoàn công tác đã kiểm tra tiến độ, tặng quà và động viên đội ngũ công nhân đang thi công tại dự án.",
      body: ["Ngày 30/7/2023, đoàn công tác của Chính phủ đã đến thăm công trường dự án nhà ở xã hội tại Yên Phong, kiểm tra tiến độ và tặng quà động viên công nhân.", "Đây là nguồn động lực lớn để tập thể cán bộ, kỹ sư và công nhân tiếp tục đẩy nhanh tiến độ, bảo đảm chất lượng công trình."],
      gallery: ["assets/img/gov-visit.jpg", "assets/img/gov-visit-2.jpg", "assets/img/safety-gear.jpg"] }
  ],

  /* Tuyển dụng – [CẦN XÁC NHẬN] các vị trí mẫu */
  jobDepartments: ["Ban chỉ huy công trường", "Phòng Kỹ thuật", "Phòng Kinh tế – Kế hoạch", "Phòng Vật tư", "Phòng An toàn"],
  jobLocations: ["Yên Phong, Bắc Ninh", "TP. Bắc Ninh"],
  jobs: [
    { id: "ky-su-giam-sat-thi-cong", title: "Kỹ sư giám sát thi công kết cấu", department: "Ban chỉ huy công trường", location: "Yên Phong, Bắc Ninh",
      quantity: 3, salary: "Thỏa thuận", deadline: "2026-12-15", type: "Toàn thời gian", hidden: false,
      description: ["Giám sát thi công cốt thép, cốp pha, bê tông theo bản vẽ và biện pháp thi công được duyệt.", "Lập nhật ký thi công, hồ sơ nghiệm thu từng tầng.", "Phối hợp nhà thầu phụ và tổ đội để bảo đảm tiến độ."],
      requirements: ["Tốt nghiệp Đại học ngành Xây dựng dân dụng & công nghiệp.", "Tối thiểu 2 năm kinh nghiệm thi công nhà cao tầng.", "Sử dụng thành thạo AutoCAD, đọc hiểu bản vẽ kết cấu."],
      benefits: ["Lương thỏa thuận theo năng lực, thưởng theo tiến độ dự án.", "BHXH, BHYT đầy đủ; phụ cấp công trường.", "Môi trường làm việc chuyên nghiệp, nhiều dự án nối tiếp."] },
    { id: "ky-su-qs", title: "Kỹ sư QS – dự toán", department: "Phòng Kinh tế – Kế hoạch", location: "TP. Bắc Ninh",
      quantity: 2, salary: "15 – 22 triệu", deadline: "2026-12-10", type: "Toàn thời gian", hidden: false,
      description: ["Bóc tách khối lượng, lập dự toán, hồ sơ thanh quyết toán.", "Kiểm soát chi phí, đối chiếu khối lượng với nhà thầu phụ."],
      requirements: ["Tốt nghiệp ngành Kinh tế xây dựng hoặc Xây dựng.", "Thành thạo phần mềm dự toán, Excel.", "Cẩn thận, trung thực."],
      benefits: ["Lương 15 – 22 triệu, xét tăng lương hằng năm.", "Thưởng lễ, Tết, tháng lương thứ 13.", "Du lịch, team building hằng năm."] },
    { id: "can-bo-an-toan", title: "Cán bộ an toàn lao động (HSE)", department: "Phòng An toàn", location: "Yên Phong, Bắc Ninh",
      quantity: 2, salary: "Thỏa thuận", deadline: "2026-11-30", type: "Toàn thời gian", hidden: false,
      description: ["Kiểm tra an toàn lao động, PCCC và vệ sinh môi trường hằng ngày tại công trường.", "Huấn luyện an toàn cho công nhân mới, lập biên bản vi phạm.", "Báo cáo định kỳ cho Ban chỉ huy."],
      requirements: ["Có chứng chỉ an toàn lao động.", "Ưu tiên ứng viên đã làm việc tại công trường nhà cao tầng."],
      benefits: ["Phụ cấp công trường, bảo hộ lao động đầy đủ.", "Đóng BHXH theo quy định."] },
    { id: "ky-su-mep", title: "Kỹ sư cơ điện (MEP)", department: "Phòng Kỹ thuật", location: "Yên Phong, Bắc Ninh",
      quantity: 1, salary: "Thỏa thuận", deadline: "2026-12-20", type: "Toàn thời gian", hidden: false,
      description: ["Giám sát lắp đặt hệ thống điện, nước, PCCC, thông gió.", "Kiểm tra bản vẽ shop drawing, phối hợp nghiệm thu, chạy thử."],
      requirements: ["Tốt nghiệp Đại học ngành Điện, Cấp thoát nước hoặc Nhiệt lạnh.", "Kinh nghiệm 2 năm trở lên."],
      benefits: ["Thu nhập cạnh tranh, thưởng dự án.", "Cơ hội thăng tiến lên chỉ huy trưởng hạng mục."] },
    { id: "chuyen-vien-mua-hang", title: "Chuyên viên mua hàng vật tư", department: "Phòng Vật tư", location: "TP. Bắc Ninh",
      quantity: 1, salary: "12 – 16 triệu", deadline: "2026-11-25", type: "Toàn thời gian", hidden: false,
      description: ["Tìm kiếm, đánh giá nhà cung cấp; lấy báo giá và so sánh.", "Theo dõi đơn hàng, giao nhận vật tư tới công trường."],
      requirements: ["Tốt nghiệp Cao đẳng/Đại học các ngành kinh tế, kỹ thuật.", "Ưu tiên có kinh nghiệm mua vật tư xây dựng."],
      benefits: ["Lương 12 – 16 triệu.", "BHXH, BHYT, nghỉ phép năm."] }
  ]
};
