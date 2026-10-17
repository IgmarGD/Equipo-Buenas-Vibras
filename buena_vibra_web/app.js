/* =========================================================
   BUENA VIBRA — Interacciones del sitio (JavaScript puro)
   Puedes editar este archivo desde Visual Studio Code.
   ========================================================= */

document.documentElement.classList.add('js-ready');

// 1) Menú de navegación para pantallas pequeñas.
const menuToggle = document.querySelector('#menuToggle');
const mainMenu = document.querySelector('#mainMenu');

function closeMenu() {
  mainMenu.classList.remove('is-open');
  menuToggle.classList.remove('is-active');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menú');
}

menuToggle.addEventListener('click', () => {
  const isOpen = mainMenu.classList.toggle('is-open');
  menuToggle.classList.toggle('is-active', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});
mainMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});

// 2) Mostrar la segunda pregunta solo cuando corresponde.
const electricalSelect = document.querySelector('#estadoElectrico');
const decorativeSelect = document.querySelector('#estadoDecorativo');
const decorativeGroup = document.querySelector('#grupoDecorativo');
const classificationForm = document.querySelector('#clasificador');
const resultBox = document.querySelector('#resultado');

function syncDecorativeQuestion() {
  const needsDecorativeReview = electricalSelect.value === 'no-apto';
  decorativeGroup.hidden = !needsDecorativeReview;
  decorativeSelect.required = needsDecorativeReview;
  if (!needsDecorativeReview) decorativeSelect.value = '';
  resultBox.hidden = true;
}
electricalSelect.addEventListener('change', syncDecorativeQuestion);
decorativeSelect.addEventListener('change', () => { resultBox.hidden = true; });
syncDecorativeQuestion();

// Este simulador es informativo: NO mide rendimiento ni certifica seguridad.
classificationForm.addEventListener('submit', event => {
  event.preventDefault();
  const electrical = electricalSelect.value;
  const decorative = decorativeSelect.value;

  let className = 'pending';
  let title = 'Primero, una evaluación profesional';
  let description = 'Antes de asignar una ruta hay que conocer el estado y la seguridad real del panel.';
  let label = 'PENDIENTE DE DIAGNÓSTICO';

  if (electrical === 'apto') {
    className = 'energy';
    title = 'Ruta A · Reutilización energética';
    description = 'Con el visto bueno técnico, el panel podría destinarse a iluminación u otros equipos de baja demanda, según su potencia disponible.';
    label = 'SEGUNDA VIDA ENERGÉTICA';
  } else if (electrical === 'no-apto' && decorative === 'apto') {
    className = 'art';
    title = 'Ruta B · Transformación artística';
    description = 'Si se declaró seguro para decoración, podría convertirse en una pieza artística sin operaciones peligrosas sobre el módulo.';
    label = 'ARTE CON PROPÓSITO';
  } else if (electrical === 'no-apto' && decorative === 'no-apto') {
    className = 'recycle';
    title = 'Ruta C · Reciclaje especializado';
    description = 'No es apto para energía ni para arte. Debe gestionarse con operadores capacitados conforme a las normas correspondientes.';
    label = 'GESTIÓN RESPONSABLE';
  } else if (!electrical || (electrical === 'no-apto' && !decorative)) {
    electricalSelect.reportValidity();
    if (electrical === 'no-apto') decorativeSelect.reportValidity();
    return;
  }

  // El contenido mostrado se define aquí; no incluye datos aportados por usuarios.
  resultBox.className = `sim-result sim-result-${className}`;
  resultBox.innerHTML = `
    <span class="result-kicker">${label}</span>
    <h3>${title}</h3>
    <p>${description}</p>
    <small>Resultado ilustrativo. Requiere validación técnica real.</small>
  `;
  resultBox.hidden = false;
});

// 3) Copiar una breve explicación para compartir el proyecto.
const summary = 'Equipo Buena Vibra — Aprovechamiento sostenible de paneles solares en desuso mediante su reutilización energética comunitaria y transformación artística en América Latina. La propuesta busca evaluar paneles retirados, reutilizar los aptos en aplicaciones de bajo consumo, transformar en cuadros artísticos los que sean seguros para decoración y enviar los restantes a reciclaje especializado.';
const copyButton = document.querySelector('#copiarIdea');
const copyStatus = document.querySelector('#copiarEstado');

copyButton.addEventListener('click', async () => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(summary);
    } else {
      // Método de respaldo para usar el sitio desde un archivo local.
      const textarea = document.createElement('textarea');
      textarea.value = summary;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const success = document.execCommand('copy');
      textarea.remove();
      if (!success) throw new Error('No se pudo copiar');
    }
    copyStatus.textContent = '¡Descripción copiada! Ya puedes pegarla donde quieras.';
  } catch (_error) {
    copyStatus.textContent = 'Tu navegador impidió copiar. Puedes seleccionar el texto de presentación del sitio.';
  }
});

// 4) Animación sutil al desplazarse; el contenido siempre permanece accesible.
const animatedItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10 });
  animatedItems.forEach(item => observer.observe(item));
} else {
  animatedItems.forEach(item => item.classList.add('revealed'));
}

// 5) Año automático del pie de página.
document.querySelector('#anio').textContent = new Date().getFullYear();
