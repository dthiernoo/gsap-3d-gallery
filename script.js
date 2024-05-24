window.onload = function () {
    const gallery = document.querySelector('.gallery');
    const previewImage = document.querySelector('.preview-image img');

    // Event listener to track mouse movement and update gallery rotation based on cursor position
    document.addEventListener("mousemove", function (event) {
        const x = event.clientX;
        const y = event.clientY;

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const percentX = (x - centerX) / centerX;
        const percentY = (y - centerY) / centerY;

        const rotateX = 55 + percentY * 2;
        const rotateY = percentX * 2;

        // Apply transformations to the gallery using GSAP
        gsap.to(gallery, {
            duration: 1.4,
            ease: "power2.out",
            translateX: -320,
            rotate: 358 - 360,
            rotateX: rotateX,
            rotateY: rotateY + 4,
            overwrite: "auto",
        });
    });

    // Create 150 gallery items with images
    for (let i = 0; i < 150; i++) {
        const item = document.createElement('div');
        item.className = "item";

        const img = document.createElement("img");
        img.src = "./assets/img" + ((i % 15) + 1) + ".jpg";

        item.appendChild(img);
        gallery.appendChild(item);
    }

    const items = document.querySelectorAll(".item");
    const numberOfItems = items.length;
    const angleIncrement = 360 / numberOfItems;

    // Set initial rotation for each item and add hover effects
    items.forEach((item, index) => {
        gsap.set(item, {
            rotationY: 90,
            rotationZ: index * angleIncrement - 90,
            transformOrigin: "50% 400px",
        });

        // Change preview image and apply transformation on hover
        item.addEventListener("mouseover", function () {
            const imgInsideItem = item.querySelector("img");
            previewImage.src = imgInsideItem.src;

            gsap.to(item, {
                x: 10,
                y: 10,
                z: 10,
                ease: "power2.out",
                duration: 0.5,
            });
        });

        // Reset preview image and transformation on mouseout
        item.addEventListener("mouseout", function () {
            previewImage.src = "./assets/img2.jpg";
            gsap.to(item, {
                x: 0,
                y: 0,
                z: 0,
                ease: "power2.out",
                duration: 0.5,
            });
        });
    });

    // Create a ScrollTrigger instance to update item rotations based on scroll progress
    ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
        onRefresh: setupRotation,
        onUpdate: (self) => {
            const rotationProgress = self.progress * 360 * 1;
            items.forEach((item, index) => {
                const currentAngle = index * angleIncrement - 90 + rotationProgress;
                gsap.to(item, {
                    rotationZ: currentAngle,
                    duration: 1,
                    ease: "power3.out",
                    overwrite: "auto",
                });
            });
        },
    });
};

// Setup function for ScrollTrigger's onRefresh
function setupRotation() {}

/* SETUP FOR LENIS */
// Class to initialize and manage Lenis for smooth scrolling
class App {
    constructor() {
        this._createLenis();
        this._render();
    }

    // Create a Lenis instance with specified parameters
    _createLenis() {
        this.lenis = new Lenis({
            lerp: 0.1
        });
    }

    // Render method to update Lenis on each animation frame
    _render(time) {
        this.lenis.raf(time);
        requestAnimationFrame(this._render.bind(this));
    }
}

new App();
