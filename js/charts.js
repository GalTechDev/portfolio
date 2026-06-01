/**
 * Portfolio - Chart.js Visualizations
 * Radar chart pour les compétences techniques
 */

// Couleurs du thème
const chartColors = {
    primary: '#00d4ff',
    primaryLight: 'rgba(0, 212, 255, 0.2)',
    purple: '#8b5cf6',
    purpleLight: 'rgba(139, 92, 246, 0.2)',
    text: '#e8e8ec',
    textMuted: '#6b7280',
    grid: 'rgba(255, 255, 255, 0.1)'
};

// Configuration globale Chart.js
Chart.defaults.color = chartColors.textMuted;
Chart.defaults.borderColor = chartColors.grid;
Chart.defaults.font.family = "'Inter', sans-serif";

/**
 * Initialise le radar chart des compétences
 */
function initSkillsChart() {
    const ctx = document.getElementById('skillsChart');
    if (!ctx) return;

    const skills = {
        labels: [
            'Python',
            'PHP',
            'Java',
            'JavaScript',
            'Réseaux',
            'Hardware',
            'Linux',
            'Web Dev',
            'Électronique',
            'Météorologie'
        ],
        datasets: [{
            label: 'Niveau de compétence',
            data: [90, 45, 50, 80, 80, 75, 85, 75, 65, 80],
            backgroundColor: chartColors.primaryLight,
            borderColor: chartColors.primary,
            borderWidth: 2,
            pointBackgroundColor: chartColors.primary,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: chartColors.primary,
            pointRadius: 4,
            pointHoverRadius: 6
        }]
    };

    new Chart(ctx, {
        type: 'radar',
        data: skills,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(20, 20, 30, 0.9)',
                    titleColor: chartColors.text,
                    bodyColor: chartColors.text,
                    borderColor: chartColors.primary,
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function (context) {
                            return `${context.parsed.r}%`;
                        }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        display: false
                    },
                    grid: {
                        color: chartColors.grid
                    },
                    angleLines: {
                        color: chartColors.grid
                    },
                    pointLabels: {
                        color: chartColors.text,
                        font: {
                            size: 12,
                            weight: '500'
                        }
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', function () {
    // Observer pour animer le chart quand il devient visible
    const chartSection = document.getElementById('competences');
    if (chartSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initSkillsChart();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(chartSection);
    }
});
