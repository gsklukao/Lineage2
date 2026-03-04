const SERVER_CONFIG = {
    serverName: "L2 DEGENERATION",
    chronicle: "Interlude (C6)",
    launchAt: "2026-03-20T20:00:00-03:00", // Data do grande lançamento
    links: {
        register: "#register",
        download: "#download",
        discord: "https://discord.gg/l2degeneration"
    },
    features: [
        { title: "Exp Rate", value: "50x", icon: "zap" },
        { title: "Adena", value: "100x", icon: "coins" },
        { title: "Drop/Spoil", value: "1x", icon: "package" },
        { title: "Safe Enchant", value: "+3", icon: "shield-check" },
        { title: "Max Enchant", value: "+16", icon: "flame" },
        { title: "Gameplay", value: "Focus", icon: "swords" },
        { title: "Quest Rate", value: "5x", icon: "scroll" },
        { title: "Buff Slots", value: "24+4", icon: "clock" }
    ],
    // Informações de Pré-Inauguração
    preInauguration: {
        title: "GRAND OPENING EVENT",
        description: "Participe da nossa abertura épica e concorra a Adena Packs e Itens Iniciais exclusivos. O mundo de Elmoreden espera por sua nova lenda.",
        highlights: [
            "Sistema de Proteção DDoS Avançado",
            "Geodata & Pathnodes 100% Corrigidos",
            "Equilíbrio de Classes Profissional",
            "Sem Itens Pay-to-Win no Shop"
        ]
    },
    downloads: [
        {
            title: "Client Interlude",
            description: "Cliente base limpo e otimizado para melhor performance.",
            link: "#",
            icon: "monitor"
        },
        {
            title: "Official Updater",
            description: "Mantenha seus arquivos sempre atualizados automaticamente.",
            link: "#",
            icon: "refresh-cw"
        }
    ],
    // Seção de Classes/Jogadores
    classes: [
        {
            name: "Human Dreadnought",
            description: "O mestre das armas de haste, especializado em controle de multidões e dano em área massivo.",
            color: "#3b82f6", // Azul
            tag: "Warrior",
            icon: "sword"
        },
        {
            name: "Elf Mystic Muse",
            description: "A velocidade personificada. Magias de gelo que congelam o campo de batalha em segundos.",
            color: "#60a5fa", // Azul claro/Gelo
            tag: "Mage",
            icon: "wand-2"
        },
        {
            name: "Orc Titan",
            description: "Força bruta inigualável. Quanto mais ferido, mais perigoso se torna o Destruidor.",
            color: "#ef4444", // Vermelho
            tag: "Warrior",
            icon: "axe"
        },
        {
            name: "Dark Elf Ghost Sentinel",
            description: "O silêncio mortal. Flechas críticas que atravessam as sombras antes que o inimigo perceba.",
            color: "#a855f7", // Roxo
            tag: "Archer",
            icon: "target"
        }
    ]
};
