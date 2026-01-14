// ========================================
// Raim Technologies - Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');

    if (navToggle && navList) {
        navToggle.addEventListener('click', function () {
            navList.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navList.querySelectorAll('.nav-link');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                navList.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
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

    // Form submission handling - Google Forms integration
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Simple validation
            const requiredFields = ['name', 'email', 'message'];
            let isValid = true;

            requiredFields.forEach(function (field) {
                const input = contactForm.querySelector('[name="' + field + '"]');
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                } else {
                    input.style.borderColor = '';
                }
            });

            // Check privacy checkbox
            const privacyCheckbox = contactForm.querySelector('[name="privacy"]');
            if (!privacyCheckbox.checked) {
                isValid = false;
                alert('プライバシーポリシーへの同意が必要です。');
                return;
            }

            if (isValid) {
                // Google Forms configuration
                const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeepo2Ly3TMbAVJxlf-r6nzKSZGHj-MK167bwc7vXExN_g0zQ/formResponse';
                const ENTRY_IDS = {
                    company: 'entry.1247170573',
                    name: 'entry.1506127698',
                    email: 'entry.685446785',
                    phone: 'entry.673497820',
                    message: 'entry.1069934006'
                };

                // Build form data for Google Forms
                const formData = new URLSearchParams();
                formData.append(ENTRY_IDS.company, contactForm.querySelector('[name="company"]').value);
                formData.append(ENTRY_IDS.name, contactForm.querySelector('[name="name"]').value);
                formData.append(ENTRY_IDS.email, contactForm.querySelector('[name="email"]').value);
                formData.append(ENTRY_IDS.phone, contactForm.querySelector('[name="phone"]').value);
                formData.append(ENTRY_IDS.message, contactForm.querySelector('[name="message"]').value);

                // Submit to Google Forms
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.textContent = '送信中...';

                fetch(GOOGLE_FORM_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formData.toString()
                })
                    .then(function () {
                        alert('お問い合わせありがとうございます。\n内容を確認の上、担当者よりご連絡いたします。');
                        contactForm.reset();
                    })
                    .catch(function (error) {
                        console.error('Error:', error);
                        alert('送信中にエラーが発生しました。\n直接メールでお問い合わせください。');
                    })
                    .finally(function () {
                        submitBtn.disabled = false;
                        submitBtn.textContent = '送信する';
                    });
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .service-card, .work-card');
    animateElements.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
