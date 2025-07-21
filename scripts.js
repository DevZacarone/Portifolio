// Inicializa AOS
AOS.init({
  duration: 800,
  once: true,
});

// Menu hambúrguer toggle
const btnMenu = document.getElementById("btn-menu");
const nav = document.querySelector("nav");
btnMenu.addEventListener("click", () => {
  nav.classList.toggle("open");
  const expanded = btnMenu.getAttribute("aria-expanded") === "true";
  btnMenu.setAttribute("aria-expanded", !expanded);
});
// Acessibilidade para tecla Enter no botão menu
btnMenu.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    btnMenu.click();
  }
});

// Dark mode toggle
const btnToggleTheme = document.getElementById("btn-toggle-theme");
const body = document.body;
const icon = btnToggleTheme.querySelector("i");

// Verifica preferência salva
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  if (savedTheme === "light") {
    body.classList.add("light-mode");
    icon.classList.replace("fa-moon", "fa-sun");
    btnToggleTheme.setAttribute("aria-pressed", "true");
  }
} else {
  // Detecta tema do sistema
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches
  ) {
    body.classList.add("light-mode");
    icon.classList.replace("fa-moon", "fa-sun");
    btnToggleTheme.setAttribute("aria-pressed", "true");
  }
}

btnToggleTheme.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  const lightOn = body.classList.contains("light-mode");
  btnToggleTheme.setAttribute("aria-pressed", lightOn ? "true" : "false");
  if (lightOn) {
    icon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "light");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "dark");
  }
});
btnToggleTheme.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    btnToggleTheme.click();
  }
});

// Filtragem dos projetos
const btnFiltros = document.querySelectorAll(".btn-filtro");
const projetos = document.querySelectorAll(".projeto-card");

btnFiltros.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Ativa/desativa botão
    btnFiltros.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filtro = btn.getAttribute("data-filter");

    projetos.forEach((proj) => {
      if (filtro === "todos") {
        proj.style.display = "flex";
      } else {
        if (proj.classList.contains(filtro)) {
          proj.style.display = "flex";
        } else {
          proj.style.display = "none";
        }
      }
    });
  });
});

// Validação formulário contato
const formContato = document.getElementById("form-contato");
const feedback = formContato.querySelector(".form-feedback");

formContato.addEventListener("submit", (e) => {
  e.preventDefault();

  // Limpa feedback
  feedback.textContent = "";
  feedback.style.color = "";

  const nome = formContato.nome.value.trim();
  const email = formContato.email.value.trim();
  const mensagem = formContato.mensagem.value.trim();

  // Simples validações
  if (nome.length < 3) {
    feedback.textContent =
      "Por favor, informe um nome válido (mínimo 3 caracteres).";
    feedback.style.color = "red";
    formContato.nome.focus();
    return;
  }

  if (!validateEmail(email)) {
    feedback.textContent = "Por favor, informe um e-mail válido.";
    feedback.style.color = "red";
    formContato.email.focus();
    return;
  }

  if (mensagem.length < 10) {
    feedback.textContent = "A mensagem deve ter pelo menos 10 caracteres.";
    feedback.style.color = "red";
    formContato.mensagem.focus();
    return;
  }

  // Se passar validações - aqui você integraria envio via backend ou API
  feedback.textContent = "Mensagem enviada com sucesso! Obrigado pelo contato.";
  feedback.style.color = "green";

  formContato.reset();
});

// Função de validação de email simples
function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
  return re.test(email.toLowerCase());
}
