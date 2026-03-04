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

    if (window.lucide) lucide.createIcons();
}

/**
 * Ambient Particles System
 */
function createParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 2 + 1;
        p.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            --dur: ${Math.random() * 8 + 6}s;
            animation-delay: ${Math.random() * 5}s;
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

    grid.innerHTML = features.map(f => `
        <div class="l2-card-frame p-12 text-center group transition-all duration-500 hover:-translate-y-2 relative overflow-hidden border-gold/20 hover:border-gold/50 shadow-2xl">
            <div class="absolute -inset-1 bg-gradient-to-r from-transparent via-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
            <div class="absolute top-4 right-4 text-gold/10 group-hover:text-gold/40 transition-all duration-700">
                <i data-lucide="${f.icon || 'star'}" class="w-16 h-16 transform group-hover:rotate-12"></i>
            </div>
            <div class="text-gold/50 text-[10px] uppercase tracking-[0.5em] mb-6 font-bold group-hover:text-gold transition-colors">${f.title}</div>
            <div class="text-white text-6xl font-fantasy font-black group-hover:scale-110 transition-transform tracking-normal text-glow">${f.value}</div>
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

    grid.innerHTML = downloads.map(d => `
        <div class="l2-card-frame p-12 flex flex-col items-center text-center group transition-all duration-500 hover:border-gold/40">
            <div class="w-24 h-24 bg-gold/5 border border-gold/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500 text-gold shadow-[0_0_20px_rgba(212,175,55,0.05)]">
                <i data-lucide="${d.icon || 'download'}" class="w-12 h-12"></i>
            </div>
            <h4 class="font-fantasy text-3xl text-white mb-4 uppercase tracking-tighter text-glow">${d.title}</h4>
            <p class="text-gray-400 text-sm mb-10 leading-relaxed font-light max-w-[250px]">${d.description}</p>
            <a href="${d.link}" class="btn-epic w-full py-5 bg-gold/10 border border-gold/30 text-gold font-fantasy font-bold text-sm tracking-[0.3em] hover:bg-gold hover:text-black transition-all">
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
            <div class="glass py-16 flex flex-col items-center hover:bg-gold/5 transition-all duration-500">
                <span class="text-7xl md:text-[6rem] font-black gold-gradient font-fantasy leading-none">${val.toString().padStart(2, '0')}</span>
                <span class="text-[10px] uppercase font-bold text-gray-500 tracking-[0.5em] mt-6">${label}</span>
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
    const header = document.getElementById('sticky-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        const threshold = window.scrollY > 400;
        if (state.isHeaderVisible !== threshold) {
            state.isHeaderVisible = threshold;
            header.classList.toggle('-translate-y-full', !threshold);
        }
    }, { passive: true });
}

// Ignition
document.addEventListener('DOMContentLoaded', init);
