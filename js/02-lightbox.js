import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);
// ---------------------- select html elements ----------------------
const galleryContainer = document.body.querySelector('.gallery');
// ---------------------- render image gallery ----------------------
const renderImageGallery = (galary) => {
  // make array of divs for gallery elements
  const items = galary.map(({ preview, original, description }) => {
    return `
      <a class="gallery__item" href="${original}">
        <img class="gallery__image lazyload" data-src="${preview}" alt="${description}" />
      </a>`;
  });

  //render the gallery to perant element
  galleryContainer.innerHTML = items.join('');

  //disable the gallery container reload on click
  galleryContainer.addEventListener('click', (e) => {
    e.preventDefault();
  });
};

// creating SimpleLightbox modal
const createModal = () => {
  let gallery = new SimpleLightbox('.gallery a', {
    // change default caption data atributes to 'alt'
    captionsData: 'alt',
    // change default caption delay in milliseconds atributes to 250
    captionDelay: 250,
  });
};

// ---------------------- Initialize the functionality -----------------
// first render the gallery
renderImageGallery(galleryItems);
// then create modal for the gallery
createModal();
