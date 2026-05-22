// =========================================
// 1. LOGIKA JUMBOTRON SLIDER
// =========================================
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');
let currentSlide = 0;
let slideInterval;

function initSlider() {
    // Jalankan auto-play setiap 6 detik
    slideInterval = setInterval(nextSlide, 6000);
}

function showSlide(index) {
    // Sembunyikan semua slide
    slides.forEach(slide => {
        slide.classList.remove('opacity-100', 'z-10', 'active-slide');
        slide.classList.add('opacity-0', 'z-0');
        
        // Reset animasi konten
        const content = slide.querySelector('.slide-content');
        if(content) {
            content.classList.remove('opacity-100', 'translate-y-0');
            content.classList.add('opacity-0', 'translate-y-10');
        }
    });

    // Tampilkan slide yang dipilih
    slides[index].classList.remove('opacity-0', 'z-0');
    slides[index].classList.add('opacity-100', 'z-10', 'active-slide');
    
    // Animasikan konten masuk
    const activeContent = slides[index].querySelector('.slide-content');
    if(activeContent) {
        setTimeout(() => {
            activeContent.classList.remove('opacity-0', 'translate-y-10');
            activeContent.classList.add('opacity-100', 'translate-y-0');
        }, 100); // Sedikit delay agar transisi mulus
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
    resetInterval();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
    resetInterval();
}

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 6000);
}

// Event listener tombol slider
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Inisiasi slider saat halaman dimuat
initSlider();


// =========================================
// 2. LOGIKA NAVBAR (Scroll & Mobile Menu)
// =========================================
const navbar = document.getElementById('navbar');
const logo = document.getElementById('logo');
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Ubah gaya Navbar saat scroll layar ke bawah
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.remove('bg-transparent', 'py-6');
        navbar.classList.add('bg-white', 'shadow-md', 'py-4');
        
        // Ubah teks logo dan menu menjadi hitam
        logo.classList.remove('text-white');
        logo.classList.add('text-slate-900');
        
        menuBtn.classList.remove('text-white');
        menuBtn.classList.add('text-slate-900');

        navLinks.forEach(link => {
            link.classList.remove('text-white');
            link.classList.add('text-slate-900');
        });
    } else {
        navbar.classList.remove('bg-white', 'shadow-md', 'py-4');
        navbar.classList.add('bg-transparent', 'py-6');
        
        // Kembalikan teks logo dan menu menjadi putih
        logo.classList.remove('text-slate-900');
        logo.classList.add('text-white');

        menuBtn.classList.remove('text-slate-900');
        menuBtn.classList.add('text-white');

        navLinks.forEach(link => {
            link.classList.remove('text-slate-900');
            link.classList.add('text-white');
        });
    }
});

// Fitur Buka-Tutup Menu Mobile
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    
    // Ganti ikon burger ke ikon silang 'X' saat terbuka
    const isOpen = !mobileMenu.classList.contains('hidden');
    if (isOpen) {
        menuBtn.innerHTML = `<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
    } else {
        // Jika navbar ada di bagian atas (transparan), tombol warna putih. Jika sudah scroll, warna gelap.
        const iconColor = window.scrollY > 50 ? 'currentColor' : 'currentColor';
        menuBtn.innerHTML = `<svg class="w-8 h-8" fill="none" stroke="${iconColor}" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>`;
    }
});

// Tutup menu saat klik salah satu link di tampilan Mobile
const mobileLinks = mobileMenu.querySelectorAll('.mobile-link');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const iconColor = window.scrollY > 50 ? 'currentColor' : 'currentColor';
        menuBtn.innerHTML = `<svg class="w-8 h-8" fill="none" stroke="${iconColor}" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>`;
    });
});