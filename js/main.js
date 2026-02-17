// ========================================
// Raim Technologies - Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    if (window.lucide) {
        lucide.createIcons();
    }

    // Splash screen cleanup
    var splash = document.getElementById('splash');
    if (splash) {
        splash.addEventListener('animationend', function (e) {
            if (e.animationName === 'splash-exit') {
                splash.remove();
            }
        });
    }

    // Fullscreen Nav Overlay
    var gh = document.getElementById('gh');
    var ghMenu = document.getElementById('gh-menu');
    var gnav = document.getElementById('gnav');
    var menuText = ghMenu ? ghMenu.querySelector('.gh-menu-text') : null;

    if (ghMenu && gnav && gh) {
        ghMenu.addEventListener('click', function () {
            var isOpen = gnav.classList.contains('open');

            if (isOpen) {
                // Close
                gnav.classList.remove('open');
                gnav.classList.add('close');
                gh.classList.remove('gnav-open');
                gh.classList.add('gh--logo-hiding');
                if (menuText) menuText.textContent = 'Menu';
                document.body.style.overflow = '';

                // Remove 'close' after transition, then fade logo in
                setTimeout(function () {
                    gnav.classList.remove('close');
                    gh.classList.remove('gh--logo-hiding');
                }, 800);
            } else {
                // Open
                gnav.classList.remove('close');
                gnav.classList.add('open');
                gh.classList.add('gnav-open');
                if (menuText) menuText.textContent = 'Close';
                document.body.style.overflow = 'hidden';
            }
        });

        // Close on link click
        var gnavLinks = gnav.querySelectorAll('.gnav-link');
        gnavLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                gnav.classList.remove('open');
                gnav.classList.add('close');
                gh.classList.remove('gnav-open');
                gh.classList.add('gh--logo-hiding');
                if (menuText) menuText.textContent = 'Menu';
                document.body.style.overflow = '';
                setTimeout(function () {
                    gnav.classList.remove('close');
                    gh.classList.remove('gh--logo-hiding');
                }, 800);
            });
        });
    }

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
    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translate3d(0, 0, 0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation with staggered delays
    var animateElements = document.querySelectorAll('.feature-card, .service-card, .work-card');
    animateElements.forEach(function (el) {
        var index = Array.prototype.indexOf.call(el.parentElement.children, el);
        var delay = index * 0.1;
        el.style.opacity = '0';
        el.style.transform = 'translate3d(0, 30px, 0)';
        el.style.transition = 'opacity 1.2s cubic-bezier(.075, .82, .165, 1) ' + delay + 's, transform 1.2s cubic-bezier(.075, .82, .165, 1) ' + delay + 's';
        observer.observe(el);
    });

    // Header color inversion on dark sections
    var darkSections = document.querySelectorAll('.sv-hero, .sv-section[data-theme="dark"]');
    if (darkSections.length && gh) {
        var activeDarkSections = new Set();
        var wasLight = false;
        var logoTimer = null;
        var firstRun = true;
        var headerObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    activeDarkSections.add(entry.target);
                } else {
                    activeDarkSections.delete(entry.target);
                }
            });
            var isLight = activeDarkSections.size > 0;
            if (firstRun) {
                // Initial load — set instantly, no animation
                firstRun = false;
                wasLight = isLight;
                if (isLight) gh.classList.add('gh--light');
                return;
            }
            if (isLight !== wasLight) {
                wasLight = isLight;
                // Fade out logo, wait for transition, then switch and fade in
                gh.classList.add('gh--logo-hiding');
                if (logoTimer) clearTimeout(logoTimer);
                logoTimer = setTimeout(function () {
                    if (isLight) {
                        gh.classList.add('gh--light');
                    } else {
                        gh.classList.remove('gh--light');
                    }
                    gh.classList.remove('gh--logo-hiding');
                }, 350);
            }
        }, {
            rootMargin: '0px 0px -95% 0px',
            threshold: 0
        });

        darkSections.forEach(function (section) {
            headerObserver.observe(section);
        });
    }

    // Service page: sv-section scroll animations
    var svSections = document.querySelectorAll('.sv-section');
    if (svSections.length) {
        var svObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -60px 0px'
        });

        svSections.forEach(function (section) {
            svObserver.observe(section);
        });
    }
});
