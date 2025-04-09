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

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/data.json");
  const data = await response.json();
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
});
