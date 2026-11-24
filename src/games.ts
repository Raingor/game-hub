export type Category = 'puzzle' | 'action' | 'story';
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
