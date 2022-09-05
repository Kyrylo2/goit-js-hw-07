import { galleryItems } from './gallery-items.js';

// Change code below this line

// ---------------------- select html elements ----------------------
const galleryContainer = document.body.querySelector('.gallery');
// ---------------------- render image gallery ----------------------
const renderImageGallery = (galary, browserChecker) => {
  // make array of divs for gallery elements
  const items = galary.map(({ preview, original, description }) => {
    return `<div class="gallery__item">
      <a class="gallery__link" href="${original}">
      <img
        class="gallery__image ${
          browserChecker === 'true' ? ` lazyload" data-` : `" loading="lazy" `
        }src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </div>`;
  });

  //render the gallery to perant element
  galleryContainer.innerHTML = items.join('');
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
renderImageGallery(galleryItems, checkBrowser());
