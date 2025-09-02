document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
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

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(30, 58, 138, 0.98)';
        } else {
            navbar.style.background = 'rgba(30, 58, 138, 0.95)';
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    document.querySelectorAll('.review-card, .pricing-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Form submission handler
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Simple form validation and submission simulation
            const formData = new FormData(this);

            // Show success message (in a real app, this would submit to a server)
            alert('Thank you for your inquiry! Marcus will get back to you within 24 hours.');

            // Reset form
            this.reset();
        });
    }

    // Review form submission handler
    const reviewForm = document.querySelector('.review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const reviewData = {
                name: formData.get('name'),
                event: formData.get('event'),
                rating: formData.get('rating'),
                review: formData.get('review'),
                date: formData.get('date')
            };

            // Validate required fields
            if (!reviewData.name || !reviewData.event || !reviewData.rating || !reviewData.review) {
                alert('Please fill in all required fields.');
                return;
            }

            // Show success message (in a real app, this would submit to a server)
            alert('Thank you for your review! It will be reviewed and published soon.');

            // Reset form
            this.reset();
        });
    }
    // Add loading state to video
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.addEventListener('loadstart', function () {
            console.log('Video loading started');
        });

        heroVideo.addEventListener('canplaythrough', function () {
            console.log('Video loaded successfully');
        });

        heroVideo.addEventListener('error', function () {
            console.log('Video failed to load, showing fallback');
            // You could add a fallback image here
            const videoContainer = document.querySelector('.video-container');
            videoContainer.style.background = 'linear-gradient(45deg, #1e3a8a, #f59e0b)';
        });
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;

        const heroVideo = document.querySelector('.hero-video');
        if (heroVideo) {
            heroVideo.style.transform = `translateY(${parallax}px)`;
        }
    });

    const canvas = document.getElementById("noteParticles");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = document.documentElement.scrollWidth;
        canvas.height = document.documentElement.scrollHeight;
    }
    resizeCanvas();

    const notes = ["🎷", "♫", "🎵", "♩", "♭", "♯"];
    const fontSizes = [14, 18, 22, 28, 34];

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const maxParticles = isMobile ? 60 : 150;
    const particles = Array.from({ length: maxParticles }, () => ({ alive: false }));

    const cache = {};
    function getNoteImage(note, size, opacity) {
        const roundedOpacity = Math.round(opacity * 10) / 10;
        const key = `${note}-${size}-${roundedOpacity}`;
        if (cache[key]) return cache[key];

        const off = document.createElement("canvas");
        off.width = size * 2;
        off.height = size * 2;
        const offCtx = off.getContext("2d");

        offCtx.font = `${size}px Arial`;
        offCtx.textAlign = "center";
        offCtx.textBaseline = "middle";
        offCtx.fillStyle = `rgba(0,0,0,${roundedOpacity})`;
        offCtx.fillText(note, size, size);

        cache[key] = off;
        return off;
    }

    function createParticle() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = fontSizes[Math.floor(Math.random() * fontSizes.length)];
        const note = notes[Math.floor(Math.random() * notes.length)];
        const opacity = Math.random() * 0.5 + 0.5;

        // For mobile, we ignore speed and movement
        const speed = isMobile ? 0 : Math.random() * 1 + 0.3;

        return { x, y, speed, size, note, opacity, alive: true };
    }

    // Spawn all particles at once if mobile
    if (isMobile) {
        for (let i = 0; i < maxParticles; i++) {
            particles[i] = createParticle();
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < maxParticles; i++) {
            const p = particles[i];
            if (!p.alive) continue;

            const img = getNoteImage(p.note, p.size, p.opacity);
            ctx.drawImage(img, p.x - p.size, p.y - p.size);

            // Only move particles if not on mobile
            if (!isMobile) {
                p.y -= p.speed;
                p.x += Math.sin(p.y / 40) * 0.5;

                if (p.y < -50) p.alive = false;
            }
        }
    }

    // Only animate if not on mobile (mobile particles stay static)
    if (!isMobile) {
        let lastSpawn = 0;
        const spawnInterval = 1200;

        function animate(now = performance.now()) {
            if (now - lastSpawn > spawnInterval) {
                const nextIndex = particles.findIndex(p => !p.alive);
                if (nextIndex >= 0) particles[nextIndex] = createParticle();
                lastSpawn = now;
            }

            drawParticles();
            requestAnimationFrame(animate);
        }

        animate();
    } else {
        // Draw static particles once on mobile
        drawParticles();
    }

    window.addEventListener("resize", resizeCanvas);

    // window.addEventListener("load", () => {
    //     document.getElementById("loader").classList.add("hidden");
    // });
});