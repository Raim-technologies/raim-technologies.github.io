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
        var closeNav = function () {
            gnav.classList.remove('open');
            gnav.classList.add('close');
            gh.classList.remove('gnav-open');
            gh.classList.add('gh--logo-hiding');
            if (menuText) menuText.textContent = 'Menu';
            ghMenu.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';

            // Remove 'close' after transition, then fade logo in
            setTimeout(function () {
                gnav.classList.remove('close');
                gh.classList.remove('gh--logo-hiding');
            }, 550);
        };

        var openNav = function () {
            gnav.classList.remove('close');
            gnav.classList.add('open');
            gh.classList.add('gnav-open');
            if (menuText) menuText.textContent = 'Close';
            ghMenu.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        };

        ghMenu.setAttribute('aria-expanded', 'false');
        ghMenu.addEventListener('click', function () {
            if (gnav.classList.contains('open')) {
                closeNav();
            } else {
                openNav();
            }
        });

        // Close on Esc
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && gnav.classList.contains('open')) {
                closeNav();
            }
        });

        // Close on link click
        gnav.querySelectorAll('.gnav-link').forEach(function (link) {
            link.addEventListener('click', closeNav);
        });
    }

    // Highlight current page in navs
    var currentPath = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.gnav-link, .gh-nav-link').forEach(function (link) {
        if (link.getAttribute('href') === currentPath) {
            link.setAttribute('aria-current', 'page');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href.length < 2) return;
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form submission handling - Google Forms integration
    // (required fields / email format / privacy checkbox are enforced by
    //  native HTML validation before the submit event fires)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const formStatus = contactForm.querySelector('.form-status');

        var showStatus = function (type, message) {
            if (!formStatus) return;
            formStatus.classList.remove('is-success', 'is-error');
            formStatus.classList.add(type === 'success' ? 'is-success' : 'is-error');
            formStatus.textContent = message;
        };

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

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
            if (formStatus) {
                formStatus.classList.remove('is-success', 'is-error');
                formStatus.textContent = '';
            }

            fetch(GOOGLE_FORM_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            })
                .then(function () {
                    showStatus('success', 'お問い合わせありがとうございます。内容を確認の上、担当者よりご連絡いたします。');
                    contactForm.reset();
                })
                .catch(function (error) {
                    console.error('Error:', error);
                    showStatus('error', '送信中にエラーが発生しました。お手数ですが、info@raim-tech.com まで直接メールでお問い合わせください。');
                })
                .finally(function () {
                    submitBtn.disabled = false;
                    submitBtn.textContent = '送信する';
                });
        });
    }

    // Header color inversion on dark sections
    var darkSections = document.querySelectorAll('.sv-hero, .sv-section[data-theme="dark"]');
    if (darkSections.length && gh) {
        var activeDarkSections = new Set();
        var headerObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    activeDarkSections.add(entry.target);
                } else {
                    activeDarkSections.delete(entry.target);
                }
            });
            // Switch instantly; the logos crossfade via their own 0.3s opacity transition
            gh.classList.toggle('gh--light', activeDarkSections.size > 0);
        }, {
            rootMargin: '0px 0px -95% 0px',
            threshold: 0
        });

        darkSections.forEach(function (section) {
            headerObserver.observe(section);
        });
    }
});
