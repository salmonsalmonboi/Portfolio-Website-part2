// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (name && email && message) {
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

/*Dev A: Additional Dark Mode Toggle, Loading Animation, Scroll Progress Indicator*/
// Dark Mode Toggle
const themeToggle = document.getElementById('theme-icon');
const currentTheme = localStorage.getItem('theme') || 'light';

document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeToggle.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Scroll Progress Indicator
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    document.querySelector('.progress-bar').style.width = scrollPercent + '%';
});

window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    const progressBar = document.querySelector('.progress-fill');
    
    // ตั้งค่า body overflow เป็น hidden เพื่อป้องกัน scroll ระหว่างโหลด
    document.body.style.overflow = 'hidden';

    // จำลองการโหลด content ด้วยการเพิ่ม progress ทีละ 10%
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += 10;
        if (progressBar) { // ตรวจสอบว่า progressBar มีอยู่จริง
            progressBar.style.width = progress + '%'; // อัปเดตความกว้างของ progress bar
        }
        
        if (progress >= 100) {
            clearInterval(loadingInterval); // หยุด interval เมื่อโหลดครบ 100%
            
            // Fade out loader
            setTimeout(() => {
                if (loader) { // ตรวจสอบว่า loader มีอยู่จริง
                    loader.classList.add('fade-out');
                    
                    // ลบ loader ออกจาก DOM และคืนค่า overflow ของ body
                    setTimeout(() => {
                        loader.style.display = 'none';
                        document.body.style.overflow = 'auto'; // คืนค่า overflow ของ body
                    }, 500); // รอให้ fade-out animation เสร็จสิ้น
                }
            }, 500); // หน่วงเวลาเล็กน้อยก่อน fade-out
        }
    }, 150); // เพิ่ม progress ทุกๆ 150 มิลลิวินาที
});



