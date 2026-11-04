const images = [
    {
        src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
        alt: "Mountain landscape",
        category: "Mountains"
    },
    {
        src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800",
        alt: "Mountain lake",
        category: "Mountains"
    },
    {
        src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
        alt: "Lake and mountains",
        category: "Landscapes"
    },
    {
        src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
        alt: "Green forest",
        category: "Forest"
    },
    {
        src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800",
        alt: "Ocean waves",
        category: "Ocean"
    },
    {
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
        alt: "Beautiful beach",
        category: "Ocean"
    }
];

const gallery = document.getElementById("gallery");

let filteredImages = [...images];
let currentIndex = 0;

// Create filter buttons
const filterBar = document.createElement("div");
filterBar.className = "filter-bar";

const categories = [
    "All", "Mountains", "Forest", "Ocean", "Landscapes"
];

categories.forEach(category => {
    const button = document.createElement("button");
    button.textContent = category;
    button.className = "filter-btn";

    if (category === "All") {
        button.classList.add("active");
    }

    button.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn")
            .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        filteredImages = category === "All"
            ? [...images]
            : images.filter(img => img.category === category);

        renderGallery();
    });

    filterBar.appendChild(button);
});

gallery.before(filterBar);

// Display filtered images
function renderGallery() {
    gallery.innerHTML = "";

    filteredImages.forEach((image, index) => {
        const img = document.createElement("img");

        img.src = image.src;
        img.alt = image.alt;
        img.loading = "lazy";

        img.addEventListener("click", () => {
            openLightbox(index);
        });

        gallery.appendChild(img);
    });
}

renderGallery();

// Create lightbox
const lightbox = document.createElement("div");
lightbox.className = "lightbox";

lightbox.innerHTML = `
    <button class="close">&times;</button>
    <button class="prev">&#10094;</button>
    <img class="lightbox-img" src="" alt="">
    <button class="next">&#10095;</button>
`;

document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector(".lightbox-img");

function openLightbox(index) {
    currentIndex = index;
    showImage();
    lightbox.classList.add("active");
}

function showImage() {
    lightboxImg.src = filteredImages[currentIndex].src;
    lightboxImg.alt = filteredImages[currentIndex].alt;
}

function closeLightbox() {
    lightbox.classList.remove("active");
}

function nextImage() {
    currentIndex = (currentIndex + 1) % filteredImages.length;
    showImage();
}

function previousImage() {
    currentIndex =
        (currentIndex - 1 + filteredImages.length) %
        filteredImages.length;

    showImage();
}

lightbox.querySelector(".close")
    .addEventListener("click", closeLightbox);

lightbox.querySelector(".next")
    .addEventListener("click", nextImage);

lightbox.querySelector(".prev")
    .addEventListener("click", previousImage);

document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("active")) return;

    if (event.key === "ArrowRight") nextImage();
    if (event.key === "ArrowLeft") previousImage();
    if (event.key === "Escape") closeLightbox();
});