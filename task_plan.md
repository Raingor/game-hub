# 游戏站台实施计划

## 目标与边界

在 `game-hub/` 内建立独立导航 Web，整合消消乐、六款益智游戏与地铁快跑，共八个 GitHub Pages 目的地。原生 TypeScript + Vite + Vitest + Playwright，与 2048 项目依赖版本一致，生产资源使用相对路径。

本实施仅操作本目录；不修改兄弟项目、根计划、Git、远端仓库、发布、记忆或 Artifact，不委派。主协调 Agent 提供并维护 `.github/workflows/deploy.yml`，不覆盖该文件。

## 实施步骤

- [x] 读取 frontend-design，确定奶油纸色、墨绿、橘红「下一站，开玩」站台方向。
- [x] 参考 2048 配置与锁文件建立独立工程；dev 5181 / preview 4181，strictPort。
- [x] 初版复制八张不同角色头像与两张全身贴纸；2026-11-23 按用户要求八卡统一 Joke Bear 头像，仅保留三张 WebP。
- [x] `src/games.ts` 分离八个正确 URL、玩法、操作提示、角色信息。
- [x] 两款特色游戏车票、六款不同的 CSS 微型棋盘、手机布局及完整可点击卡片。
- [x] 全部 / 益智 / 动作筛选，原生按钮、ARIA 状态、播报、隐藏卡片退出焦点序列。
- [x] 键盘焦点、跳转链接、语义化标题、图片 alt、减少动态效果支持。
- [x] 24 项数据、链接与实际筛选逻辑单测，全部通过。
- [x] 生产构建与 TypeScript 检查通过。
- [x] 编写独立 Chrome 浏览器回归：1440 / 390 / 360、图片、溢出、键盘、筛选、真实链接激活与错误捕获；语法检查通过。
- [x] README、实施计划、进度记录真实结果及验收边界。
- [x] 主Agent启动4181生产预览，修复手机特色卡片隐藏覆盖，100项浏览器回归通过，截图完整可见并已检查。
- [x] 主Agent创建Raingor/game-hub独立仓库并推送fb8ce2e，Pages工作流44738131405成功。
- [x] https://raingor.github.io/game-hub/ 线上100项浏览器检查及8款不拦截真实跳转全部通过。

## 验收命令

```sh
npm ci
npm test
npm run build
node --check scripts/smoke.mjs
npm run preview
# 在另一个终端运行
GAME_URL=http://127.0.0.1:4181/ npm run test:browser
```

外部目标通过 route 拦截 document 验证链接激活与地址，不等同于线上可用性检查。八个线上目标 HTTP 200 来自主协调 Agent 的先行核验。浏览器暂不由实施 Agent 启动，避免与主协调 Agent 验收争用。
