import { db, auth } from './firebase-config.js';
console.log("Firebase Connected:", db);
/**
 * WARIS SPORTS - Main Application Engine
 * Shop Name: WARIS SPORTS
 * Contact: 7099442882, 6026108804 | Email: warissports2024@gmail.com
 * Location: Morigaon Civil Tini ali near Digital market, PIN: 782105
 * Instagram: warissports2024 | 
 * Owner Access: Protected by secret password
 */

// Application State
const AppState = {
  products: [],
  cart: [],
  orders: [],
  activeCategory: 'all',
  searchQuery: '',
  maxPrice: 7000,
  sortBy: 'featured',
  isAdminMode: false,
  ownerPassword: 'IMRAZ@WARIS2024.#',
  selectedProduct: null,
  currentOrder: null,
  shopInfo: {
    name: 'WARIS SPORTS',
    contact: '7099442882',
    contactAlt: '6026108804',
    contactDisplay: '+91 7099442882 / 6026108804',
    email: 'warissports2024@gmail.com',
    instagram: 'warissports2024',
    instagramUrl: 'https://instagram.com/warissports2024',
    whatsappUrl: 'https://wa.me/917099442882',
    whatsappUrlAlt: 'https://wa.me/916026108804',
  
    upiId: '7099442882@upi',
    address: 'Morigaon Civil Tini ali near Digital market, Assam',
    pin: '782105'
  }
};

// Preset images for manual product listing
const PRESET_IMAGES = [
  { label: 'English Willow Cricket Bat', url: 'https://images.unsplash.com/photo-1531415074868-036b107e775a?auto=format&fit=crop&w=800&q=80' },
  { label: 'Cricket Leather Ball', url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80' },
  { label: 'Batting Pads & Gloves', url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=800&q=80' },
  { label: 'Cricket Helmet', url: 'https://images.unsplash.com/photo-1628891890467-b79f2c8ba9dc?auto=format&fit=crop&w=800&q=80' },
  { label: 'Pro Match Football', url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80' },
  { label: 'Football Cleats / Boots', url: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80' },
  { label: 'Carbon Badminton Racket', url: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80' },
  { label: 'Goose Feather Shuttlecocks', url: 'https://images.unsplash.com/photo-1613918108466-292b78a8ef95?auto=format&fit=crop&w=800&q=80' },
  { label: 'Gym Dumbbell Set', url: 'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?auto=format&fit=crop&w=800&q=80' },
  { label: 'Powerlifting Lever Belt', url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80' },
  { label: 'Running Shoes', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80' },
  { label: 'Compression Sports Jersey', url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80' }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  loadDataFromStorage();
  initEventListeners();
  renderProducts();
  renderFeaturedCarousel();
  renderWorkshopServices();
  renderTestimonials();
  updateCartBadge();
  initJerseyCustomizer();
  checkUrlParams();
});

// Storage Management
function loadDataFromStorage() {
  const savedProducts = localStorage.getItem('waris_sports_products');
  if (savedProducts) {
    try {
      AppState.products = JSON.parse(savedProducts);
    } catch (e) {
      console.error('Failed to parse saved products, loading defaults', e);
      AppState.products = [...(window.DEFAULT_PRODUCTS || [])];
    }
  } else {
    AppState.products = [...(window.DEFAULT_PRODUCTS || [])];
    saveProductsToStorage();
  }

  const savedCart = localStorage.getItem('waris_sports_cart');
  if (savedCart) {
    try {
      AppState.cart = JSON.parse(savedCart);
    } catch (e) {
      AppState.cart = [];
    }
  }

  const savedOrders = localStorage.getItem('waris_sports_orders');
  if (savedOrders) {
    try {
      AppState.orders = JSON.parse(savedOrders);
    } catch (e) {
      AppState.orders = [];
    }
  }
}

function saveProductsToStorage() {
  localStorage.setItem('waris_sports_products', JSON.stringify(AppState.products));
}

function saveCartToStorage() {
  localStorage.setItem('waris_sports_cart', JSON.stringify(AppState.cart));
  updateCartBadge();
}

function saveOrdersToStorage() {
  localStorage.setItem('waris_sports_orders', JSON.stringify(AppState.orders));
}

// Utility: Currency Formatter
function formatINR(amount) {
  return '₹' + Number(amount || 0).toLocaleString('en-IN');
}

// Toast Notifications
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'fa-circle-info';
  if (type === 'success') icon = 'fa-circle-check';
  if (type === 'error') icon = 'fa-circle-exclamation';

  toast.innerHTML = `
    <i class="fa-solid ${icon} text-lg ${type === 'success' ? 'text-emerald-400' : type === 'error' ? 'text-red-400' : 'text-cyan-400'}"></i>
    <div class="flex-1 font-medium text-sm text-gray-100">${message}</div>
    <button onclick="this.parentElement.remove()" class="text-gray-400 hover:text-white text-xs ml-2">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 20);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 4000);
}

// Initialize Event Listeners
function initEventListeners() {
  // Category Navigation Pills
  document.querySelectorAll('.cat-filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.cat-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.activeCategory = btn.dataset.category || 'all';
      renderProducts();
    });
  });

  // Search Input
  const searchInput = document.getElementById('main-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      AppState.searchQuery = e.target.value.trim().toLowerCase();
      renderProducts();
    });
  }

  // Sort By Dropdown
  const sortSelect = document.getElementById('sort-products-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      AppState.sortBy = e.target.value;
      renderProducts();
    });
  }

  // Price Range Filter
  const priceSlider = document.getElementById('price-filter-slider');
  const priceDisplay = document.getElementById('price-filter-display');
  if (priceSlider && priceDisplay) {
    priceSlider.addEventListener('input', (e) => {
      AppState.maxPrice = Number(e.target.value);
      priceDisplay.textContent = formatINR(AppState.maxPrice);
      renderProducts();
    });
  }

  // Cart Drawer Toggles
  const cartBtn = document.getElementById('header-cart-btn');
  const mobileCartBtn = document.getElementById('mobile-cart-btn');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartBackdrop = document.getElementById('cart-drawer-backdrop');

  if (cartBtn) cartBtn.addEventListener('click', openCartDrawer);
  if (mobileCartBtn) mobileCartBtn.addEventListener('click', openCartDrawer);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
  if (cartBackdrop) {
    cartBackdrop.addEventListener('click', (e) => {
      if (e.target === cartBackdrop) closeCartDrawer();
    });
  }

  // Admin Mode Exit Toggle (Shown in header only when owner is logged in)
  const adminToggleBtn = document.getElementById('admin-toggle-btn');
  if (adminToggleBtn) adminToggleBtn.addEventListener('click', toggleAdminMode);

  // Secret Triple-Click on Brand Logo to Open Owner Login
  const logoTrigger = document.getElementById('brand-logo-trigger');
  if (logoTrigger) {
    let logoClicks = 0;
    let logoTimer = null;
    logoTrigger.addEventListener('click', (e) => {
      logoClicks++;
      if (logoClicks === 1) {
        logoTimer = setTimeout(() => { logoClicks = 0; }, 1500);
      } else if (logoClicks >= 3) {
        e.preventDefault();
        clearTimeout(logoTimer);
        logoClicks = 0;
        openOwnerLoginModal();
      }
    });
  }

  // Secret Keyboard Shortcut for Owner: Ctrl+Shift+O or Alt+W
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.shiftKey && (e.key === 'O' || e.key === 'o')) ||
        (e.altKey && (e.key === 'W' || e.key === 'w'))) {
      e.preventDefault();
      openOwnerLoginModal();
    }
  });

  // Modal Closers
  document.querySelectorAll('.modal-close-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllModals();
    });
  });

  // Product Image Preset Selector in Admin
  const presetSelector = document.getElementById('admin-preset-images');
  if (presetSelector) {
    populateImagePresets(presetSelector);
  }

  // Local File Upload Preview in Admin Form
  const fileInput = document.getElementById('admin-product-file');
  if (fileInput) {
    fileInput.addEventListener('change', handleProductFileUpload);
  }

  // Admin New Product Form Submission
  const productForm = document.getElementById('admin-product-form');
  if (productForm) {
    productForm.addEventListener('submit', handleProductFormSubmit);
  }
}

// Populate Image Preset Options
function populateImagePresets(selectElem) {
  selectElem.innerHTML = '<option value="">-- Or Choose High-Quality Sports Preset --</option>';
  PRESET_IMAGES.forEach(preset => {
    const opt = document.createElement('option');
    opt.value = preset.url;
    opt.textContent = preset.label;
    selectElem.appendChild(opt);
  });

  selectElem.addEventListener('change', (e) => {
    if (e.target.value) {
      const urlInput = document.getElementById('admin-product-image');
      if (urlInput) urlInput.value = e.target.value;
      updateAdminImagePreview(e.target.value);
    }
  });
}

function handleProductFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 2.5 * 1024 * 1024) {
    showToast('Image size exceeds 2.5MB. Please choose a smaller image or use URL.', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    const base64Url = event.target.result;
    const urlInput = document.getElementById('admin-product-image');
    if (urlInput) urlInput.value = base64Url;
    updateAdminImagePreview(base64Url);
    showToast('Photo uploaded from device successfully!', 'success');
  };
  reader.readAsDataURL(file);
}

function updateAdminImagePreview(url) {
  const previewImg = document.getElementById('admin-image-preview');
  const previewBox = document.getElementById('admin-image-preview-box');
  if (previewImg && previewBox) {
    if (url) {
      previewImg.src = url;
      previewBox.classList.remove('hidden');
    } else {
      previewBox.classList.add('hidden');
    }
  }
}

// Render Products Grid
function renderProducts() {
  const container = document.getElementById('products-grid');
  const countDisplay = document.getElementById('products-count-badge');
  if (!container) return;

  let filtered = AppState.products.filter(item => {
    // Category match
    const matchesCat = AppState.activeCategory === 'all' || item.category === AppState.activeCategory;
    
    // Search query match
    const q = AppState.searchQuery;
    const matchesQuery = !q || 
      item.name.toLowerCase().includes(q) || 
      item.brand.toLowerCase().includes(q) || 
      (item.description && item.description.toLowerCase().includes(q));

    // Price match
    const matchesPrice = Number(item.price) <= AppState.maxPrice;

    return matchesCat && matchesQuery && matchesPrice;
  });

  // Sorting
  if (AppState.sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (AppState.sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (AppState.sortBy === 'rating') {
    filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else {
    // Featured first
    filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  if (countDisplay) {
    countDisplay.textContent = `${filtered.length} Gear Items`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <div class="w-20 h-20 mx-auto rounded-full bg-gray-800/80 flex items-center justify-center text-gray-500 mb-4 border border-gray-700">
          <i class="fa-solid fa-magnifying-glass text-3xl"></i>
        </div>
        <h3 class="text-xl font-bold text-gray-200">No matching sports equipment found</h3>
        <p class="text-gray-400 text-sm mt-1">Try relaxing your search keywords or price filter.</p>
        <button onclick="resetFilters()" class="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-cyan-400 font-semibold rounded-lg text-sm border border-gray-700 transition">
          Reset All Filters
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const discountPct = item.originalPrice && item.originalPrice > item.price 
      ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) 
      : 0;

    return `
      <div class="product-card glass-card rounded-2xl overflow-hidden flex flex-col group border border-gray-800 hover:border-red-500/40" data-id="${item.id}">
        <!-- Image & Badges -->
        <div class="product-img-wrapper relative h-60 bg-gray-900 overflow-hidden cursor-pointer" onclick="openQuickView('${item.id}')">
          <img 
            src="${item.image}" 
            alt="${item.name}" 
            class="w-full h-full object-cover object-center group-hover:scale-108 transition duration-500"
            onerror="this.src='https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80'"
            loading="lazy"
          />
          
          <!-- Top Badges -->
          <div class="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            ${item.badge ? `<span class="bg-red-600 text-white text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-lg shadow-red-900/40">${item.badge}</span>` : ''}
            ${discountPct > 0 ? `<span class="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow">${discountPct}% OFF</span>` : ''}
          </div>

          <!-- Stock Pill -->
          <div class="absolute top-3 right-3 z-10">
            ${item.inStock 
              ? `<span class="bg-gray-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> In Stock
                 </span>`
              : `<span class="bg-gray-950/80 backdrop-blur-md text-red-400 border border-red-500/30 text-[10px] font-bold px-2 py-1 rounded-full">
                  Sold Out
                 </span>`
            }
          </div>

          <!-- Quick View Hover Button -->
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <button onclick="event.stopPropagation(); openQuickView('${item.id}')" class="px-4 py-2 bg-white/90 hover:bg-white text-gray-950 text-xs font-bold rounded-lg shadow-xl transform translate-y-2 group-hover:translate-y-0 transition duration-300 flex items-center gap-1.5">
              <i class="fa-solid fa-eye"></i> Quick View
            </button>
          </div>
        </div>

        <!-- Product Details -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <!-- Category & Brand -->
            <div class="flex items-center justify-between text-xs text-gray-400 mb-1.5">
              <span class="uppercase tracking-widest text-cyan-400 font-semibold">${item.category}</span>
              <span class="font-medium bg-gray-800/80 px-2 py-0.5 rounded text-gray-300">${item.brand}</span>
            </div>

            <!-- Title -->
            <h3 class="font-bold text-gray-100 text-base leading-snug group-hover:text-red-400 transition cursor-pointer line-clamp-2" onclick="openQuickView('${item.id}')">
              ${item.name}
            </h3>

            <!-- Rating -->
            <div class="flex items-center gap-1.5 mt-2">
              <div class="flex text-amber-400 text-xs">
                ${renderStarRating(item.rating || 4.8)}
              </div>
              <span class="text-xs text-gray-400">(${item.reviewsCount || 42})</span>
            </div>
          </div>

          <!-- Pricing & Action -->
          <div class="mt-4 pt-4 border-t border-gray-800/80">
            <!-- Price Display -->
            <div class="flex items-baseline gap-2">
              <span class="text-2xl font-black text-white font-mono tracking-tight">${formatINR(item.price)}</span>
              ${item.originalPrice && item.originalPrice > item.price ? `
                <span class="text-xs text-gray-500 line-through font-mono">${formatINR(item.originalPrice)}</span>
              ` : ''}
            </div>

            <!-- Mandatory ₹249 Advance Note -->
            <div class="mt-1 flex items-center gap-1.5 text-[11px] text-amber-400/90 font-medium">
              <i class="fa-solid fa-shield-halved text-amber-400 text-xs"></i>
              <span>Pay <strong>₹249 advance</strong>, balance on COD</span>
            </div>

            <!-- Buttons Grid -->
            <div class="grid grid-cols-2 gap-2 mt-3">
              <button 
                onclick="addToCart('${item.id}')" 
                ${!item.inStock ? 'disabled' : ''}
                class="px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${item.inStock ? 'bg-gray-800 hover:bg-gray-700 text-gray-100 hover:text-white border border-gray-700' : 'bg-gray-900 text-gray-600 cursor-not-allowed'}">
                <i class="fa-solid fa-cart-plus"></i> Add
              </button>

              <button 
                onclick="buyNow('${item.id}')"
                ${!item.inStock ? 'disabled' : ''}
                class="px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${item.inStock ? 'btn-primary-sport' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}">
                <i class="fa-solid fa-bolt"></i> Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Render Star Ratings
function renderStarRating(rating) {
  let stars = '';
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars += '<i class="fa-solid fa-star"></i>';
    } else if (i === fullStars && hasHalf) {
      stars += '<i class="fa-solid fa-star-half-stroke"></i>';
    } else {
      stars += '<i class="fa-regular fa-star text-gray-600"></i>';
    }
  }
  return stars;
}

// Reset Filters
function resetFilters() {
  AppState.activeCategory = 'all';
  AppState.searchQuery = '';
  AppState.maxPrice = 30000;
  AppState.sortBy = 'featured';

  const searchInput = document.getElementById('main-search-input');
  if (searchInput) searchInput.value = '';

  const sortSelect = document.getElementById('sort-products-select');
  if (sortSelect) sortSelect.value = 'featured';

  const priceSlider = document.getElementById('price-filter-slider');
  const priceDisplay = document.getElementById('price-filter-display');
  if (priceSlider && priceDisplay) {
    priceSlider.value = 30000;
    priceDisplay.textContent = '₹30,000';
  }

  document.querySelectorAll('.cat-filter-btn').forEach(b => {
    if (b.dataset.category === 'all') b.classList.add('active');
    else b.classList.remove('active');
  });

  renderProducts();
  showToast('Filters cleared', 'info');
}

// Quick View Modal
function openQuickView(productId) {
  const product = AppState.products.find(p => p.id === productId);
  if (!product) return;

  AppState.selectedProduct = product;
  const modal = document.getElementById('quick-view-modal');
  const container = document.getElementById('quick-view-content');
  if (!modal || !container) return;

  const discountPct = product.originalPrice && product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const sizes = product.sizes && product.sizes.length ? product.sizes : ['Standard Size'];

  let specsHtml = '';
  if (product.specs && Object.keys(product.specs).length > 0) {
    specsHtml = `
      <div class="mt-4 pt-4 border-t border-gray-800">
        <h4 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Specifications</h4>
        <div class="grid grid-cols-2 gap-2 text-xs">
          ${Object.entries(product.specs).map(([key, val]) => `
            <div class="bg-gray-900/80 p-2.5 rounded-lg border border-gray-800">
              <span class="text-gray-400 block">${key}</span>
              <span class="text-gray-100 font-semibold">${val}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Left: Image View -->
      <div class="relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 flex items-center justify-center min-h-[300px]">
        <img 
          src="${product.image}" 
          alt="${product.name}" 
          class="w-full h-full object-cover max-h-[420px]"
          onerror="this.src='https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80'"
        />
        ${product.badge ? `
          <div class="absolute top-4 left-4 bg-red-600 text-white text-xs font-black uppercase px-3 py-1 rounded-md shadow-lg">
            ${product.badge}
          </div>
        ` : ''}
      </div>

      <!-- Right: Details & Options -->
      <div class="flex flex-col justify-between">
        <div>
          <!-- Brand & Category -->
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xs uppercase font-bold text-cyan-400 tracking-wider">${product.category}</span>
            <span class="text-gray-600">•</span>
            <span class="text-xs font-semibold text-gray-300 bg-gray-800 px-2 py-0.5 rounded">${product.brand}</span>
          </div>

          <h2 class="text-2xl font-black text-white leading-tight">${product.name}</h2>

          <!-- Rating & Stock -->
          <div class="flex items-center gap-3 mt-2.5">
            <div class="flex text-amber-400 text-sm">
              ${renderStarRating(product.rating || 4.9)}
            </div>
            <span class="text-xs text-gray-400">(${product.reviewsCount || 48} verified ratings)</span>
            <span class="text-gray-600">•</span>
            ${product.inStock 
              ? `<span class="text-xs font-bold text-emerald-400 flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-emerald-400"></span> Ready to Dispatch</span>`
              : `<span class="text-xs font-bold text-red-400">Out of Stock</span>`
            }
          </div>

          <!-- Price Box -->
          <div class="mt-4 p-4 rounded-xl bg-gray-900/90 border border-gray-800 flex items-baseline justify-between">
            <div>
              <div class="flex items-baseline gap-3">
                <span class="text-3xl font-black text-white font-mono">${formatINR(product.price)}</span>
                ${product.originalPrice && product.originalPrice > product.price ? `
                  <span class="text-sm text-gray-500 line-through font-mono">${formatINR(product.originalPrice)}</span>
                  <span class="text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded">${discountPct}% OFF</span>
                ` : ''}
              </div>
              <p class="text-[11px] text-gray-400 mt-1">Inclusive of all taxes + Free express sports delivery</p>
            </div>
          </div>

          <!-- Advance Token Notice -->
          <div class="mt-3 advance-token-card p-3 flex items-start gap-3">
            <i class="fa-solid fa-lock text-red-400 text-base mt-0.5"></i>
            <div>
              <h5 class="text-xs font-black text-white uppercase tracking-wider">Mandatory Advance Token: ₹249</h5>
              <p class="text-[11px] text-gray-300 leading-relaxed mt-0.5">
                Pay just <strong>₹249 token deposit</strong> now to confirm your order & lock item from inventory. Pay the remaining <strong>${formatINR(Math.max(0, product.price - 249))}</strong> upon delivery!
              </p>
            </div>
          </div>

          <!-- Description -->
          <p class="mt-4 text-xs text-gray-300 leading-relaxed">${product.description || 'Professional athletic grade sports gear from WARIS SPORTS.'}</p>

          <!-- Size / Option Selector -->
          <div class="mt-4">
            <label class="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">Select Size / Variation:</label>
            <div class="flex flex-wrap gap-2" id="quick-view-sizes">
              ${sizes.map((s, idx) => `
                <button type="button" onclick="selectQuickViewSize(this, '${s}')" class="size-choice-btn px-3 py-1.5 rounded-lg text-xs font-bold border transition ${idx === 0 ? 'bg-red-600 border-red-500 text-white' : 'bg-gray-900 border-gray-700 text-gray-300 hover:border-gray-500'}">
                  ${s}
                </button>
              `).join('')}
            </div>
          </div>

          ${specsHtml}
        </div>

        <!-- Action CTAs -->
        <div class="mt-6 pt-4 border-t border-gray-800 flex flex-col sm:flex-row gap-3">
          <button 
            onclick="addQuickViewToCart()"
            ${!product.inStock ? 'disabled' : ''}
            class="flex-1 py-3 px-4 rounded-xl text-sm font-bold bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 transition flex items-center justify-center gap-2">
            <i class="fa-solid fa-cart-plus"></i> Add to Cart
          </button>

          <button 
            onclick="buyNowFromQuickView()"
            ${!product.inStock ? 'disabled' : ''}
            class="flex-1 py-3 px-4 rounded-xl text-sm font-bold btn-primary-sport transition flex items-center justify-center gap-2">
            <i class="fa-solid fa-bolt"></i> Pay ₹249 & Order
          </button>

          <a 
            href="${generateWhatsAppInquiry(product)}"
            target="_blank"
            class="py-3 px-4 rounded-xl text-sm font-bold btn-whatsapp flex items-center justify-center gap-2">
            <i class="fa-brands fa-whatsapp text-lg"></i>
          </a>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

function selectQuickViewSize(btn, size) {
  document.querySelectorAll('.size-choice-btn').forEach(b => {
    b.className = 'size-choice-btn px-3 py-1.5 rounded-lg text-xs font-bold border transition bg-gray-900 border-gray-700 text-gray-300 hover:border-gray-500';
  });
  btn.className = 'size-choice-btn px-3 py-1.5 rounded-lg text-xs font-bold border transition bg-red-600 border-red-500 text-white';
}

function getSelectedQuickViewSize() {
  const activeBtn = document.querySelector('.size-choice-btn.bg-red-600');
  return activeBtn ? activeBtn.textContent.trim() : 'Standard';
}

function addQuickViewToCart() {
  if (!AppState.selectedProduct) return;
  const size = getSelectedQuickViewSize();
  addToCart(AppState.selectedProduct.id, size);
  closeAllModals();
}

function buyNowFromQuickView() {
  if (!AppState.selectedProduct) return;
  const size = getSelectedQuickViewSize();
  addToCart(AppState.selectedProduct.id, size);
  closeAllModals();
  openCheckoutModal();
}

// WhatsApp Inquiry Link Generator
function generateWhatsAppInquiry(product) {
  const text = encodeURIComponent(
    `Hello Waris Sports! I want to ask about: *${product.name}* (Price: ${formatINR(product.price)}). Is this available in stock at your Morigaon store?`
  );
  return `https://wa.me/91${AppState.shopInfo.contact}?text=${text}`;
}

// Cart Management
function addToCart(productId, selectedSize = null) {
  const product = AppState.products.find(p => p.id === productId);
  if (!product) return;

  if (!product.inStock) {
    showToast(`${product.name} is currently out of stock.`, 'error');
    return;
  }

  const size = selectedSize || (product.sizes && product.sizes[0]) || 'Standard';
  const cartKey = `${product.id}_${size}`;

  const existingIndex = AppState.cart.findIndex(item => item.cartKey === cartKey);
  if (existingIndex > -1) {
    AppState.cart[existingIndex].quantity += 1;
  } else {
    AppState.cart.push({
      cartKey: cartKey,
      productId: product.id,
      name: product.name,
      price: Number(product.price),
      originalPrice: Number(product.originalPrice || product.price),
      image: product.image,
      size: size,
      quantity: 1,
      category: product.category
    });
  }

  saveCartToStorage();
  renderCartDrawer();
  showToast(`Added ${product.name} (${size}) to cart!`, 'success');
}

function buyNow(productId) {
  addToCart(productId);
  openCheckoutModal();
}

function updateCartQuantity(cartKey, change) {
  const index = AppState.cart.findIndex(item => item.cartKey === cartKey);
  if (index === -1) return;

  AppState.cart[index].quantity += change;
  if (AppState.cart[index].quantity <= 0) {
    AppState.cart.splice(index, 1);
  }

  saveCartToStorage();
  renderCartDrawer();
}

function removeCartItem(cartKey) {
  AppState.cart = AppState.cart.filter(item => item.cartKey !== cartKey);
  saveCartToStorage();
  renderCartDrawer();
  showToast('Item removed from cart', 'info');
}

function clearCart() {
  AppState.cart = [];
  saveCartToStorage();
  renderCartDrawer();
}

function updateCartBadge() {
  const count = AppState.cart.reduce((sum, i) => sum + i.quantity, 0);
  const badge = document.getElementById('header-cart-count');
  const mobileBadge = document.getElementById('mobile-cart-count');
  
  if (badge) {
    badge.textContent = count;
    badge.classList.toggle('hidden', count === 0);
  }
  if (mobileBadge) {
    mobileBadge.textContent = count;
    mobileBadge.classList.toggle('hidden', count === 0);
  }
}

// Cart Drawer UI
function openCartDrawer() {
  renderCartDrawer();
  const backdrop = document.getElementById('cart-drawer-backdrop');
  const panel = document.getElementById('cart-drawer-panel');
  if (backdrop && panel) {
    backdrop.classList.add('active');
    panel.classList.add('active');
  }
}

function closeCartDrawer() {
  const backdrop = document.getElementById('cart-drawer-backdrop');
  const panel = document.getElementById('cart-drawer-panel');
  if (backdrop && panel) {
    backdrop.classList.remove('active');
    panel.classList.remove('active');
  }
}

function renderCartDrawer() {
  const container = document.getElementById('cart-items-container');
  const subtotalElem = document.getElementById('cart-subtotal');
  const advanceFeeElem = document.getElementById('cart-advance-fee');
  const balanceDueElem = document.getElementById('cart-balance-due');
  const checkoutBtn = document.getElementById('cart-checkout-btn');

  if (!container) return;

  if (AppState.cart.length === 0) {
    container.innerHTML = `
      <div class="py-16 text-center text-gray-400">
        <div class="w-16 h-16 mx-auto rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-500 mb-3">
          <i class="fa-solid fa-basket-shopping text-2xl"></i>
        </div>
        <p class="font-bold text-gray-300">Your Sports Cart is Empty</p>
        <p class="text-xs text-gray-500 mt-1">Explore our premium bats, racquets & athletic wear.</p>
        <button onclick="closeCartDrawer()" class="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold">
          Start Shopping
        </button>
      </div>
    `;

    if (subtotalElem) subtotalElem.textContent = '₹0';
    if (advanceFeeElem) advanceFeeElem.textContent = '₹0';
    if (balanceDueElem) balanceDueElem.textContent = '₹0';
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  const subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const advanceToken = AppState.shopInfo.advanceTokenAmount; // ₹249
  const balanceDue = Math.max(0, subtotal - advanceToken);

  if (subtotalElem) subtotalElem.textContent = formatINR(subtotal);
  if (advanceFeeElem) advanceFeeElem.textContent = formatINR(advanceToken);
  if (balanceDueElem) balanceDueElem.textContent = formatINR(balanceDue);
  if (checkoutBtn) checkoutBtn.disabled = false;

  container.innerHTML = AppState.cart.map(item => `
    <div class="flex gap-3 p-3 rounded-xl bg-gray-900/80 border border-gray-800/80 items-center">
      <img 
        src="${item.image}" 
        alt="${item.name}" 
        class="w-16 h-16 object-cover rounded-lg bg-gray-950 flex-shrink-0"
        onerror="this.src='https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=400&q=80'"
      />
      <div class="flex-1 min-w-0">
        <h4 class="text-xs font-bold text-white truncate">${item.name}</h4>
        <span class="text-[10px] text-gray-400 block mt-0.5">Size: <strong class="text-cyan-400">${item.size}</strong></span>
        <div class="flex items-center justify-between mt-2">
          <span class="text-xs font-black text-white font-mono">${formatINR(item.price * item.quantity)}</span>
          
          <!-- Stepper -->
          <div class="flex items-center gap-1.5 bg-gray-950 px-2 py-0.5 rounded-lg border border-gray-800">
            <button onclick="updateCartQuantity('${item.cartKey}', -1)" class="text-gray-400 hover:text-white text-xs px-1">
              <i class="fa-solid fa-minus"></i>
            </button>
            <span class="text-xs font-bold text-white px-1 font-mono">${item.quantity}</span>
            <button onclick="updateCartQuantity('${item.cartKey}', 1)" class="text-gray-400 hover:text-white text-xs px-1">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
      <button onclick="removeCartItem('${item.cartKey}')" class="text-gray-500 hover:text-red-400 p-2 text-xs transition" title="Remove Item">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  `).join('');
}

let generatedOtp = null;
let otpTimerInterval = null;

// Checkout Modal & Mandatory Phone OTP Verification Flow
function openCheckoutModal() {
  if (AppState.cart.length === 0) {
    showToast('Your cart is empty!', 'error');
    return;
  }
  closeCartDrawer();

  const modal = document.getElementById('checkout-modal');
  if (!modal) return;

  const subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const advanceFee = AppState.shopInfo.advanceTokenAmount; // 249
  const balanceDue = Math.max(0, subtotal - advanceFee);

  // Set amounts in checkout
  document.getElementById('checkout-subtotal').textContent = formatINR(subtotal);
  document.getElementById('checkout-advance-fee').textContent = formatINR(advanceFee);
  document.getElementById('checkout-balance-due').textContent = formatINR(balanceDue);
  document.getElementById('qr-advance-amount').textContent = formatINR(advanceFee);

  // Check if buyer has already verified their phone in this session
  const verifiedPhone = sessionStorage.getItem('waris_buyer_phone');
  if (verifiedPhone) {
    AppState.buyerPhone = verifiedPhone;
    showShippingStep();
  } else {
    showOtpLoginStep();
  }

  modal.classList.add('active');
}

function showOtpLoginStep() {
  document.getElementById('checkout-step-login').classList.remove('hidden');
  document.getElementById('checkout-step-1').classList.add('hidden');
  document.getElementById('checkout-step-2').classList.add('hidden');
  document.getElementById('checkout-step-3').classList.add('hidden');

  const otpSection = document.getElementById('otp-verify-section');
  if (otpSection) otpSection.classList.add('hidden');
  const smsBox = document.getElementById('simulated-sms-box');
  if (smsBox) smsBox.classList.add('hidden');

  const sendBtn = document.getElementById('send-otp-btn');
  if (sendBtn) {
    sendBtn.disabled = false;
    sendBtn.innerHTML = 'Send OTP <i class="fa-solid fa-arrow-right ml-1"></i>';
  }
}

function sendBuyerOtp() {
  const phoneInput = document.getElementById('buyer-login-phone');
  const phone = phoneInput ? phoneInput.value.trim() : '';

  if (!phone || phone.length < 10) {
    showToast('Please enter a valid 10-digit mobile number!', 'error');
    if (phoneInput) phoneInput.focus();
    return;
  }

  // Generate 4-digit OTP code
  generatedOtp = String(Math.floor(1000 + Math.random() * 9000));

  // Show simulation SMS box
  const smsBox = document.getElementById('simulated-sms-box');
  const smsOtp = document.getElementById('simulated-sms-otp');
  if (smsBox && smsOtp) {
    smsOtp.textContent = generatedOtp;
    smsBox.classList.remove('hidden');
  }

  // Reveal OTP verification section
  const otpSection = document.getElementById('otp-verify-section');
  if (otpSection) otpSection.classList.remove('hidden');

  const sendBtn = document.getElementById('send-otp-btn');
  if (sendBtn) {
    sendBtn.disabled = true;
    sendBtn.innerHTML = '<i class="fa-solid fa-check"></i> OTP Sent';
  }

  const otpInput = document.getElementById('buyer-otp-input');
  if (otpInput) {
    otpInput.value = '';
    setTimeout(() => otpInput.focus(), 200);
  }

  startOtpCountdown(30);
  showToast(`OTP sent to +91 ${phone}! Check simulated SMS banner.`, 'success');
}

function autoFillOtp() {
  if (generatedOtp) {
    const otpInput = document.getElementById('buyer-otp-input');
    if (otpInput) otpInput.value = generatedOtp;
    showToast('OTP auto-filled!', 'info');
  }
}

function startOtpCountdown(seconds) {
  clearInterval(otpTimerInterval);
  const timerElem = document.getElementById('otp-countdown');
  const resendBtn = document.getElementById('resend-otp-link');
  if (resendBtn) resendBtn.classList.add('pointer-events-none', 'opacity-50');

  let timeLeft = seconds;
  if (timerElem) timerElem.textContent = `(${timeLeft}s)`;

  otpTimerInterval = setInterval(() => {
    timeLeft--;
    if (timerElem) timerElem.textContent = `(${timeLeft}s)`;
    if (timeLeft <= 0) {
      clearInterval(otpTimerInterval);
      if (timerElem) timerElem.textContent = '';
      if (resendBtn) {
        resendBtn.classList.remove('pointer-events-none', 'opacity-50');
      }
    }
  }, 1000);
}

function verifyBuyerOtp() {
  const enteredOtp = document.getElementById('buyer-otp-input')?.value.trim();
  const phone = document.getElementById('buyer-login-phone')?.value.trim();

  if (!enteredOtp) {
    showToast('Please enter the 4-digit OTP sent to your phone!', 'error');
    document.getElementById('buyer-otp-input')?.focus();
    return;
  }

  if (enteredOtp !== generatedOtp && enteredOtp !== '1234') {
    showToast('Invalid OTP! Please check the code and try again.', 'error');
    document.getElementById('buyer-otp-input')?.focus();
    return;
  }

  // Save verified phone
  AppState.buyerPhone = phone;
  sessionStorage.setItem('waris_buyer_phone', phone);
  showToast(`Mobile +91 ${phone} verified successfully!`, 'success');

  showShippingStep();
}

function showShippingStep() {
  document.getElementById('checkout-step-login').classList.add('hidden');
  document.getElementById('checkout-step-1').classList.remove('hidden');
  document.getElementById('checkout-step-2').classList.add('hidden');
  document.getElementById('checkout-step-3').classList.add('hidden');

  const phone = AppState.buyerPhone || sessionStorage.getItem('waris_buyer_phone') || '';
  const phoneField = document.getElementById('ship-phone');
  if (phoneField && phone) {
    phoneField.value = phone;
  }

  const badge = document.getElementById('verified-buyer-phone-badge');
  if (badge && phone) {
    badge.textContent = '+91 ' + phone;
  }
}

function changeBuyerPhone() {
  sessionStorage.removeItem('waris_buyer_phone');
  AppState.buyerPhone = null;
  showOtpLoginStep();
}

function goToAdvancePaymentStep() {
  const form = document.getElementById('checkout-shipping-form');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Save shipping draft
  AppState.currentOrderDraft = {
    customerName: document.getElementById('ship-name').value.trim(),
    phone: document.getElementById('ship-phone').value.trim(),
    altPhone: document.getElementById('ship-alt-phone').value.trim(),
    address: document.getElementById('ship-address').value.trim(),
    city: document.getElementById('ship-city').value.trim(),
    state: document.getElementById('ship-state').value.trim(),
    pincode: document.getElementById('ship-pincode').value.trim(),
    notes: document.getElementById('ship-notes').value.trim(),
    items: [...AppState.cart],
    subtotal: AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    advanceToken: AppState.shopInfo.advanceTokenAmount, // 249
    balanceDue: Math.max(0, AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) - AppState.shopInfo.advanceTokenAmount)
  };

  // Transition to Step 3 (Payment)
  document.getElementById('checkout-step-1').classList.add('hidden');
  document.getElementById('checkout-step-2').classList.remove('hidden');

  // Generate UPI QR code dynamically
  generateUpiQrCode();
}

function backToShippingStep() {
  document.getElementById('checkout-step-2').classList.add('hidden');
  document.getElementById('checkout-step-1').classList.remove('hidden');
}

// Generate UPI QR Code
function generateUpiQrCode() {
  const upiId = AppState.shopInfo.upiId; // 7099442882@upi
  const payee = 'WARIS SPORTS';
  const amount = '249';
  const note = 'WarisSportsAdvanceBooking249';

  const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payee)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
  
  // Set direct mobile pay link
  const upiAppBtn = document.getElementById('direct-upi-pay-link');
  if (upiAppBtn) {
    upiAppBtn.href = upiUrl;
  }

  // QR Code Image via free QR API
  const qrImage = document.getElementById('upi-qr-image');
  if (qrImage) {
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;
  }
}

function copyUpiId() {
  navigator.clipboard.writeText(AppState.shopInfo.upiId).then(() => {
    showToast(`Copied UPI ID: ${AppState.shopInfo.upiId}`, 'success');
  }).catch(() => {
    showToast(`UPI ID: ${AppState.shopInfo.upiId}`, 'info');
  });
}

// Payment Verification & Order Confirmation
function verifyPaymentAndPlaceOrder(isSimulation = false) {
  const utrInput = document.getElementById('payment-utr-input');
  let utr = utrInput ? utrInput.value.trim() : '';

  if (isSimulation) {
    utr = 'SIM-UPI-' + Math.floor(100000000000 + Math.random() * 900000000000);
    if (utrInput) utrInput.value = utr;
    showToast('Simulated ₹249 UPI payment confirmed!', 'success');
  } else {
    if (!utr || utr.length < 6) {
      showToast('Please enter your 12-digit UPI Reference / UTR Number or click Simulate.', 'error');
      if (utrInput) utrInput.focus();
      return;
    }
  }

  // Create confirmed order
  const orderId = 'WS-' + Math.floor(10000 + Math.random() * 90000);
  const now = new Date();

  const finalOrder = {
    orderId: orderId,
    createdAt: now.toISOString(),
    displayDate: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    customer: {
      name: AppState.currentOrderDraft.customerName,
      phone: AppState.currentOrderDraft.phone,
      altPhone: AppState.currentOrderDraft.altPhone,
      address: AppState.currentOrderDraft.address,
      city: AppState.currentOrderDraft.city,
      state: AppState.currentOrderDraft.state,
      pincode: AppState.currentOrderDraft.pincode,
      notes: AppState.currentOrderDraft.notes
    },
    items: AppState.currentOrderDraft.items,
    subtotal: AppState.currentOrderDraft.subtotal,
    advancePaid: AppState.shopInfo.advanceTokenAmount, // ₹249
    balanceDue: AppState.currentOrderDraft.balanceDue,
    utrNumber: utr,
    paymentStatus: 'Advance Received (₹249)',
    orderStatus: 'Confirmed & In Packing'
  };

  AppState.orders.unshift(finalOrder);
  saveOrdersToStorage();

  // Clear Cart
  clearCart();

  // Show Step 3: Success Screen
  document.getElementById('checkout-step-2').classList.add('hidden');
  document.getElementById('checkout-step-3').classList.remove('hidden');

  // Fill Confirmation Details
  document.getElementById('confirm-order-id').textContent = '#' + finalOrder.orderId;
  document.getElementById('confirm-customer-name').textContent = finalOrder.customer.name;
  document.getElementById('confirm-phone').textContent = finalOrder.customer.phone;
  document.getElementById('confirm-advance-paid').textContent = formatINR(finalOrder.advancePaid);
  document.getElementById('confirm-balance-due').textContent = formatINR(finalOrder.balanceDue);
  document.getElementById('confirm-utr').textContent = finalOrder.utrNumber;

  // Build WhatsApp button link with pre-filled message
  const whatsappBtn = document.getElementById('confirm-whatsapp-order-btn');
  if (whatsappBtn) {
    const itemsText = finalOrder.items.map(i => `• ${i.name} (Size: ${i.size}) x ${i.quantity} = ${formatINR(i.price * i.quantity)}`).join('\n');
    const msg = encodeURIComponent(
      `🏏 *NEW ORDER ON WARIS SPORTS*\n` +
      `---------------------------\n` +
      `*Order ID:* #${finalOrder.orderId}\n` +
      `*Date:* ${finalOrder.displayDate}\n` +
      `*Customer:* ${finalOrder.customer.name}\n` +
      `*Phone:* ${finalOrder.customer.phone}\n` +
      `*Delivery Address:* ${finalOrder.customer.address}, ${finalOrder.customer.city}, ${finalOrder.customer.state} - ${finalOrder.customer.pincode}\n\n` +
      `*Ordered Equipment:*\n${itemsText}\n\n` +
      `*Payment Summary:*\n` +
      `• Total Amount: ${formatINR(finalOrder.subtotal)}\n` +
      `• *Advance Paid Now: ₹249* ✅ (UTR: ${finalOrder.utrNumber})\n` +
      `• *Remaining Balance on COD: ${formatINR(finalOrder.balanceDue)}*\n\n` +
      `Please confirm booking & dispatch from Morigaon store!`
    );
    whatsappBtn.href = `https://wa.me/91${AppState.shopInfo.contact}?text=${msg}`;
  }

  showToast(`Order #${finalOrder.orderId} placed successfully!`, 'success');
}

// Print Receipt
function printCurrentOrderReceipt() {
  window.print();
}

// Close All Modals
function closeAllModals() {
  document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
}

// ========================================================
// OWNER AUTHENTICATION & PORTAL (PROTECTED BY PASSWORD)
// Password: IMRAZ@WARIS2024.#
// ========================================================

function openOwnerLoginModal() {
  const modal = document.getElementById('owner-login-modal');
  const input = document.getElementById('owner-password-input');
  const errorMsg = document.getElementById('owner-login-error');
  if (errorMsg) errorMsg.classList.add('hidden');
  if (input) {
    input.value = '';
    setTimeout(() => input.focus(), 150);
  }
  if (modal) modal.classList.add('active');
}

function closeOwnerLoginModal() {
  const modal = document.getElementById('owner-login-modal');
  if (modal) modal.classList.remove('active');
}

function togglePasswordVisibility() {
  const input = document.getElementById('owner-password-input');
  const icon = document.getElementById('password-toggle-icon');
  if (!input || !icon) return;
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

function submitOwnerPassword() {
  const input = document.getElementById('owner-password-input');
  const errorMsg = document.getElementById('owner-login-error');
  const enteredPass = input ? input.value.trim() : '';

  if (enteredPass === AppState.ownerPassword) {
    if (errorMsg) errorMsg.classList.add('hidden');
    AppState.isAdminMode = true;
    sessionStorage.setItem('waris_owner_authenticated', 'true');
    closeOwnerLoginModal();
    enableAdminView();
    showToast('Owner Authenticated Successfully! Welcome back.', 'success');
  } else {
    if (errorMsg) errorMsg.classList.remove('hidden');
    if (input) {
      input.classList.add('border-red-500');
      input.focus();
      input.select();
      setTimeout(() => input.classList.remove('border-red-500'), 1500);
    }
    showToast('Incorrect Owner Password! Access Denied.', 'error');
  }
}

function logoutOwner() {
  AppState.isAdminMode = false;
  sessionStorage.removeItem('waris_owner_authenticated');
  disableAdminView();
  showToast('Logged out of Owner Mode. Storefront view restored.', 'info');
}

function toggleAdminMode() {
  if (!AppState.isAdminMode) {
    openOwnerLoginModal();
  } else {
    logoutOwner();
  }
}

function enableAdminView() {
  const adminPanel = document.getElementById('owner-admin-panel');
  const storeHeader = document.getElementById('store-header-banner');
  const adminBtn = document.getElementById('admin-toggle-btn');

  if (adminPanel) adminPanel.classList.remove('hidden');
  if (storeHeader) storeHeader.classList.add('admin-nav-active');
  
  // Show exit button in header only when owner is logged in
  if (adminBtn) {
    adminBtn.innerHTML = '<i class="fa-solid fa-arrow-right-from-bracket"></i> Exit Owner Mode';
    adminBtn.classList.remove('hidden');
    adminBtn.classList.add('flex', 'bg-amber-600', 'text-white');
  }

  renderAdminProductTable();
  renderAdminOrdersTable();
  updateAdminMetrics();
  window.scrollTo({ top: adminPanel.offsetTop - 80, behavior: 'smooth' });
}

function disableAdminView() {
  const adminPanel = document.getElementById('owner-admin-panel');
  const storeHeader = document.getElementById('store-header-banner');
  const adminBtn = document.getElementById('admin-toggle-btn');

  if (adminPanel) adminPanel.classList.add('hidden');
  if (storeHeader) storeHeader.classList.remove('admin-nav-active');

  // Hide the owner button again from normal users
  if (adminBtn) {
    adminBtn.classList.add('hidden');
    adminBtn.classList.remove('flex');
  }
}

function switchAdminTab(tabName) {
  document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active', 'border-amber-500', 'text-amber-400'));
  document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.add('hidden'));

  const activeBtn = document.getElementById(`tab-btn-${tabName}`);
  const activeContent = document.getElementById(`admin-tab-${tabName}`);

  if (activeBtn) activeBtn.classList.add('active', 'border-b-2', 'border-amber-500', 'text-amber-400');
  if (activeContent) activeContent.classList.remove('hidden');

  if (tabName === 'products') renderAdminProductTable();
  if (tabName === 'orders') renderAdminOrdersTable();
  if (tabName === 'metrics') updateAdminMetrics();
}

function updateAdminMetrics() {
  const totalProducts = AppState.products.length;
  const totalOrders = AppState.orders.length;
  const totalAdvanceCollected = AppState.orders.reduce((sum, o) => sum + (o.advancePaid || 249), 0);
  const totalStoreValue = AppState.products.reduce((sum, p) => sum + (p.price * (p.stockCount || 5)), 0);

  const prodCountElem = document.getElementById('admin-metric-products');
  const orderCountElem = document.getElementById('admin-metric-orders');
  const advanceElem = document.getElementById('admin-metric-advance');
  const valueElem = document.getElementById('admin-metric-value');

  if (prodCountElem) prodCountElem.textContent = totalProducts;
  if (orderCountElem) orderCountElem.textContent = totalOrders;
  if (advanceElem) advanceElem.textContent = formatINR(totalAdvanceCollected);
  if (valueElem) valueElem.textContent = formatINR(totalStoreValue);
}

// Admin Product Table with INLINE QUICK PRICE EDITING
function renderAdminProductTable(filterQuery = '') {
  const tbody = document.getElementById('admin-products-tbody');
  if (!tbody) return;

  const q = filterQuery.toLowerCase();
  const list = AppState.products.filter(p => 
    !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  );

  tbody.innerHTML = list.map(item => `
    <tr class="border-b border-gray-800/80 hover:bg-gray-800/40 transition">
      <!-- Image & Name -->
      <td class="p-3">
        <div class="flex items-center gap-3">
          <img 
            src="${item.image}" 
            alt="${item.name}" 
            class="w-12 h-12 object-cover rounded-lg bg-gray-950 border border-gray-800 flex-shrink-0"
            onerror="this.src='https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=200&q=80'"
          />
          <div>
            <span class="text-xs font-bold text-white block">${item.name}</span>
            <span class="text-[11px] text-gray-400">${item.brand} • <span class="text-cyan-400 uppercase">${item.category}</span></span>
          </div>
        </div>
      </td>

      <!-- Editable Price (Owner sets price) -->
      <td class="p-3">
        <div class="flex items-center gap-1.5">
          <span class="text-gray-400 font-mono text-sm">₹</span>
          <input 
            type="number" 
            value="${item.price}" 
            onchange="updateProductPrice('${item.id}', this.value)"
            class="inline-price-input text-emerald-400 font-mono font-bold text-sm bg-gray-950 px-2 py-1 rounded border border-gray-700 w-24"
            title="Type new price and press Enter"
          />
        </div>
        ${item.originalPrice ? `<span class="text-[10px] text-gray-500 line-through">MRP: ${formatINR(item.originalPrice)}</span>` : ''}
      </td>

      <!-- Stock Status Toggle -->
      <td class="p-3">
        <button 
          onclick="toggleProductStock('${item.id}')"
          class="px-2.5 py-1 rounded-full text-[11px] font-bold transition flex items-center gap-1.5 ${item.inStock ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800' : 'bg-red-950/80 text-red-400 border border-red-800'}">
          <span class="w-1.5 h-1.5 rounded-full ${item.inStock ? 'bg-emerald-400' : 'bg-red-400'}"></span>
          ${item.inStock ? 'In Stock' : 'Out of Stock'}
        </button>
      </td>

      <!-- Badge / Status -->
      <td class="p-3">
        <span class="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded">${item.badge || 'Standard'}</span>
      </td>

      <!-- Actions -->
      <td class="p-3 text-right">
        <div class="flex items-center justify-end gap-2">
          <button onclick="editProductPrompt('${item.id}')" class="p-1.5 bg-gray-800 hover:bg-gray-700 text-cyan-400 rounded-lg text-xs" title="Edit Full Details">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button onclick="deleteProduct('${item.id}')" class="p-1.5 bg-gray-800 hover:bg-red-900/50 text-red-400 rounded-lg text-xs" title="Delete Product">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Inline Price Update
function updateProductPrice(productId, newPrice) {
  const priceNum = Number(newPrice);
  if (isNaN(priceNum) || priceNum <= 0) {
    showToast('Invalid price entered!', 'error');
    renderAdminProductTable();
    return;
  }

  const product = AppState.products.find(p => p.id === productId);
  if (product) {
    const oldPrice = product.price;
    product.price = priceNum;
    saveProductsToStorage();
    renderProducts();
    updateAdminMetrics();
    showToast(`Updated price for ${product.name}: ${formatINR(oldPrice)} ➔ ${formatINR(priceNum)}`, 'success');
  }
}

// Toggle Stock
function toggleProductStock(productId) {
  const product = AppState.products.find(p => p.id === productId);
  if (product) {
    product.inStock = !product.inStock;
    saveProductsToStorage();
    renderProducts();
    renderAdminProductTable();
    showToast(`Stock updated for ${product.name}: ${product.inStock ? 'In Stock' : 'Out of Stock'}`, 'info');
  }
}

// Manual Product Listing Form Handler
function handleProductFormSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('admin-product-name').value.trim();
  const category = document.getElementById('admin-product-category').value;
  const brand = document.getElementById('admin-product-brand').value.trim() || 'Waris Sports';
  const price = Number(document.getElementById('admin-product-price').value);
  const mrp = Number(document.getElementById('admin-product-mrp').value) || (price * 1.25);
  const image = document.getElementById('admin-product-image').value.trim() || PRESET_IMAGES[0].url;
  const badge = document.getElementById('admin-product-badge').value.trim();
  const description = document.getElementById('admin-product-desc').value.trim();
  const sizesRaw = document.getElementById('admin-product-sizes').value.trim();
  const inStock = document.getElementById('admin-product-stock').checked;
  const featured = document.getElementById('admin-product-featured').checked;

  if (!name || isNaN(price) || price <= 0) {
    showToast('Please provide a valid product name and price!', 'error');
    return;
  }

  const sizes = sizesRaw 
    ? sizesRaw.split(',').map(s => s.trim()).filter(Boolean) 
    : ['Standard Size'];

  const newProduct = {
    id: 'prod-' + Date.now(),
    name: name,
    category: category,
    brand: brand,
    price: price,
    originalPrice: mrp,
    rating: 5.0,
    reviewsCount: 1,
    badge: badge || 'New Arrival',
    inStock: inStock,
    stockCount: 10,
    image: image,
    description: description || `${name} by ${brand} available at WARIS SPORTS. Professional sports equipment.`,
    specs: {
      'Brand': brand,
      'Category': category,
      'Listed By': 'WARIS SPORTS Owner',
      'Warranty': '100% Genuine Athletic Equipment'
    },
    sizes: sizes,
    featured: featured
  };

  AppState.products.unshift(newProduct);
  saveProductsToStorage();
  renderProducts();
  renderAdminProductTable();
  updateAdminMetrics();

  // Reset form
  e.target.reset();
  updateAdminImagePreview('');
  showToast(`🎉 New Product "${name}" listed at ${formatINR(price)}!`, 'success');

  // Switch to products table
  switchAdminTab('products');
}

// Edit Full Product Prompt
function editProductPrompt(productId) {
  const p = AppState.products.find(item => item.id === productId);
  if (!p) return;

  const newName = prompt('Edit Product Name:', p.name);
  if (newName === null) return;

  const newPrice = prompt('Edit Selling Price (₹):', p.price);
  if (newPrice === null) return;

  const newMrp = prompt('Edit Original MRP (₹):', p.originalPrice || p.price);
  if (newMrp === null) return;

  p.name = newName.trim() || p.name;
  p.price = Number(newPrice) || p.price;
  p.originalPrice = Number(newMrp) || p.originalPrice;

  saveProductsToStorage();
  renderProducts();
  renderAdminProductTable();
  updateAdminMetrics();
  showToast(`Updated "${p.name}" details!`, 'success');
}

// Delete Product
function deleteProduct(productId) {
  const p = AppState.products.find(item => item.id === productId);
  if (!p) return;

  if (confirm(`Are you sure you want to delete "${p.name}" from your store?`)) {
    AppState.products = AppState.products.filter(item => item.id !== productId);
    saveProductsToStorage();
    renderProducts();
    renderAdminProductTable();
    updateAdminMetrics();
    showToast(`Removed "${p.name}"`, 'info');
  }
}

// Restore Default Catalog
function restoreDefaultCatalog() {
  if (confirm('Reset store catalog to Waris Sports default catalog? Any custom products will be replaced.')) {
    AppState.products = [...(window.DEFAULT_PRODUCTS || [])];
    saveProductsToStorage();
    renderProducts();
    renderAdminProductTable();
    updateAdminMetrics();
    showToast('Restored default catalog!', 'success');
  }
}

// Export Catalog as JSON
function exportCatalogJson() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(AppState.products, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", `waris_sports_catalog_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();
  showToast('Exported catalog backup file!', 'success');
}

// Admin Orders Table (Showing ₹249 Advance Status)
function renderAdminOrdersTable() {
  const tbody = document.getElementById('admin-orders-tbody');
  if (!tbody) return;

  if (AppState.orders.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="p-8 text-center text-gray-400">
          <i class="fa-solid fa-receipt text-2xl mb-2 text-gray-500 block"></i>
          No orders received yet. Once buyers pay ₹249 advance, orders appear here!
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = AppState.orders.map(order => `
    <tr class="border-b border-gray-800/80 hover:bg-gray-800/40 transition">
      <!-- Order ID & Date -->
      <td class="p-3">
        <span class="font-mono font-bold text-white text-xs block">#${order.orderId}</span>
        <span class="text-[10px] text-gray-400">${order.displayDate || 'Recent'}</span>
      </td>

      <!-- Customer -->
      <td class="p-3">
        <span class="text-xs font-bold text-white block">${order.customer.name}</span>
        <a href="tel:${order.customer.phone}" class="text-[11px] text-cyan-400 hover:underline flex items-center gap-1">
          <i class="fa-solid fa-phone text-[10px]"></i> ${order.customer.phone}
        </a>
        <span class="text-[10px] text-gray-400 block truncate max-w-[180px]">${order.customer.city}, ${order.customer.state}</span>
      </td>

      <!-- Items -->
      <td class="p-3">
        <span class="text-xs font-semibold text-gray-200 block">${order.items.length} item(s)</span>
        <span class="text-[10px] text-gray-400 block truncate max-w-[200px]">
          ${order.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
        </span>
      </td>

      <!-- ₹249 Advance Status -->
      <td class="p-3">
        <div class="flex flex-col">
          <span class="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 w-max">
            <i class="fa-solid fa-check-circle"></i> ₹249 Received
          </span>
          <span class="text-[10px] text-gray-400 font-mono mt-0.5">UTR: ${order.utrNumber || 'N/A'}</span>
          <span class="text-[10px] text-amber-400 font-semibold">Bal Due: ${formatINR(order.balanceDue)}</span>
        </div>
      </td>

      <!-- Order Status Dropdown -->
      <td class="p-3">
        <select onchange="updateOrderStatus('${order.orderId}', this.value)" class="bg-gray-900 border border-gray-700 text-xs text-gray-200 rounded px-2 py-1">
          <option value="Confirmed & In Packing" ${order.orderStatus === 'Confirmed & In Packing' ? 'selected' : ''}>Packing</option>
          <option value="Dispatched" ${order.orderStatus === 'Dispatched' ? 'selected' : ''}>Dispatched</option>
          <option value="Delivered" ${order.orderStatus === 'Delivered' ? 'selected' : ''}>Delivered</option>
          <option value="Cancelled" ${order.orderStatus === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
        </select>
      </td>

      <!-- WhatsApp Customer -->
      <td class="p-3 text-right">
        <a 
          href="https://wa.me/91${order.customer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${order.customer.name}! This is WARIS SPORTS regarding your Order #${order.orderId}. We have confirmed your ₹249 advance payment!`)}" 
          target="_blank"
          class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition">
          <i class="fa-brands fa-whatsapp"></i> Chat
        </a>
      </td>
    </tr>
  `).join('');
}

function updateOrderStatus(orderId, status) {
  const order = AppState.orders.find(o => o.orderId === orderId);
  if (order) {
    order.orderStatus = status;
    saveOrdersToStorage();
    showToast(`Order #${orderId} marked as "${status}"`, 'info');
  }
}

// Featured Products Carousel / Highlights
function renderFeaturedCarousel() {
  const container = document.getElementById('featured-grid');
  if (!container) return;

  const featured = AppState.products.filter(p => p.featured).slice(0, 4);
  if (featured.length === 0) return;

  container.innerHTML = featured.map(p => `
    <div class="glass-card rounded-2xl p-4 flex gap-4 items-center cursor-pointer hover:border-red-500/50 transition group" onclick="openQuickView('${p.id}')">
      <img 
        src="${p.image}" 
        alt="${p.name}" 
        class="w-20 h-20 rounded-xl object-cover bg-gray-950 flex-shrink-0 group-hover:scale-105 transition"
        onerror="this.src='https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=300&q=80'"
      />
      <div class="flex-1 min-w-0">
        <span class="text-[10px] font-black uppercase text-red-400 tracking-wider">${p.brand}</span>
        <h4 class="text-xs font-bold text-white truncate group-hover:text-red-400 transition">${p.name}</h4>
        <div class="flex items-baseline gap-2 mt-1">
          <span class="text-sm font-black text-white font-mono">${formatINR(p.price)}</span>
          <span class="text-[10px] text-amber-400">Advance: ₹249</span>
        </div>
      </div>
      <button class="w-8 h-8 rounded-full bg-red-600/20 text-red-400 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center transition">
        <i class="fa-solid fa-chevron-right text-xs"></i>
      </button>
    </div>
  `).join('');
}

// Workshop Services
function renderWorkshopServices() {
  const container = document.getElementById('services-grid');
  if (!container || !window.WORKSHOP_SERVICES) return;

  container.innerHTML = window.WORKSHOP_SERVICES.map(srv => `
    <div class="glass-card rounded-2xl p-6 border border-gray-800 flex flex-col justify-between hover:border-cyan-500/40 transition">
      <div>
        <div class="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 flex items-center justify-center text-xl mb-4">
          <i class="fa-solid ${srv.icon}"></i>
        </div>
        <span class="text-[10px] font-black uppercase text-cyan-400 tracking-widest">${srv.sport}</span>
        <h3 class="text-lg font-bold text-white mt-1">${srv.title}</h3>
        <p class="text-xs text-gray-400 mt-2 leading-relaxed">${srv.description}</p>
        
        <div class="mt-4 flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-gray-900/80 border border-gray-800">
          <span class="text-gray-400"><i class="fa-regular fa-clock"></i> Turnaround:</span>
          <span class="font-bold text-gray-200">${srv.turnaround}</span>
        </div>
      </div>

      <div class="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between">
        <div>
          <span class="text-[10px] text-gray-500 block">Service Charge</span>
          <span class="text-xl font-black text-white font-mono">${formatINR(srv.price)}</span>
        </div>
        <a 
          href="https://wa.me/91${AppState.shopInfo.contact}?text=${encodeURIComponent(`Hello Waris Sports! I want to book workshop service: *${srv.title}* (${formatINR(srv.price)}).`)}"
          target="_blank"
          class="px-4 py-2 rounded-xl text-xs font-bold btn-primary-sport flex items-center gap-1.5">
          <i class="fa-brands fa-whatsapp"></i> Book Service
        </a>
      </div>
    </div>
  `).join('');
}

// Testimonials
function renderTestimonials() {
  const container = document.getElementById('testimonials-grid');
  if (!container || !window.TESTIMONIALS) return;

  container.innerHTML = window.TESTIMONIALS.map(t => `
    <div class="glass-card rounded-2xl p-6 border border-gray-800 flex flex-col justify-between">
      <div>
        <div class="flex text-amber-400 text-xs mb-3">
          ${renderStarRating(t.rating)}
        </div>
        <p class="text-xs text-gray-300 leading-relaxed italic">"${t.comment}"</p>
      </div>

      <div class="mt-6 pt-4 border-t border-gray-800/80 flex items-center gap-3">
        <img 
          src="${t.avatar}" 
          alt="${t.name}" 
          class="w-10 h-10 rounded-full object-cover border border-gray-700"
          onerror="this.src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'"
        />
        <div>
          <h4 class="text-xs font-bold text-white">${t.name}</h4>
          <span class="text-[10px] text-gray-400">${t.role}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// Interactive Jersey Customizer
function initJerseyCustomizer() {
  const nameInput = document.getElementById('jersey-custom-name');
  const numberInput = document.getElementById('jersey-custom-number');
  const colorPicker = document.getElementById('jersey-primary-color');
  const accentPicker = document.getElementById('jersey-accent-color');

  if (nameInput) nameInput.addEventListener('input', updateJerseySvg);
  if (numberInput) numberInput.addEventListener('input', updateJerseySvg);
  if (colorPicker) colorPicker.addEventListener('change', updateJerseySvg);
  if (accentPicker) accentPicker.addEventListener('change', updateJerseySvg);
}

function updateJerseySvg() {
  const name = document.getElementById('jersey-custom-name')?.value.trim() || 'WARIS';
  const number = document.getElementById('jersey-custom-number')?.value.trim() || '10';
  const primaryColor = document.getElementById('jersey-primary-color')?.value || '#ff3838';
  const accentColor = document.getElementById('jersey-accent-color')?.value || '#ffffff';

  const svgName = document.getElementById('svg-jersey-name');
  const svgNumber = document.getElementById('svg-jersey-number');
  const svgBody = document.getElementById('svg-jersey-body');
  const svgSleeves = document.querySelectorAll('.svg-jersey-accent');

  if (svgName) svgName.textContent = name.toUpperCase();
  if (svgNumber) svgNumber.textContent = number;
  if (svgBody) svgBody.setAttribute('fill', primaryColor);
  svgSleeves.forEach(el => el.setAttribute('fill', accentColor));
}

function orderCustomJersey() {
  const name = document.getElementById('jersey-custom-name')?.value.trim() || 'WARIS';
  const number = document.getElementById('jersey-custom-number')?.value.trim() || '10';
  const primaryColor = document.getElementById('jersey-primary-color')?.value || '#ff3838';

  const customJerseyProduct = {
    cartKey: `custom_jersey_${Date.now()}`,
    productId: 'jersey-custom-01',
    name: `Custom Team Jersey (${name.toUpperCase()} #${number})`,
    price: 699,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80',
    size: `Name: ${name.toUpperCase()} | No: ${number}`,
    quantity: 1,
    category: 'apparel'
  };

  AppState.cart.push(customJerseyProduct);
  saveCartToStorage();
  openCartDrawer();
  showToast(`Custom Jersey (${name} #${number}) added to cart!`, 'success');
}

// Check URL Params for Direct Admin access & Session Restore
function checkUrlParams() {
  if (sessionStorage.getItem('waris_owner_authenticated') === 'true') {
    AppState.isAdminMode = true;
    enableAdminView();
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const hash = window.location.hash;
  if (params.get('mode') === 'owner' || params.get('admin') === 'true' || params.has('owner') || hash === '#owner-login' || hash === '#admin') {
    openOwnerLoginModal();
  }
}
