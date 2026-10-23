// rice.js - Premium Rice Catalog with Flip Cards

const riceData = {
    products: [
        {
            title: "Super Basmati",
            category: "Aromatic Rice",
            origin: "pakistani",
            description: "Premium long-grain rice, grown mainly in Punjab and Sindh; famous for fragrance and length.",
            features: [
                "Premium long-grain",
                "Grown in Punjab and Sindh",
                "Famous for fragrance",
                "Excellent length"
            ],
            details: "Origin: Pakistan, Type: Aromatic, Grain Length: Long",
            images: ['../images/products/rice/rice-super-basmati.webp'], 
        },
        {
            title: "1121 Kainat Basmati",
            category: "Aromatic Rice",
            origin: "pakistani",
            description: "Extra-long grain basmati, very high elongation, major export variety.",
            features: [
                "Extra-long grain",
                "High elongation",
                "Major export variety",
                "Aromatic flavor"
            ],
            details: "Origin: Pakistan, Type: Aromatic, Grain Length: Extra Long",
            images: ['../images/products/rice/rice-super-basmati.webp'],
        },
        {
            title: "PK-385 Basmati",
            category: "Aromatic Rice",
            origin: "pakistani",
            description: "Traditional aromatic long-grain basmati, known for taste and texture.",
            features: [
                "Traditional variety",
                "Aromatic long-grain",
                "Excellent taste",
                "Superior texture"
            ],
            details: "Origin: Pakistan, Type: Aromatic, Grain Length: Long",
            images: ['../images/products/rice/rice-pk-385-basmati.webp'],
        },
        {
            title: "D-98 Sindhi Basmati",
            category: "Aromatic Rice",
            origin: "pakistani",
            description: "Locally called “D-98”; fragrant variety mainly cultivated in Sindh.",
            features: [
                "Fragrant variety",
                "Cultivated in Sindh",
                "Local favorite",
                "High quality"
            ],
            details: "Origin: Pakistan, Type: Aromatic, Grain Length: Medium",
            images: ['../images/products/rice/rice-d-98-sindhi-basmati.webp'],
        },
        {
            title: "Basmati 370",
            category: "Aromatic Rice",
            origin: "pakistani",
            description: "One of the oldest Basmati cultivars; fine aroma and slender grain.",
            features: [
                "Oldest cultivar",
                "Fine aroma",
                "Slender grain",
                "Traditional flavor"
            ],
            details: "Origin: Pakistan, Type: Aromatic, Grain Length: Slender",
            images: ['../images/products/rice/rice-basmati-370.webp'],
        },
        {
            title: "Basmati 2000",
            category: "Aromatic Rice",
            origin: "pakistani",
            description: "Improved aromatic basmati line with higher yield and longer grain.",
            features: [
                "Improved line",
                "Higher yield",
                "Longer grain",
                "Aromatic"
            ],
            details: "Origin: Pakistan, Type: Aromatic, Grain Length: Long",
            images: ['../images/products/rice/rice-basmati-2000.webp'],
        },
        {
            title: "Basmati 515",
            category: "Aromatic Rice",
            origin: "pakistani",
            description: "Modern high-yielding aromatic basmati with good cooking quality.",
            features: [
                "Modern variety",
                "High-yielding",
                "Good cooking quality",
                "Aromatic"
            ],
            details: "Origin: Pakistan, Type: Aromatic, Grain Length: Medium",
            images: ['../images/products/rice/rice-basmati-515.webp'],
        },
        {
            title: "PK-198 Basmati",
            category: "Aromatic Rice",
            origin: "pakistani",
            description: "Another fine-grained aromatic type with moderate yield.",
            features: [
                "Fine-grained",
                "Aromatic type",
                "Moderate yield",
                "High quality"
            ],
            details: "Origin: Pakistan, Type: Aromatic, Grain Length: Fine",
            images: ['../images/products/rice/rice-pk-198-basmati.webp'],
        },
        {
            title: "Super Kernel Basmati",
            category: "Aromatic Rice",
            origin: "pakistani",
            description: "Very long and slender grain with rich aroma; top export quality.",
            features: [
                "Very long grain",
                "Slender grain",
                "Rich aroma",
                "Top export quality"
            ],
            details: "Origin: Pakistan, Type: Aromatic, Grain Length: Very Long",
            images: ['../images/products/rice/rice-super-kernel-basmati.webp'],
        },
        {
            title: "Shahen Basmati",
            category: "Aromatic Rice",
            origin: "pakistani",
            description: "Fragrant variety grown in Punjab; fine texture and taste.",
            features: [
                "Fragrant variety",
                "Grown in Punjab",
                "Fine texture",
                "Excellent taste"
            ],
            details: "Origin: Pakistan, Type: Aromatic, Grain Length: Medium",
            images: ['../images/products/rice/rice-shahen-basmati.webp'],
        },
        {
            title: "1509 Basmati",
            category: "Aromatic Rice",
            origin: "pakistani",
            description: "Extra-long aromatic grain, early-maturing hybrid of basmati.",
            features: [
                "Extra-long grain",
                "Aromatic",
                "Early-maturing",
                "Hybrid variety"
            ],
            details: "Origin: Pakistan, Type: Aromatic, Grain Length: Extra Long",
            images: ['../images/products/rice/rice-1509-basmati.webp'],
        },
        {
            title: "Kainat Basmati",
            category: "Aromatic Rice",
            origin: "pakistani",
            description: "Same as 1121 variant; extremely long grain, widely exported.",
            features: [
                "Extremely long grain",
                "Widely exported",
                "Similar to 1121",
                "High quality"
            ],
            details: "Origin: Pakistan, Type: Aromatic, Grain Length: Extremely Long",
            images: ['../images/products/rice/rice-kainat-basmati.webp'],
        },
        {
            title: "Malika Basmati",
            category: "Aromatic Rice",
            origin: "pakistani",
            description: "Premium quality basmati introduced for export segment.",
            features: [
                "Premium quality",
                "For export segment",
                "Aromatic",
                "High standard"
            ],
            details: "Origin: Pakistan, Type: Aromatic, Grain Length: Long",
            images: ['../images/products/rice/rice-malika-basmati.webp'],
        },
        {
            title: "Mughal Basmati",
            category: "Aromatic Rice",
            origin: "pakistani",
            description: "Long, aromatic, slender grain—developed for domestic premium markets.",
            features: [
                "Long grain",
                "Aromatic",
                "Slender grain",
                "For premium markets"
            ],
            details: "Origin: Pakistan, Type: Aromatic, Grain Length: Long",
            images: ['../images/products/rice/rice-mughal-basmati.webp'],
        
        },
        {
            title: "Sundar Basmati",
            category: "Aromatic Rice",
            origin: "pakistani",
            description: "Released by PARC; aromatic, high yield, and adaptable.",
            features: [
                "Released by PARC",
                "Aromatic",
                "High yield",
                "Adaptable"
            ],
            details: "Origin: Pakistan, Type: Aromatic, Grain Length: Medium",
            images: ['../images/products/rice/rice-sundar-basmati.webp'],
        },
        {
            title: "Punjab Basmati",
            category: "Aromatic Rice",
            origin: "pakistani",
            description: "Officially released cultivar with superior aroma and cooking performance.",
            features: [
                "Officially released",
                "Superior aroma",
                "Excellent cooking performance",
                "High quality"
            ],
            details: "Origin: Pakistan, Type: Aromatic, Grain Length: Long",
            images: ['../images/products/rice/rice-punjab-basmati.webp'],
        },
        {
            title: "KSK-133",
            category: "Non-Basmati Rice",
            origin: "pakistani",
            description: "Medium-grain coarse variety grown widely in Punjab.",
            features: [
                "Medium-grain",
                "Coarse variety",
                "Grown in Punjab",
                "High yield"
            ],
            details: "Origin: Pakistan, Type: Non-Basmati, Grain Length: Medium",
            images: ['../images/products/rice/rice-ksk-133.webp'],
        },
        {
            title: "KSK-282",
            category: "Non-Basmati Rice",
            origin: "pakistani",
            description: "Coarse, high-yielding variety popular in Sindh and Punjab.",
            features: [
                "Coarse variety",
                "High-yielding",
                "Popular in Sindh and Punjab",
                "Durable"
            ],
            details: "Origin: Pakistan, Type: Non-Basmati, Grain Length: Medium",
            images: ['../images/products/rice/rice-ksk-282.webp'],
        },
        {
            title: "KSK-434",
            category: "Non-Basmati Rice",
            origin: "pakistani",
            description: "Improved medium-grain line used for domestic consumption.",
            features: [
                "Improved variety",
                "Medium-grain",
                "For domestic use",
                "Good quality"
            ],
            details: "Origin: Pakistan, Type: Non-Basmati, Grain Length: Medium",
            images: ['../images/products/rice/rice-ksk-434.webp'],
        },
        {
            title: "IRRI-6",
            category: "Non-Basmati Rice",
            origin: "pakistani",
            description: "High-yield, long/medium grain; major export to Africa and the Middle East.",
            features: [
                "High-yield",
                "Long/medium grain",
                "Major export",
                "To Africa and Middle East"
            ],
            details: "Origin: Pakistan, Type: Non-Basmati, Grain Length: Long/Medium",
            images: ['../images/products/rice/rice-irri-6.webp'],
        },
        {
            title: "IRRI-9",
            category: "Non-Basmati Rice",
            origin: "pakistani",
            description: "Non-aromatic long-grain, used in bulk exports and local consumption.",
            features: [
                "Non-aromatic",
                "Long-grain",
                "Bulk exports",
                "Local consumption"
            ],
            details: "Origin: Pakistan, Type: Non-Basmati, Grain Length: Long",
            images: ['../images/products/rice/rice-irri-9.webp'],
        },
        {
            title: "IR-8",
            category: "Non-Basmati Rice",
            origin: "pakistani",
            description: "Earlier IRRI variety; grown for yield, less aroma.",
            features: [
                "Earlier variety",
                "Grown for yield",
                "Less aroma",
                "High production"
            ],
            details: "Origin: Pakistan, Type: Non-Basmati, Grain Length: Medium",
            images: ['../images/products/rice/rice-ir-8.webp'],
        },
        {
            title: "KS-282",
            category: "Non-Basmati Rice",
            origin: "pakistani",
            description: "Popular coarse variety for local markets.",
            features: [
                "Popular coarse variety",
                "For local markets",
                "Durable",
                "Affordable"
            ],
            details: "Origin: Pakistan, Type: Non-Basmati, Grain Length: Medium",
            images: ['../images/products/rice/rice-ks-282.webp'],
        },
        {
            title: "Super Fine Long Grain",
            category: "Non-Basmati Rice",
            origin: "pakistani",
            description: "Refined long-grain rice for export; slightly slenderer than IRRI-6.",
            features: [
                "Refined long-grain",
                "For export",
                "Slenderer than IRRI-6",
                "High quality"
            ],
            details: "Origin: Pakistan, Type: Non-Basmati, Grain Length: Long",
            images: ['../images/products/rice/rice-super-fine-long-grain.webp'],
        },
        {
            title: "PK-386",
            category: "Non-Basmati Rice",
            origin: "pakistani",
            description: "Long-grain white rice with good yield and export value.",
            features: [
                "Long-grain white",
                "Good yield",
                "Export value",
                "Reliable"
            ],
            details: "Origin: Pakistan, Type: Non-Basmati, Grain Length: Long",
            images: ['../images/products/rice/rice-pk-386.webp'],
        },
        {
            title: "PK-386 Steam",
            category: "Non-Basmati Rice",
            origin: "pakistani",
            description: "Parboiled/steam version of PK-386 for export.",
            features: [
                "Parboiled/steam",
                "Version of PK-386",
                "For export",
                "Enhanced nutrition"
            ],
            details: "Origin: Pakistan, Type: Non-Basmati, Grain Length: Long",
            images: ['../images/products/rice/rice-pk-386-steam.webp'],
        },
        {
            title: "PK-386 Parboiled",
            category: "Non-Basmati Rice",
            origin: "pakistani",
            description: "Yellowish parboiled variant used for bulk export.",
            features: [
                "Yellowish parboiled",
                "Used for bulk export",
                "Durable",
                "Nutritious"
            ],
            details: "Origin: Pakistan, Type: Non-Basmati, Grain Length: Long",
            images: ['../images/products/rice/rice-pk-386-parboiled.webp'],
        },
        {
            title: "KS-95",
            category: "Non-Basmati Rice",
            origin: "pakistani",
            description: "Medium-grain improved variety used locally.",
            features: [
                "Medium-grain",
                "Improved variety",
                "Used locally",
                "Reliable yield"
            ],
            details: "Origin: Pakistan, Type: Non-Basmati, Grain Length: Medium",
            images: ['../images/products/rice/rice-ks-95.webp'],
        },
        {
            title: "DR-82",
            category: "Non-Basmati Rice",
            origin: "pakistani",
            description: "Drought-resistant variety cultivated in Sindh delta.",
            features: [
                "Drought-resistant",
                "Cultivated in Sindh delta",
                "Resilient",
                "High adaptability"
            ],
            details: "Origin: Pakistan, Type: Non-Basmati, Grain Length: Medium",
            images: ['../images/products/rice/rice-dr-82.webp'],
        },
        {
            title: "Shandar Basmati",
            category: "Aromatic Rice",
            origin: "pakistani",
            description: "Newer aromatic variety marketed for premium domestic use.",
            features: [
                "Newer variety",
                "Aromatic",
                "Premium domestic use",
                "High quality"
            ],
            details: "Origin: Pakistan, Type: Aromatic, Grain Length: Long",
            images: ['../images/products/rice/rice-shandar-basmati.webp'],
        },
        {
            title: "1121 Basmati Rice (Golden Sella)",
            category: "Basmati Rice",
            origin: "indian",
            description: "Top-grade 1121 basmati known for extra-long grains and golden parboiled texture.",
            features: ["Golden Sella", "Extra-long grain", "Premium fragrance", "High elongation"],
            details: "Type: Golden Sella, Grain Length: Extra Long",
            images: ["./images/products/rice/rice-1121-basmati-rice-golden-sella.webp"],
        },
        {
            title: "Taraori ",
            category: "Basmati Rice",
            origin: "indian",
            description: "Premium 1121 Creamy Sella rice with long grains and natural aroma.",
            features: ["Creamy Sella", "Soft texture", "Aromatic", "High export quality"],
            details: "Type: Creamy Sella, Grain Length: Extra Long",
            images: ["../images/products/rice/rice-taraori.webp"],
        },
        {
            title: "Dehardun",
            category: "Basmati Rice",
            origin: "indian",
            description: "Premium steamed 1121 basmati with superior fragrance and long grain.",
            features: ["Steam processed", "Aromatic", "Non-sticky", "Extra-long grain"],
            details: "Type: Steam Basmati, Grain Length: Extra Long",
            images: ["../images/products/rice/rice-dehardun.webp"],
        },

        // PUSA 1509
        {
            title: "IR-64 Basmati",
            category: "Basmati Rice",
            origin: "indian",
            description: "Fast-cooking 1509 Golden Sella known for excellent elongation.",
            features: ["Golden Sella", "Fast cooking", "Long grain", "High yield variety"],
            details: "Type: Golden Sella, Grain Length: Long",
            images: ["images/products/rice/rice-ir-64-basmati.webp"],
        },
        {
            title: "IR-36 Basmati",
            category: "Basmati Rice",
            origin: "indian",
            description: "Popular Creamy Sella version of 1509 with soft grain and rich aroma.",
            features: ["Creamy Sella", "Soft texture", "Aromatic", "Long grain"],
            details: "Type: Creamy Sella, Grain Length: Long",
            images: ["images/products/rice/rice-ir-36-basmati.webp"],
        },
        {
            title: "Pusa Basmati 1509 (Steam)",
            category: "Basmati Rice",
            origin: "indian",
            description: "Steamed 1509 basmati with premium quality and high elongation.",
            features: ["Steam processed", "Long grain", "Aromatic", "Non-sticky"],
            details: "Type: Steam, Grain Length: Long",
            images: ["images/products/rice/rice-pusa-basmati-1509-steam.webp"],
        },

        // PUSA 1718
        {
            title: "Swana MTU 7029",
            category: "Basmati Rice",
            origin: "indian",
            description: "High-quality Golden Sella 1718 with extra-long grains.",
            features: ["Golden Sella", "Long grain", "Strong aroma", "High quality"],
            details: "Type: Golden Sella, Grain Length: Long",
            images: ["images/products/rice/rice-swana-mtu-7029.webp"],
        },
        {
            title: "Ponni Rice",
            category: "Basmati Rice",
            origin: "indian",
            description: "Creamy Sella 1718 basmati with soft grain and pleasant aroma.",
            features: ["Creamy Sella", "Aromatic", "Long grain", "Soft cooked texture"],
            details: "Type: Creamy Sella, Grain Length: Long",
            images: ["images/products/rice/rice-ponni-rice.webp"],
        },
        {
            title: "Pusa Basmati 1718 (Steam)",
            category: "Basmati Rice",
            origin: "indian",
            description: "Premium steamed 1718 variety with high elongation and non-stick texture.",
            features: ["Steam processed", "Long grains", "Aromatic", "Non-sticky"],
            details: "Type: Steam, Grain Length: Long",
            images: ["images/products/rice/rice-pusa-basmati-1718-steam.webp"],
        },

        // GENERAL BASMATI TYPES
        {
            title: "Pusa Bansmati (Steam)",
            category: "Basmati Rice",
            origin: "indian",
            description: "Parboiled basmati rice with firm texture and excellent grain stability.",
            features: ["Parboiled", "Non-sticky", "Firm texture", "Long grain"],
            details: "Type: Parboiled, Grain Length: Long",
            images: ["images/products/rice/rice-pusa-bansmati-steam.webp"],
        },
        {
            title: "Sella Basmati",
            category: "Basmati Rice",
            origin: "indian",
            description: "Classic traditional basmati with rich aroma and medium-long grains.",
            features: ["Traditional", "Aromatic", "Medium-long grain", "Classic taste"],
            details: "Type: Traditional, Grain Length: Medium-long",
            images: ["images/products/rice/rice-sella-basmati.webp"],
        },

        {
            title: "Sona Masuri",
            category: "Basmati Rice",
            origin: "indian",
            description: "Aromatic basmati variety from Haryana with soft cooked texture.",
            features: ["Aromatic", "Soft texture", "Medium-long grain"],
            details: "Region: Haryana, Type: Aromatic",
            images: ["images/products/rice/rice-sona-masuri.webp"],
        },
        {
            title: "RS-10",
            category: "Basmati Rice",
            origin: "indian",
            description: "Historic Dehradun basmati known for its unique aroma and soft grain.",
            features: ["Historic variety", "Special aroma", "Soft texture"],
            details: "Region: Dehradun, Type: Aromatic",
            images: ["images/products/rice/rice-rs-10.webp"],
        },

        // PUSA 1401
        {
            title: "IR-8",
            category: "Basmati Rice",
            origin: "indian",
            description: "Golden Sella 1401 with long grains and premium cooking quality.",
            features: ["Golden Sella", "Non-sticky", "Long grains"],
            details: "Type: Golden Sella, Grain Length: Long",
            images: ["images/products/rice/rice-ir-8-2.webp"],
        },
        {
            title: "IR-26",
            category: "Basmati Rice",
            origin: "indian",
            description: "Creamy Sella version of 1401 with soft texture and rich aroma.",
            features: ["Creamy Sella", "Soft texture", "Aromatic"],
            details: "Type: Creamy Sella, Grain Length: Long",
            images: ["images/products/rice/rice-ir-26.webp"],
        },
        {
            title: "Sharbati Basmati",
            category: "Basmati Rice",
            origin: "indian",
            description: "Steam-processed 1401 basmati with long grain and non-sticky texture.",
            features: ["Steam processed", "Long grain", "High aroma"],
            details: "Type: Steam, Grain Length: Long",
            images: ["images/products/rice/rice-sharbati-basmati.webp"],
        },

        // SUGANDHA VARIETIES
        {
            title: "Sharbati Basmati (Creamy Sella)",
            category: "Basmati Rice",
            origin: "indian",
            description: "Golden Sella Sugandha rice with rich fragrance and long grains.",
            features: ["Golden Sella", "Aromatic", "Long grain"],
            details: "Type: Golden Sella, Grain Length: Long",
            images: ["images/products/rice/rice-sharbati-basmati-creamy-sella.webp"],
        },
        {
            title: "Sharbati Basmati Steam ",
            category: "Basmati Rice",
            origin: "indian",
            description: "Soft and aromatic Sugandha Creamy Sella variety.",
            features: ["Creamy Sella", "Soft texture", "Aromatic"],
            details: "Type: Creamy Sella, Grain Length: Long",
            images: ["images/products/rice/rice-sharbati-basmati-steam.webp"],
        },
        {
            title: "Traditional Basmati Steam",
            category: "Basmati Rice",
            origin: "indian",
            description: "Steam-processed Sugandha with aromatic flavor.",
            features: ["Steam processed", "Aromatic", "Non-sticky"],
            details: "Type: Steam, Grain Length: Long",
            images: ["images/products/rice/rice-traditional-basmati-steam.webp"],
        },

        // SHARBATI VARIETIES
        {
            title: "Jeeraka Salla",
            category: "Basmati Rice",
            origin: "indian",
            description: "Value-grade Sharbati Golden Sella with good aroma and grain length.",
            features: ["Golden Sella", "Value-grade", "Good aroma"],
            details: "Type: Golden Sella, Grain Length: Long",
            images: ["images/products/rice/rice-jeeraka-salla.webp"],
        },
        {
            title: "Sugandha Basmati (Creamy)",
            category: "Basmati Rice",
            origin: "indian",
            description: "Affordable Creamy Sella Sharbati with soft cooked texture.",
            features: ["Creamy Sella", "Soft texture", "Light aroma"],
            details: "Type: Creamy Sella, Grain Length: Long",
            images: ["images/products/rice/rice-sugandha-basmati-creamy.webp"],
        },
        {
            title: "Super Karnal",
            category: "Basmati Rice",
            origin: "indian",
            description: "Steam-cooked Sharbati rice, value alternative to premium basmati.",
            features: ["Steam processed", "Light aroma", "Long grain"],
            details: "Type: Steam, Grain Length: Long",
            images: ["images/products/rice/rice-super-karnal.webp"],
        },

        // ---------------------------------------------
        // NON-BASMATI VARIETIES
        // ---------------------------------------------
        {
            title: "IRRI-9",
            category: "Non-Basmati Rice",
            origin: "indian",
            description: "Lightweight, aromatic, medium-grain rice widely used in South India.",
            features: ["Medium grain", "Lightweight", "Soft texture"],
            details: "Variety: BPT 5204, Grain Length: Medium",
            images: ["images/products/rice/rice-irri-9-2.webp"],
        },
        {
            title: "IRRI-6",
            category: "Non-Basmati Rice",
            origin: "indian",
            description: "Popular non-basmati rice used for daily meals and bulk consumption.",
            features: ["High yield", "Medium grain", "Affordable"],
            details: "Variety: IR 64, Grain Length: Medium",
            images: ["images/products/rice/rice-irri-6-2.webp"],
        }
    ]
};

const products = riceData.products;

const grid = document.getElementById("productsGrid");
const filterButtons = document.querySelectorAll('.filter-btn');

function createFlipCard(product) {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.category = product.origin + " " + (product.category || "").toLowerCase().replace(/[^a-z]/g, '-');

    const shortDesc = (product.features || []).slice(0, 2).join(". ") + ".";

    card.innerHTML = `
        <div class="content">
            <div class="front">
                <img class="img" src="${product.images[0]}" alt="${product.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/600x450?text=${encodeURIComponent(product.title)}'">
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
                        <br>
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
        grid.innerHTML = '<div style="text-align:center;padding:60px;color:#666;">No rice varieties loaded.</div>';
        return;
    }

    products.forEach(product => {
        const card = createFlipCard(product);
        grid.appendChild(card);
    });

    console.log(`Loaded ${products.length} rice cards`);
}

// Filter Logic
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        let filtered = products;

        if (filter !== 'all') {
            if (filter === 'aromatic') {
                filtered = products.filter(p => p.category.toLowerCase().includes('aromatic') || p.category.toLowerCase().includes('basmati'));
            } else if (filter === 'non-basmati') {
                filtered = products.filter(p => p.category.toLowerCase().includes('non-basmati'));
            } else {
                filtered = products.filter(p => p.origin === filter);
            }
        }

        grid.innerHTML = "";
        if (filtered.length === 0) {
            grid.innerHTML = '<div style="text-align:center;padding:60px;color:#666;">No products in this category.</div>';
            return;
        }

        filtered.forEach(product => {
            const card = createFlipCard(product);
            grid.appendChild(card);
        });
    });
});

// Click to flip (toggle .flipped class)
document.addEventListener('click', e => {
    const card = e.target.closest('.card');
    if (card) {
        card.classList.toggle('flipped');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    populateProducts();
});