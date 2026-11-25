export type Category = 'puzzle' | 'action' | 'story' | 'brain';
export type Filter = 'all' | Category;

export interface Game {
  readonly slug: string;
  readonly name: string;
  readonly category: Category;
  readonly url: string;
  readonly description: string;
  readonly controls: string;
  readonly character: string;
  readonly characterAlt: string;
  readonly tagline: string;
  readonly featured?: boolean;
}

export const games: readonly Game[] = [
  {
    slug: 'xiaoxiaole', name: '消消乐', category: 'puzzle',
    url: 'https://raingor.github.io/xiaoxiaole/',
    description: '把同色连成线，让小小快乐一口气爆开。',
    controls: '点击 / 轻触交换', character: 'classic',
    characterAlt: 'Joke Bear 头像，消消乐的站台伙伴', tagline: '快乐连连，烦恼消消', featured: true,
  },
  {
    slug: 'railway-run', name: '地铁快跑', category: 'action',
    url: 'https://raingor.github.io/railway-run-pages/',
    description: '切换轨道、躲开障碍，把风留在身后。',
    controls: '方向键 / 触屏手势', character: 'classic',
    characterAlt: 'Joke Bear 头像，地铁快跑的出发伙伴', tagline: '下一班，追上快乐', featured: true,
  },
  {
    slug: 'joke-bear-story', name: '小熊与未寄出的信', category: 'story',
    url: 'https://raingor.github.io/joke-bear-story/',
    description: '陪小熊走过雨天小镇，把今天的小事寄给明天。',
    controls: '点击 / 轻触推进', character: 'classic',
    characterAlt: 'Joke Bear 头像，小熊与未寄出的信的故事伙伴', tagline: '慢慢走，也会到', featured: true,
  },
  {
    slug: 'memory-sequence', name: '记忆序列', category: 'brain',
    url: 'https://raingor.github.io/memory-sequence/',
    description: '记下光与声的顺序，一轮一轮把记忆拉长。',
    controls: '点击 / 键盘 1–4', character: 'classic',
    characterAlt: 'Joke Bear 头像，记忆序列的记忆伙伴', tagline: '记住它，再复现它',
  },
  {
    slug: 'schulte-grid', name: '舒尔特方格', category: 'brain',
    url: 'https://raingor.github.io/schulte-grid/',
    description: '在打乱的数字里按顺序找出，练出更快的视觉搜索。',
    controls: '点击 / 轻触连点', character: 'classic',
    characterAlt: 'Joke Bear 头像，舒尔特方格的搜索伙伴', tagline: '找得快，心更静',
  },
  {
    slug: 'stroop-challenge', name: '颜色陷阱', category: 'brain',
    url: 'https://raingor.github.io/stroop-challenge/',
    description: '字的颜色和字义打架时，只选你要的那一个。',
    controls: '点击 / 键盘 1–4', character: 'classic',
    characterAlt: 'Joke Bear 头像，颜色陷阱的专注伙伴', tagline: '忍住第一反应',
  },
  {
    slug: 'nonogram', name: '数织', category: 'brain',
    url: 'https://raingor.github.io/nonogram/',
    description: '按行列提示填出隐藏图案，用数字推演画面。',
    controls: '点击填格 / 长按标记', character: 'classic',
    characterAlt: 'Joke Bear 头像，数织的推理伙伴', tagline: '一行数字，一幅画',
  },
  {
    slug: 'math-24', name: '24点', category: 'brain',
    url: 'https://raingor.github.io/math-24/',
    description: '用四张数字牌凑出 24，在心算里找巧解。',
    controls: '键盘输入 / 点击', character: 'classic',
    characterAlt: 'Joke Bear 头像，24点的计算伙伴', tagline: '算得巧，才赢得稳',
  },
  {
    slug: 'bulls-cows', name: '猜数字', category: 'brain',
    url: 'https://raingor.github.io/bulls-cows/',
    description: '根据几 A 几 B 的提示，一步步逼近那串数字。',
    controls: '键盘输入 / 点击', character: 'classic',
    characterAlt: 'Joke Bear 头像，猜数字的推理伙伴', tagline: '越猜越近',
  },
  {
    slug: 'lights-out', name: '关灯', category: 'brain',
    url: 'https://raingor.github.io/lights-out/',
    description: '点亮一格，翻转一圈，把整盘光慢慢收干净。',
    controls: '点击 / 方向键加空格', character: 'classic',
    characterAlt: 'Joke Bear 头像，关灯的规划伙伴', tagline: '点亮一处，关掉一片',
  },
  {
    slug: 'hanoi', name: '汉诺塔', category: 'brain',
    url: 'https://raingor.github.io/hanoi/',
    description: '按规则移动圆盘，用最少的步数完成搬迁。',
    controls: '点击选柱 / 键盘 1–3', character: 'classic',
    characterAlt: 'Joke Bear 头像，汉诺塔的规划伙伴', tagline: '想清楚，再动手',
  },
  {
    slug: 'pipe-connect', name: '接水管', category: 'brain',
    url: 'https://raingor.github.io/pipe-connect/',
    description: '旋转管道，把水从源头一路接到出口。',
    controls: '点击旋转 / 轻触', character: 'classic',
    characterAlt: 'Joke Bear 头像，接水管的连接伙伴', tagline: '接通，就通了',
  },
  {
    slug: 'cognitive-switch', name: '思维切换', category: 'brain',
    url: 'https://raingor.github.io/cognitive-switch/',
    description: '规则在按颜色与按形状之间翻转，跟紧每一次。',
    controls: '点击 / 键盘 1–4', character: 'classic',
    characterAlt: 'Joke Bear 头像，思维切换的专注伙伴', tagline: '规则一变，就换一换',
  },
  {
    slug: 'gomoku', name: '五子棋', category: 'brain',
    url: 'https://raingor.github.io/gomoku/',
    description: '在十五路盘上连成五子，和 AI 比谁算得更远。',
    controls: '点击落子 / 方向键', character: 'classic',
    characterAlt: 'Joke Bear 头像，五子棋的棋局伙伴', tagline: '一步一算，连成五连',
  },
  {
    slug: '2048', name: '2048', category: 'puzzle',
    url: 'https://raingor.github.io/game-2048/',
    description: '滑动合并相同数字，一路翻倍到 2048。',
    controls: '方向键 / 滑动', character: 'classic',
    characterAlt: 'Joke Bear 头像，2048 的数字伙伴', tagline: '让数字，碰个头',
  },
  {
    slug: 'sudoku', name: '数独', category: 'puzzle',
    url: 'https://raingor.github.io/sudoku/',
    description: '填入 1–9，让每行、每列、每宫都不重复。',
    controls: '数字键 / 点击数字', character: 'classic',
    characterAlt: 'Joke Bear 头像，数独的思考伙伴', tagline: '给灵感，留一格',
  },
  {
    slug: 'minesweeper', name: '扫雷', category: 'puzzle',
    url: 'https://raingor.github.io/minesweeper/',
    description: '读懂数字线索，小心找出安全的下一格。',
    controls: '点击翻开 / 插旗模式', character: 'classic',
    characterAlt: 'Joke Bear 头像，扫雷的观察伙伴', tagline: '小心一点，大胆一点',
  },
  {
    slug: 'memory-match', name: '记忆翻牌', category: 'puzzle',
    url: 'https://raingor.github.io/memory-match/',
    description: '翻开卡片，记住位置，让相同伙伴重逢。',
    controls: '点击 / 轻触翻牌', character: 'classic',
    characterAlt: 'Joke Bear 头像，记忆翻牌的配对伙伴', tagline: '见过你，就记得你',
  },
  {
    slug: 'sliding-puzzle', name: '数字华容道', category: 'puzzle',
    url: 'https://raingor.github.io/sliding-puzzle/',
    description: '借一个空位，把打乱的数字重新排好。',
    controls: '方向键 / 点击方块', character: 'classic',
    characterAlt: 'Joke Bear 头像，数字华容道的解题伙伴', tagline: '挪一步，想三步',
  },
  {
    slug: 'sokoban', name: '推箱子', category: 'puzzle',
    url: 'https://raingor.github.io/sokoban/',
    description: '规划每一步，把所有箱子推到目标位置。',
    controls: '方向键 / 屏幕按键', character: 'classic',
    characterAlt: 'Joke Bear 头像，推箱子的搬运伙伴', tagline: '把快乐，推到位',
  },
];

export function filterGames(filter: Filter): readonly Game[] {
  return filter === 'all' ? games : games.filter(game => game.category === filter);
}
