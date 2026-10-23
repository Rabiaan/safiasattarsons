// vegetables.js - Premium Fresh Vegetables Catalog with Flip Cards

const products = [
  {
    title: "Potato",
    category: "Root Vegetable",
    images: ["/images/products/vegetables/vegetable-potato.webp"],
    features: ["High starch content", "Versatile in cooking", "Long shelf life", "Export quality"],
    details: "Fresh | Export Grade | Firm texture"
  },
  {
    title: "Tomato",
    category: "Fruit Vegetable",
    images: ["/images/products/vegetables/vegetable-tomato.webp"],
    features: ["Rich in lycopene", "Juicy and flavorful", "Vine-ripened", "Perfect for salads & sauces"],
    details: "Fresh | Export Grade | Red ripe"
  },
  {
    title: "Onion",
    category: "Bulb Vegetable",
    images: ["/images/products/vegetables/vegetable-onion.webp"],
    features: ["Strong flavor base", "Long storage life", "Red & white varieties", "Hand-selected"],
    details: "Fresh | Export Grade | Dry outer skin"
  },
  {
    title: "Carrot",
    category: "Root Vegetable",
    images: ["/images/products/vegetables/vegetable-carrot.webp"],
    features: ["Rich in beta-carotene", "Crunchy texture", "Sweet taste", "Uniform size"],
    details: "Fresh | Export Grade | Orange"
  },
  {
    title: "Cabbage",
    category: "Leafy Vegetable",
    images: ["/images/products/vegetables/vegetable-cabbage.webp"],
    features: ["Crisp leaves", "High in vitamin C", "Tight heads", "Ideal for salads & cooking"],
    details: "Fresh | Export Grade | Green"
  },
  {
    title: "Cauliflower",
    category: "Cruciferous",
    images: ["/images/products/vegetables/vegetable-cauliflower.webp"],
    features: ["Pure white florets", "Tender texture", "Rich in antioxidants", "Compact head"],
    details: "Fresh | Export Grade | Snow white"
  },
  {
    title: "Spinach",
    category: "Leafy Vegetable",
    images: ["/images/products/vegetables/vegetable-spinach.webp"],
    features: ["Rich in iron & vitamins", "Tender leaves", "Deep green color", "Washed & packed"],
    details: "Fresh | Export Grade | Baby leaves"
  },
  {
    title: "Broccoli",
    category: "Cruciferous",
    images: ["/images/products/vegetables/vegetable-broccoli.webp"],
    features: ["High in fiber & vitamin C", "Firm florets", "Deep green", "Nutrient-dense"],
    details: "Fresh | Export Grade | Tight buds"
  },
  {
    title: "Peas",
    category: "Pod Vegetable",
    images: ["/images/products/vegetables/vegetable-peas.webp"],
    features: ["Sweet tender pods", "Fresh green peas", "High protein", "Ready to shell"],
    details: "Fresh | Export Grade | Green pods"
  },
  {
    title: "Green Beans",
    category: "Pod Vegetable",
    images: ["/images/products/vegetables/vegetable-green-beans.webp"],
    features: ["Crisp & tender", "Stringless variety", "Bright green", "Uniform length"],
    details: "Fresh | Export Grade | Long pods"
  },
  {
    title: "Cucumber",
    category: "Fruit Vegetable",
    images: ["/images/products/vegetables/vegetable-cucumber.webp"],
    features: ["Refreshing & hydrating", "Crisp texture", "Dark green skin", "Seedless variety"],
    details: "Fresh | Export Grade | Firm"
  },
  {
    title: "Eggplant",
    category: "Fruit Vegetable",
    images: ["/images/products/vegetables/vegetable-eggplant.webp"],
    features: ["Glossy purple skin", "Creamy flesh", "Uniform shape", "Blemish-free"],
    details: "Fresh | Export Grade | Large size"
  },
  {
    title: "Lady Finger (Okra)",
    category: "Pod Vegetable",
    images: ["/images/products/vegetables/vegetable-lady-finger-okra.webp"],
    features: ["Tender pods", "Low slime variety", "Bright green", "Fresh cut ends"],
    details: "Fresh | Export Grade | Young pods"
  },
  {
    title: "Capsicum",
    category: "Fruit Vegetable",
    images: ["/images/products/vegetables/vegetable-capsicum.webp"],
    features: ["Sweet bell peppers", "Red, yellow, green", "Thick walls", "Crunchy"],
    details: "Fresh | Export Grade | Colored"
  },
  {
    title: "Pumpkin",
    category: "Fruit Vegetable",
    images: ["/images/products/vegetables/vegetable-pumpkin.webp"],
    features: ["Sweet orange flesh", "Firm skin", "Rich in vitamin A", "Large size"],
    details: "Fresh | Export Grade | Mature"
  },
  {
    title: "Radish",
    category: "Root Vegetable",
    images: ["/images/products/vegetables/vegetable-radish.webp"],
    features: ["Crisp white flesh", "Spicy flavor", "Red skin", "With leaves"],
    details: "Fresh | Export Grade | Bunched"
  },
  {
    title: "Turnip",
    category: "Root Vegetable",
    images: ["/images/products/vegetables/vegetable-turnip.webp"],
    features: ["Mild sweet taste", "Smooth white skin", "Purple top", "Firm roots"],
    details: "Fresh | Export Grade | Medium size"
  },
  {
    title: "Beetroot",
    category: "Root Vegetable",
    images: ["/images/products/vegetables/vegetable-beetroot.webp"],
    features: ["Deep red color", "Sweet earthy flavor", "Rich in folate", "Round shape"],
    details: "Fresh | Export Grade | With leaves"
  },
  {
    title: "Garlic",
    category: "Bulb Vegetable",
    images: ["/images/products/vegetables/vegetable-garlic.webp"],
    features: ["Strong aroma", "Firm bulbs", "White skin", "Large cloves"],
    details: "Fresh | Export Grade | Dried necks"
  },
  {
    title: "Ginger",
    category: "Root Vegetable",
    images: ["/images/products/vegetables/vegetable-ginger.webp"],
    features: ["Pungent spicy flavor", "Fresh young roots", "Smooth skin", "High juice content"],
    details: "Fresh | Export Grade | Tender"
  }
];

const grid = document.getElementById("productsGrid");

function createFlipCard(product) {
    const card = document.createElement("div");
    card.className = "card";

    const shortDesc = product.features.slice(0, 2).join(". ") + ".";

    card.innerHTML = `
        <div class="content">
            <div class="front">
                <img class="img" src="${product.images[0]}" alt="${product.title}" loading="lazy" 
                     onerror="this.src='https://via.placeholder.com/600x450?text=${encodeURIComponent(product.title)}'">
                <div class="img-overlay"></div>
                <div class="front-content">
                    <div class="badge">${product.category}</div>
                    <div class="description">
                        <div class="title">
                            <strong>${product.title}</strong>
                        </div>
                        <p class="card-footer">
                            <i class="fas fa-leaf"></i> ${shortDesc}
                        </p>
                    </div>
                </div>
            </div>

            <div class="back">
                <div class="back-content">
                    <strong>${product.title}</strong>
                    <div class="rice-details">
                        ${product.features.map(f => `• ${f}`).join('<br>')}
                        <br><br>
                        <em>${product.details}</em>
                    </div>
                </div>
            </div>
        </div>
    `;

    return card;
}

function populateProducts() {
    grid.innerHTML = "";

    if (!products || products.length === 0) {
        grid.innerHTML = '<div style="text-align:center;padding:60px;color:#666;">No vegetables loaded.</div>';
        return;
    }

    products.forEach(product => {
        const card = createFlipCard(product);
        grid.appendChild(card);
    });
}

// Click to flip
document.addEventListener('click', e => {
    const card = e.target.closest('.card');
    if (card) {
        card.classList.toggle('flipped');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', populateProducts);