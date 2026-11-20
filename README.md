# 游戏站台 · 下一站，开玩

独立的原生 TypeScript 游戏导航 Web 项目。奶油纸色、墨绿、橘红的站台与车票视觉，八款游戏各有本地 WebP 角色图片，两款特色车票与六款 CSS 微型棋盘。所有卡片都是原生链接，在当前标签页前往对应的独立 GitHub Pages，不嵌入、不打包游戏代码。

## 在线入口与仓库

- 游戏总入口：**https://raingor.github.io/game-hub/**
- 独立仓库：https://github.com/Raingor/game-hub
- 代码提交 `fb8ce2e`，[Pages部署44738131405](https://github.com/Raingor/game-hub/actions/runs/44738131405)成功。
- 主Agent独立24项单测及严格构建通过；本地与线上各100项浏览器检查、8款真实点击跳转全部通过。

## 本地运行

要求 Node.js >= 22.12.0，以及 npm。

```sh
npm ci
npm run dev
```

开发地址 `http://127.0.0.1:5181/`。开发端口 5181、预览端口 4181 均启用 `strictPort`，被占用时会明确失败，不自动更换。

```sh
npm test
npm run build
npm run preview
```

生产预览地址 `http://127.0.0.1:4181/`。Vite 使用 `base: './'`，资源可部署于 GitHub Pages 的仓库子路径。

## 八个目的地

| 游戏 | URL |
| --- | --- |
| 消消乐 | https://raingor.github.io/xiaoxiaole/ |
| 地铁快跑 | https://raingor.github.io/railway-run-pages/ |
| 2048 | https://raingor.github.io/game-2048/ |
| 数独 | https://raingor.github.io/sudoku/ |
| 扫雷 | https://raingor.github.io/minesweeper/ |
| 记忆翻牌 | https://raingor.github.io/memory-match/ |
| 数字华容道 | https://raingor.github.io/sliding-puzzle/ |
| 推箱子 | https://raingor.github.io/sokoban/ |

地铁快跑必须指向 `railway-run-pages`，不能使用源码仓库 `railway-run` 的 Pages 路径。目的地列表与内容在 `src/games.ts` 中维护。

## 筛选与可访问性

- 全部 8 款、益智 7 款（包括消消乐）、动作 1 款（地铁快跑）。不显示虚构在线人数、排行或成绩。
- 原生按钮支持 Tab、Enter、Space；`aria-pressed` 表示当前筛选，实时区域播报结果。
- 不符合条件的卡片使用 `hidden`，不会留在键盘焦点序列中。
- 卡片包含游戏名、玩法、控制提示及不同角色的有意义图片替代文字。
- 页面有跳到列表的跳转链接、可见键盘焦点和 `prefers-reduced-motion` 支持。
- 无登录、存储、外部字体、第三方运行时请求或产品测试后门。

## 浏览器验收

需要本机已安装 Google Chrome。独立 Playwright 脚本使用 `channel: 'chrome'`。先在另一个终端运行生产预览，再运行测试。

```sh
npm run build
npm run preview
# 另一个终端
GAME_URL=http://127.0.0.1:4181/ npm run test:browser
```

也可指定主协调 Agent 发布后的导航站 URL：

```sh
GAME_URL=https://raingor.github.io/game-hub/ npm run test:browser
```

脚本检查 1440px 桌面与 390px、360px 触屏：

- 八张卡片及十张角色图片完整加载；无水平溢出。
- 桌面真实 Tab 遍历八个游戏，检查可见焦点；跳转链接进入游戏区。
- Enter、Space 操作筛选；触屏使用真实 `tap`；检查 7/1/8 结果、ARIA 状态、恢复显示。
- 独立硬编码目标列表核对 href，实际点击每张卡片并检查同标签页最终 URL。
- 捕获 pageerror、console error、资源 HTTP 错误与 requestfailed。
- 检查减少动态效果设置。
- 截图和 JSON 结果写入 `artifacts/`，该目录不入库。

**`test:browser` 的外部游戏 document 请求由 `page.route` 拦截（导航页自身不会被拦截）。此项证明链接激活及路径正确，不证明远端游戏可用。** 测试不导入产品数据作为预期值，不注入产品全局变量。

另有真实线上跳转脚本，不拦截任何请求：

```sh
GAME_URL=http://127.0.0.1:4181/ npm run test:links
# 发布后也可以把 GAME_URL 换成导航站 Pages 地址
```

`test:links` 通过真实卡片点击，逐项核对8个目的地的实际URL、HTTP200、游戏标题和同标签页跳转；结果写入忽略的 `artifacts/live-destinations.json`。依赖网络与远端游戏当前可用性，不将拦截替身当作实际线上游戏。

## 工程结构

```text
src/games.ts          游戏数据与实际筛选函数
src/games.test.ts     目的地、内容、唯一性和筛选单元测试
src/main.ts          语义化导航页面、筛选交互
src/style.css        响应式站台视觉与 CSS 迷你棋盘
public/characters/   仅十张必要的自包含 WebP 角色素材
public/ticket.svg    本地站台票券图标
scripts/smoke.mjs    独立 Chrome 桌面 / 触屏验收
scripts/live-links.mjs 不拦截请求的8款实际线上跳转验证
```

角色素材来自同一工作区的消消乐项目，已将必要的十张 WebP **复制到本项目**；运行时无兄弟目录依赖，不包含 PNG、Three.js 或游戏源包。

## 当前验证边界

2026-11-20 实跑：锁文件安装成功，主Agent独立24项单测、TypeScript及Vite构建通过。本地4181生产预览和正式Pages均完成100项桌面/手机浏览器检查，无页面/控制台/资源错误；各自另跑不拦截请求的8款真实卡片点击跳转，所有实际URL、HTTP200、游戏标题与同标签页验证通过。线上截图和报告在忽略的artifacts目录，手机为Chrome触屏上下文而非实体设备。

`.github/workflows/deploy.yml` 由主协调 Agent 配置，本实现未覆盖或修改；Git、远端仓库、正式发布与记忆更新均由主协调 Agent 负责。
