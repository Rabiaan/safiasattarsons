// ===============================
// PREMIUM FRUITS CATALOG
// ===============================

const fruits = {
  products: [
    {
      title: "Apple",
      images: ["images/products/fruits/fruit-apple.webp"],
      features: ["Crisp and juicy texture", "Naturally sweet and refreshing", "Rich in fiber and vitamins"],
      details: "Fresh | Export Grade | Hand-picked",
      category: "Temperate Fruits"
    },
    {
      title: "Banana",
      images: ["images/products/fruits/fruit-banana.webp"],
      features: ["Naturally sweet and creamy", "Excellent source of potassium", "Perfect snack on the go"],
      details: "Fresh | Export Grade | Premium Cavendish",
      category: "Tropical Fruits"
    },
    {
      title: "Orange",
      images: ["images/products/fruits/fruit-orange.webp"],
      features: ["Juicy and tangy flavor", "High in Vitamin C", "Perfect for fresh juice"],
      details: "Fresh | Export Grade | Seedless variety",
      category: "Citrus Fruits"
    },
    {
      title: "Mango",
      images: ["images/products/fruits/fruit-mango.webp"],
      features: ["Sweet tropical aroma", "Rich and creamy flesh", "King of fruits"],
      details: "Fresh | Export Grade | Alphonso & Kesar",
      category: "Tropical Fruits"
    },
    {
      title: "Grapes",
      images: ["images/products/fruits/fruit-grapes.webp"],
      features: ["Sweet and seedless", "Crunchy texture", "Red & green varieties available"],
      details: "Fresh | Export Grade | Thompson Seedless",
      category: "Temperate Fruits"
    },
    {
      title: "Pineapple",
      images: ["images/products/fruits/fruit-pineapple.webp"],
      features: ["Sweet and tangy tropical taste", "High in bromelain", "Crown intact for freshness"],
      details: "Fresh | Export Grade | Queen Victoria",
      category: "Tropical Fruits"
    },
    {
      title: "Papaya",
      images: ["images/products/fruits/fruit-papaya.webp"],
      features: ["Sweet and buttery texture", "Rich in papain enzyme", "Excellent for digestion"],
      details: "Fresh | Export Grade | Ripe & ready to eat",
      category: "Tropical Fruits"
    },
    {
      title: "Watermelon",
      images: ["images/products/fruits/fruit-watermelon.webp"],
      features: ["Refreshing and hydrating", "Sweet juicy red flesh", "Seedless variety available"],
      details: "Fresh | Export Grade | Large size",
      category: "Tropical Fruits"
    },
    {
      title: "Muskmelon",
      images: ["images/products/fruits/fruit-muskmelon.webp"],
      features: ["Aromatic sweet fragrance", "Soft juicy orange flesh", "High water content"],
      details: "Fresh | Export Grade | Premium quality",
      category: "Tropical Fruits"
    },
    {
      title: "Strawberry",
      images: ["images/products/fruits/fruit-strawberry.webp"],
      features: ["Bright red and juicy", "Sweet with slight tartness", "Packed with antioxidants"],
      details: "Fresh | Export Grade | Farm fresh",
      category: "Berries"
    },
    {
      title: "Blueberry",
      images: ["images/products/fruits/fruit-blueberry.webp"],
      features: ["Sweet-tart flavor burst", "Superfood rich in antioxidants", "Firm and plump"],
      details: "Fresh | Export Grade | Imported quality",
      category: "Berries"
    },
    {
      title: "Cherry",
      images: ["images/products/fruits/fruit-cherry.webp"],
      features: ["Deep red and glossy", "Sweet with a hint of tart", "Premium large size"],
      details: "Fresh | Export Grade | Rainier & Bing",
      category: "Berries"
    },
    {
      title: "Peach",
      images: ["images/products/fruits/fruit-peach.webp"],
      features: ["Juicy and fragrant", "Velvety skin with sweet flesh", "Perfect summer fruit"],
      details: "Fresh | Export Grade | Yellow flesh",
      category: "Stone Fruits"
    },
    {
      title: "Pear",
      images: ["images/products/fruits/fruit-pear.webp"],
      features: ["Crisp and sweet", "Smooth buttery texture when ripe", "Elegant shape"],
      details: "Fresh | Export Grade | Anjou & Bartlett",
      category: "Temperate Fruits"
    },
    {
      title: "Plum",
      images: ["images/products/fruits/fruit-plum.webp"],
      features: ["Sweet and juicy", "Deep purple skin", "Firm yet tender flesh"],
      details: "Fresh | Export Grade | European variety",
      category: "Stone Fruits"
    },
    {
      "title": "Palm",
      "images": ["images/products/fruits/fruit-palm.webp"],
      "features": ["Sweet and rich flavor", "Golden-brown dates", "Soft and chewy texture"],
      "details": "Fresh | Export Grade | Premium quality",
      "category": "Tropical Fruits"
    },
    {
      title: "Pomegranate",
      images: ["images/products/fruits/fruit-pomegranate.webp"],
      features: ["Ruby red arils bursting with juice", "Sweet-tart flavor", "Rich in antioxidants"],
      details: "Fresh | Export Grade | Large fruits",
      category: "Tropical Fruits"
    },
    {
      title: "Kiwi",
      images: ["images/products/fruits/fruit-kiwi.webp"],
      features: ["Tangy-sweet green flesh", "Edible seeds for crunch", "High in Vitamin C & E"],
      details: "Fresh | Export Grade | Hayward variety",
      category: "Tropical Fruits"
    },
    {
      title: "Guava",
      images: ["images/products/fruits/fruit-guava.webp"],
      features: ["Unique tropical aroma", "Crunchy seeds with sweet flesh", "Extremely high Vitamin C"],
      details: "Fresh | Export Grade | Pink & white flesh",
      category: "Tropical Fruits"
    },
    {
      title: "Dragon Fruit",
      images: ["images/products/fruits/fruit-dragon-fruit.webp"],
      features: ["Mild sweet taste", "Striking pink skin with green scales", "White flesh with black seeds"],
      details: "Fresh | Export Grade | Pitaya",
      category: "Tropical Fruits"
    },
    {
      title: "Coconut",
      images: ["images/products/fruits/fruit-coconut.webp"],
      features: ["Fresh young green coconut", "Sweet coconut water inside", "Tender flesh"],
      details: "Fresh | Export Grade | Drinking variety",
      category: "Tropical Fruits"
    }
  ]
};

// DOM Elements
const grid = document.getElementById("productsGrid");
const filterButtons = document.querySelectorAll('.filter-btn');

// Create Flip Card
function createFlipCard(product) {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.category = product.category.toLowerCase().replace(" ", "-"); // e.g., "tropical-fruits"
    
    const shortDescription = product.features.slice(0, 2).join(". ") + ".";

    card.innerHTML = `
        <div class="content">
            <div class="front">
                <img class="img" src="${product.images[0]}" alt="${product.title}" loading="lazy">
                <div class="img-overlay"></div>
                <div class="front-content">
                    <div class="badge">${product.category}</div>
                    <div class="description">
                        <div class="title">
                            <strong>${product.title}</strong>
                        </div>
                        <p class="card-footer">
                            <i class="fas fa-leaf"></i> ${shortDescription}
                        </p>
                    </div>
                </div>
            </div>
            <div class="back">
              <div class="back-content">
                  <strong>${product.title}</strong>
                  <div class="fruit-details">
                      ${product.features.map(feature => `• ${feature}`).join('<br>')}
                      <br>
                      <em>${product.details}</em>
                  </div>
              </div>
          </div>
        </div>
    `;
    
    return card;
}

// Populate Products
function populateProducts() {
    console.log("Loading fruits from fruits.js...");
    grid.innerHTML = "";

    if (!fruits.products || fruits.products.length === 0) {
        grid.innerHTML = '<div style="text-align: center; padding: 50px; color: #666;">No products found.</div>';
        return;
    }

    fruits.products.forEach(product => {
        const card = createFlipCard(product);
        grid.appendChild(card);
    });

    console.log(`Loaded ${fruits.products.length} fruit cards`);
}

// Filter Products
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.dataset.filter;
        const allCards = document.querySelectorAll('.card');
        
        allCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
            } else {
                const cardCategory = card.dataset.category;
                if (cardCategory.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded – populating fruits...");
    populateProducts();

    // Optional: log count after a tiny delay to confirm rendering
    setTimeout(() => {
        const count = document.querySelectorAll('.card').length;
        console.log(`Displaying ${count} fruit cards on the page`);
    }, 100);
});

// Click to flip (removes conflict with hover)
document.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card) {
        const content = card.querySelector('.content');
        content.style.transform = content.style.transform === 'rotateY(180deg)' 
            ? 'rotateY(0deg)' 
            : 'rotateY(180deg)';
    }
});

console.log(`fruits.js ready – ${fruits.products.length} premium fruits available`);