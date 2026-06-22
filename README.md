# 🎓 Career Fair Dashboard | 招聘会数据大屏

基于 Glassmorphism + Cyberpunk 风格的招聘会实时数据展示大屏。单屏布局，无需滚动，所有数据一目了然。

> 🌐 **线上演示**: [career-fair-display.pages.dev](https://career-fair-display.pages.dev/)

---

## ✨ 功能特性

### 📊 数据展示
- **顶部统计卡片** — 岗位总数、招聘人数、参会企业数，实时数字
- **实时时钟** — 右上角动态时钟，每秒刷新
- **公司行业分布** — 点击图表查看企业详情列表
- **公司地点分布** — 按城市统计参会企业
- **公司性质分布** — 民企/国企/外企/合资/上市公司分布
- **签到人数** — 签到率环形图 + 签到人数
- **签到分布** — 学校/专业人数分布柱状图
- **学生签到** — 最近签到学生无缝轮播滚动
- **企业列表** — 中部滚动列表，支持按行业筛选

### 🎨 UI 设计
- **Glassmorphism 毛玻璃风格** — 半透明面板 + backdrop-filter 模糊
- **Cyberpunk 科技感** — 点阵背景、面板角标装饰、发光阴影
- **8 种预设背景主题** — 深蓝 / 紫夜 / 翡翠 / 墨绿 / 青橙 / 夜幕 / 薰衣草 / 玫瑰
- **自定义背景颜色** — 调色盘取色器，自由选择背景色
- **等宽数字字体** — JetBrains Mono / Fira Code 风格数字显示
- **面板角标** — 左上角青色、右下角紫色发光边框
- **点阵背景** — 24px 间距浅色网点覆盖

### 🛠 技术点
- **ECharts 5** — 柱状图、饼图、环形图
- **CSS Grid** — 3 列 × 3 行自适应网格布局
- **CSS 自定义属性** — 主题色、间距、动画速度一键切换
- **Mock API 服务** — Node.js 原生 HTTP 服务器，模拟数据接口

---

## 🚀 快速开始

### 前置要求
- **Node.js** >= 14.x

### 安装 & 运行

```bash
# 克隆仓库
git clone https://github.com/YOUR_USERNAME/career-fair-display.git
cd career-fair-display

# 启动服务
npm start
# 或
node server.js
```

浏览器打开 `http://localhost:3456`

---

## 📁 项目结构

```
CareerFairDisplay/
├── index.html      # 主页面（HTML + CSS + JS 全部内嵌）
├── server.js       # Mock API 服务器
├── data.json       # 静态示例数据
├── package.json    # 项目配置
├── .gitignore      # Git 忽略规则
└── README.md       # 说明文档
```

---

## 🔌 API 接口

| 接口 | 说明 |
|------|------|
| `GET /api/panel?jobFairId=17` | 招聘会完整数据（企业、行业、学校、专业等） |
| `GET /api/panel/companies` | 企业及行业/地点/性质分组数据 |
| `GET /api/panel/checkins` | 签到率统计 + 学校/专业分布 |
| `GET /api/panel/checkins/recent?limit=20` | 最近签到记录（模拟实时数据） |

---

## 🎯 布局结构

```
┌──────────────────────────────────────────────────────────┐
│  岗位总数  招聘人数  参会企业数  🎨 │  招聘会标题  │ 🕐 时钟 │
├──────────────────┬──────────────┬────────────────────────┤
│                  │              │     签到人数 (环形图)   │
│   行业分布 (饼图) │  企业滚动列表 │                        │
│                  │              ├────────────────────────┤
│                  │              │     签到分布 (柱状图)   │
├──────────────────┼──────────────┼────────────────────────┤
│  地点分布 (饼图)  │ 性质分布 (饼) │    学生签到 (轮播)     │
└──────────────────┴──────────────┴────────────────────────┘
```

---

## 🎨 主题配色

| 主题 | 配色 | 适用场景 |
|------|------|----------|
| 深蓝 | `#1e3060 → #2563eb` | 默认主题，经典科技蓝 |
| 紫夜 | `#2d1b69 → #7c3aed` | 深邃紫色，稳重 |
| 翡翠 | `#064e3b → #10b981` | 清新绿色 |
| 墨绿 | `#1a3b32 → #059669` | 深色宝石绿 |
| 青橙 | `#0f2d3d → #f97316` | 高对比度暖色 |
| 夜幕 | `#1e1b4b → #6366f1` | 靛蓝夜空 |
| 薰衣草 | `#3b1d5e → #a855f7` | 柔和紫色 |
| 玫瑰 | `#4a1d3d → #e11d48` | 温暖红粉 |

---

## 🚢 部署

### Cloudflare Pages

项目已配置可直接部署到 Cloudflare Pages（使用 Wrangler CLI）：

```bash
npx wrangler pages deploy . --project-name=career-fair-display
```

### 其他平台

项目为纯静态页面 + 可选 Node.js API 服务，可直接部署到：
- **Vercel** — 导入仓库即可
- **Netlify** — 拖拽 `index.html` 或连接 Git
- **GitHub Pages** — 直接部署 `index.html`
- **任意静态服务器** — 只需提供 `index.html` + `data.json`

---

## 📝 技术栈

- **ECharts 5** — 数据可视化
- **原生 HTML/CSS/JS** — 零框架依赖
- **CSS Grid + Flexbox** — 响应式单屏布局
- **CSS Glassmorphism** — 毛玻璃半透明效果
- **Node.js HTTP** — 轻量 Mock API 服务
- **Cloudflare Pages** — 生产环境部署

---

## 📄 License

MIT © 2025
