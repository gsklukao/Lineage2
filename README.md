# ⚔️ Lineage ][ - DEGENERATION | Landing Page Épica

Bem-vindo ao repositório da landing page oficial de pré-inauguração do **Lineage ][ - DEGENERATION**. Este site foi desenvolvido com foco em imersão total (Estética 10/10), alta performance e facilidade de configuração.

![Preview](assets/hero_elite.png)

## 💎 Características Principais
- **Estética MMORPG:** Design rústico com texturas de pergaminho, iluminação volumétrica e molduras de UI inspiradas na interface clássica do L2.
- **Contador Dinâmico:** Countdown inteligente que calcula dias, horas, minutos e segundos para a inauguração.
- **Configuração Centralizada:** Todo o conteúdo do site (Rates, Links, Datas) é controlado por um único arquivo JS.
- **Performance:** 100% estático, carregamento instantâneo e otimizado para SEO.
- **Ícones Lucide:** Iconografia moderna e escalável integrada.

## 🚀 Como Instalar e Rodar

1. **Abrir localmente:**
   Basta abrir o arquivo `index.html` em qualquer navegador moderno. Não é necessário servidor web para visualização básica.

## 🔧 Configuração (O Coração do Site)

Toda a personalização é feita no arquivo `config.js`. Você não precisa mexer no código HTML ou CSS para atualizar o conteúdo.

### Como atualizar a data de inauguração:
No arquivo `config.js`, altere a linha `launchAt`:
```javascript
launchAt: "2026-04-15T18:00:00", // Formato: AAAA-MM-DDTHH:MM:SS
```

### Como alterar as Rates:
Edite o array `features`:
```javascript
features: [
    { title: "EXP/SP", value: "x50", icon: "zap" },
    { title: "ADENA", value: "x35", icon: "coins" },
    // ...
]
```

## 🌐 Como Disponibilizar (Hospedagem)

### 1. GitHub Pages (Grátis e Rápido)
1. Crie um repositório no seu GitHub.
2. Suba os arquivos (via `git push`).
3. Vá em **Settings > Pages**.
4. Em "Branch", selecione `main` e salve. Seu site estará online em minutos!

### 2. Vercel ou Netlify
- Basta conectar sua conta do GitHub e selecionar este repositório. O deploy é automático a cada alteração que você fizer.

## 🛠️ Tecnologias Utilizadas
- **HTML5 & CSS3**
- **Tailwind CSS** (Estilização via CDN)
- **JavaScript ES6+** (Lógica de renderização e contador)
- **Lucide Icons** (Iconografia)

---
*Desenvolvido para a elite do Lineage ][. THE LEGEND NEVER DIES.*
