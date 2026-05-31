/* ================================================
   SCRIPT.JS - Portfolio Thành | Dark Luxury
   ================================================ */

// ---- DỮ LIỆU DỰ ÁN (từ hiluxhome.vn) ----
const projectsData = [
    {
        title: "Thiết kế biệt thự hiện đại nghỉ dưỡng HD-04",
        cat: "Biệt thự hiện đại · Nghỉ dưỡng",
        image: "https://hiluxhome.vn/admin/img/gallery/89acb9e19e74e4c005f089d284a3b817.jpg",
        description: "Dự án thiết kế biệt thự nghỉ dưỡng mang đậm phong cách hiện đại. Tối ưu hóa tầm nhìn, không gian mở hòa quyện cùng cảnh quan thiên nhiên. Sử dụng vật liệu cao cấp, thân thiện với môi trường, mang lại trải nghiệm thư giãn đẳng cấp cho gia chủ."
    },
    {
        title: "Biệt thự hiện đại HD-05",
        cat: "Biệt thự hiện đại",
        image: "https://hiluxhome.vn/admin/img/gallery/94ce77a86524e24697d9022253c41e45.jpg",
        description: "Căn biệt thự hiện đại nổi bật với các mảng khối kiến trúc dứt khoát, sắc nét. Sự kết hợp tinh tế giữa vật liệu kính, gỗ tự nhiên và bê tông tạo nên vẻ đẹp sang trọng, vững chãi. Không gian nội thất mở, tràn ngập ánh sáng tự nhiên."
    },
    {
        title: "Biệt thự tân cổ điển TCĐ-02",
        cat: "Biệt thự tân cổ điển",
        image: "https://hiluxhome.vn/admin/img/gallery/2b767f114d38fd9566091607d6083719.jpg",
        description: "Chiêm ngưỡng vẻ đẹp của căn biệt thự tân cổ điển. Công trình là sự giao thoa hoàn hảo giữa đường nét hoa văn cổ điển cầu kỳ và sự tiện nghi của kiến trúc đương đại. Từng chi tiết được chăm chút với tâm huyết của người nghệ nhân."
    },
    {
        title: "Mẫu Villa tân cổ điển TCĐ-03",
        cat: "Villa · Tân cổ điển",
        image: "https://hiluxhome.vn/admin/img/gallery/37d85210c63922ed23734362d94e1196.jpg",
        description: "Villa tân cổ điển sở hữu diện mạo lộng lẫy, bề thế. Từng chi tiết phào chỉ, trụ cột đều được chăm chút tỉ mỉ, khẳng định vị thế và gu thẩm mỹ đỉnh cao của gia chủ. Kết hợp hài hòa giữa nghệ thuật châu Âu và tiện nghi hiện đại."
    },
    {
        title: "Villa tân cổ điển TCĐ-04 trường tồn",
        cat: "Villa · Tân cổ điển",
        image: "https://hiluxhome.vn/admin/img/gallery/e7ad20787443f91bec2792e166769557.jpg",
        description: "Chiêm ngưỡng vẻ đẹp trường tồn của căn villa tân cổ điển TCĐ-04. Thiết kế toát lên sự hoành tráng, xa hoa với tỷ lệ kiến trúc vàng, nội thất xa xỉ và hệ thống cảnh quan xung quanh được quy hoạch chuyên nghiệp."
    },
    {
        title: "Nhà phố NP-01 hiện đại, ấn tượng",
        cat: "Nhà phố · Hiện đại",
        image: "https://hiluxhome.vn/admin/img/gallery/76b95cff352ed781247756cd714ce6cc.jpg",
        description: "Mẫu thiết kế nhà phố NP-01 mang ngôn ngữ kiến trúc hiện đại ấn tượng. Giải quyết triệt để bài toán thông thoáng và ánh sáng tự nhiên cho không gian nhà ống đô thị. Mặt tiền năng động, cá tính, tạo điểm nhấn trên phố."
    }
];

let currentProjectIndex = 0;

// ---- 1. LOADER ----
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
        // Kích hoạt animations sau khi loader xong
        initScrollReveal();
        initCounters();
    }, 1800);
});

// ---- 2. HEADER SCROLL ----
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);

    // Active nav link theo section
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;
    sections.forEach(sec => {
        const top = sec.offsetTop, height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    });
});

// ---- 3. MOBILE MENU ----
const menuToggle = document.getElementById('mobile-menu');
const nav = document.querySelector('.nav');
const navOverlay = document.getElementById('nav-overlay');

function toggleMenu(open) {
    menuToggle.classList.toggle('open', open);
    nav.classList.toggle('open', open);
    if (navOverlay) navOverlay.style.display = open ? 'block' : 'none';
}

menuToggle.addEventListener('click', () => toggleMenu(!nav.classList.contains('open')));
if (navOverlay) navOverlay.addEventListener('click', () => toggleMenu(false));
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
});

// ---- 4. HERO SLIDESHOW ----
const slides = document.querySelectorAll('.hero-slideshow .slide');
const dots   = document.querySelectorAll('.slide-dots .dot');
let currentSlide = 0, slideInterval;

function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function startSlideshow() {
    slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
}

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        goToSlide(parseInt(dot.dataset.slide));
        startSlideshow();
    });
});

startSlideshow();

// ---- 5. SCROLL REVEAL ----
function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealEls.forEach(el => observer.observe(el));
}

// ---- 6. COUNTER ANIMATION ----
function initCounters() {
    const counters = document.querySelectorAll('.stat-num');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                let current = 0;
                const step = Math.ceil(target / 50);
                const timer = setInterval(() => {
                    current = Math.min(current + step, target);
                    entry.target.textContent = current;
                    if (current >= target) clearInterval(timer);
                }, 30);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
}

// ---- 7. PROJECT FILTER ----
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
            const cat = card.dataset.cat;
            const show = filter === 'all' || cat === filter;
            // Animation ẩn/hiện
            if (show) {
                card.style.display = '';
                card.style.animation = 'fadeInCard 0.4s ease forwards';
            } else {
                card.style.animation = 'fadeOutCard 0.3s ease forwards';
                setTimeout(() => { card.style.display = 'none'; }, 300);
            }
        });
    });
});

// Thêm keyframes qua JS nếu chưa có
const styleSheet = document.createElement('style');
styleSheet.textContent = `
@keyframes fadeInCard {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeOutCard {
    from { opacity: 1; transform: scale(1); }
    to   { opacity: 0; transform: scale(0.95); }
}
`;
document.head.appendChild(styleSheet);

// ---- 8. QR MODAL ----
const qrBtn   = document.getElementById('qr-btn');
const qrModal = document.getElementById('qr-modal');
const closeQr = document.getElementById('close-qr');

qrBtn.addEventListener('click', () => qrModal.classList.add('active'));
closeQr.addEventListener('click', () => qrModal.classList.remove('active'));
qrModal.addEventListener('click', e => { if (e.target === qrModal) qrModal.classList.remove('active'); });

// ---- 9. PROJECT DETAIL MODAL ----
const projectModal = document.getElementById('project-modal');
const closeProject = document.getElementById('close-project');
const modalBody    = document.getElementById('project-modal-body');

function openProjectModal(index) {
    currentProjectIndex = index;
    renderProjectModal(index);
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function renderProjectModal(index) {
    const p = projectsData[index];
    const hasPrev = index > 0;
    const hasNext = index < projectsData.length - 1;

    modalBody.innerHTML = `
        <img src="${p.image}" alt="${p.title}" class="proj-modal-img">
        <div class="proj-modal-body">
            <span class="proj-modal-cat">${p.cat}</span>
            <h2 class="proj-modal-title">${p.title}</h2>
            <p class="proj-modal-desc">${p.description}</p>
            <div class="proj-nav">
                <button class="proj-nav-btn" onclick="navigateProject(-1)" ${!hasPrev ? 'disabled style="opacity:0.3;"' : ''}>
                    ← Dự án trước
                </button>
                <span style="font-size:0.75rem; color:#666; align-self:center;">${index+1} / ${projectsData.length}</span>
                <button class="proj-nav-btn" onclick="navigateProject(1)" ${!hasNext ? 'disabled style="opacity:0.3;"' : ''}>
                    Dự án tiếp →
                </button>
            </div>
        </div>
    `;
}

function navigateProject(dir) {
    const newIndex = currentProjectIndex + dir;
    if (newIndex >= 0 && newIndex < projectsData.length) {
        currentProjectIndex = newIndex;
        renderProjectModal(currentProjectIndex);
    }
}

if (closeProject) {
    closeProject.addEventListener('click', () => {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}
projectModal.addEventListener('click', e => {
    if (e.target === projectModal) {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Đóng modal bằng phím ESC
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        projectModal.classList.remove('active');
        qrModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    // Điều hướng bằng phím mũi tên khi project modal mở
    if (projectModal.classList.contains('active')) {
        if (e.key === 'ArrowRight') navigateProject(1);
        if (e.key === 'ArrowLeft')  navigateProject(-1);
    }
});
