/**
 * L2 Degeneration - Pré-Inauguração Script
 */

function init() {
    console.log("Iniciando modo Hype...");
    try {
        if (typeof SERVER_CONFIG === 'undefined') {
            console.error("Configuração SERVER_CONFIG não encontrada!");
            return;
        }

        const config = SERVER_CONFIG;

        renderServerUI(config);
        renderFeatures(config.features);
        renderEventInfo(config.preInauguration);
        renderDownloads(config.downloads);
        startCountdown(config.launchAt);
        setupParallax();
        setupScrollWatch();
        createParticles();

        // Inicialização direta de ícones
        if (window.lucide) lucide.createIcons();

        console.log("Finalizado.");
    } catch (err) {
        console.error("Erro na inicialização:", err);
    }
}

function createParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 3 + 1;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${Math.random() * 100}%`;
        p.style.setProperty('--dur', `${Math.random() * 10 + 5}s`);
        p.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(p);
    }
}

function renderServerUI(config) {
    const serverNameEls = [document.getElementById('server-name')];
    serverNameEls.forEach(el => { if (el) el.innerText = config.serverName; });

    const chronicle = document.getElementById('chronicle');
    if (chronicle) chronicle.innerText = config.chronicle;

    const btnRegister = document.getElementById('link-register');
    if (btnRegister) btnRegister.href = config.links.register;

    const btnDownload = document.getElementById('link-download');
    if (btnDownload) btnDownload.href = config.links.download;

    const btnDiscord = document.getElementById('discord-link');
    if (btnDiscord) btnDiscord.href = config.links.discord;

    const footer = document.getElementById('footer-credits');
    if (footer) footer.innerHTML = `${config.serverName} &copy; 2026. THE LEGEND NEVER DIES.`;
}

function renderFeatures(features) {
    const grid = document.getElementById('features-grid');
    if (!grid) return;

    grid.innerHTML = (features || []).map(f => `
        <div class="l2-card-frame p-12 text-center group transition-all duration-500 hover:-translate-y-2 relative overflow-hidden opacity-100 visible border-gold/20 hover:border-gold/50 shadow-2xl">
            <div class="absolute -inset-1 bg-gradient-to-r from-transparent via-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
            <div class="absolute top-4 right-4 text-gold/10 group-hover:text-gold/40 transition-all duration-700">
                <i data-lucide="${f.icon || 'star'}" class="w-16 h-16 transform group-hover:rotate-12"></i>
            </div>
            <div class="text-gold/50 text-[10px] uppercase tracking-[0.5em] mb-6 font-bold group-hover:text-gold transition-colors drop-shadow-lg">${f.title}</div>
            <div class="text-white text-6xl font-fantasy font-black group-hover:scale-110 transition-transform tracking-normal text-glow drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">${f.value}</div>
        </div>
    `).join('');
    if (window.lucide) lucide.createIcons();
}

function renderEventInfo(info) {
    if (!info) return;
    const title = document.getElementById('event-title');
    const desc = document.getElementById('event-desc');
    const highlights = document.getElementById('event-highlights');

    if (title) title.innerText = info.title;
    if (desc) desc.innerText = info.description;

    if (highlights) {
        highlights.innerHTML = (info.highlights || []).map(h => `
            <li class="flex items-center gap-4 text-gray-300 text-lg">
                <span class="w-2 h-2 bg-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,1)]"></span>
                ${h}
            </li>
        `).join('');
    }
}

function renderDownloads(downloads) {
    const grid = document.getElementById('downloads-grid');
    if (!grid) return;

    grid.innerHTML = (downloads || []).map(d => `
        <div class="l2-card-frame p-12 flex flex-col items-center text-center group transition-all duration-500 hover:border-gold/40 opacity-100 visible">
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

function startCountdown(launchDateStr) {
    const launchDate = new Date(launchDateStr).getTime();
    const countdownEl = document.getElementById('countdown');
    const miniCountdownEl = document.getElementById('mini-countdown');
    if (!countdownEl) return;

    const update = () => {
        const now = new Date().getTime();
        const distance = launchDate - now;

        if (distance < 0) {
            countdownEl.innerHTML = `<div class="col-span-full py-20 text-gold font-fantasy text-7xl animate-pulse text-center">OPENING NOW</div>`;
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const data = [
            { v: days, l: 'DIAS' },
            { v: hours, l: 'HORAS' },
            { v: minutes, l: 'MINUTOS' },
            { v: seconds, l: 'SEGUNDOS' }
        ];

        countdownEl.innerHTML = data.map(t => `
            <div class="glass py-16 flex flex-col items-center hover:bg-gold/5 transition-all duration-500">
                <span class="text-7xl md:text-[6rem] font-black gold-gradient font-fantasy leading-none">${t.v.toString().padStart(2, '0')}</span>
                <span class="text-[10px] uppercase font-bold text-gray-500 tracking-[0.5em] mt-6">${t.l}</span>
            </div>
        `).join('');

        if (miniCountdownEl) {
            miniCountdownEl.innerHTML = data.map(t => `
                <div class="flex items-center gap-1">
                    <span class="text-gold font-bold text-lg leading-none">${t.v}</span>
                    <span class="text-[8px] text-gray-600 font-bold">${t.l.charAt(0)}</span>
                </div>
            `).join('');
        }
    };

    update();
    setInterval(update, 1000);
}

function setupScrollWatch() {
    const header = document.getElementById('sticky-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        // Header Sticky logic - Mantém para navegação rápida
        scrolled > 400 ? header.classList.remove('-translate-y-full') : header.classList.add('-translate-y-full');
    });
}

function setupScrollReveal() {
    // Sistema desativado para garantir visibilidade total.
}

function setupParallax() {
    window.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) / 100;
        const moveY = (e.clientY - window.innerHeight / 2) / 100;
        const bg = document.getElementById('hero-bg');
        if (bg) bg.style.transform = `scale(1.1) translate(${-moveX}px, ${-moveY}px)`;
    });
}

init();
