/**
 * Portfolio - Data Loading & Rendering
 * Charge les données depuis data.json et génère le contenu
 */

// Project icons mapping
const projectIcons = {
    'ABM-Temp-Analyser': '🌡️',
    'Understar OS': '🤖',
    'Cloud v2': '☁️',
    'DataGate': '🔐',
    'HotReload': '🔄',
    'GTLib': '🎮',
    'default': '💻'
};

/**
 * Charge les données du portfolio
 */
async function loadPortfolioData() {
    try {
        const response = await fetch('./data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        return null;
    }
}

/**
 * Rend la section Hero
 */
function renderHero(data) {
    // Description
    const descEl = document.getElementById('heroDescription');
    if (descEl && data.description) {
        descEl.textContent = data.description;
    }

    // Contact
    const contactEl = document.getElementById('heroContact');
    if (contactEl && data.coordonnees) {
        contactEl.innerHTML = data.coordonnees.map(coord => {
            let icon = '📧';
            let href = '#';

            switch (coord.type) {
                case 'email':
                    icon = '📧';
                    href = `mailto:${coord.valeur}`;
                    break;
                case 'tel':
                    icon = '📞';
                    href = `tel:${coord.valeur}`;
                    break;
                case 'loc':
                    icon = '📍';
                    break;
                case 'linkedin':
                    icon = '💼';
                    href = coord.valeur;
                    break;
            }

            return `<a href="${href}" ${coord.type === 'linkedin' ? 'target="_blank"' : ''}>
                ${icon} ${coord.valeur.replace('https://www.linkedin.com/in/', '')}
            </a>`;
        }).join('');
    }
}

/**
 * Rend la timeline des expériences
 */
function renderExperiences(experiences) {
    const timeline = document.getElementById('experienceTimeline');
    if (!timeline || !experiences) return;

    timeline.innerHTML = experiences.map((exp, index) => `
        <div class="timeline-item ${index === 0 ? 'current' : ''}" data-delay="${index * 100}">
            ${index === 0 ? '<span class="timeline-badge">Actuel</span>' : ''}
            <div class="timeline-title">${exp.titre}</div>
            <div class="timeline-subtitle">${exp.description}</div>
            ${exp.competence && exp.competence.length > 0 ? `
                <div class="timeline-desc">
                    <ul>
                        ${exp.competence.map(c => `<li>${c}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        </div>
    `).join('');
}

/**
 * Rend la timeline des formations
 */
function renderFormations(formations) {
    const timeline = document.getElementById('formationTimeline');
    if (!timeline || !formations) return;

    timeline.innerHTML = formations.map((form, index) => `
        <div class="timeline-item" data-delay="${index * 100}">
            <div class="timeline-title">${form.titre}</div>
            <div class="timeline-subtitle">${form.description}</div>
            ${form.competence && form.competence.length > 0 ? `
                <div class="timeline-desc">
                    <ul>
                        ${form.competence.map(c => `<li>${c}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        </div>
    `).join('');
}

/**
 * Rend les cartes de projets
 */
function renderProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    if (!grid || !projects) return;

    grid.innerHTML = projects.map((project, index) => {
        const icon = projectIcons[project.titre] || projectIcons.default;
        const hasUrl = project.url && project.url.length > 0;

        return `
            <div class="project-card" 
                 data-url="${project.url || ''}" 
                 data-delay="${index * 100}"
                 style="animation-delay: ${index * 0.1}s">
                <div class="project-icon">${icon}</div>
                <h3 class="project-title">${project.titre}</h3>
                <p class="project-desc">${project.description}</p>
                ${project.competence && project.competence.length > 0 ? `
                    <div class="project-tags">
                        ${project.competence.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
                ${hasUrl ? `
                    <span class="project-link">
                        Voir le projet →
                    </span>
                ` : ''}
            </div>
        `;
    }).join('');

    // Ajouter les event listeners pour les transitions
    setupProjectTransitions();
}

/**
 * Configure les transitions fluides pour les projets avec iframe
 */
function setupProjectTransitions() {
    const projectCards = document.querySelectorAll('.project-card[data-url]');
    const modal = document.getElementById('iframeModal');
    const iframe = document.getElementById('projectIframe');
    const closeBtn = document.getElementById('iframeCloseBtn');
    const modalTitle = document.getElementById('iframeTitle');
    const loading = document.getElementById('iframeLoading');

    // Ouvrir le modal avec iframe
    projectCards.forEach(card => {
        const url = card.dataset.url;
        if (!url) return;

        card.addEventListener('click', () => {
            const title = card.querySelector('.project-title')?.textContent || 'Projet';

            // Configurer le modal
            modalTitle.textContent = title;
            loading.classList.remove('hidden');
            iframe.src = '';

            // Ouvrir le modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Charger l'iframe
            setTimeout(() => {
                iframe.src = url;
            }, 100);

            // Cacher le loading quand l'iframe est chargé
            iframe.onload = () => {
                loading.classList.add('hidden');
            };
        });
    });

    // Fermer le modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            iframe.src = '';
        }, 300);
    }

    closeBtn.addEventListener('click', closeModal);

    // Fermer avec Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Fermer en cliquant sur le fond (header seulement)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

/**
 * Rend les liens du footer
 */
function renderFooterLinks(coordonnees) {
    const footer = document.getElementById('footerLinks');
    if (!footer || !coordonnees) return;

    const links = coordonnees.filter(c => c.type === 'linkedin' || c.type === 'email');

    footer.innerHTML = links.map(coord => {
        if (coord.type === 'linkedin') {
            return `<a href="${coord.valeur}" target="_blank">LinkedIn</a>`;
        } else if (coord.type === 'email') {
            return `<a href="mailto:${coord.valeur}">Contact</a>`;
        }
        return '';
    }).join('');
}

/**
 * Initialisation
 */
async function initPortfolio() {
    const data = await loadPortfolioData();
    if (!data) {
        console.error('Impossible de charger les données du portfolio');
        return;
    }

    renderHero(data);
    renderExperiences(data.experiences);
    renderFormations(data.formations);
    renderProjects(data.projets);
    renderFooterLinks(data.coordonnees);
}

// Lancer l'initialisation
document.addEventListener('DOMContentLoaded', initPortfolio);
