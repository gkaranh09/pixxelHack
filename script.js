document.addEventListener('DOMContentLoaded', () => {

    // --- Element 1: Loader Logic ---
    const loaderNumber = document.getElementById('loader-number');
    const loader = document.querySelector('.loader');
    const mainContent = document.querySelector('.main-content');
    let count = 0;

    const updateLoader = () => {
        if (count <= 100) {
            loaderNumber.textContent = count;
            count++;
            const delay = count > 80 ? 50 : 25;
            setTimeout(updateLoader, delay);
        } else {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.8,
                onComplete: () => {
                    loader.style.display = 'none';
                    document.body.style.overflowY = 'auto'; // Restore scrolling
                    gsap.to(mainContent, { opacity: 1, duration: 1 });
                    startScrollAnimations();
                }
            });
        }
    };
    if (loader) {
        updateLoader();
    }


    // --- Element 4: Navbar Logic ---
    const menuToggle = document.getElementById('menu-toggle');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navOverlay.classList.toggle('open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navOverlay.classList.remove('open');
        });
    });


    // --- Element 9: Text Scramble Animation ---
    const headlines = document.querySelectorAll('.headline');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ*#@!';

    const scrambleText = (element) => {
        const originalText = element.dataset.value;
        let iteration = 0;
        
        const interval = setInterval(() => {
            element.innerText = originalText
                .split('')
                .map((letter, index) => {
                    if (index < iteration) return originalText[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');
            
            if (iteration >= originalText.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);
    };

    headlines.forEach(headline => {
        headline.addEventListener('mouseover', () => scrambleText(headline));
        scrambleText(headline); // Initial scramble
    });

    // --- NEW: Scroll-triggered Animations for Content ---
    const startScrollAnimations = () => {
        const revealElements = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        revealElements.forEach(element => {
            observer.observe(element);
        });
    };


    // --- Element 8: Ripple Effect Logic (using Three.js) ---
    const canvas = document.getElementById('ripple-canvas');
    if (canvas) {
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000);
        camera.position.z = 1;
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const mouse = new THREE.Vector2();
        window.addEventListener('mousemove', (event) => {
            mouse.x = event.clientX / window.innerWidth;
            mouse.y = 1.0 - (event.clientY / window.innerHeight);
        });

        const material = new THREE.ShaderMaterial({
            uniforms: { u_mouse: { value: mouse }, u_time: { value: 0 }, u_color: { value: new THREE.Color(0xF3C623) }, u_max_dist: { value: 40.0 } },
            vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
            fragmentShader: `uniform vec2 u_mouse; uniform float u_time; uniform vec3 u_color; uniform float u_max_dist; varying vec2 vUv;
                void main() {
                    float dist = distance(vUv, u_mouse) * u_max_dist;
                    float strength = smoothstep(0.7, 0.0, dist) - smoothstep(1.0, 0.7, dist);
                    gl_FragColor = vec4(u_color, strength * 0.5);
                }`,
            transparent: true,
        });

        const geometry = new THREE.PlaneBufferGeometry(window.innerWidth, window.innerHeight);
        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        const animate = () => {
            requestAnimationFrame(animate);
            material.uniforms.u_time.value += 0.05;
            renderer.render(scene, camera);
        };
        animate();

        window.addEventListener('resize', () => {
            camera.left = window.innerWidth / -2; camera.right = window.innerWidth / 2; camera.top = window.innerHeight / 2; camera.bottom = window.innerHeight / -2;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            plane.geometry = new THREE.PlaneBufferGeometry(window.innerWidth, window.innerHeight);
        });
    }
});

