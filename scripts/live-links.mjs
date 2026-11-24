import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const base = process.env.GAME_URL || 'http://127.0.0.1:4181/';
const output = fileURLToPath(new URL('../artifacts/', import.meta.url));
// Independent known destinations and actual game titles. No interception or product imports.
const destinations = [
  ['xiaoxiaole', 'https://raingor.github.io/xiaoxiaole/', '地铁消消乐'],
  ['railway-run', 'https://raingor.github.io/railway-run-pages/', '霓虹轨道'],
  ['2048', 'https://raingor.github.io/game-2048/', '2048'],
  ['sudoku', 'https://raingor.github.io/sudoku/', '数独'],
  ['minesweeper', 'https://raingor.github.io/minesweeper/', '探雷'],
  ['memory-match', 'https://raingor.github.io/memory-match/', '记忆翻牌'],
  ['sliding-puzzle', 'https://raingor.github.io/sliding-puzzle/', '数字华容道'],
  ['sokoban', 'https://raingor.github.io/sokoban/', '推箱子'],
  ['joke-bear-story', 'https://raingor.github.io/joke-bear-story/', '小熊與未寄出的信'],
];
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
let failure;
try {
  for (const [slug, url, titlePart] of destinations) {
    const context = await browser.newContext();
    try {
      const page = await context.newPage();
      const hub = await page.goto(base, { waitUntil: 'networkidle' });
      assert.equal(hub.status(), 200, 'hub loads successfully');
      const anchor = page.locator(`[data-game="${slug}"]`);
      assert.equal(await anchor.getAttribute('href'), url);
      const [response] = await Promise.all([
        page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 60000 }),
        anchor.click(),
      ]);
      assert.equal(response.status(), 200, `${slug}: live document status`);
      assert.equal(page.url(), url, `${slug}: actual destination`);
      const title = await page.title();
      assert.ok(title.includes(titlePart), `${slug}: expected actual game title, got ${title}`);
      assert.equal(context.pages().length, 1, 'navigation stays in same tab');
      results.push({ slug, url: page.url(), status: response.status(), title });
      console.log('PASS live game navigation:', slug, url, title);
    } finally { await context.close(); }
  }
} catch (error) {
  failure = error;
} finally {
  await mkdir(output, { recursive: true });
  await writeFile(`${output}/live-destinations.json`, JSON.stringify({ base, intercepted: false, checks: results.length, results, failure: failure?.message || null }, null, 2));
  await browser.close();
}
if (failure) throw failure;
console.log(`${results.length} live game destinations reached through real card clicks (no request interception).`);
