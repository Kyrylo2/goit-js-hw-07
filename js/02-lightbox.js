import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);
// ---------------------- select html elements ----------------------
const galleryContainer = document.body.querySelector('.gallery');
// ---------------------- render image gallery ----------------------
const renderImageGallery = (galary, browserChecker) => {
  // make array of divs for gallery elements
  const items = galary.map(({ preview, original, description }) => {
    return `
      <a class="gallery__item" href="${original}">
        <img class="gallery__image ${
          browserChecker === 'true' ? ` lazyload" data-` : `" loading="lazy" `
        }src="${preview}" alt="${description}" />
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

//checkBrowser and return true if browser is supported and false plus create lazysize script in body otherwise
const checkBrowser = () => {
  if ('loading' in HTMLImageElement.prototype) {
    return true;
  } else {
    const script = document.createElement('script');
    script.src =
      'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    script.integrity =
      'sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==';
    script.crossorigin = 'anonymous';
    script.referrerpolicy = 'no-referrer';

    document.body.appendChild(script);
    return false;
  }
};

// ---------------------- Initialize the functionality -----------------
// first render the gallery
renderImageGallery(galleryItems, checkBrowser());
// then create modal for the gallery
createModal();
