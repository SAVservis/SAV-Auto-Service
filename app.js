// Функція для відкриття модалки або нової вкладки в залежності від пристрою
function openModalOrNewTab(event) {
  event.preventDefault();  // Запобігає стандартній поведінці переходу за посиланням
  
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);  // Визначаємо, чи мобільний пристрій

  if (isMobile) {
    // Якщо мобільний пристрій — відкриваємо форму в новій вкладці
    window.open(
      "https://sites.google.com/view/info-sav-auto-service/akcie-a-z%C4%BEavy",
      "_blank"
    );
  } else {
    // Якщо ПК — відкриваємо форму в модальному вікні
    openModal();
  }
}

// Функція для відкриття модального вікна
function openModal() {
  document.getElementById("reservationModal").style.display = "block";
}

// Закриття модального вікна
function closeModal() {
  document.getElementById("reservationModal").style.display = "none";  // Використовуємо один і той самий id
}

// Закриття при кліку поза модальним вікном
window.onclick = function(event) {
  const modal = document.getElementById("reservationModal");  // Знову використовуємо той самий id
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
function openPopup(e) {
  e.preventDefault();
  const url = "https://sites.google.com/view/info-sav-auto-service/akcie-a-z%C4%BEavy";
  const width = 800;
  const height = 700;
  const left = (screen.width / 2) - (width / 2);
  const top = (screen.height / 2) - (height / 2);

  window.open(
    url,
    'RezervaciaPopup',
    `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
  );
}


// Фотоколаж
const images = document.querySelectorAll('.photo-gallery img');
const modal = document.getElementById('photoModal');
const modalImg = document.getElementById('modalImage');

let currentIndex = 0;

// Визначення мобільного пристрою
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (!isMobile) {
  // Для ПК — клік відкриває модалку
  images.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentIndex = index;
      openPhotoModal(img.src);
    });
  });

function openPhotoModal(src) {
  modal.style.display = 'flex';
  modalImg.src = src;

  // Прокрутити сторінку до модалки плавно і по центру
  modal.scrollIntoView({ behavior: 'smooth', block: 'center' });
}


  function closePhotoModal() {
    modal.style.display = 'none';
  }

  function changeImage(step) {
    currentIndex += step;
    if (currentIndex < 0) currentIndex = images.length - 1;
    if (currentIndex >= images.length) currentIndex = 0;
    modalImg.src = images[currentIndex].src;
  }

  document.querySelector('#photoModal .close').addEventListener('click', closePhotoModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closePhotoModal();
  });

  window.changeImage = changeImage;
// ...весь код вище без змін
} else {
  // Для мобільних — показуємо перше зображення в окремому блокові з кнопками навігації
  let galleryContainer = document.querySelector('.photo-gallery');
  galleryContainer.innerHTML = `
    <div class="mobile-gallery-wrapper" style="position: relative; max-width: 100%; text-align: center; margin-bottom: 10px;">
      <button id="prevBtn" class="mobile-nav-btn">⟨</button>
      <img id="mobileImage" src="${images[0].src}" style="max-width: 100%; border-radius: 8px; display: inline-block;" />
      <button id="nextBtn" class="mobile-nav-btn">⟩</button>
    </div>
  `;

  const mobileImage = document.getElementById('mobileImage');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  prevBtn.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) currentIndex = images.length - 1;
    mobileImage.src = images[currentIndex].src;
  });

  nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= images.length) currentIndex = 0;
    mobileImage.src = images[currentIndex].src;
  });
}



//бургер-меню і адаптація
const burgerBtn = document.getElementById('burger-btn');
const navMenu = document.getElementById('nav-menu');

burgerBtn.addEventListener('click', () => {
  navMenu.classList.toggle('active');

  // Змінюємо aria-expanded для доступності
  const expanded = burgerBtn.getAttribute('aria-expanded') === 'true';
  burgerBtn.setAttribute('aria-expanded', !expanded);
});

// Закриваємо меню при кліку на посилання (на мобільних)
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 600) {
      navMenu.classList.remove('active');
      burgerBtn.setAttribute('aria-expanded', false);
    }
  });
});
// СВГ біля бургеру