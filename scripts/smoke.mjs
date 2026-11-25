import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const base = process.env.GAME_URL || 'http://127.0.0.1:4181/';
const out = fileURLToPath(new URL('../artifacts/', import.meta.url));
// Independent destination oracle: do not import product data into the browser test.
const destinations = {
  xiaoxiaole: 'https://raingor.github.io/xiaoxiaole/',
  'railway-run': 'https://raingor.github.io/railway-run-pages/',
  '2048': 'https://raingor.github.io/game-2048/',
  sudoku: 'https://raingor.github.io/sudoku/',
  minesweeper: 'https://raingor.github.io/minesweeper/',
  'memory-match': 'https://raingor.github.io/memory-match/',
  'sliding-puzzle': 'https://raingor.github.io/sliding-puzzle/',
  sokoban: 'https://raingor.github.io/sokoban/',
  'joke-bear-story': 'https://raingor.github.io/joke-bear-story/',
  'memory-sequence': 'https://raingor.github.io/memory-sequence/',
  'schulte-grid': 'https://raingor.github.io/schulte-grid/',
  'stroop-challenge': 'https://raingor.github.io/stroop-challenge/',
  nonogram: 'https://raingor.github.io/nonogram/',
  'math-24': 'https://raingor.github.io/math-24/',
  'bulls-cows': 'https://raingor.github.io/bulls-cows/',
  'lights-out': 'https://raingor.github.io/lights-out/',
  hanoi: 'https://raingor.github.io/hanoi/',
  'pipe-connect': 'https://raingor.github.io/pipe-connect/',
  'cognitive-switch': 'https://raingor.github.io/cognitive-switch/',
  gomoku: 'https://raingor.github.io/gomoku/',
};
const errors = [];
const checks = [];
let failure;
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const check = (name, value) => {
  assert.ok(value, name);
  checks.push(name);
  console.log('PASS', name);
};
const visibleCards = page => page.locator('.game-card:visible');
const noOverflow = page => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth && document.body.scrollWidth <= innerWidth);
const loadedImages = page => page.evaluate(async () => {
  await Promise.all([...document.images].map(img => img.decode().catch(() => {})));
  return [...document.images].every(img => img.complete && img.naturalWidth > 0);
});
async function pressFilter(page, filter, touch) {
  const button = page.locator(`[data-filter="${filter}"]`);
  if (touch) await button.tap();
  else { await button.focus(); await page.keyboard.press('Enter'); }
}

try {
  await mkdir(out, { recursive: true });
  for (const [width, height, touch] of [[1440, 1000, false], [390, 844, true], [360, 800, true]]) {
    const label = `${width}${touch ? '-touch' : '-desktop'}`;
    const context = await browser.newContext({ viewport: { width, height }, isMobile: touch, hasTouch: touch, deviceScaleFactor: 1 });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(`${label} pageerror ${error.message}`));
    page.on('console', msg => { if (msg.type() === 'error') errors.push(`${label} console ${msg.text()}`); });
    page.on('requestfailed', request => errors.push(`${label} requestfailed ${request.url()} ${request.failure()?.errorText}`));
    page.on('response', response => { if (response.status() >= 400) errors.push(`${label} HTTP ${response.status()} ${response.url()}`); });
    const intercepted = [];
    await page.route('https://raingor.github.io/**', async route => {
      const requested = new URL(route.request().url());
      const hub = new URL(base);
      const isHub = requested.origin === hub.origin && requested.pathname === hub.pathname;
      if (!isHub && route.request().isNavigationRequest() && route.request().resourceType() === 'document') {
        intercepted.push(route.request().url());
        // Proves real link activation and destination only; not remote availability.
        await route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><link rel="icon" href="data:,"><title>导航目标已拦截</title></head><body>独立导航测试目标，不是线上游戏</body></html>' });
      } else await route.continue();
    });
    await page.goto(base, { waitUntil: 'networkidle' });
    check(`${label}: twenty real anchor cards`, await visibleCards(page).count() === 20 && await page.locator('a.game-card').count() === 20);
    check(`${label}: all twenty-two local character images decode`, await page.locator('img').count() === 22 && await loadedImages(page));
    check(`${label}: nine meaningful card image alternatives`, await page.locator('.card-character').evaluateAll(images => images.every(img => img.alt.trim().length > 8)));
    check(`${label}: every right-side card avatar is the Joke Bear portrait`, await page.locator('.card-character').evaluateAll(images => images.length === 20 && images.every(img => img.getAttribute('src') === './characters/classic.webp' && img.alt.startsWith('Joke Bear'))));
    check(`${label}: no iframe or new-tab navigation`, await page.locator('iframe').count() === 0 && await page.locator('.game-card[target]').count() === 0);
    check(`${label}: no horizontal overflow`, await noOverflow(page));
    await page.waitForFunction(() => [...document.querySelectorAll('.hero-copy,.hero-art,.game-card:not([hidden])')].every(el => Number(getComputedStyle(el).opacity) >= .99));
    check(`${label}: hero and all game cards finish entrance fully visible`, await page.locator('.hero-copy,.hero-art,.game-card:not([hidden])').evaluateAll(elements => elements.every(el => Number(getComputedStyle(el).opacity) >= .99)));
    await page.screenshot({ path: `${out}/${label}.png`, fullPage: true, animations: 'disabled' });

    if (!touch) {
      await page.keyboard.press('Tab');
      check('desktop: first Tab exposes skip link with visible focus', await page.locator('.skip-link').evaluate(el => el === document.activeElement && getComputedStyle(el).outlineStyle !== 'none' && el.getBoundingClientRect().top >= 0));
      await page.keyboard.press('Enter');
      check('desktop: skip link moves focus to game section', await page.locator('#games').evaluate(el => el === document.activeElement));
      await page.locator('[data-filter="all"]').focus();
      const reached = new Set();
      for (let index = 0; index < 27; index++) {
        await page.keyboard.press('Tab');
        const focused = await page.evaluate(() => {
          const el = document.activeElement;
          return el?.matches('.game-card') ? { slug: el.getAttribute('data-game'), outline: getComputedStyle(el).outlineStyle, width: parseFloat(getComputedStyle(el).outlineWidth) } : null;
        });
        if (focused) {
          check(`desktop: ${focused.slug} has visible keyboard focus`, focused.outline !== 'none' && focused.width >= 2);
          reached.add(focused.slug);
        }
      }
      check('desktop: all nine game cards reachable with Tab', reached.size === 20);
    }

    await pressFilter(page, 'puzzle', touch);
    check(`${label}: puzzle filter contains seven games and excludes runner`, await visibleCards(page).count() === 7 && !await page.locator('[data-game="railway-run"]').isVisible());
    check(`${label}: puzzle filter pressed state and live result`, await page.locator('[data-filter="puzzle"]').getAttribute('aria-pressed') === 'true' && await page.locator('[aria-pressed="true"]').count() === 1 && await page.locator('#filter-status').textContent() === '显示益智 7 款游戏');
    if (!touch) {
      await page.locator('[data-filter="puzzle"]').focus();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
    } else await pressFilter(page, 'action', true);
    check(`${label}: action filter displays only runner`, await visibleCards(page).count() === 1 && await page.locator('[data-game="railway-run"]').isVisible());
    check(`${label}: action filter announces correct state`, await page.locator('[data-filter="action"]').getAttribute('aria-pressed') === 'true' && await page.locator('#filter-status').textContent() === '显示动作 1 款游戏');
    check(`${label}: filtered layout has no overflow`, await noOverflow(page));
    await page.screenshot({ path: `${out}/${label}-action.png`, fullPage: true, animations: 'disabled' });
    await pressFilter(page, 'story', touch);
    check(`${label}: story filter displays only the Joke Bear story`, await visibleCards(page).count() === 1 && await page.locator('[data-game="joke-bear-story"]').isVisible());
    check(`${label}: story filter announces correct state`, await page.locator('[data-filter="story"]').getAttribute('aria-pressed') === 'true' && await page.locator('#filter-status').textContent() === '显示剧情 1 款游戏');
    await pressFilter(page, 'brain', touch);
    check(`${label}: brain filter displays the eleven brain games`, await visibleCards(page).count() === 11 && await page.locator('[data-game="gomoku"]').isVisible());
    check(`${label}: brain filter announces correct state`, await page.locator('[data-filter="brain"]').getAttribute('aria-pressed') === 'true' && await page.locator('#filter-status').textContent() === '显示脑力 11 款游戏');
    await pressFilter(page, 'all', touch);
    check(`${label}: all filter restores twenty games and state`, await visibleCards(page).count() === 20 && await page.locator('[data-filter="all"]').getAttribute('aria-pressed') === 'true');
    check(`${label}: all filters have comfortable touch targets`, await page.locator('[data-filter]').evaluateAll(buttons => buttons.every(button => button.getBoundingClientRect().height >= 42)));

    for (const [slug, url] of Object.entries(destinations)) {
      const anchor = page.locator(`[data-game="${slug}"]`);
      check(`${label}: ${slug} exact href`, await anchor.getAttribute('href') === url);
      const count = intercepted.length;
      const navigation = page.waitForURL(url, { waitUntil: 'load' });
      if (touch) await anchor.tap(); else await anchor.click();
      await navigation;
      check(`${label}: ${slug} actual same-tab activation reaches intercepted destination`, page.url() === url && intercepted.length === count + 1 && intercepted.at(-1) === url && context.pages().length === 1);
      await page.goto(base, { waitUntil: 'networkidle' });
    }
    await context.close();
  }
  const reducedContext = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const reduced = await reducedContext.newPage();
  await reduced.goto(base, { waitUntil: 'networkidle' });
  check('reduced motion: entrance animation and smooth scrolling disabled', await reduced.evaluate(() => getComputedStyle(document.querySelector('.hero-copy')).animationName === 'none' && getComputedStyle(document.documentElement).scrollBehavior === 'auto'));
  await reducedContext.close();
  check('no page, console, resource or failed-request errors', errors.length === 0);
} catch (error) {
  failure = error;
  console.error(error);
} finally {
  await writeFile(`${out}/smoke-results.json`, JSON.stringify({ base, checks: checks.length, passed: checks, errors, failure: failure?.message || null, linkVerification: 'External document navigations intercepted; does not verify remote availability.' }, null, 2));
  await browser.close();
}
if (failure) throw failure;
console.log(`Completed ${checks.length} checks. External destinations were intercepted, not availability-tested.`);
