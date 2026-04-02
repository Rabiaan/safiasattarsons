document.addEventListener("DOMContentLoaded", function () {
    const productBoxes = document.querySelectorAll('.product_box_main');
  
    function checkVisibility() {
      const windowHeight = window.innerHeight;
      
      productBoxes.forEach((box, index) => {
        const boxTop = box.getBoundingClientRect().top;
        // Check if the box is in view
        if (boxTop < windowHeight * 0.75) {
          // Add 'visible' class and apply staggered animation delay
          box.classList.add('visible');
          box.style.animationDelay = `${index * 0}s`; // Stagger the animation delay
        }
      });
    }
  
    // Check visibility when the page is scrolled
    window.addEventListener('scroll', checkVisibility);
  
    // Initial check in case the product boxes are already in the viewport
    checkVisibility();
});

// about-animation.js


document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach((element) => {
        observer.observe(element);
    });

    // Add column-wise delay for images
    const grid = document.querySelector('.masonry-grid');
    if (grid) {
        const columns = ['col1', 'col2', 'col3'];
        columns.forEach((colClass, colIndex) => {
            const colItems = grid.querySelectorAll(`.${colClass}`);
            colItems.forEach((item, itemIndex) => {
                item.style.transitionDelay = `${colIndex * 0.3}s`; // Delay based on column index
            });
        });
    }
});

// services animation
// services-animation.js

document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in-up');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach((element) => {
        observer.observe(element);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const fadeLeftElements = document.querySelectorAll('.fade-in-left');
    const fadeUpElements = document.querySelectorAll('.fade-in-up');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Removed: observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeLeftElements.forEach((element) => {
        observer.observe(element);
    });

    fadeUpElements.forEach((element) => {
        observer.observe(element);
    });
});

