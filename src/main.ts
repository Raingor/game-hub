import { filterGames, games, type Filter, type Game } from './games';
import {
  cuteStarIcon, heartIcon, ticketIcon,
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

function miniGrid(cells: (string | boolean)[]): string {
  return `<div class="mini-grid" aria-hidden="true">${cells.map((value, i) => `<span class="cell cell-${i}${value === '' || value === false ? ' empty' : ''}${value === true ? ' on' : ''}">${value === '' || value === false || value === true ? '' : value}</span>`).join('')}</div>`;
}

function sceneFor(slug: string): string {
  if (slug === 'xiaoxiaole') {
    return '<div class="candy-grid" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><span class="scene-note" aria-hidden="true">啪！快乐消除中</span>';
  }
  if (slug === 'railway-run') {
    return '<div class="rail-scene" aria-hidden="true"><i></i><i></i><i></i><b class="train">▰<br>▰</b></div><span class="scene-note" aria-hidden="true">READY, SET, GO!</span>';
  }
  if (slug === 'joke-bear-story') {
    return '<div class="story-scene" aria-hidden="true"><span class="story-moon"></span><span class="story-rain"><i></i><i></i><i></i></span><span class="story-letter"><b></b><b></b><b></b><em></em></span></div><span class="scene-note" aria-hidden="true">一封还没寄出的信</span>';
  }
  switch (slug) {
    case 'memory-sequence':
      return '<div class="ms-pads" aria-hidden="true"><i></i><i></i><i></i><i></i></div>';
    case 'schulte-grid':
      return `<div class="sg-grid" aria-hidden="true">${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(n => `<i>${n}</i>`).join('')}</div>`;
    case 'stroop-challenge':
      return '<div class="sc-word" aria-hidden="true"><span>蓝</span></div>';
    case 'nonogram':
      return `${miniGrid(['●', '', '●', '', '●', '', '', '●', '', '●', '', '', '●', '', '●', '', '', '●', '', '●', '', '', '●', '', '●'])}`;
    case 'math-24':
      return '<div class="m24-cards" aria-hidden="true"><i>2</i><i>4</i><i>6</i><i>8</i></div>';
    case 'bulls-cows':
      return '<div class="bc-code" aria-hidden="true"><i>3</i><i>5</i><i>8</i><i>1</i></div>';
    case 'lights-out':
      return `${miniGrid([false, true, false, true, false, true, false, false, false, true, false, false, true, false, false, true, false, false, false, true, false, true, false, true, false])}`;
    case 'hanoi':
      return '<div class="hn-pegs" aria-hidden="true"><span class="peg"><i></i><i></i><i></i></span><span class="peg"><i></i><i></i></span><span class="peg"><i></i></span></div>';
    case 'pipe-connect':
      return '<div class="pc-pipes" aria-hidden="true"><i></i><i></i><i></i><i></i></div>';
    case 'cognitive-switch':
      return '<div class="cs-shape" aria-hidden="true"><i class="a"></i><i class="b"></i></div>';
    case 'gomoku':
      return '<div class="gk-board" aria-hidden="true"><span class="stone black"></span><span class="stone white"></span><span class="stone white"></span><span class="stone black"></span></div>';
    default:
      return miniBoard(slug);
  }
}

function card(game: Game): string {
  const number = String(games.indexOf(game) + 1).padStart(2, '0');
  const scene = sceneFor(game.slug);
  const artTag = game.featured
    ? game.category === 'action' ? '动作专线' : game.category === 'story' ? '故事专线' : '快乐始发站'
    : game.tagline;
  return `<a class="game-card ${game.featured ? 'featured' : 'regular'} game-${game.slug}" href="${game.url}" data-game="${game.slug}" aria-labelledby="title-${game.slug}" aria-describedby="desc-${game.slug} controls-${game.slug}">
    <div class="card-art">
      <span class="station-number" aria-hidden="true">${number}</span>
      <span class="art-tag">${artTag}</span>
      ${scene}
      <img class="card-character" src="./characters/${game.character}.webp" alt="${game.characterAlt}" width="240" height="240" decoding="async" />
    </div>
    <div class="card-copy">
      <div class="card-title-row"><h3 id="title-${game.slug}">${game.name}</h3><span class="go-arrow" aria-hidden="true">${cuteStarIcon}</span></div>
      <p id="desc-${game.slug}">${game.description}</p>
      <div class="card-bottom"><span id="controls-${game.slug}" class="controls"><span aria-hidden="true">${keyboardIcon}</span> ${game.controls}</span><span class="play-label" aria-hidden="true">上车开玩</span></div>
    </div>
  </a>`;
}

app.innerHTML = `
  <a class="skip-link" href="#games">跳到游戏列表</a>
  <header class="site-header wrap">
    <a class="brand" href="#" aria-label="CC乐园，回到页面顶部"><span class="brand-icon" aria-hidden="true">${playIcon}</span><span>CC乐园<small>CC PLAYGROUND</small></span></a>
    <a class="header-link" href="#games">选一站，出发 <span aria-hidden="true">${trainIcon}</span></a>
  </header>
  <main>
    <section class="hero wrap" aria-labelledby="hero-title">
      <div class="hero-copy"><p class="eyebrow"><span class="route-symbol" aria-hidden="true">${trainIcon}</span> 开往快乐的列车 · 随时发车</p>
        <h1 id="hero-title">下一站，<br><span>开玩<span class="title-spark" aria-hidden="true">${sparkleIcon}</span></span></h1>
        <p class="hero-description">把日常暂停一下，给快乐留个座。<br>二十款小游戏，不用下载，点开就出发。</p>
        <a class="hero-cta" href="#games">领取你的快乐车票 <span aria-hidden="true">${ticketIcon}</span></a>
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="hero-orbit"></div>
        <div class="floating-label">今日目的地：好心情</div>
        <div class="hero-ticket"><div class="ticket-top"><span>单程快乐票</span><span>NO. 0020</span></div><div class="ticket-route"><span>日常<small>EVERYDAY</small></span><b>${heartIcon}</b><span>开玩<small>PLAYTIME</small></span></div><div class="ticket-stub"><span>不限时间 · 即刻出发</span><span class="barcode"></span></div></div>
        <img class="hero-bear" src="./characters/classic-full.webp" alt="" width="280" height="340" />
        <img class="hero-rabbit" src="./characters/usagi-full.webp" alt="" width="240" height="340" />
        <span class="hero-star star-one">${sparkleIcon}</span><span class="hero-star star-two">${sparkleIcon}</span><span class="platform-sign">PLAY<br><small>PLATFORM 20</small></span>
      </div>
    </section>
    <div class="route-band" aria-hidden="true"><div class="wrap"><span>日常暂停</span><i></i><span>快乐换乘</span><i></i><span>下一站，开玩</span><i></i><span class="band-end">GOOD TIMES AHEAD ${heartIcon}</span></div></div>
    <section class="games-section wrap" id="games" tabindex="-1" aria-labelledby="games-heading">
      <div class="section-head"><div><p class="eyebrow section-kicker">PICK YOUR NEXT STOP</p><h2 id="games-heading">今天，想在哪一站下车？</h2><p class="section-description">动动脑，或是撒腿跑。每一站都有好玩的。</p></div>
        <div class="filters" role="group" aria-label="按游戏类型筛选"><button type="button" data-filter="all" aria-pressed="true">全部 <span>20</span></button><button type="button" data-filter="puzzle" aria-pressed="false">益智 <span>07</span></button><button type="button" data-filter="action" aria-pressed="false">动作 <span>01</span></button><button type="button" data-filter="story" aria-pressed="false">剧情 <span>01</span></button><button type="button" data-filter="brain" aria-pressed="false">脑力 <span>11</span></button></div>
      </div>
      <p class="sr-only" id="filter-status" role="status" aria-live="polite">显示全部 20 款游戏</p>
      <div class="game-grid">${games.map(card).join('')}</div>
      <p class="departure-note"><span aria-hidden="true">${heartIcon}</span> 点击游戏卡片，将在当前页面前往该游戏的独立站点。</p>
    </section>
    <section class="closing wrap" aria-label="站台寄语"><span class="closing-mark" aria-hidden="true">${sparkleIcon}</span><p>不必赶路，<br><strong>在这里，玩一会儿。</strong></p><span class="closing-en">A LITTLE PLAY.<br>A BETTER DAY.</span></section>
  </main>
  <footer class="site-footer wrap"><span>CC乐园 <span class="footer-dot" aria-hidden="true">·</span> 下一站，开玩</span><a href="#">回到站台顶部 ${trainIcon}</a></footer>`;

const cards = [...document.querySelectorAll<HTMLAnchorElement>('[data-game]')];
const filterButtons = [...document.querySelectorAll<HTMLButtonElement>('[data-filter]')];
const labels: Record<Filter, string> = { all: '全部', puzzle: '益智', action: '动作', story: '剧情', brain: '脑力' };

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
