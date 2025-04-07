let theme = "light";

function switchTheme() {
    if (theme === 'light') {
        theme = "dark";
    } else if (theme === 'dark'){
        theme = "light";
    }
    applyTheme(theme);
}


// Fonction pour définir les variables CSS en fonction du thème
function applyTheme(theme) {
  var root = document.querySelector(':root');
  var color = ["--primary", "--primary-op", "--secondary", "--color-grad-1", "--color-grad-2", "--background-hover"];
  color.forEach(function (element) {
    root.style.setProperty(element, 'var('+element+'-'+theme+')');
  });
}

const data = {
  "nom": "MAXENCE",
  "prenom": "MOREAU",
  "poste": "TECHNICIEN INFORMATIQUE",
  "description": "Je suis un technicien avec plus de 5 ans d'expérience dans le secteur de l'informatique. Mes travaux sont principalement des projets personnels ou en partenariat avec l’université et les chercheurs minier de la Nouvelle Calédonie.",
  "photo": "https://bio.galtech.cc/images/profil.jpeg",
  "coordonnees": [
    { "type": "email", "valeur": "maxence.moreau@example.com" },
    { "type": "tel", "valeur": "+33 6 00 00 00 00" },
    { "type": "loc", "valeur": "Toulouse, France" },
    { "type": "linkedin", "valeur": "https://www.linkedin.com/in/maxence-moreau-709b5b23b" }
  ],
  "competences": [],
  "experiences": [
    {
      "titre": "Technicien Informatique",
      "description": "Asset Wings",
      "competence":[
        "Technicien Informatique en charge de la veille logiciel et le suivie des infrastructures numériques du groupe Balland (grand groupe commercial de Nouvelle-Calédonie)"
      ]
    },
    {
      "titre": "Moniteur Informatique",
      "description": "Université de la Nouvelle Calédonie",
      "competence":[
        "En charge de l’installation et le suivie du parc informatique de l’université"
      ]
    },
  ],
  "formations": [
    {
      "titre": "Université de la Nouvelle Calédonie",
      "description": "Licence Informatique",
      "competence":[
        "Programmation en Python, Java, PHP, C",
        "Administration systèmes et réseaux"
      ]
    },
    {
      "titre": "Ecole Nationale de la Météo",
      "description": "Formation Technicien Supérieur Instrumentation",
      "competence":[
        "Certification électrique basse tension",
        "Contrôler la conformité d'un équipement, d'une machine, d'une installation",
        "Modifier un équipement automatisé",
        "Diagnostiquer des dysfonctionnements sur des installations de réseau"
      ]
    },
  ],
  "projets": [
    {
      "titre": "Understar OS",
      "description": "Bot Discord dynamique",
      "competence":[]
    },
    {
      "titre": "Cloud v2",
      "description": "Une interface de gestion de fichier",
      "competence":[]
    },
    {
      "titre": "DataGate",
      "description": "Une application web de gestion de données de recherches",
      "competence":[]
    },
    {
      "titre": "HotReload",
      "description": "Une librairie python de rechargement de module sans interuption d'execution",
      "competence":[]
    },
    {
      "titre": "GTLib",
      "description": "Une librairie python basé sur pygame pour simplifier la création d'interface graphique",
      "competence":[]
    }
  ]
}


  // HEADER
  document.querySelector(".title .bold").innerHTML = `${data.nom}<br>${data.prenom}`;
  document.querySelector(".title .thin").innerText = data.poste;
  document.querySelector(".title .description").innerHTML = data.description.replace(/\n/g, "<br>");
  document.querySelector(".profile img").src = data.photo;

  // COORDONNÉES
  data.coordonnees.forEach(c => {
    const coords = document.querySelector("#coordonnees ."+c.type);
    
    if (c.type === "linkedin") {
      coords.href = `${c.valeur}`
    } else {
      coords.innerHTML = `${c.valeur}`;
    }
  });

  // Expériences professionnelles
  data.experiences.forEach(c => {
    const experiences = document.querySelector("#experiences ul");
    
    var compt = ""
    c.competence.forEach(comp => {
      compt+=`<li>${comp}</li>`
    })

    const li = document.createElement("li");
    li.innerHTML = `
      <section class="linked-section">
        <div>
          <div class="section-title">
            <h2>${c.titre}</h2>
            <h3>${c.description}</h3>
          </div>
          <div class="section-content">
            <ul>
              ${compt}
            </ul>
          </div>
        </div>
      </section>
    `;
    experiences.appendChild(li);
  });

  // Formations et Diplomes
  data.formations.forEach(c => {
    const formations = document.querySelector("#formations ul");
    
    var compt = ""
    c.competence.forEach(comp => {
      compt+=`<li>${comp}</li>`
    })

    const li = document.createElement("li");
    li.innerHTML = `
      <section class="linked-section">
        <div>
          <div class="section-title">
            <h2>${c.titre}</h2>
            <h3>${c.description}</h3>
          </div>
          <div class="section-content">
            <ul>
              ${compt}
            </ul>
          </div>
        </div>
      </section>
    `;
    formations.appendChild(li);
  });

  // PROJET
  data.projets.forEach(c => {
    const projets = document.querySelector("#projets ul");

    var compt = ""
    c.competence.forEach(comp => {
      compt+=`<li>${comp}</li>`
    })
    
    const li = document.createElement("li");
    li.innerHTML = `
      <section class="linked-section">
        <div>
          <div class="section-title">
            <h2>${c.titre}</h2>
            <h3>${c.description}</h3>
          </div>
          <div class="section-content">
            <ul>
              ${compt}
            </ul>
          </div>
        </div>
      </section>
    `;
    projets.appendChild(li);
  });