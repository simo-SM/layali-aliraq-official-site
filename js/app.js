 // Menu Data
const menuData = {
    categories: [
        {
            id: "cold-appetizers",
            name: "Cold Appetizers",
            items: [
                {name: "Hummus", price: 25, description: "Creamy chickpea dip with tahini, lemon, and olive oil", image: "/images/image_1.jpg", bestseller: false},
                {name: "Hummus Bil Lahme", price: 35, description: "Hummus topped with sautéed meat and pine nuts", image: "/images/image_2.jpg", bestseller: true},
                {name: "Mutabbal", price: 25, description: "Smoky eggplant dip with tahini and garlic", image: "/images/Mutabbal.jpeg", bestseller: false},
                {name: "Baba Ghanoush", price: 25, description: "Grilled eggplant with tomatoes, onions, and herbs", image: "/images/image_4.jpg", bestseller: false},
                {name: "Labneh", price: 20, description: "Strained yogurt with olive oil and za'atar", image: "/images/image_5.jpg", bestseller: false},
                {name: "Fattoush", price: 30, description: "Levantine salad with fried bread, sumac, and pomegranate", image: "/images/image_6.jpg", bestseller: false},
            ]
        },
        {
            id: "salads",
            name: "Salads",
            items: [
                {name: "Iraqi Salad", price: 20, description: "Fresh vegetables with special Iraqi dressing", image: "/images/image_7.jpg", bestseller: false},
                {name: "Tabbouleh", price: 25, description: "Parsley, bulgur, tomatoes, and mint salad", image: "/images/image_8.jpg", bestseller: false},
                {name: "Greek Salad", price: 30, description: "Cucumber, tomatoes, feta cheese, and olives", image: "/images/image_9.jpg", bestseller: false},
            ]
        },
        {
            id: "soups",
            name: "Soups",
            items: [
                {name: "Lentil Soup", price: 20, description: "Traditional Iraqi lentil soup with spices", image: "/images/image_10.jpg", bestseller: false},
                {name: "Chicken Soup", price: 25, description: "Hearty chicken soup with vegetables", image: "/images/image_11.jpg", bestseller: false},
            ]
        },
        {
            id: "manageesh",
            name: "Manageesh",
            items: [
                {name: "Za'atar", price: 15, description: "Flatbread with thyme, sesame, and olive oil", image: "/images/image_12.jpg", bestseller: false},
                {name: "Cheese", price: 20, description: "Flatbread with Akkawi cheese", image: "/images/image_13.jpg", bestseller: false},
                {name: "Meat", price: 25, description: "Flatbread with seasoned minced meat", image: "/images/image_14.jpg", bestseller: false},
            ]
        },
        {
            id: "iraqi-kibbeh",
            name: "Iraqi Kibbeh",
            items: [
                {name: "Mosul Kibbeh", price: 45, description: "Flat kibbeh stuffed with meat, onions, and almonds", image: "/images/image_15.jpg", bestseller: true},
                {name: "Baghdad Kibbeh", price: 40, description: "Round fried kibbeh with pine nuts", image: "/images/image_16.jpg", bestseller: false},
                {name: "Kibbeh Labanieh", price: 50, description: "Kibbeh in yogurt sauce with garlic and mint", image: "/images/image_17.jpg", bestseller: false},
            ]
        },
        {
            id: "main-dishes",
            name: "Main Dishes",
            items: [
                {name: "Masgouf Fish", price: 120, description: "Traditional Iraqi grilled carp with tomatoes and onions", image: "/images/image_18.jpg", bestseller: true},
                {name: "Dolma", price: 55, description: "Stuffed vegetables with rice and meat", image: "/images/image_19.jpg", bestseller: true},
                {name: "Quzi", price: 150, description: "Slow-cooked lamb with rice, nuts, and raisins", image: "/images/image_20.jpg", bestseller: true},
                {name: "Biryani Iraqi", price: 65, description: "Fragrant rice with meat and Iraqi spices", image: "/images/image_21.jpg", bestseller: false},
                {name: "Tashreeb", price: 45, description: "Bread soaked in meat stew broth", image: "/images/image_22.jpg", bestseller: false},
            ]
        },
        {
            id: "clay-pot",
            name: "Clay Pot",
            items: [
                {name: "Clay Pot Chicken", price: 70, description: "Chicken, vegetables, and rice baked in clay pot", image: "/images/image_23.jpg", bestseller: true},
                {name: "Clay Pot Meat", price: 85, description: "Tender meat with vegetables in traditional clay pot", image: "/images/image_24.jpg", bestseller: false},
            ]
        },
        {
            id: "grills",
            name: "Grills",
            items: [
                {name: "Iraqi Kebab", price: 65, description: "Minced lamb with spices, grilled on charcoal", image: "/images/image_25.jpg", bestseller: true},
                {name: "Tikka", price: 75, description: "Marinated lamb cubes grilled to perfection", image: "/images/Tikka.jpeg", bestseller: false},
            ]
        }
    ]
};


// Cart State with LocalStorage
let cart = JSON.parse(localStorage.getItem('layali_cart')) || [];
let currentCategory = "all";

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderMenu("all");
    updateCart();
});

// Render Categories
function renderCategories() {
    const container = document.getElementById('category-buttons');
    let html = `
        <button onclick="filterCategory('all')" class="shrink-0 px-5 py-2 rounded-full ${currentCategory === 'all' ? 'bg-primary text-background-dark font-bold shadow-lg ring-2 ring-primary ring-offset-2 ring-offset-[#111111]' : 'bg-surface-dark text-gray-300 hover:text-white hover:bg-[#333] border border-[#333] font-medium'} text-sm whitespace-nowrap transition-all" role="tab" aria-selected="${currentCategory === 'all'}">
            All Items
        </button>
    `;
    
    menuData.categories.forEach(cat => {
        const isActive = currentCategory === cat.id;
        html += `
            <button onclick="filterCategory('${cat.id}')" class="shrink-0 px-5 py-2 rounded-full ${isActive ? 'bg-primary text-background-dark font-bold shadow-lg ring-2 ring-primary ring-offset-2 ring-offset-[#111111]' : 'bg-surface-dark text-gray-300 hover:text-white hover:bg-[#333] border border-[#333] font-medium'} text-sm whitespace-nowrap transition-all" role="tab" aria-selected="${isActive}">
                ${cat.name}
            </button>
        `;
    });
    
    container.innerHTML = html;
}

// Filter Category
function filterCategory(categoryId) {
    currentCategory = categoryId;
    renderCategories();
    renderMenu(categoryId);
}

// Render Menu
function renderMenu(categoryId) {
    const container = document.getElementById('menu-grid');
    let items = [];
    
    if (categoryId === "all") {
        menuData.categories.forEach(cat => {
            items = items.concat(cat.items.map(item => ({...item, category: cat.name})));
        });
    } else {
        const category = menuData.categories.find(c => c.id === categoryId);
        if (category) {
            items = category.items.map(item => ({...item, category: category.name}));
        }
    }

    let html = '';
    items.forEach((item, index) => {
        const badge = item.bestseller ? `<div class="absolute top-4 right-4 bg-primary text-[#111111] text-xs font-bold px-3 py-1 rounded-full uppercase animate-pulse-slow">Bestseller</div>` : '';
        
        html += `
            <div class="menu-item group bg-surface-dark rounded-xl overflow-hidden border border-[#333] hover:border-primary/50 transition-all hover:shadow-[0_0_20px_rgba(200,163,40,0.1)]" style="animation-delay: ${index * 50}ms">
                <div class="h-56 overflow-hidden relative">
                    <img alt="${item.name}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700" src="${item.image}" loading="lazy"/>
                    ${badge}
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                        <span class="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">${item.category}</span>
                    </div>
                </div>
                <div class="p-5 flex flex-col h-[calc(100%-14rem)] justify-between">
                    <div>
                        <div class="flex justify-between items-start mb-2">
                            <h4 class="text-white text-lg font-bold">${item.name}</h4>
                            <span class="text-primary font-bold text-lg whitespace-nowrap">SAR ${item.price}</span>
                        </div>
                        <p class="text-gray-400 text-sm mb-4 line-clamp-3">${item.description}</p>
                    </div>
                    <button onclick="addToCart('${item.name}', ${item.price})" class="w-full py-2.5 rounded border border-primary/30 text-primary hover:bg-primary hover:text-[#111111] font-bold text-sm transition-colors flex items-center justify-center gap-2 mt-auto group/btn">
                        Add to Order <span class="material-symbols-outlined text-sm transition-transform group-hover/btn:rotate-90">add</span>
                    </button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Cart Functions
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({name, price, quantity: 1});
    }
    saveCart();
    updateCart();
    showNotification(`Added ${name} to cart`);
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    saveCart();
    updateCart();
}

function updateQuantity(name, delta) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(name);
        } else {
            saveCart();
            updateCart();
        }
    }
}

function saveCart() {
    localStorage.setItem('layali_cart', JSON.stringify(cart));
}

function updateCart() {
    const countBadge = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Update badge
    if (totalItems > 0) {
        countBadge.textContent = totalItems;
        countBadge.classList.remove('hidden');
    } else {
        countBadge.classList.add('hidden');
    }
    
    // Update cart panel
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-gray-500 text-center py-8">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="flex items-center gap-4 bg-[#111111] p-4 rounded-lg border border-[#333]">
                <div class="flex-1">
                    <h4 class="text-white font-bold text-sm">${item.name}</h4>
                    <p class="text-primary text-sm">SAR ${item.price} each</p>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="updateQuantity('${item.name}', -1)" class="w-8 h-8 rounded-full bg-surface-dark border border-[#333] text-white hover:border-primary hover:text-primary flex items-center justify-center transition-colors" aria-label="Decrease quantity">
                        <span class="material-symbols-outlined text-sm">remove</span>
                    </button>
                    <span class="text-white font-bold w-6 text-center">${item.quantity}</span>
                    <button onclick="updateQuantity('${item.name}', 1)" class="w-8 h-8 rounded-full bg-surface-dark border border-[#333] text-white hover:border-primary hover:text-primary flex items-center justify-center transition-colors" aria-label="Increase quantity">
                        <span class="material-symbols-outlined text-sm">add</span>
                    </button>
                </div>
                <button onclick="removeFromCart('${item.name}')" class="text-gray-500 hover:text-red-500 transition-colors" aria-label="Remove item">
                    <span class="material-symbols-outlined text-lg">delete</span>
                </button>
            </div>
        `).join('');
    }
    
    cartTotal.textContent = `SAR ${totalPrice}`;
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const panel = document.getElementById('cart-panel');
    
    if (sidebar.classList.contains('hidden')) {
        sidebar.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            panel.classList.remove('translate-x-full');
        }, 10);
    } else {
        panel.classList.add('translate-x-full');
        document.body.style.overflow = '';
        setTimeout(() => {
            sidebar.classList.add('hidden');
        }, 300);
    }
}

function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    let message = 'Hello! I would like to order from Layali Aliraq:\n\n';
    let total = 0;
    
    cart.forEach(item => {
        message += `- ${item.name} x${item.quantity} = SAR ${item.price * item.quantity}\n`;
        total += item.price * item.quantity;
    });
    
    message += `\nTotal: SAR ${total}\n\nThank you!`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/212608173585?text=${encodedMessage}`, '_blank');
}

// Mobile Menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Scroll to section
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({behavior: 'smooth'});
}

// Form Handler
function handleFormSubmit(e) {
    e.preventDefault();
    showNotification('Message sent! We will contact you soon.');
    e.target.reset();
}

// Notification
function showNotification(message) {
    const notif = document.createElement('div');
    notif.className = 'fixed top-24 right-4 bg-primary text-background-dark px-6 py-3 rounded-lg shadow-2xl z-50 font-bold transform translate-x-full transition-transform duration-300 flex items-center gap-2';
    notif.innerHTML = `<span class="material-symbols-outlined">check_circle</span> ${message}`;
    document.body.appendChild(notif);
    
    setTimeout(() => notif.classList.remove('translate-x-full'), 100);
    setTimeout(() => {
        notif.classList.add('translate-x-full');
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
    });
});

// Close mobile menu on resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        document.getElementById('mobile-menu').classList.add('hidden');
    }
});
// ============================================
// Image list from images folder
// ============================================

const heroImages = [
    '/images/bg2.jpg',
    '/images/bg3.jpg',
    '/images/bg4.jpg',
    '/images/bg5.jpeg'
];
const container = document.getElementById('slider-container');
let currentIndex = 0;
let slides = [];

// ============================================
// Initialize slides
// ============================================

function initSlides() {
    heroImages.forEach((src, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide-image';
        slide.style.backgroundImage = `url('${src}')`;
        if (index === 0) slide.classList.add('active');
        container.appendChild(slide);
        slides.push(slide);
    });
}
// ============================================
// Slide images from RIGHT to LEFT (smooth scroll effect)
// ============================================

function nextSlide() {
    const current = slides[currentIndex];
    const nextIndex = (currentIndex + 1) % slides.length;
    const next = slides[nextIndex];

    // Current slide exits to LEFT
    current.classList.remove('active');
    current.classList.add('exit');

    // Next slide enters from RIGHT
    next.classList.remove('exit');
    next.classList.add('active');

    // Reset current after animation
    setTimeout(() => {
        current.classList.remove('exit');
    }, 400);
    currentIndex = nextIndex;
}

// ============================================
// Start auto-slide every 0.4 seconds
// ============================================

initSlides();
setInterval(nextSlide, 3500);
// ============================================
// Scroll to section function
// ============================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============================================
// DOWNLOAD PDF MENU 
// ============================================
function downloadMenu() {
    // Path to your PDF file
    const pdfUrl = '/menuPDF.html';
   
    // Create download link
    const link = document.createElement('a');
    link.href = pdfUrl;
   
    window.open(pdfUrl, '_blank'); 
}
// =============================================
// Contact & Reservations
// =============================================

document.getElementById("whatsappForm").addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    const whatsappNumber = "212608173585"; 
    const text =
`🍽️ New Reservation Request

    Name: ${name}
    Phone: ${phone}

    Message:
    ${message}

-----------------------
Sent from Website`;

    const encodedText = encodeURIComponent(text);

    const url = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

    window.open(url, "_blank");
});

// ============================================
// animetion GSAP
// ============================================
gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll(".reveal-text").forEach((text) => {

  const split = new SplitType(text, { types: "lines, chars" });

  split.lines.forEach((line) => {

    // كل line عندو timeline مستقل
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: line,
        start: "top 85%",
        end: "bottom 70%",
        scrub: 1.5
      }
    });

    tl.to(line.querySelectorAll(".char"), {
      y: 0,
      opacity: 1,
      stagger: 0.05,
      ease: "power2.out"
    });

  });

});

// this  line animetion in images
gsap.registerPlugin(ScrollTrigger);

const image = document.querySelector(".image");

// Scroll Animation — subtle floating & scale
gsap.fromTo(image, 
  { y: 40, scale: 1.05 }, 
  { 
    y: 0, 
    scale: 1, 
    ease: "power2.out", 
    scrollTrigger: {
      trigger: image,
      start: "top 90%", 
      end: "bottom 60%",
      scrub: 1.5 // slow cinematic scroll effect
    }
  }
);

gsap.registerPlugin(ScrollTrigger);



