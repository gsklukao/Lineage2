/**
 * Lineage ][ - DEGENERATION
 * Core Logic & Performance Optimization
 */

const state = {
    isHeaderVisible: false,
    parallaxRAF: null
};

function init() {
    console.log("⚔️ Server Mode: HYPE ACTIVATED");

    if (typeof SERVER_CONFIG === 'undefined') {
        console.error("Critical: SERVER_CONFIG missing.");
        return;
    }

    const config = SERVER_CONFIG;

    renderHero(config);
    renderFeatures(config.features);
    renderEventInfo(config.preInauguration);
    renderDownloads(config.downloads);
    startCountdown(config.launchAt);

    setupScrollWatch();
    createParticles();

    // Configura o observador de animações após a DOM ser construída (mesmo assíncrona/dinâmica)
    setTimeout(setupScrollReveal, 100);

    if (window.lucide) lucide.createIcons();
}

/**
 * Ambient Particles System
 */
function createParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 3 + 1;
        p.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            --dur: ${Math.random() * 10 + 8}s;
            animation-delay: ${Math.random() * 5}s;
            background: ${Math.random() > 0.5 ? '#d4af37' : '#ffffff'};
            opacity: ${Math.random() * 0.3};
        `;
        fragment.appendChild(p);
    }
    container.appendChild(fragment);
}

/**
 * UI Rendering
 */
function renderHero(config) {
    const elements = {
        name: document.getElementById('server-name'),
        chronicle: document.getElementById('chronicle'),
        reg: document.getElementById('link-register'),
        dl: document.getElementById('link-download'),
        disc: document.getElementById('discord-link'),
        footer: document.getElementById('footer-credits')
    };

    if (elements.name) elements.name.innerText = config.serverName;
    if (elements.chronicle) elements.chronicle.innerText = config.chronicle;
    if (elements.reg) elements.reg.href = config.links.register;
    if (elements.dl) elements.dl.href = config.links.download;
    if (elements.disc) elements.disc.href = config.links.discord;
    if (elements.footer) elements.footer.innerHTML = `&copy; 2026 ${config.serverName}. THE LEGEND NEVER DIES.`;
}

function renderFeatures(features = []) {
    const grid = document.getElementById('features-grid');
    if (!grid) return;

    grid.innerHTML = features.map((f, index) => `
        <div class="reveal-element glass p-10 flex flex-col items-center text-center group transition-all duration-700 hover:-translate-y-3 relative overflow-hidden border-gold/10 hover:border-gold/40 shadow-2xl" style="transition-delay: ${index * 100}ms;">
            <div class="absolute -inset-1 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
            <div class="w-16 h-16 bg-gold/5 rounded-full flex items-center justify-center mb-6 border border-gold/10 group-hover:scale-110 group-hover:border-gold/30 transition-all duration-500">
                <i data-lucide="${f.icon || 'star'}" class="w-7 h-7 text-gold"></i>
            </div>
            <div class="text-gold/40 text-[9px] uppercase tracking-[0.5em] mb-4 font-bold group-hover:text-gold transition-colors">${f.title}</div>
            <div class="text-white text-5xl font-fantasy font-black tracking-normal text-glow">${f.value}</div>
        </div>
    `).join('');
    if (window.lucide) lucide.createIcons();
}

function renderEventInfo(info) {
    if (!info) return;
    const elements = {
        title: document.getElementById('event-title'),
        desc: document.getElementById('event-desc'),
        highlights: document.getElementById('event-highlights')
    };

    if (elements.title) elements.title.innerText = info.title;
    if (elements.desc) elements.desc.innerText = info.description;
    if (elements.highlights) {
        elements.highlights.innerHTML = (info.highlights || []).map(h => `
            <li class="flex items-center gap-4 text-gray-300 text-lg">
                <span class="w-2 h-2 bg-gold rounded-full shadow-[0_0_10px_#d4af37]"></span>
                ${h}
            </li>
        `).join('');
    }
}

function renderDownloads(downloads = []) {
    const grid = document.getElementById('downloads-grid');
    if (!grid) return;

    // Adiciona o terceiro card se necessário
    const allDownloads = [...downloads];
    if (allDownloads.length === 2) {
        allDownloads.push({
            title: "Patch No Lag",
            description: "Otimizações de FPS e redução de efeitos visuais para computadores modestos.",
            link: "#",
            icon: "cpu"
        });
    }

    grid.innerHTML = allDownloads.map((d, index) => `
        <div class="reveal-element glass p-10 flex flex-col items-center text-center group transition-all duration-500 hover:border-gold/40" style="transition-delay: ${index * 150}ms;">
            <div class="w-20 h-20 bg-gold/5 border border-white/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-gold/30 transition-all duration-500 text-gold shadow-2xl">
                <i data-lucide="${d.icon || 'download'}" class="w-10 h-10"></i>
            </div>
            <h4 class="font-fantasy text-2xl text-white mb-4 uppercase tracking-tighter text-glow group-hover:text-gold transition-colors">${d.title}</h4>
            <p class="text-gray-400 text-xs mb-10 leading-relaxed font-light max-w-[220px]">${d.description}</p>
            <a href="${d.link}" class="btn-epic w-full py-5 text-black font-fantasy font-black text-xs tracking-[0.3em] shadow-lg">
                DOWNLOAD NOW
            </a>
        </div>
    `).join('');
    if (window.lucide) lucide.createIcons();
}

/**
 * Countdown Engine
 */
function startCountdown(launchDateStr) {
    const launchDate = new Date(launchDateStr).getTime();
    const elements = {
        main: document.getElementById('countdown'),
        mini: document.getElementById('mini-countdown')
    };

    if (!elements.main) return;

    const ticker = () => {
        const distance = launchDate - new Date().getTime();

        if (distance < 0) {
            elements.main.innerHTML = `<div class="col-span-full py-20 text-gold font-fantasy text-7xl animate-pulse text-center">OPENING NOW</div>`;
            return;
        }

        const time = {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            secs: Math.floor((distance % (1000 * 60)) / 1000)
        };

        const labels = [['DIAS', time.days], ['HORAS', time.hours], ['MINUTOS', time.mins], ['SEGUNDOS', time.secs]];

        elements.main.innerHTML = labels.map(([label, val]) => `
            <div class="glass py-12 flex flex-col items-center group hover:bg-gold/10 transition-all duration-700 hover:-translate-y-2 relative overflow-hidden">
                <div class="absolute -top-10 -right-10 w-24 h-24 bg-gold/5 rounded-full blur-2xl group-hover:bg-gold/20 transition-all"></div>
                <span class="text-7xl md:text-[7rem] font-black gold-gradient-text font-fantasy leading-none drop-shadow-xl scale-110">${val.toString().padStart(2, '0')}</span>
                <span class="text-[9px] uppercase font-bold text-gold/40 tracking-[0.6em] mt-8 group-hover:text-gold transition-colors">${label}</span>
            </div>
        `).join('');

        if (elements.mini) {
            elements.mini.innerHTML = labels.map(([label, val]) => `
                <div class="flex items-center gap-1">
                    <span class="text-gold font-bold text-lg leading-none">${val}</span>
                    <span class="text-[8px] text-gray-600 font-bold">${label.charAt(0)}</span>
                </div>
            `).join('');
        }
    };

    ticker();
    setInterval(ticker, 1000);
}

/**
 * Interaction Listeners
 */
function setupScrollWatch() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('bg-black/95', 'shadow-2xl', 'py-3');
            nav.classList.remove('bg-black/80', 'py-4');
        } else {
            nav.classList.add('bg-black/80', 'py-4');
            nav.classList.remove('bg-black/95', 'shadow-2xl', 'py-3');
        }
    }, { passive: true });
}

function setupScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal-element').forEach(el => observer.observe(el));
}

// Ignition
document.addEventListener('DOMContentLoaded', init);
