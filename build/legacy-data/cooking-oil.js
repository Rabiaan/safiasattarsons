// cooking-oil.js - Premium Cooking Oils Catalog with Flip Cards

const products = [
    {
        title: "Palm Oil",
        category: "Vegetable Oil",
        features: ["High smoke point", "Neutral flavor", "Rich in vitamin E", "Common in tropical cuisines"],
        details: "Type: Vegetable | Smoke Point: High",
        images: ["../images/products/oil/oil-palm-oil.webp"]
    },
    {
        title: "Soybean Oil",
        category: "Vegetable Oil",
        features: ["High in polyunsaturated fats", "Neutral taste", "Good for heart health", "Common in processed foods"],
        details: "Type: Vegetable | Smoke Point: Medium-High",
        images: ["../images/products/oil/oil-soybean-oil.webp"]
    },
    {
        title: "Vegetable Oil (Blended)",
        category: "Vegetable Oil",
        features: ["Versatile use", "Neutral flavor", "Affordable", "Suitable for high-heat cooking"],
        details: "Type: Blended | Smoke Point: Medium",
        images: ["../images/products/oil/oil-vegetable-oil-blended.webp"]
    },
    {
        title: "Sunflower Oil",
        category: "Seed Oil",
        features: ["High in vitamin E", "Light taste", "Heart-healthy", "Good for skin"],
        details: "Type: Seed | Smoke Point: High",
        images: ["../images/products/oil/oil-sunflower-oil.webp"]
    },
    {
        title: "Canola Oil",
        category: "Seed Oil",
        features: ["Low saturated fat", "Neutral flavor", "High smoke point", "Omega-3 rich"],
        details: "Type: Vegetable | Smoke Point: High",
        images: ["../images/products/oil/oil-canola-oil.webp"]
    },
    {
        title: "Corn Oil",
        category: "Grain Oil",
        features: ["High smoke point", "Mild flavor", "Rich in vitamin E", "Good for baking"],
        details: "Type: Grain | Smoke Point: High",
        images: ["../images/products/oil/oil-corn-oil.webp"]
    },
    {
        title: "Peanut Oil",
        category: "Nut Oil",
        features: ["Nutty flavor", "High smoke point", "Rich in monounsaturated fats", "Long shelf life"],
        details: "Type: Nut | Smoke Point: High",
        images: ["../images/products/oil/oil-peanut-oil.webp"]
    },
    {
        title: "Cottonseed Oil",
        category: "Vegetable Oil",
        features: ["Neutral taste", "High smoke point", "Economical", "Stable for deep frying"],
        details: "Type: Vegetable | Smoke Point: High",
        images: ["../images/products/oil/oil-cottonseed-oil.webp"]
    },
    {
        title: "Olive Oil",
        category: "Fruit Oil",
        features: ["Rich in antioxidants", "Healthy fats", "Distinct flavor", "Anti-inflammatory"],
        details: "Type: Fruit | Smoke Point: Medium",
        images: ["../images/products/oil/oil-olive-oil.webp"]
    },
    {
        title: "Coconut Oil",
        category: "Tropical Oil",
        features: ["High in saturated fats", "Sweet aroma", "Antibacterial properties", "Versatile in cosmetics"],
        details: "Type: Tropical | Smoke Point: Medium",
        images: ["../images/products/oil/oil-coconut-oil.webp"]
    },
    {
        title: "Rice Bran Oil",
        category: "Grain Oil",
        features: ["Mild flavor", "High smoke point", "Rich in antioxidants", "Heart-healthy"],
        details: "Type: Grain | Smoke Point: High",
        images: ["../images/products/oil/oil-rice-bran-oil.webp"]
    },
    {
        title: "Sesame Oil",
        category: "Seed Oil",
        features: ["Strong aroma", "Antioxidant-rich", "High smoke point (toasted version lower)", "Used in dressings"],
        details: "Type: Seed | Smoke Point: Medium-High",
        images: ["../images/products/oil/oil-sesame-oil.webp"]
    },
    {
        title: "Safflower Oil",
        category: "Seed Oil",
        features: ["Neutral taste", "High in polyunsaturated fats", "Antioxidant properties", "Good for frying"],
        details: "Type: Seed | Smoke Point: High",
        images: ["../images/products/oil/oil-safflower-oil.webp"]
    },
    {
        title: "Grapeseed Oil",
        category: "Fruit Oil",
        features: ["Neutral taste", "High in polyunsaturated fats", "Antioxidant properties", "Good for frying"],
        details: "Type: Fruit | Smoke Point: High",
        images: ["../images/products/oil/oil-grapeseed-oil.webp"]
    },
    {
        title: "Avocado Oil",
        category: "Fruit Oil",
        features: ["High smoke point", "Rich in oleic acid", "Good for skin", "Versatile use"],
        details: "Type: Fruit | Smoke Point: Very High",
        images: ["../images/products/oil/oil-avocado-oil.webp"]
    },
    {
        title: "Flaxseed Oil",
        category: "Seed Oil",
        features: ["Rich in ALA omega-3", "Nutty flavor", "Health supplement", "Cold use only"],
        details: "Type: Seed | Smoke Point: Low",
        images: ["../images/products/oil/oil-flaxseed-oil.webp"]
    },
    {
        title: "Walnut Oil",
        category: "Nut Oil",
        features: ["Rich nutty taste", "High in omega-3", "Antioxidant-rich", "Cold-pressed preferred"],
        details: "Type: Nut | Smoke Point: Low-Medium",
        images: ["../images/products/oil/oil-walnut-oil.webp"]
    },
    {
        title: "Almond Oil",
        category: "Nut Oil",
        features: ["Vitamin E rich", "Mild flavor", "Moisturizing", "High smoke point"],
        details: "Type: Nut | Smoke Point: Medium-High",
        images: ["../images/products/oil/oil-almond-oil.webp"]
    },
    {
        title: "Hazelnut Oil",
        category: "Nut Oil",
        features: ["Intense nutty taste", "High in monounsaturated fats", "Antioxidant properties", "Gourmet use"],
        details: "Type: Nut | Smoke Point: Medium",
        images: ["../images/products/oil/oil-hazelnut-oil.webp"]
    },
    {
        title: "Hemp Oil",
        category: "Seed Oil",
        features: ["Balanced omega-3/6", "Nutty taste", "Health supplement", "Cold use recommended"],
        details: "Type: Seed | Smoke Point: Low",
        images: ["../images/products/oil/oil-hemp-oil.webp"]
    },
    {
        title: "Pure Butter",
        category: "Dairy Fat",
        features: ["Creamy natural taste", "Rich in vitamin A & D", "Perfect for baking & cooking", "Premium farm fresh"],
        details: "Type: Dairy | Smoke Point: Medium",
        images: ["../images/products/oil/oil-pure-butter.webp"]
    },
    {
        title: "Premium Ghee",
        category: "Clarified Butter",
        features: ["Traditional slow cooked", "Lactose free", "High smoke point", "Ideal for frying & desi cuisine"],
        details: "Type: Dairy | Smoke Point: High",
        images: ["../images/products/oil/oil-premium-ghee.webp"]
    }

];

const grid = document.getElementById("productsGrid");
const filterButtons = document.querySelectorAll('.filter-btn');

function createFlipCard(product) {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.category = product.category.toLowerCase().replace(" ", "-");

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
                            <i class="fas fa-burn"></i> ${shortDesc}
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

    if (!products.length) {
        grid.innerHTML = '<div style="text-align:center;padding:60px;color:#666;">No oils loaded.</div>';
        return;
    }

    products.forEach(product => {
        grid.appendChild(createFlipCard(product));
    });
}

// Filter Logic
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        const filtered = filter === 'all'
            ? products
            : products.filter(p => p.category.toLowerCase().includes(filter));

        grid.innerHTML = "";
        filtered.forEach(product => grid.appendChild(createFlipCard(product)));
    });
});

// Click to flip
document.addEventListener('click', e => {
    const card = e.target.closest('.card');
    if (card) card.classList.toggle('flipped');
});

// Initialize
document.addEventListener('DOMContentLoaded', populateProducts);