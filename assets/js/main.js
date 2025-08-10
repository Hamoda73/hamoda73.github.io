// Main JavaScript for Mohamed Khelifi's Portfolio
document.addEventListener('DOMContentLoaded', function() {
    // ========== Mobile Menu Toggle ==========
    function setupMobileMenu() {
        const headerContent = document.querySelector('.header-content');
        if (!headerContent) return;
        
        // Create mobile menu toggle button if it doesn't exist
        let mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        if (!mobileMenuToggle) {
            mobileMenuToggle = document.createElement('button');
            mobileMenuToggle.className = 'mobile-menu-toggle';
            mobileMenuToggle.setAttribute('aria-label', 'Toggle navigation menu');
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            headerContent.appendChild(mobileMenuToggle);
        }
        
        const navLinks = document.querySelector('.nav-links');
        if (!navLinks) return;
        
        mobileMenuToggle.addEventListener('click', function() {
            const isActive = navLinks.classList.toggle('active');
            mobileMenuToggle.innerHTML = isActive ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            mobileMenuToggle.setAttribute('aria-expanded', isActive);
        });
        
        // Close menu when clicking on nav links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
    
    // ========== Smooth Scrolling ==========
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#' || targetId === '#!') return;
                
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without jumping
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    } else {
                        window.location.hash = targetId;
                    }
                }
            });
        });
    }
    
    // ========== Active Section Highlighting ==========
    function setupActiveSectionHighlight() {
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-links a');
        
        if (sections.length === 0 || navItems.length === 0) return;
        
        function highlightNavItem() {
            let current = '';
            const scrollPosition = window.pageYOffset + 200;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                const href = item.getAttribute('href');
                if (href === `#${current}` || href.includes(current)) {
                    item.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', highlightNavItem);
        highlightNavItem(); // Run once on load
    }
    
    // ========== Animation on Scroll ==========
    function setupScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.skill-card, .timeline-content, .project-card, .education-item, .certification-item'
        );
        
        if (animatedElements.length === 0) return;
        
        // Set initial state
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        function animateElements() {
            const screenPosition = window.innerHeight / 1.2;
            
            animatedElements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                
                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }
        
        window.addEventListener('scroll', animateElements);
        animateElements(); // Run once on load
    }
    
    // ========== Dark Mode Toggle ==========
    function setupDarkModeToggle() {
        const darkModeToggle = document.createElement('button');
        darkModeToggle.className = 'dark-mode-toggle';
        darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        
        const header = document.querySelector('.header-content');
        if (header) {
            header.appendChild(darkModeToggle);
        } else {
            return;
        }
        
        function setDarkMode(isDark) {
            document.body.classList.toggle('light-mode', !isDark);
            darkModeToggle.innerHTML = isDark ? 
                '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
            localStorage.setItem('darkMode', isDark ? 'on' : 'off');
        }
        
        darkModeToggle.addEventListener('click', function() {
            const isDark = !document.body.classList.contains('light-mode');
            setDarkMode(!isDark);
        });
        
        // Check for saved preference or prefer color scheme
        const savedMode = localStorage.getItem('darkMode');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedMode === 'off' || (!savedMode && !prefersDark)) {
            setDarkMode(false);
        } else {
            setDarkMode(true);
        }
    }
    
    // ========== Initialize All Functions ==========
    setupMobileMenu();
    setupSmoothScrolling();
    setupActiveSectionHighlight();
    setupScrollAnimations();
    setupDarkModeToggle();
});

// ========== Form Validation ==========
function validateForm(formId) {
    const form = document.forms[formId];
    if (!form) return true; // If form doesn't exist, return true
    
    const name = form.elements["name"]?.value.trim();
    const email = form.elements["email"]?.value.trim();
    const message = form.elements["message"]?.value.trim();
    
    // Simple validation
    if (!name || !email || !message) {
        alert("Please fill all required fields");
        return false;
    }
    
    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address");
        return false;
    }
    
    return true;
}