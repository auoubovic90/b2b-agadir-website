// B2B Agadir Super-App JavaScript
// State Management
const state = {
    currentScreen: 'home',
    currentLang: 'en',
    isAdmin: false,
    cart: [],
    translations: {},
    products: [],
    services: []
};

// Admin Credentials
const ADMIN_CREDENTIALS = {
    username: 'ayoubovic09',
    password: 'S@ha120120'
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    loadTranslations();
    loadSampleData();
    animateStats();
    alternateWhatsApp();
});

function initializeApp() {
    // Check for saved preferences
    const savedLang = localStorage.getItem('language') || 'en';
    const savedTheme = localStorage.getItem('theme') || 'dark';

    state.currentLang = savedLang;
    document.getElementById('langSelect').value = savedLang;

    if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        document.getElementById('themeToggle').checked = false;
    }

    // Check if admin is logged in
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (isAdmin) {
        state.isAdmin = true;
        showAdminTab();
    }
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const screen = e.currentTarget.dataset.screen;
            navigateToScreen(screen);
        });
    });

    // Home CTAs
    document.getElementById('diagnoseBtn').addEventListener('click', () => {
        navigateToScreen('chat');
    });

    document.getElementById('bookBtn').addEventListener('click', () => {
        navigateToScreen('chat');
        setTimeout(() => {
            addBotMessage(state.translations[state.currentLang]?.chat?.bookVisit || 'Let me help you book a technician visit. What device needs service?');
        }, 300);
    });

    // Language
    document.getElementById('langSelect').addEventListener('change', (e) => {
        changeLanguage(e.target.value);
    });

    document.getElementById('langBtn').addEventListener('click', () => {
        const select = document.getElementById('langSelect');
        const langs = ['en', 'fr', 'ar'];
        const currentIndex = langs.indexOf(state.currentLang);
        const nextLang = langs[(currentIndex + 1) % langs.length];
        select.value = nextLang;
        changeLanguage(nextLang);
    });

    // Theme
    document.getElementById('themeToggle').addEventListener('change', (e) => {
        toggleTheme(e.target.checked);
    });

    // Store
    document.getElementById('searchBtn').addEventListener('click', () => {
        document.getElementById('searchBar').classList.toggle('hidden');
    });

    document.getElementById('searchInput').addEventListener('input', (e) => {
        filterProducts(e.target.value);
    });

    // Chat
    document.getElementById('sendBtn').addEventListener('click', sendMessage);
    document.getElementById('chatInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    document.querySelectorAll('.quick-reply').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const issue = e.currentTarget.dataset.issue;
            handleQuickReply(issue);
        });
    });

    // Admin
    document.getElementById('adminLoginBtn').addEventListener('click', () => {
        document.getElementById('loginModal').classList.add('active');
    });

    document.getElementById('cancelLoginBtn').addEventListener('click', () => {
        document.getElementById('loginModal').classList.remove('active');
    });

    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        handleLogin();
    });

    document.getElementById('logoutBtn')?.addEventListener('click', handleLogout);

    // Admin Tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const tabName = e.currentTarget.dataset.tab;
            switchAdminTab(tabName);
        });
    });
}

function navigateToScreen(screenName) {
    // Update screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenName + 'Screen').classList.add('active');

    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-screen="${screenName}"]`).classList.add('active');

    state.currentScreen = screenName;
}

function changeLanguage(lang) {
    state.currentLang = lang;
    localStorage.setItem('language', lang);

    // Update direction for Arabic
    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }

    // Update all translatable elements
    updateTranslations();
}

function updateTranslations() {
    const translations = state.translations[state.currentLang] || state.translations['en'];

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        const value = getNestedTranslation(translations, key);
        if (value) {
            element.textContent = value;
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.dataset.i18nPlaceholder;
        const value = getNestedTranslation(translations, key);
        if (value) {
            element.placeholder = value;
        }
    });
}

function getNestedTranslation(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

function toggleTheme(isDark) {
    if (isDark) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    }
}

function loadTranslations() {
    // English
    state.translations.en = {
        nav: {
            home: 'Home',
            services: 'Services',
            store: 'Store',
            chat: 'Chat',
            more: 'More'
        },
        home: {
            hero: {
                title: 'Professional IT Solutions',
                subtitle: 'One-stop platform for diagnostics, repairs & electronics'
            },
            cta: {
                diagnose: 'Diagnose my problem',
                book: 'Book technician'
            },
            stats: {
                apps: 'Apps Delivered',
                rating: 'Rating',
                savings: '% Cost Saved'
            }
        },
        services: {
            title: 'Our Services'
        },
        store: {
            title: 'Electronics Store',
            search: 'Search products...'
        },
        chat: {
            title: 'AI Diagnostic Bot',
            welcome: 'Hello! I\'m here to help diagnose your IT problems. What issue are you experiencing?',
            input: 'Type your message...',
            issues: {
                slow: 'Slow PC',
                virus: 'Virus/Malware',
                screen: 'Broken Screen',
                network: 'Network Issues'
            },
            bookVisit: 'Let me help you book a technician visit. What device needs service?'
        },
        more: {
            title: 'More',
            language: 'Language',
            theme: 'Dark Mode',
            share: 'Share App',
            admin: 'Admin Login'
        },
        admin: {
            title: 'Admin Dashboard',
            logout: 'Logout',
            kpi: {
                products: 'Total Products',
                lowStock: 'Low Stock',
                inquiries: 'Today Inquiries',
                pending: 'Pending Payments'
            },
            tabs: {
                products: 'Products',
                inquiries: 'Inquiries'
            },
            addProduct: '+ Add Product'
        },
        login: {
            title: 'Admin Login',
            username: 'Username',
            password: 'Password',
            cancel: 'Cancel',
            submit: 'Login'
        }
    };

    // French
    state.translations.fr = {
        nav: {
            home: 'Accueil',
            services: 'Services',
            store: 'Boutique',
            chat: 'Chat',
            more: 'Plus'
        },
        home: {
            hero: {
                title: 'Solutions IT Professionnelles',
                subtitle: 'Plateforme unique pour diagnostics, réparations et électronique'
            },
            cta: {
                diagnose: 'Diagnostiquer mon problème',
                book: 'Réserver un technicien'
            },
            stats: {
                apps: 'Apps Livrées',
                rating: 'Note',
                savings: '% Économisé'
            }
        },
        services: {
            title: 'Nos Services'
        },
        store: {
            title: 'Boutique Électronique',
            search: 'Rechercher des produits...'
        },
        chat: {
            title: 'Bot de Diagnostic IA',
            welcome: 'Bonjour! Je suis là pour vous aider à diagnostiquer vos problèmes IT. Quel problème rencontrez-vous?',
            input: 'Tapez votre message...',
            issues: {
                slow: 'PC Lent',
                virus: 'Virus/Malware',
                screen: 'Écran Cassé',
                network: 'Problèmes Réseau'
            },
            bookVisit: 'Permettez-moi de vous aider à réserver une visite de technicien. Quel appareil nécessite un service?'
        },
        more: {
            title: 'Plus',
            language: 'Langue',
            theme: 'Mode Sombre',
            share: 'Partager l\'App',
            admin: 'Connexion Admin'
        },
        admin: {
            title: 'Tableau de Bord Admin',
            logout: 'Déconnexion',
            kpi: {
                products: 'Total Produits',
                lowStock: 'Stock Faible',
                inquiries: 'Demandes Aujourd\'hui',
                pending: 'Paiements en Attente'
            },
            tabs: {
                products: 'Produits',
                inquiries: 'Demandes'
            },
            addProduct: '+ Ajouter Produit'
        },
        login: {
            title: 'Connexion Admin',
            username: 'Nom d\'utilisateur',
            password: 'Mot de passe',
            cancel: 'Annuler',
            submit: 'Connexion'
        }
    };

    // Arabic
    state.translations.ar = {
        nav: {
            home: 'الرئيسية',
            services: 'الخدمات',
            store: 'المتجر',
            chat: 'الدردشة',
            more: 'المزيد'
        },
        home: {
            hero: {
                title: 'حلول تقنية احترافية',
                subtitle: 'منصة شاملة للتشخيص والإصلاح والإلكترونيات'
            },
            cta: {
                diagnose: 'تشخيص مشكلتي',
                book: 'حجز فني'
            },
            stats: {
                apps: 'التطبيقات المسلمة',
                rating: 'التقييم',
                savings: '% التوفير'
            }
        },
        services: {
            title: 'خدماتنا'
        },
        store: {
            title: 'متجر الإلكترونيات',
            search: 'البحث عن المنتجات...'
        },
        chat: {
            title: 'بوت التشخيص الذكي',
            welcome: 'مرحبا! أنا هنا لمساعدتك في تشخيص مشاكل تقنية المعلومات. ما هي المشكلة التي تواجهها؟',
            input: 'اكتب رسالتك...',
            issues: {
                slow: 'جهاز بطيء',
                virus: 'فيروس',
                screen: 'شاشة مكسورة',
                network: 'مشاكل الشبكة'
            },
            bookVisit: 'دعني أساعدك في حجز زيارة فني. ما هو الجهاز الذي يحتاج إلى خدمة؟'
        },
        more: {
            title: 'المزيد',
            language: 'اللغة',
            theme: 'الوضع الداكن',
            share: 'مشاركة التطبيق',
            admin: 'تسجيل دخول المسؤول'
        },
        admin: {
            title: 'لوحة تحكم المسؤول',
            logout: 'تسجيل خروج',
            kpi: {
                products: 'إجمالي المنتجات',
                lowStock: 'مخزون منخفض',
                inquiries: 'استفسارات اليوم',
                pending: 'مدفوعات معلقة'
            },
            tabs: {
                products: 'المنتجات',
                inquiries: 'الاستفسارات'
            },
            addProduct: '+ إضافة منتج'
        },
        login: {
            title: 'تسجيل دخول المسؤول',
            username: 'اسم المستخدم',
            password: 'كلمة المرور',
            cancel: 'إلغاء',
            submit: 'تسجيل الدخول'
        }
    };

    updateTranslations();
}

function loadSampleData() {
    // Sample Services
    state.services = [
        { id: 1, icon: '💻', title: 'PC Repair', titleFr: 'Réparation PC', titleAr: 'إصلاح الكمبيوتر', desc: 'Hardware & software troubleshooting', descFr: 'Dépannage matériel et logiciel', descAr: 'استكشاف أخطاء الأجهزة والبرامج' },
        { id: 2, icon: '📱', title: 'Mobile Repair', titleFr: 'Réparation Mobile', titleAr: 'إصلاح الهاتف', desc: 'Screen replacement, battery, software', descFr: 'Remplacement écran, batterie, logiciel', descAr: 'استبدال الشاشة والبطارية والبرامج' },
        { id: 3, icon: '🖥️', title: 'Server Setup', titleFr: 'Configuration Serveur', titleAr: 'إعداد الخادم', desc: 'Enterprise server installation', descFr: 'Installation serveur entreprise', descAr: 'تثبيت خادم المؤسسة' },
        { id: 4, icon: '🌐', title: 'Network Setup', titleFr: 'Configuration Réseau', titleAr: 'إعداد الشبكة', desc: 'WiFi, LAN, security configuration', descFr: 'WiFi, LAN, configuration sécurité', descAr: 'إعداد WiFi و LAN والأمان' },
        { id: 5, icon: '🔒', title: 'Data Recovery', titleFr: 'Récupération Données', titleAr: 'استعادة البيانات', desc: 'Lost data retrieval services', descFr: 'Services de récupération de données', descAr: 'خدمات استرجاع البيانات المفقودة' },
        { id: 6, icon: '🖨️', title: 'Printer Setup', titleFr: 'Configuration Imprimante', titleAr: 'إعداد الطابعة', desc: 'Installation & troubleshooting', descFr: 'Installation et dépannage', descAr: 'التثبيت واستكشاف الأخطاء' },
        { id: 7, icon: '☁️', title: 'Cloud Migration', titleFr: 'Migration Cloud', titleAr: 'الانتقال السحابي', desc: 'Move to cloud infrastructure', descFr: 'Migration vers infrastructure cloud', descAr: 'الانتقال إلى البنية التحتية السحابية' },
        { id: 8, icon: '🛡️', title: 'Cybersecurity', titleFr: 'Cybersécurité', titleAr: 'الأمن السيبراني', desc: 'Protection & monitoring', descFr: 'Protection et surveillance', descAr: 'الحماية والمراقبة' },
        { id: 9, icon: '💾', title: 'Backup Solutions', titleFr: 'Solutions Sauvegarde', titleAr: 'حلول النسخ الاحتياطي', desc: 'Automated backup systems', descFr: 'Systèmes de sauvegarde automatisés', descAr: 'أنظمة النسخ الاحتياطي الآلي' },
        { id: 10, icon: '🎮', title: 'Gaming PC Build', titleFr: 'PC Gaming', titleAr: 'بناء كمبيوتر الألعاب', desc: 'Custom gaming computer assembly', descFr: 'Assemblage PC gaming personnalisé', descAr: 'تجميع كمبيوتر ألعاب مخصص' },
        { id: 11, icon: '📹', title: 'CCTV Installation', titleFr: 'Installation CCTV', titleAr: 'تركيب كاميرات المراقبة', desc: 'Security camera systems', descFr: 'Systèmes de caméras de sécurité', descAr: 'أنظمة كاميرات الأمان' },
        { id: 12, icon: '⚡', title: 'SSD Upgrade', titleFr: 'Mise à niveau SSD', titleAr: 'ترقية SSD', desc: 'Speed boost with SSD installation', descFr: 'Boost de vitesse avec installation SSD', descAr: 'تعزيز السرعة بتثبيت SSD' }
    ];

    // Sample Products
    state.products = [
        { id: 1, name: 'Gaming Laptop RTX 4060', nameFr: 'Laptop Gaming RTX 4060', nameAr: 'لابتوب ألعاب RTX 4060', price: 12500, icon: '💻', category: 'laptops' },
        { id: 2, name: 'Wireless Mouse', nameFr: 'Souris Sans Fil', nameAr: 'ماوس لاسلكي', price: 250, icon: '🖱️', category: 'accessories' },
        { id: 3, name: 'Mechanical Keyboard RGB', nameFr: 'Clavier Mécanique RGB', nameAr: 'لوحة مفاتيح ميكانيكية RGB', price: 850, icon: '⌨️', category: 'accessories' },
        { id: 4, name: 'Samsung SSD 1TB', nameFr: 'SSD Samsung 1TB', nameAr: 'SSD سامسونج 1 تيرابايت', price: 950, icon: '💾', category: 'storage' },
        { id: 5, name: '27" 4K Monitor', nameFr: 'Écran 27" 4K', nameAr: 'شاشة 27 بوصة 4K', price: 3200, icon: '🖥️', category: 'monitors' },
        { id: 6, name: 'USB-C Hub 7-in-1', nameFr: 'Hub USB-C 7-en-1', nameAr: 'موزع USB-C 7 في 1', price: 450, icon: '🔌', category: 'accessories' },
        { id: 7, name: 'Webcam 1080p', nameFr: 'Webcam 1080p', nameAr: 'كاميرا ويب 1080p', price: 650, icon: '📹', category: 'accessories' },
        { id: 8, name: 'External HDD 2TB', nameFr: 'Disque Dur Externe 2TB', nameAr: 'قرص صلب خارجي 2 تيرابايت', price: 750, icon: '💿', category: 'storage' },
        { id: 9, name: 'RAM DDR4 16GB', nameFr: 'RAM DDR4 16GB', nameAr: 'رام DDR4 16 جيجابايت', price: 1200, icon: '🎯', category: 'components' },
        { id: 10, name: 'WiFi Router AC1900', nameFr: 'Routeur WiFi AC1900', nameAr: 'راوتر واي فاي AC1900', price: 850, icon: '📡', category: 'networking' },
        { id: 11, name: 'Laptop Cooling Pad', nameFr: 'Support Refroidissement', nameAr: 'قاعدة تبريد اللابتوب', price: 350, icon: '❄️', category: 'accessories' },
        { id: 12, name: 'USB Flash Drive 128GB', nameFr: 'Clé USB 128GB', nameAr: 'فلاش USB 128 جيجابايت', price: 180, icon: '🔑', category: 'storage' }
    ];

    renderServices();
    renderProducts();
}

function renderServices() {
    const grid = document.getElementById('servicesGrid');
    grid.innerHTML = state.services.map(service => `
        <div class="service-card">
            <div class="service-icon">${service.icon}</div>
            <h3 class="service-title">${service['title' + (state.currentLang === 'fr' ? 'Fr' : state.currentLang === 'ar' ? 'Ar' : '')]}</h3>
            <p class="service-desc">${service['desc' + (state.currentLang === 'fr' ? 'Fr' : state.currentLang === 'ar' ? 'Ar' : '')]}</p>
        </div>
    `).join('');
}

function renderProducts(filtered = null) {
    const grid = document.getElementById('productsGrid');
    const products = filtered || state.products;

    grid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">${product.icon}</div>
            <div class="product-info">
                <div class="product-name">${product['name' + (state.currentLang === 'fr' ? 'Fr' : state.currentLang === 'ar' ? 'Ar' : '')]}</div>
                <div class="product-price">${product.price} MAD</div>
                <button class="product-btn" onclick="inquireProduct(${product.id})">
                    ${state.currentLang === 'ar' ? 'استفسار' : state.currentLang === 'fr' ? 'Demander' : 'Inquire'}
                </button>
            </div>
        </div>
    `).join('');
}

function filterProducts(query) {
    if (!query) {
        renderProducts();
        return;
    }

    const filtered = state.products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.nameFr.toLowerCase().includes(query.toLowerCase()) ||
        p.nameAr.includes(query)
    );

    renderProducts(filtered);
}

function inquireProduct(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const message = `Hello! I'm interested in: ${product.name} (${product.price} MAD). SKU: ${product.id}`;
    const whatsappUrl = `https://wa.link/2ft0rp?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Add to cart
    state.cart.push(product);
    updateCartBadge();
}

function updateCartBadge() {
    document.getElementById('cartBadge').textContent = state.cart.length;
}

// Chat Functions
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message) return;

    addUserMessage(message);
    input.value = '';

    // Simulate bot response
    setTimeout(() => {
        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            handleBotResponse(message);
        }, 800);
    }, 300);
}

function addUserMessage(text) {
    const container = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message user';
    messageDiv.innerHTML = `<div class="message-bubble"><p>${text}</p></div>`;
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

function addBotMessage(text) {
    const container = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message bot';
    messageDiv.innerHTML = `<div class="message-bubble"><p>${text}</p></div>`;
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

function showTypingIndicator() {
    const container = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-bubble">
            <div class="typing-indicator">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>
        </div>
    `;
    container.appendChild(typingDiv);
    container.scrollTop = container.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

function handleBotResponse(userMessage) {
    const lowerMsg = userMessage.toLowerCase();

    // Check for handoff keywords
    if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('human') || 
        lowerMsg.includes('live') || lowerMsg.includes('devis') || lowerMsg.includes('budget')) {
        addBotMessage('I\'ll connect you with our team for pricing details.');
        setTimeout(() => {
            addBotMessage('Please choose who to chat with:');
            addWhatsAppButtons();
        }, 500);
        return;
    }

    // Simple diagnostic responses
    if (lowerMsg.includes('slow') || lowerMsg.includes('lent')) {
        addBotMessage('A slow PC can be caused by: insufficient RAM, full hard drive, malware, or too many startup programs. Would you like to schedule a diagnostic visit?');
    } else if (lowerMsg.includes('virus') || lowerMsg.includes('malware')) {
        addBotMessage('Virus issues require immediate attention. I recommend a full system scan and cleanup. Shall I book a technician for you?');
    } else if (lowerMsg.includes('screen') || lowerMsg.includes('écran')) {
        addBotMessage('Screen repairs typically take 1-2 hours. What device model do you have?');
    } else if (lowerMsg.includes('network') || lowerMsg.includes('wifi') || lowerMsg.includes('internet')) {
        addBotMessage('Network issues can be router-related or ISP problems. Have you tried restarting your router?');
    } else {
        addBotMessage('I understand. Let me connect you with a specialist who can help better.');
        setTimeout(() => addWhatsAppButtons(), 500);
    }
}

function handleQuickReply(issue) {
    const responses = {
        slow: 'My PC is running very slow',
        virus: 'I think I have a virus',
        screen: 'My screen is broken',
        network: 'I have network problems'
    };

    addUserMessage(responses[issue]);

    setTimeout(() => {
        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            handleBotResponse(responses[issue]);
        }, 800);
    }, 300);
}

function addWhatsAppButtons() {
    const container = document.getElementById('chatMessages');
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'chat-message bot';
    buttonsDiv.innerHTML = `
        <div class="message-bubble">
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <a href="https://wa.link/2ft0rp" target="_blank" class="btn btn-primary" style="text-decoration: none; text-align: center;">
                    Chat with Ayoub
                </a>
                <a href="https://wa.link/qgrsyg" target="_blank" class="btn btn-secondary" style="text-decoration: none; text-align: center;">
                    Chat with Salah
                </a>
            </div>
        </div>
    `;
    container.appendChild(buttonsDiv);
    container.scrollTop = container.scrollHeight;
}

// Admin Functions
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        state.isAdmin = true;
        localStorage.setItem('isAdmin', 'true');
        document.getElementById('loginModal').classList.remove('active');
        showAdminTab();
        navigateToScreen('admin');
        alert('Login successful!');
    } else {
        alert('Invalid credentials!');
    }
}

function handleLogout() {
    state.isAdmin = false;
    localStorage.removeItem('isAdmin');
    hideAdminTab();
    navigateToScreen('home');
}

function showAdminTab() {
    const moreTab = document.querySelector('[data-screen="more"]');
    moreTab.dataset.screen = 'admin';
    moreTab.querySelector('span').textContent = 'Admin';
    moreTab.querySelector('svg').innerHTML = '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>';
}

function hideAdminTab() {
    const adminTab = document.querySelector('[data-screen="admin"]');
    adminTab.dataset.screen = 'more';
    adminTab.querySelector('span').textContent = 'More';
    adminTab.querySelector('svg').innerHTML = '<circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle>';
}

function switchAdminTab(tabName) {
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    document.querySelectorAll('.admin-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    document.getElementById(tabName + 'Panel').classList.add('active');
}

// Animations
function animateStats() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateValue(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.stat-number').forEach(stat => {
        observer.observe(stat);
    });
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = end % 1 === 0 ? Math.floor(current) : current.toFixed(1);
    }, 16);
}

function alternateWhatsApp() {
    const btn1 = document.getElementById('whatsappBtn1');
    const btn2 = document.getElementById('whatsappBtn2');

    setInterval(() => {
        if (btn1.style.display === 'none') {
            btn1.style.display = 'flex';
            btn2.style.display = 'none';
        } else {
            btn1.style.display = 'none';
            btn2.style.display = 'flex';
        }
    }, 5000);
}

// Make functions globally available
window.inquireProduct = inquireProduct;