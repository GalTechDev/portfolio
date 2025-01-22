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
