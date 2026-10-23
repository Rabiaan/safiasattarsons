// spices.js - Premium Spices & Herbs Catalog with Flip Cards

const products = [
  {
    title: "Anise",
    category: "Spice",
    images: ["/images/products/spices/spice-anise.webp"],
    features: ["Sweet aromatic flavor", "Used in baking and cooking", "Premium export quality"],
    details: "Whole spice | Hygienically packed"
  },
  {
    title: "Cardamom",
    category: "Spice",
    images: ["/images/products/spices/spice-cardamom.webp"],
    features: ["Strong natural aroma", "Ideal for tea and desserts", "Hand-selected pods"],
    details: "Green cardamom | Export grade"
  },
  {
    title: "Coriander",
    category: "Spice",
    images: ["/images/products/spices/spice-coriander.webp"],
    features: ["Warm nutty flavor", "Essential cooking spice", "Carefully dried seeds"],
    details: "Coriander seeds | Bulk supply"
  },
  {
    title: "Ginger",
    category: "Spice",
    images: ["/images/products/spices/spice-ginger.webp"],
    features: ["Pungent spicy taste", "Used in teas and curries", "Dried root powder"],
    details: "Ground ginger | Premium quality"
  },
  {
    title: "Cumin",
    category: "Spice",
    images: ["/images/products/spices/spice-cumin.webp"],
    features: ["Strong earthy aroma", "Enhances taste", "Used worldwide"],
    details: "Whole cumin seeds"
  },
  {
    title: "Nutmeg",
    category: "Spice",
    images: ["/images/products/spices/spice-nutmeg.webp"],
    features: ["Warm sweet flavor", "Perfect for baking", "Ground or whole"],
    details: "Whole nutmeg | High quality"
  },
  {
    title: "Allspice",
    category: "Spice",
    images: ["/images/products/spices/spice-allspice.webp"],
    features: ["Blend of flavors", "Used in marinades", "Aromatic berries"],
    details: "Ground allspice | Export ready"
  },
  {
    title: "Bay Leaves",
    category: "Herb",
    images: ["/images/products/spices/spice-bay-leaves.webp"],
    features: ["Subtle aromatic flavor", "Enhances soups", "Dried leaves"],
    details: "Whole bay leaves | Premium pack"
  },
  {
    title: "Annatto",
    category: "Spice",
    images: ["/images/products/spices/spice-annatto.webp"],
    features: ["Natural red color", "Mild peppery taste", "Used in coloring"],
    details: "Annatto seeds | Hygienic"
  },
  {
    title: "Basil",
    category: "Herb",
    images: ["/images/products/spices/spice-basil.webp"],
    features: ["Fresh herbal aroma", "Ideal for sauces", "Dried leaves"],
    details: "Dried basil | Export quality"
  },
  {
    title: "Clove",
    category: "Spice",
    images: ["/images/products/spices/spice-clove.webp"],
    features: ["Intense aroma", "Used in tea and curries", "High oil content"],
    details: "Whole cloves | Premium quality"
  },
  {
    title: "Oregano",
    category: "Herb",
    images: ["/images/products/spices/spice-oregano.webp"],
    features: ["Pungent earthy taste", "Perfect for pizzas", "Dried herb"],
    details: "Dried oregano | Bulk supply"
  },
  {
    title: "Celery Salt",
    category: "Spice",
    images: ["/images/products/spices/spice-celery-salt.webp"],
    features: ["Salty celery flavor", "Used in cocktails", "Seasoning blend"],
    details: "Celery salt mix | Hygienic pack"
  },
  {
    title: "Fennel",
    category: "Spice",
    images: ["/images/products/spices/spice-fennel.webp"],
    features: ["Sweet licorice taste", "Digestive aid", "Whole seeds"],
    details: "Fennel seeds | Export grade"
  },
  {
    title: "Parsley",
    category: "Herb",
    images: ["/images/products/spices/spice-parsley.webp"],
    features: ["Mild fresh flavor", "Used as garnish", "Dried leaves"],
    details: "Dried parsley | Premium"
  },
  {
    title: "Black Pepper",
    category: "Spice",
    images: ["/images/products/spices/spice-black-pepper.webp"],
    features: ["Pungent sharp taste", "Universal seasoning", "Whole peppercorns"],
    details: "Black pepper | High quality"
  },
  {
    title: "Ajwain",
    category: "Spice",
    images: ["/images/products/spices/spice-ajwain.webp"],
    features: ["Thyme-like flavor", "Used in breads", "Strong aroma"],
    details: "Ajwain seeds | Bulk"
  },
  {
    title: "Asafoetida",
    category: "Spice",
    images: ["/images/products/spices/spice-asafoetida.webp"],
    features: ["Strong pungent smell", "Used in small amounts", "Digestive spice"],
    details: "Asafoetida powder | Pure"
  },
  {
    title: "Chili Powder",
    category: "Spice",
    images: ["/images/products/spices/spice-chili-powder.webp"],
    features: ["Spicy heat level", "Adds color and flavor", "Ground chilies"],
    details: "Red chili powder | Export"
  },
  {
    title: "Crushed Red Pepper",
    category: "Spice",
    images: ["/images/products/spices/spice-crushed-red-pepper.webp"],
    features: ["Flaky spicy texture", "Used as topping", "Adjustable heat"],
    details: "Crushed flakes | Premium"
  },
  {
    title: "Curry Powder",
    category: "Spice Blend",
    images: ["/images/products/spices/spice-curry-powder.webp"],
    features: ["Blend of spices", "For curries and stews", "Aromatic mix"],
    details: "Curry powder blend | Hygienic"
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
                            <i class="fas fa-pepper-hot"></i> ${shortDesc}
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
        grid.innerHTML = '<div style="text-align:center;padding:60px;color:#666;">No spices loaded.</div>';
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
        if (filtered.length === 0) {
            grid.innerHTML = '<div style="text-align:center;padding:60px;color:#666;">No spices in this category.</div>';
            return;
        }

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