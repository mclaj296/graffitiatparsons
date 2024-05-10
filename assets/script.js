const gallery = document.querySelector('.gallery');
const overlay = document.getElementById('overlay');
const overlayImg = document.getElementById('overlay-img');
const closeBtns = document.querySelectorAll('.close-btn');
const navContainer = document.querySelector('.nav-container');
const overlayNav = document.querySelector('.overlay-nav');
const caption = document.getElementById('caption');

let currentIndex = 0;

// Lazy loader
const images = document.querySelectorAll('.gallery img[data-src]');
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => {
    observer.observe(img);
});

// Shuffle function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Randomizes the order of images in the gallery
const imageContainers = Array.from(document.querySelectorAll('.gallery .image-container'));
shuffle(imageContainers);
gallery.innerHTML = ''; // Clears existing gallery
imageContainers.forEach(container => {
    gallery.appendChild(container);
});

gallery.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        const imageContainer = e.target.parentElement;
        currentIndex = Array.from(imageContainer.parentElement.children).indexOf(imageContainer);
        overlayImg.src = e.target.src;
        navContainer.style.display = 'none'; // Hides nav-container
        overlayNav.style.display = 'flex'; // Shows overlay-nav
        overlay.style.display = 'flex'; // Shows overlay

        // Displays the caption from the corresponding .overlay element
        caption.textContent = imageContainer.querySelector('.overlay').textContent;
    }
});

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        overlay.style.display = 'none'; // Hides overlay
        overlayNav.style.display = 'none'; // Hides overlay-nav
        navContainer.style.display = 'flex'; // Shows nav-container
    });
});

function recenterNavContainer() {
    const navContainer = document.querySelector('.nav-container');
    navContainer.style.display = 'flex';
    navContainer.style.justifyContent = 'center';
}

// Event listener for closing the overlay
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        overlay.style.display = 'none';
        overlayNav.style.display = 'none';
        recenterNavContainer(); // Re-center the nav-container
    });
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });
  