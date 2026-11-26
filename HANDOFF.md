# CC乐园 / game-hub 交接文档

2026-11-26 · 写给接手「game-hub」会话的同事

## 当前状态

- 站点：https://raingor.github.io/game-hub/ 已在线，品牌为「CC乐园 / CC PLAYGROUND」。
- 仓库：https://github.com/Raingor/game-hub ，`main` 最新为 `e828e58`（远端一致，工作区干净）。
- 共 20 款游戏：原 8 款小游戏 + 1 款剧情游戏 + 11 款脑力训练游戏；顶部筛选为 全部 20 / 益智 07 / 动作 01 / 剧情 01 / 脑力 11。
- 桌面 4 列、1050px 以下 2 列、700px 以下特色卡整行其余两列；每张卡有专属 CSS 小场景，右侧统一 Joke Bear 头像。
- 本地与线上浏览器检查均已通过（最新线上复核：20 卡、22 图、五组筛选、无 JS/资源错误）。

## 20 款目的地（`src/games.ts` 是唯一数据源）

| 卡片 | slug | 分类 | URL |
| --- | --- | --- | --- |
| 消消乐 | xiaoxiaole | puzzle | https://raingor.github.io/xiaoxiaole/ |
| 地铁快跑 | railway-run | action | https://raingor.github.io/railway-run-pages/ |
| 小熊与未寄出的信 | joke-bear-story | story | https://raingor.github.io/joke-bear-story/ |
| 记忆序列 | memory-sequence | brain | https://raingor.github.io/memory-sequence/ |
| 舒尔特方格 | schulte-grid | brain | https://raingor.github.io/schulte-grid/ |
| 颜色陷阱 | stroop-challenge | brain | https://raingor.github.io/stroop-challenge/ |
| 数织 | nonogram | brain | https://raingor.github.io/nonogram/ |
| 24点 | math-24 | brain | https://raingor.github.io/math-24/ |
| 猜数字 | bulls-cows | brain | https://raingor.github.io/bulls-cows/ |
| 关灯 | lights-out | brain | https://raingor.github.io/lights-out/ |
| 汉诺塔 | hanoi | brain | https://raingor.github.io/hanoi/ |
| 接水管 | pipe-connect | brain | https://raingor.github.io/pipe-connect/ |
| 思维切换 | cognitive-switch | brain | https://raingor.github.io/cognitive-switch/ |
| 五子棋 | gomoku | brain | https://raingor.github.io/gomoku/ |
| 2048 | 2048 | puzzle | https://raingor.github.io/game-2048/ |
| 数独 | sudoku | puzzle | https://raingor.github.io/sudoku/ |
| 扫雷 | minesweeper | puzzle | https://raingor.github.io/minesweeper/ |
| 记忆翻牌 | memory-match | puzzle | https://raingor.github.io/memory-match/ |
| 数字华容道 | sliding-puzzle | puzzle | https://raingor.github.io/sliding-puzzle/ |
| 推箱子 | sokoban | puzzle | https://raingor.github.io/sokoban/ |

注意：地铁快跑只能指向 `railway-run-pages`，不要改回 `railway-run`。

## 本地仓库与提交

所有游戏都在 `/Users/mac-2312-r/workspace/wwwroot/M-projects/` 下，一目录一仓库，远端均为 `github.com/Raingor/<slug>`，最新提交与工作区均干净：

| slug | HEAD | 线上 |
| --- | --- | --- |
| game-hub | e828e58 | https://raingor.github.io/game-hub/ |
| joke-bear-story | 097594d | https://raingor.github.io/joke-bear-story/ |
| memory-sequence | a17c4e6 | https://raingor.github.io/memory-sequence/ |
| schulte-grid | 6d45390 | https://raingor.github.io/schulte-grid/ |
| stroop-challenge | 759dabd | https://raingor.github.io/stroop-challenge/ |
| nonogram | 0716a0c | https://raingor.github.io/nonogram/ |
| math-24 | 6ffb650 | https://raingor.github.io/math-24/ |
| bulls-cows | b3b5b45 | https://raingor.github.io/bulls-cows/ |
| lights-out | 20183d0 | https://raingor.github.io/lights-out/ |
| hanoi | b4d156a | https://raingor.github.io/hanoi/ |
| pipe-connect | 5940db6 | https://raingor.github.io/pipe-connect/ |
| cognitive-switch | 73005e6 | https://raingor.github.io/cognitive-switch/ |
| gomoku | 1ec6714 | https://raingor.github.io/gomoku/ |

其余旧游戏仓库（xiaoxiaole、railway-run-pages、game-2048、sudoku、minesweeper、memory-match、sliding-puzzle、sokoban）在上一层目录或邻近目录，规则一致：原生 TS + Vite、`base: './'`、GitHub Pages Actions 部署。

## 如何改、怎么测

```bash
npm ci
npm test           # vitest：51 项，校验 20 款数据、分类、筛选
npm run build      # tsc + vite
npm run preview    # http://127.0.0.1:4181/（strictPort）
npm run test:browser   # Playwright：20 卡、筛选、无错误、无溢出
npm run test:links     # 真实点击 20 个线上目的地（依赖远端可用）
```

改卡片样式/场景时：桌面场景把标签 `art-tag` 隐藏以免压住图案，移动端会重新显示；每款脑力场景在 `src/style.css` 末尾的「Brain scene」区域。

## 部署与已知坑

- `.github/workflows/deploy.yml`：Node 24、`npm ci --legacy-peer-deps`、`npm test`、`npm run build`、`upload-pages-artifact`、`sleep 15`、`deploy-pages`。
- `sleep 15` 是必须的：不等待会在 `deploy-pages` 报 “No artifacts named github-pages” 或 “Deployment failed, try again later”。**不要**用 `gh run rerun --failed`，会留下同名重复制品导致 “Multiple artifacts found”；失败就推新提交或 `gh workflow run "Verify and deploy game hub" --ref main` 触发全新运行。
- 新仓库第一次发布：push 后先 `gh api --method POST repos/Raingor/<repo>/pages -f build_type=workflow`，再触发工作流；首轮 Pages 未启用的失败预期内。
- GitHub 偶尔会 000/EOF 抖动，重试即可；远端 SHA 以 `gh api repos/Raingor/game-hub/branches/main --jq .commit.sha` 为准。

## 视觉与规范

- 色板：奶油纸 `#f7f3e9`、墨绿 `#203e34/#174a3d`、橘红 `#cf4d2d`、鼠尾草 `#dbe3d6`；圆角卡片、细边框、轻微纸纹。
- 全站不出现 `→ ↓ ↗ ↘` 等箭头字符；图标用 `src/icons.ts` 里的 iconfont SVG（`currentColor`），历史来源见 `ICONS.md`。
- Joke Bear 头像统一 `./characters/classic.webp`；`characterAlt` 以 `Joke Bear 头像，` 开头且包含游戏名（有单测约束）。
- 每张卡都是 `<a>` 同标签页跳转，无 iframe / target；本地 `data-game` 与测试 destinations 必须一一对应。

## 如果还要加游戏

1. 新目录 = 新仓库，slug 与线上子路径一致；复制任一现有游戏的 package/tsconfig/vite/workflow 并改 slug 与端口。
2. `src/games.ts` 加入条目（slug/name/category/url/description/controls/character/characterAlt/tagline/featured?）。
3. `src/main.ts` 的 `sceneFor` 或 `miniBoard` 加对应场景；`index.html` 描述与 `main.ts` 计数同步。
4. 更新 `src/games.test.ts`、`scripts/smoke.mjs`、`scripts/live-links.mjs` 的数量、筛选与 destinations。
5. 本地三尺寸 `test:browser` 过后，建仓、`pages build_type=workflow`、触发部署，最后跑 `test:links` 做线上真实点击验收。

## 最近重要提交（game-hub）

- `e828e58` Record twenty-game live verification
- `0e6ccdb` Add eleven brain games and expand CC Playground to twenty stops
- `372ffd2` Record CC Playground deployment verification
- `9bd541c` Wait for Pages artifact registration before deploy
- `37d8c56` Rename hub to CC Playground and add the Joke Bear story
