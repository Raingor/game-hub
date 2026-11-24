import { filterGames, games, type Filter, type Game } from './games';
import {
  arrowDownIcon, arrowDownRightIcon, arrowRightIcon, arrowUpIcon, arrowUpRightIcon,
  boxIcon, circleIcon, diamondIcon, flagIcon, keyboardIcon, mineIcon, playIcon,
  questionIcon, sparkleIcon, squareIcon, targetIcon, trainIcon,
} from './icons';
import './style.css';

const app = document.querySelector<HTMLDivElement>('#app')!;

const boardIcons: Record<string, string> = {
  '✳': mineIcon, '⚑': flagIcon, '◆': diamondIcon, '●': circleIcon,
  '?': questionIcon, '▦': boxIcon, '◇': targetIcon, '□': squareIcon,
};

function miniBoard(slug: string): string {
  const boards: Record<string, readonly string[]> = {
    '2048': ['2', '4', '8', '4', '16', '2', '8', '2', '32'],
    sudoku: ['1', '', '3', '', '5', '', '7', '', '9'],
    minesweeper: ['1', '1', '', '1', '✳', '2', '', '2', '⚑'],
    'memory-match': ['◆', '●', '?', '◆', '?', '●'],
    'sliding-puzzle': ['1', '2', '3', '4', '', '6', '7', '5', '8'],
    sokoban: ['▦', '▦', '▦', '▦', '◇', '□', '▦', '●', '▦'],
  };
  return `<div class="mini-board mini-${slug}" aria-hidden="true">${(boards[slug] || []).map((cell, i) => `<span class="cell cell-${i}${cell === '' ? ' empty' : ''}">${cell === '' ? '' : boardIcons[cell] ?? cell}</span>`).join('')}</div>`;
}

function card(game: Game): string {
  const number = String(games.indexOf(game) + 1).padStart(2, '0');
  const scene = game.slug === 'xiaoxiaole'
    ? '<div class="candy-grid" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><span class="scene-note" aria-hidden="true">啪！快乐消除中</span>'
    : game.slug === 'railway-run'
      ? '<div class="rail-scene" aria-hidden="true"><i></i><i></i><i></i><b class="train">▰<br>▰</b></div><span class="scene-note" aria-hidden="true">READY, SET, GO!</span>'
      : miniBoard(game.slug);
  return `<a class="game-card ${game.featured ? 'featured' : 'regular'} game-${game.slug}" href="${game.url}" data-game="${game.slug}" aria-labelledby="title-${game.slug}" aria-describedby="desc-${game.slug} controls-${game.slug}">
    <div class="card-art">
      <span class="station-number" aria-hidden="true">${number}</span>
      <span class="art-tag">${game.featured ? (game.category === 'action' ? '动作专线' : '快乐始发站') : game.tagline}</span>
      ${scene}
      <img class="card-character" src="./characters/${game.character}.webp" alt="${game.characterAlt}" width="240" height="240" decoding="async" />
    </div>
    <div class="card-copy">
      <div class="card-title-row"><h3 id="title-${game.slug}">${game.name}</h3><span class="go-arrow" aria-hidden="true">${arrowDownIcon}</span></div>
      <p id="desc-${game.slug}">${game.description}</p>
      <div class="card-bottom"><span id="controls-${game.slug}" class="controls"><span aria-hidden="true">${keyboardIcon}</span> ${game.controls}</span><span class="play-label" aria-hidden="true">上车开玩</span></div>
    </div>
  </a>`;
}

app.innerHTML = `
  <a class="skip-link" href="#games">跳到游戏列表</a>
  <header class="site-header wrap">
    <a class="brand" href="#" aria-label="游戏站台，回到页面顶部"><span class="brand-icon" aria-hidden="true">${playIcon}</span><span>游戏站台<small>THE PLAY PLATFORM</small></span></a>
    <a class="header-link" href="#games">选一站，出发 <span aria-hidden="true">${arrowDownRightIcon}</span></a>
  </header>
  <main>
    <section class="hero wrap" aria-labelledby="hero-title">
      <div class="hero-copy"><p class="eyebrow"><span class="route-symbol" aria-hidden="true">${trainIcon}</span> 开往快乐的列车 · 随时发车</p>
        <h1 id="hero-title">下一站，<br><span>开玩<span class="title-spark" aria-hidden="true">${sparkleIcon}</span></span></h1>
        <p class="hero-description">把日常暂停一下，给快乐留个座。<br>八款小游戏，不用下载，点开就出发。</p>
        <a class="hero-cta" href="#games">领取你的快乐车票 <span aria-hidden="true">${arrowDownIcon}</span></a>
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="hero-orbit"></div>
        <div class="floating-label">今日目的地：好心情</div>
        <div class="hero-ticket"><div class="ticket-top"><span>单程快乐票</span><span>NO. 0008</span></div><div class="ticket-route"><span>日常<small>EVERYDAY</small></span><b>${arrowRightIcon}</b><span>开玩<small>PLAYTIME</small></span></div><div class="ticket-stub"><span>不限时间 · 即刻出发</span><span class="barcode"></span></div></div>
        <img class="hero-bear" src="./characters/classic-full.webp" alt="" width="280" height="340" />
        <img class="hero-rabbit" src="./characters/usagi-full.webp" alt="" width="240" height="340" />
        <span class="hero-star star-one">${sparkleIcon}</span><span class="hero-star star-two">${sparkleIcon}</span><span class="platform-sign">PLAY<br><small>PLATFORM 08</small></span>
      </div>
    </section>
    <div class="route-band" aria-hidden="true"><div class="wrap"><span>日常暂停</span><i></i><span>快乐换乘</span><i></i><span>下一站，开玩</span><i></i><span class="band-end">GOOD TIMES AHEAD ${arrowUpRightIcon}</span></div></div>
    <section class="games-section wrap" id="games" tabindex="-1" aria-labelledby="games-heading">
      <div class="section-head"><div><p class="eyebrow section-kicker">PICK YOUR NEXT STOP</p><h2 id="games-heading">今天，想在哪一站下车？</h2><p class="section-description">动动脑，或是撒腿跑。每一站都有好玩的。</p></div>
        <div class="filters" role="group" aria-label="按游戏类型筛选"><button type="button" data-filter="all" aria-pressed="true">全部 <span>08</span></button><button type="button" data-filter="puzzle" aria-pressed="false">益智 <span>07</span></button><button type="button" data-filter="action" aria-pressed="false">动作 <span>01</span></button></div>
      </div>
      <p class="sr-only" id="filter-status" role="status" aria-live="polite">显示全部 8 款游戏</p>
      <div class="game-grid">${games.map(card).join('')}</div>
      <p class="departure-note"><span aria-hidden="true">${arrowDownIcon}</span> 点击游戏卡片，将在当前页面前往该游戏的独立站点。</p>
    </section>
    <section class="closing wrap" aria-label="站台寄语"><span class="closing-mark" aria-hidden="true">${sparkleIcon}</span><p>不必赶路，<br><strong>在这里，玩一会儿。</strong></p><span class="closing-en">A LITTLE PLAY.<br>A BETTER DAY.</span></section>
  </main>
  <footer class="site-footer wrap"><span>游戏站台 <span class="footer-dot" aria-hidden="true">·</span> 下一站，开玩</span><a href="#">回到站台顶部 ${arrowUpIcon}</a></footer>`;

const cards = [...document.querySelectorAll<HTMLAnchorElement>('[data-game]')];
const filterButtons = [...document.querySelectorAll<HTMLButtonElement>('[data-filter]')];
const labels: Record<Filter, string> = { all: '全部', puzzle: '益智', action: '动作' };

for (const button of filterButtons) {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter as Filter;
    const visible = filterGames(filter);
    const slugs = new Set(visible.map(game => game.slug));
    for (const item of cards) item.hidden = !slugs.has(item.dataset.game!);
    for (const item of filterButtons) item.setAttribute('aria-pressed', String(item === button));
    document.querySelector('#filter-status')!.textContent = `显示${labels[filter]} ${visible.length} 款游戏`;
  });
}
