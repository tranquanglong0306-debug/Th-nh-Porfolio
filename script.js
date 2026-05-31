// --- 1. XỬ LÝ HEADER KHI SCROLL ---
const header = document.getElementById('header');

// Bắt sự kiện cuộn trang
window.addEventListener('scroll', () => {
    // Nếu cuộn xuống quá 50px thì thêm class 'scrolled' cho header
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// --- 2. XỬ LÝ MENU MOBILE ---
const menuToggle = document.getElementById('mobile-menu');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');

// Bật/tắt menu khi click icon hamburger
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    
    // Đổi icon từ hamburger sang dấu X
    const icon = menuToggle.querySelector('i');
    if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Đóng menu khi click vào một link (để di chuyển đến section tương ứng)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// --- 3. XỬ LÝ QR CODE MODAL ---
const qrBtn = document.getElementById('qr-btn');
const qrModal = document.getElementById('qr-modal');
const closeQrBtn = document.getElementById('close-qr');

// Mở modal khi click vào nút QR
qrBtn.addEventListener('click', () => {
    qrModal.classList.add('active');
});

// Đóng modal khi click vào nút X
closeQrBtn.addEventListener('click', () => {
    qrModal.classList.remove('active');
});

// Đóng modal khi click ra ngoài vùng nội dung
qrModal.addEventListener('click', (e) => {
    if (e.target === qrModal) {
        qrModal.classList.remove('active');
    }
});

// --- 4. XỬ LÝ PROJECT MODAL (HIỂN THỊ CHI TIẾT DỰ ÁN) ---
const projectModal = document.getElementById('project-modal');
const closeProjectBtn = document.getElementById('close-project');
const projectModalBody = document.getElementById('project-modal-body');

// Dữ liệu giả lập của 6 dự án (lấy chuẩn từ website hiluxhome.vn)
const projectsData = [
    {
        title: "Thiết kế biệt thự hiện đại nghỉ dưỡng HD-04",
        meta: "Biệt thự hiện đại / Nghỉ dưỡng",
        image: "https://hiluxhome.vn/admin/img/gallery/89acb9e19e74e4c005f089d284a3b817.jpg",
        description: "Dự án thiết kế biệt thự nghỉ dưỡng mang đậm phong cách hiện đại. Tối ưu hóa tầm nhìn, không gian mở hòa quyện cùng cảnh quan thiên nhiên mang lại trải nghiệm thư giãn đẳng cấp."
    },
    {
        title: "Biệt thự hiện đại HD-05",
        meta: "Biệt thự hiện đại",
        image: "https://hiluxhome.vn/admin/img/gallery/94ce77a86524e24697d9022253c41e45.jpg",
        description: "Căn biệt thự hiện đại nổi bật với các mảng khối kiến trúc dứt khoát, sắc nét. Sự kết hợp tinh tế giữa vật liệu kính, gỗ và bê tông tạo nên vẻ đẹp sang trọng, vững chãi."
    },
    {
        title: "Biệt thự tân cổ điển TCĐ-02",
        meta: "Biệt thự tân cổ điển",
        image: "https://hiluxhome.vn/admin/img/gallery/2b767f114d38fd9566091607d6083719.jpg",
        description: "Chiêm ngưỡng vẻ đẹp của căn biệt thự tân cổ điển. Công trình là sự giao thoa hoàn hảo giữa đường nét hoa văn cổ điển cầu kỳ và sự tiện nghi của kiến trúc đương đại."
    },
    {
        title: "Mẫu Villa tân cổ điển TCĐ-03",
        meta: "Villa / Tân cổ điển",
        image: "https://hiluxhome.vn/admin/img/gallery/37d85210c63922ed23734362d94e1196.jpg",
        description: "Villa tân cổ điển sở hữu diện mạo lộng lẫy, bề thế. Từng chi tiết phào chỉ, trụ cột đều được chăm chút tỉ mỉ, khẳng định vị thế và gu thẩm mỹ đỉnh cao của gia chủ."
    },
    {
        title: "Villa tân cổ điển TCĐ-04 trường tồn",
        meta: "Villa / Tân cổ điển",
        image: "https://hiluxhome.vn/admin/img/gallery/e7ad20787443f91bec2792e166769557.jpg",
        description: "Chiêm ngưỡng vẻ đẹp trường tồn của căn villa tân cổ điển TCĐ-04. Thiết kế toát lên sự hoành tráng, xa hoa với tỷ lệ kiến trúc vàng và nội thất xa xỉ, đẳng cấp."
    },
    {
        title: "Nhà phố NP-01 hiện đại, ấn tượng",
        meta: "Nhà phố / Hiện đại",
        image: "https://hiluxhome.vn/admin/img/gallery/76b95cff352ed781247756cd714ce6cc.jpg",
        description: "Mẫu thiết kế nhà phố NP-01 mang ngôn ngữ kiến trúc hiện đại, giải quyết triệt để bài toán thông thoáng và ánh sáng tự nhiên cho không gian nhà ống đô thị."
    }
];

// Hàm mở Modal Dự Án
function openProjectModal(index) {
    const project = projectsData[index];
    
    // Render HTML vào body của modal
    projectModalBody.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="project-modal-img">
        <h3 class="project-modal-title">${project.title}</h3>
        <div class="project-modal-meta">${project.meta}</div>
        <p>${project.description}</p>
    `;
    
    // Hiển thị modal
    projectModal.classList.add('active');
}

// Đóng modal khi click vào nút X
if(closeProjectBtn) {
    closeProjectBtn.addEventListener('click', () => {
        projectModal.classList.remove('active');
    });
}

// Đóng modal khi click ra ngoài vùng nội dung
if(projectModal) {
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.classList.remove('active');
        }
    });
}
