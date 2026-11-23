import { describe, expect, it } from 'vitest';
import { filterGames, games } from './games';

const expectedUrls: Record<string, string> = {
  xiaoxiaole: 'https://raingor.github.io/xiaoxiaole/',
  'railway-run': 'https://raingor.github.io/railway-run-pages/',
  '2048': 'https://raingor.github.io/game-2048/',
  sudoku: 'https://raingor.github.io/sudoku/',
  minesweeper: 'https://raingor.github.io/minesweeper/',
  'memory-match': 'https://raingor.github.io/memory-match/',
  'sliding-puzzle': 'https://raingor.github.io/sliding-puzzle/',
  sokoban: 'https://raingor.github.io/sokoban/',
};

describe('game destinations', () => {
  it('contains exactly the requested eight games', () => {
    expect(games).toHaveLength(8);
    expect(games.map(game => game.slug).sort()).toEqual(Object.keys(expectedUrls).sort());
  });
  it('has unique slugs, names and URLs', () => {
    for (const key of ['slug', 'name', 'url'] as const) {
      expect(new Set(games.map(game => game[key])).size).toBe(8);
    }
  });
  it('uses the Joke Bear portrait for every right-side card avatar', () => {
    expect(games.every(game => game.character === 'classic')).toBe(true);
    expect(games.every(game => game.characterAlt.startsWith('Joke Bear 头像'))).toBe(true);
  });
  it.each(games)('$name points to its exact HTTPS Pages destination', game => {
    expect(game.url).toBe(expectedUrls[game.slug]);
    const url = new URL(game.url);
    expect(url.protocol).toBe('https:');
    expect(url.hostname).toBe('raingor.github.io');
    expect(url.search).toBe('');
    expect(url.hash).toBe('');
  });
  it('uses railway-run-pages, never the source repository path', () => {
    expect(games.find(game => game.slug === 'railway-run')?.url).toBe('https://raingor.github.io/railway-run-pages/');
    expect(games.some(game => new URL(game.url).pathname === '/railway-run/')).toBe(false);
  });
  it.each(games)('$name includes description, control help and meaningful image text', game => {
    expect(game.description.length).toBeGreaterThan(10);
    expect(game.controls.length).toBeGreaterThan(5);
    expect(game.characterAlt.length).toBeGreaterThan(8);
    expect(game.characterAlt).toContain(game.name);
    expect(game.character).toMatch(/^[a-z-]+$/);
  });
  it('highlights only the two requested feature games', () => {
    expect(games.filter(game => game.featured).map(game => game.slug)).toEqual(['xiaoxiaole', 'railway-run']);
  });
});

describe('actual UI filtering function', () => {
  it('all returns all eight games in their display order', () => {
    expect(filterGames('all')).toEqual(games);
  });
  it('puzzle includes xiaoxiaole and all six puzzle games', () => {
    const results = filterGames('puzzle');
    expect(results).toHaveLength(7);
    expect(results.every(game => game.category === 'puzzle')).toBe(true);
    expect(results.map(game => game.slug)).toEqual(games.filter(game => game.slug !== 'railway-run').map(game => game.slug));
  });
  it('action returns only railway run', () => {
    expect(filterGames('action').map(game => game.slug)).toEqual(['railway-run']);
  });
  it('repeated filters do not mutate the source list', () => {
    const before = JSON.stringify(games);
    for (let i = 0; i < 5; i++) {
      filterGames('action'); filterGames('puzzle'); filterGames('all');
    }
    expect(JSON.stringify(games)).toBe(before);
    expect(filterGames('all')).toHaveLength(8);
  });
});
