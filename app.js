// --- MOBILE MENU LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    const openBtn = document.getElementById('open-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');

    function openMenu() {
        sidebar.classList.remove('-translate-x-full');
        sidebar.classList.add('translate-x-0');
        overlay.classList.remove('hidden');
        // Petit delai pour l'animation d'opacité
        setTimeout(() => overlay.classList.remove('opacity-0'), 10);
    }

    function closeMenu() {
        sidebar.classList.remove('translate-x-0');
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('opacity-0');
        setTimeout(() => overlay.classList.add('hidden'), 300);
    }

    if (openBtn) openBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    // --- SPA NAVIGATION LOGIC ---
    const navLinks = document.querySelectorAll('.nav-link');
    const views = document.querySelectorAll('.view-section');
    const topBarTitle = document.getElementById('topbar-title');

    // --- RPG DIALOGUE LOGIC ---
    const dialogueScript = [
        "Bonjour et bienvenue sur mon interface.",
        "Vous me connaissez peut-être sous le pseudonyme de GalTech.",
        "Mais pour faire les présentations dans les règles de l'art... Mon vrai nom est Maxence Moreau.",
        "Je travaille actuellement en tant que Technicien Supérieur Instruments et Installations (TSI) chez Météo France, en Nouvelle-Calédonie.",
        "Mon métier n'est pas l'informatique classique : je m'occupe de l'installation et de la maintenance en condition opérationnelle des systèmes d'observation météo, comme les capteurs, les radars et les radiosondages.",
        "Cependant, ma véritable passion, c'est le développement. Ce que j'aime, c'est coder des outils pour moi-même et pour les autres développeurs.",
        "N'hésitez pas à parcourir le menu pour découvrir mes projets !"
    ];
    let currentDialogueIndex = 0;
    let isTyping = false;
    let typewriterTimeout;

    const dialogueTextElement = document.getElementById('dialogue-text');
    const dialogueNextIndicator = document.getElementById('dialogue-next');
    const viewPresentation = document.getElementById('view-presentation');
    
    // Avatar elements
    const companionContainer = document.getElementById('companion-container');
    const photoContainer = document.getElementById('photo-container');
    const dialogueName = document.getElementById('dialogue-name');

    function updateAvatarForIndex(index) {
        if (index === 0 || index === 1 || index === 5 || index === 6) {
            if (companionContainer) { companionContainer.classList.remove('opacity-0'); companionContainer.classList.add('opacity-100'); }
            if (photoContainer) { photoContainer.classList.add('opacity-0'); photoContainer.classList.remove('opacity-100'); }
            if (dialogueName) dialogueName.textContent = 'GalTech';
        } else {
            if (companionContainer) { companionContainer.classList.add('opacity-0'); companionContainer.classList.remove('opacity-100'); }
            if (photoContainer) { photoContainer.classList.remove('opacity-0'); photoContainer.classList.add('opacity-100'); }
            if (dialogueName) dialogueName.textContent = 'Maxence Moreau';
        }
    }

    function completeDialogue(index) {
        clearTimeout(typewriterTimeout);
        updateAvatarForIndex(index);
        if (dialogueTextElement) dialogueTextElement.textContent = dialogueScript[index];
        isTyping = false;
        if (dialogueNextIndicator) {
            dialogueNextIndicator.classList.remove('opacity-0');
            dialogueNextIndicator.classList.add('opacity-100');
        }
    }

    function typeDialogue(index) {
        if (!dialogueTextElement) return;
        clearTimeout(typewriterTimeout);
        dialogueTextElement.textContent = '';
        if (dialogueNextIndicator) {
            dialogueNextIndicator.classList.remove('opacity-100');
            dialogueNextIndicator.classList.add('opacity-0');
        }
        
        updateAvatarForIndex(index);

        const text = dialogueScript[index];
        let charIndex = 0;
        isTyping = true;

        function typeChar() {
            if (charIndex < text.length) {
                dialogueTextElement.textContent += text.charAt(charIndex);
                charIndex++;
                typewriterTimeout = setTimeout(typeChar, 30);
            } else {
                isTyping = false;
                if (dialogueNextIndicator) {
                    dialogueNextIndicator.classList.remove('opacity-0');
                    dialogueNextIndicator.classList.add('opacity-100');
                }
            }
        }
        typeChar();
    }

    function handleDialogueNext() {
        if (!viewPresentation || !viewPresentation.classList.contains('active')) return;

        if (isTyping) {
            completeDialogue(currentDialogueIndex);
        } else {
            if (currentDialogueIndex < dialogueScript.length - 1) {
                currentDialogueIndex++;
                typeDialogue(currentDialogueIndex);
            }
        }
    }

    if (viewPresentation) {
        viewPresentation.addEventListener('click', handleDialogueNext);
        let isWheelingDialogue = false;
        viewPresentation.addEventListener('wheel', (e) => {
            if (e.deltaY > 0) { // scroll down
                if (!isWheelingDialogue) {
                    isWheelingDialogue = true;
                    handleDialogueNext();
                    setTimeout(() => { isWheelingDialogue = false; }, 600);
                }
            }
        });
    }

    function switchView(targetId) {
        // Cacher toutes les vues
        views.forEach(view => {
            view.classList.remove('active');
        });

        // Afficher la vue cible
        const targetView = document.getElementById(`view-${targetId}`);
        if (targetView) {
            targetView.classList.add('active');
            
            // Relancer le dialogue si on retourne sur l'accueil
            if (targetId === 'presentation') {
                currentDialogueIndex = 0;
                typeDialogue(0);
            }
        }

        // Mettre à jour le style du menu
        navLinks.forEach(link => {
            const spanIcon = link.querySelector('.material-symbols-outlined');
            if (link.dataset.target === targetId) {
                link.classList.add('bg-primary-container', 'text-on-primary-container', 'border-r-4', 'border-primary');
                link.classList.remove('text-on-surface-variant', 'hover:bg-surface-container');
                if (spanIcon) spanIcon.classList.add('fill-icon');
            } else {
                link.classList.remove('bg-primary-container', 'text-on-primary-container', 'border-r-4', 'border-primary');
                link.classList.add('text-on-surface-variant', 'hover:bg-surface-container');
                if (spanIcon) spanIcon.classList.remove('fill-icon');
            }
        });

        // Update top app bar title
        if (topBarTitle) {
            topBarTitle.textContent = targetId === 'presentation' ? 'PRÉSENTATION' :
                targetId === 'home' ? 'PARCOURS' :
                targetId === 'repos' ? 'PROJETS' : 'JOURNAL';
        }

        // Gérer le footer (le cacher sur la présentation pour éviter le scroll)
        const globalFooter = document.getElementById('global-footer');
        if (globalFooter) {
            globalFooter.style.display = targetId === 'presentation' ? 'none' : 'block';
        }

        // Fermer le menu sur mobile après un clic
        if (window.innerWidth < 768) {
            closeMenu();
        }
    }

    // Attach click listeners
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.dataset.target;
            if (target) {
                switchView(target);
            }
        });
    });

    // Default view
    switchView('presentation');

    // --- ARTICLE READING LOGIC (FETCH) ---
    const articlePreviews = document.querySelectorAll('#view-blog article[data-article-url]');
    const articleContentContainer = document.getElementById('article-content');
    const btnBackBlog = document.getElementById('btn-back-blog');

    if (btnBackBlog) {
        btnBackBlog.addEventListener('click', () => {
            switchView('blog');
            const scrollContainer = document.querySelector('.overflow-y-scroll');
            if (scrollContainer) scrollContainer.scrollTo(0, 0);
        });
    }

    articlePreviews.forEach(preview => {
        preview.addEventListener('click', async () => {
            const url = preview.dataset.articleUrl;
            if (!url) return;

            // Show loading state
            if (articleContentContainer) {
                articleContentContainer.innerHTML = '<div class="flex justify-center items-center py-24"><div class="animate-pulse flex items-center gap-2 text-primary font-code-snippet"><span class="material-symbols-outlined animate-spin" style="animation-duration: 2s;">sync</span>CHARGEMENT...</div></div>';
            }

            switchView('article');
            const scrollContainer = document.querySelector('.overflow-y-scroll');
            if (scrollContainer) scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Network response was not ok');
                const htmlContent = await response.text();
                
                if (articleContentContainer) {
                    articleContentContainer.innerHTML = htmlContent;
                }
            } catch (error) {
                console.error("Erreur lors du chargement de l'article:", error);
                if (articleContentContainer) {
                    articleContentContainer.innerHTML = '<div class="text-error font-body-base p-8 text-center border border-error bg-surface-container">Erreur de chargement de l\'article. Veuillez vérifier votre connexion.</div>';
                }
            }
        });
    });

    // --- INTERACTIVE MAP LOGIC (SCROLL) ---
    const mapStatus = document.getElementById('map-status');
    const timelineSteps = document.querySelectorAll('.timeline-step');

    // Config de l'Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -40% 0px', // Déclenche quand l'élément est au milieu de l'écran
        threshold: 0
    };

    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stepId = entry.target.dataset.step;
                activateMapStep(stepId);
            }
        });
    }, observerOptions);

    timelineSteps.forEach(step => {
        stepObserver.observe(step);
    });

    function activateMapStep(stepId) {
        // Reset all points opacity and pings
        document.querySelectorAll('.map-point').forEach(pt => {
            pt.classList.remove('opacity-100');
            pt.classList.add('opacity-30');
            const ping = pt.querySelector('.point-ping');
            if (ping) ping.classList.add('hidden');
        });

        // Hide all lines (reset dash offset and opacity)
        document.querySelectorAll('.map-line').forEach(line => {
            line.style.transition = "none";
            line.style.strokeDashoffset = "1000";
            line.style.opacity = "0";
            // Force reflow
            void line.offsetWidth;
            line.style.transition = "all 1s ease-in-out, opacity 0.5s ease-in-out";
        });
        
        // Hide airplane
        const airplane = document.getElementById('airplane');
        if (airplane) {
            airplane.style.transition = "none";
            airplane.classList.add('opacity-0');
        }

        // Update status text
        if (mapStatus) mapStatus.textContent = `Etape: ${stepId.toUpperCase()}`;

        // Si on est à l'une des premières étapes (Nouméa)
        if (stepId === 'noumea-bac' || stepId === 'noumea-lic' || stepId === 'noumea-asset') {
            const noumea = document.getElementById('point-noumea');
            if (noumea) {
                noumea.classList.remove('opacity-30', 'opacity-50');
                noumea.classList.add('opacity-100');
                const ping = noumea.querySelector('.point-ping');
                if (ping) ping.classList.remove('hidden');
            }
        }

        // Helper to animate line and airplane
        function animateTravel(lineId, linePathData, planePathData) {
            const line = document.getElementById(lineId);
            if (line) {
                line.style.transition = "stroke-dashoffset 1s ease-in-out";
                line.style.opacity = "1";
                line.style.strokeDashoffset = "0";
                
                // Rétractation de la ligne après l'arrivée
                setTimeout(() => {
                    if (line.style.strokeDashoffset === "0") {
                        line.style.strokeDashoffset = "-1000"; 
                    }
                }, 1000);
            }
            
            const airplane = document.getElementById('airplane');
            const planeMotion = document.getElementById('plane-motion');
            if (airplane && planeMotion) {
                // Set path pour l'avion (plus haut que la ligne)
                planeMotion.setAttribute('path', planePathData);
                
                // Show airplane
                airplane.classList.remove('opacity-0');
                
                // Trigger SVG animation
                planeMotion.beginElement();
                
                // Hide airplane at the end
                setTimeout(() => {
                    airplane.classList.add('opacity-0');
                }, 1000);
            }
        }

        // Si on est à l'étape Toulouse
        if (stepId === 'toulouse') {
            // Ligne classique (Q526,150) / Avion plus haut (Q526,80)
            animateTravel('line-noumea-toulouse', 'M764,291 Q526,150 288,297', 'M764,291 Q526,80 288,297');

            const toulouse = document.getElementById('point-toulouse');
            if (toulouse) {
                toulouse.classList.remove('opacity-30', 'opacity-50');
                toulouse.classList.add('opacity-100');
                const ping = toulouse.querySelector('.point-ping');
                if (ping) ping.classList.remove('hidden');
            }
            // Garder l'origine visible
            const noumea = document.getElementById('point-noumea');
            if (noumea) noumea.classList.replace('opacity-30', 'opacity-100');
        }

        // Si on est à l'étape finale Nouméa (MF)
        if (stepId === 'noumea-mf') {
            // Ligne classique (Q526,450) / Avion plus haut (Q526,350)
            animateTravel('line-toulouse-noumea', 'M288,297 Q526,450 764,291', 'M288,297 Q526,350 764,291');

            // Re-activer le point de Nouméa
            const noumea = document.getElementById('point-noumea');
            if (noumea) {
                noumea.classList.remove('opacity-30', 'opacity-50');
                noumea.classList.add('opacity-100');
                const ping = noumea.querySelector('.point-ping');
                if (ping) ping.classList.remove('hidden');
            }
            // Garder Toulouse visible
            const toulouse = document.getElementById('point-toulouse');
            if (toulouse) toulouse.classList.replace('opacity-30', 'opacity-100');
        }
    }

    // (La logique de la roue a été supprimée)
});

// --- COMPAGNON 3D LOGIC ---
const companionContainer = document.getElementById('companion-container');
const layerHoodie = document.getElementById('comp-hoodie');
const layerFace = document.getElementById('comp-face');
const layerEyes = document.getElementById('comp-eyes-layer');

const leftPupil = document.getElementById('left-pupil');
const rightPupil = document.getElementById('right-pupil');
const leftReflection = document.getElementById('left-reflection');
const rightReflection = document.getElementById('right-reflection');

// Variables pour l'interpolation fluide
let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
    if (!companionContainer) return;

    const rect = companionContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const diffX = e.clientX - centerX;
    const diffY = e.clientY - centerY;

    targetX = Math.max(-1, Math.min(1, diffX / (window.innerWidth / 2)));
    targetY = Math.max(-1, Math.min(1, diffY / (window.innerHeight / 2)));
});

// Animation du compagnon
function animateCompagnon() {
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;

    // Mouvement des pupilles
    const maxPupilMoveX = 30;
    const maxPupilMoveY = 15;

    const pupilX = currentX * maxPupilMoveX;
    const pupilY = currentY * maxPupilMoveY;

    if (leftPupil && rightPupil) {
        leftPupil.setAttribute('cx', pupilX);
        leftPupil.setAttribute('cy', pupilY);
        rightPupil.setAttribute('cx', pupilX);
        rightPupil.setAttribute('cy', pupilY);

        leftReflection.setAttribute('cx', pupilX - 12);
        leftReflection.setAttribute('cy', pupilY - 12);
        rightReflection.setAttribute('cx', pupilX - 12);
        rightReflection.setAttribute('cy', pupilY - 12);
    }

    // Parallaxe 3D
    const faceRotateX = -currentY * 8;
    const faceRotateY = currentX * 8;
    const faceTranslateX = currentX * 5;
    const faceTranslateY = currentY * 5;

    const faceTransform = `
        translateZ(20px) 
        translateX(${faceTranslateX}px) 
        translateY(${faceTranslateY}px) 
        rotateX(${faceRotateX}deg) 
        rotateY(${faceRotateY}deg)
    `;

    if (layerFace && layerEyes) {
        layerFace.style.transform = faceTransform;
        layerEyes.style.transform = faceTransform;
    }

    const hoodieRotateX = -currentY * 3;
    const hoodieRotateY = currentX * 3;

    if (layerHoodie) {
        layerHoodie.style.transform = `
            translateZ(-10px)
            rotateX(${hoodieRotateX}deg) 
            rotateY(${hoodieRotateY}deg)
        `;
    }

    requestAnimationFrame(animateCompagnon);
}

// Démarrer l'animation
requestAnimationFrame(animateCompagnon);


// ==============================================
// BACKGROUND CLOUD ANIMATION
// ==============================================
const SimplexNoise = function () {
    this.grad3 = [[1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0], [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1], [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]];
    this.p = []; for (var i = 0; i < 256; i++) { this.p[i] = Math.floor(Math.random() * 256); }
    this.perm = []; for (var i = 0; i < 512; i++) { this.perm[i] = this.p[i & 255]; }
    this.dot = function (g, x, y) { return g[0] * x + g[1] * y; };
    this.noise = function (xin, yin) {
        var n0, n1, n2; var F2 = 0.5 * (Math.sqrt(3.0) - 1.0); var s = (xin + yin) * F2; var i = Math.floor(xin + s); var j = Math.floor(yin + s); var G2 = (3.0 - Math.sqrt(3.0)) / 6.0; var t = (i + j) * G2; var X0 = i - t; var Y0 = j - t; var x0 = xin - X0; var y0 = yin - Y0; var i1, j1; if (x0 > y0) { i1 = 1; j1 = 0; } else { i1 = 0; j1 = 1; } var x1 = x0 - i1 + G2; var y1 = y0 - j1 + G2; var x2 = x0 - 1.0 + 2.0 * G2; var y2 = y0 - 1.0 + 2.0 * G2; var ii = i & 255; var jj = j & 255; var gi0 = this.perm[ii + this.perm[jj]] % 12; var gi1 = this.perm[ii + i1 + this.perm[jj + j1]] % 12; var gi2 = this.perm[ii + 1 + this.perm[jj + 1]] % 12; var t0 = 0.5 - x0 * x0 - y0 * y0; if (t0 < 0) n0 = 0.0; else { t0 *= t0; n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0); } var t1 = 0.5 - x1 * x1 - y1 * y1; if (t1 < 0) n1 = 0.0; else { t1 *= t1; n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1); } var t2 = 0.5 - x2 * x2 - y2 * y2; if (t2 < 0) n2 = 0.0; else { t2 *= t2; n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2); } return 70.0 * (n0 + n1 + n2);
    };
};

document.addEventListener('DOMContentLoaded', () => {
    const bgCanvas = document.getElementById('cloud-bounce-canvas');
    if (!bgCanvas) return;
    const ctx = bgCanvas.getContext('2d');
    const noiseGen = new SimplexNoise();
    let width, height;
    let time = 0;

    const gridSize = 4; // Taille de la grille ajustée
    const flowSpeed = 0.005;
    const cloudZoom = 0.0018;
    // Inversion des couleurs : teintes de gris très clairs se fondant dans le bg (#f7f9fb)
    const colors = ['#f7f9fb', '#eceef0', '#e0e3e5', '#c2c6d8'];

    function initCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        bgCanvas.width = width;
        bgCanvas.height = height;
    }

    window.addEventListener('resize', initCanvas);
    initCanvas();

    function fbm(x, y) {
        let total = 0; let amp = 0.6; let freq = 1.0; let max = 0;
        for (let i = 0; i < 5; i++) {
            total += noiseGen.noise(x * cloudZoom * freq, y * cloudZoom * freq) * amp;
            max += amp; amp *= 0.5; freq *= 2.0;
        }
        return Math.pow((total / max) + 0.5, 2.2);
    }

    function drawBg() {
        ctx.clearRect(0, 0, width, height);

        for (let y = 0; y < height; y += gridSize) {
            for (let x = 0; x < width; x += gridSize) {
                let n = fbm(x + time * 50, y + time * 30);
                if (n < 0.12) continue;

                let drawX = x; let drawY = y;

                let intensity = (n - 0.12) / 0.88;
                let cIdx = intensity > 0.75 ? 3 : intensity > 0.5 ? 2 : intensity > 0.25 ? 1 : 0;
                
                if (cIdx > 0) {
                    ctx.fillStyle = colors[cIdx];
                    if (Math.random() < intensity * 2.5) ctx.fillRect(drawX, drawY, gridSize - 1, gridSize - 1);
                }
            }
        }
        time += flowSpeed;
        requestAnimationFrame(drawBg);
    }
    
    drawBg();

    // --- OVERLAY BADGE PHYSIQUE (VANILLA JS) ---
    const btnOpenContact = document.getElementById('btn-open-contact');
    const overlay = document.getElementById('contact-overlay');
    const badgePhysicsContainer = document.getElementById('badge-physics-container');
    const badge = document.getElementById('contact-badge');
    const ropeLine = document.getElementById('badge-rope-line');
    const glare = document.getElementById('badge-glare');

    let isBadgeVisible = false;
    let physicsReq;
    
    // Constantes physiques
    const GRAVITY = 0.8;
    const DAMPING = 0.80; // Frottement de l'air (réduit pour que ça se stabilise vite sans trembler)
    const SPRING_STRENGTH = 0.05; // Force de rappel de la corde (ressort)
    const REST_Y = 200; // Y au repos

    let pos = { x: window.innerWidth / 2, y: -500 }; // Depart caché en haut
    let vel = { x: 0, y: 0 };
    let isDragging = false;
    let dragStart = { x: 0, y: 0 };

    btnOpenContact.addEventListener('click', () => {
        isBadgeVisible = true;
        // Démasquer l'overlay
        overlay.classList.remove('opacity-0', 'pointer-events-none');
        overlay.classList.add('opacity-100');
        
        // Reset physics point start (Drop from top)
        pos = { x: window.innerWidth / 2, y: -500 };
        vel = { x: 0, y: 0 };
        
        if(!physicsReq) physicsLoop();
    });
    
    // Fermer si on clique sur l'overlay sombre en dehors du badge
    overlay.addEventListener('click', (e) => {
        if(e.target === overlay) closeBadge();
    });

    function closeBadge() {
        isBadgeVisible = false;
        overlay.classList.remove('opacity-100');
        overlay.classList.add('opacity-0', 'pointer-events-none');
        
        setTimeout(() => {
            if(!isBadgeVisible && physicsReq) {
                cancelAnimationFrame(physicsReq);
                physicsReq = null;
            }
        }, 300);
    }

    // --- LOGIQUE DRAG & DROP ---
    badge.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', endDrag);
    
    // Support Tactile Mobile
    badge.addEventListener('touchstart', (e) => startDrag(e.touches[0]));
    window.addEventListener('touchmove', (e) => drag(e.touches[0]), {passive: false});
    window.addEventListener('touchend', endDrag);

    function startDrag(e) {
        if(!isBadgeVisible) return;
        isDragging = true;
        dragStart.x = e.clientX - pos.x;
        dragStart.y = e.clientY - pos.y;
        badge.style.cursor = 'grabbing';
    }

    function drag(e) {
        if (!isDragging || !isBadgeVisible) return;
        // Optionnel : e.preventDefault() pour le touch, mais il faut faire attention
        pos.x = e.clientX - dragStart.x;
        pos.y = e.clientY - dragStart.y;
        // On annule la vitesse pour que le badge ne s'envole pas au lâcher
        vel.x = 0;
        vel.y = 0;
    }

    function endDrag() {
        if(!isDragging) return;
        isDragging = false;
        badge.style.cursor = 'grab';
    }

    // --- BOUCLE PHYSIQUE ---
    function physicsLoop() {
        if (!isBadgeVisible && pos.y < -600) {
            // Si invisible et remonté très haut, on coupe l'animation pour save CPU
            physicsReq = null;
            return;
        }

        const currentRestX = window.innerWidth / 2;
        // Si le badge est en train de se fermer, on change le REST_Y vers le haut pour le tirer
        const targetRestY = isBadgeVisible ? REST_Y : -800;

        if (!isDragging) {
            // Appliquer la gravité (uniquement s'il est visible et qu'il tombe)
            if (isBadgeVisible) vel.y += GRAVITY;

            // Force de rappel (Ressort vers le point de repos)
            const dx = currentRestX - pos.x;
            const dy = targetRestY - pos.y;

            vel.x += dx * SPRING_STRENGTH;
            vel.y += dy * SPRING_STRENGTH;

            // Amortissement
            vel.x *= DAMPING;
            vel.y *= DAMPING;

            // Mettre à jour la position
            pos.x += vel.x;
            pos.y += vel.y;
        }

        // --- CALCUL DES ROTATIONS 3D POUR L'EFFET BALANCEMENT ---
        // On calcule une inclinaison réactive
        const deltaX = pos.x - currentRestX;
        let angleZ = deltaX * 0.05; 
        let angleX = (vel.y * 0.5) - ((pos.y - targetRestY) * 0.02);
        let angleY = deltaX * 0.02;

        if (isDragging) {
            // Si on le tire, on force une inclinaison vers la souris
            angleX = -20;
            angleY = deltaX * 0.1;
        }

        // Mettre à jour le DOM
        badgePhysicsContainer.style.left = `${pos.x}px`;
        badgePhysicsContainer.style.top = `${pos.y}px`;
        // translate-x-50% car on l'a centré via CSS left: 50% mais on veut que le x global soit exact
        badgePhysicsContainer.style.transform = `translateX(-50%) rotateZ(${angleZ}deg) rotateX(${angleX}deg) rotateY(${angleY}deg)`;

        // Mettre à jour la corde SVG
        if (ropeLine) {
            ropeLine.setAttribute('x1', '50%');
            ropeLine.setAttribute('y1', '-50');
            ropeLine.setAttribute('x2', `${pos.x}`);
            ropeLine.setAttribute('y2', `${pos.y + 10}`);
        }

        // Effet de reflet (glare) en fonction de l'angle
        if (glare) {
            const glareOpacity = Math.min(Math.max((angleX + angleY) * 0.02 + 0.1, 0), 0.6);
            glare.style.opacity = isDragging ? '0.4' : `${glareOpacity}`;
        }

        physicsReq = requestAnimationFrame(physicsLoop);
    }
});