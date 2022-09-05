import { galleryItems } from './gallery-items.js';

// Change code below this line

// ---------------------- select html elements ----------------------
const galleryContainer = document.body.querySelector('.gallery');
// ---------------------- render image gallery ----------------------
const renderImageGallery = (galary) => {
  // make array of divs for gallery elements
  const items = galary.map(({ preview, original, description }) => {
    return `<div class="gallery__item">
      <a class="gallery__link" href="${original}">
      <img
        class="gallery__image lazyload"
        data-src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </div>`;
  });

  //render the gallery to perant element
  galleryContainer.innerHTML = items.join('');
};

// ---------------------- Add event handlers ----------------------

// add event handler to popup modal full image
galleryContainer.onclick = (e) => {
  e.preventDefault();

  if (!e.target.classList.contains('gallery__image')) return;

  // get full image link
  const currentFullImagePath = e.target.dataset.source;

  const modalImageBox = basicLightbox.create(
    `
      <img width="800" height="600" src="${currentFullImagePath}">
    `,
    {
      onShow: () => window.addEventListener('keyup', escKey),
      onClose: () => window.removeEventListener('keyup', escKey),
    }
  );

  const escKey = (e) => {
    if (e.key === 'Escape') modalImageBox.close();
  };

  modalImageBox.show();
};

// ---------------------- Initialize the functionality -----------------
renderImageGallery(galleryItems);
