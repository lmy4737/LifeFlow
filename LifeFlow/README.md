# LifeFlow - 管理您的人生

![LifeFlow Logo](https://nocode.meituan.com/photo/search?keyword=lifeflow,app,logo&width=200&height=200)

> 一个简洁优雅的待办事项与健身追踪应用，帮助您管理日常生活，记录成长轨迹。

## ✨ 核心功能

### 📝 每日必修 - 待办清单
- **简洁直观的界面**：优雅的设计，专注任务本身
- **进度追踪**：实时显示完成进度，激励持续行动
- **快速操作**：一键添加、完成、删除任务
- **数据持久化**：本地存储，数据安全不丢失

### 💪 力量修行 - 健身记录
- **训练动作管理**：自定义训练动作，支持分类管理
- **组数记录**：详细记录每组重量、次数和备注
- **容量计算**：自动计算训练总容量，量化训练效果
- **分类筛选**：按分类查看训练记录，条理清晰

### 📊 本周统计 - 成长数据
- **任务统计**：完成任务数量统计
- **训练统计**：训练天数和坚持周数
- **活动图表**：可视化展示每日活动分布
- **成就徽章**：激励持续进步

### 🌓 暗色模式
- **护眼设计**：支持暗色模式，保护视力
- **无缝切换**：流畅的主题切换动画
- **偏好记忆**：自动保存主题设置

## 🛠️ 技术栈

- **前端框架**: React 18
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **状态管理**: React Query
- **路由管理**: React Router
- **图标库**: Lucide React
- **日期处理**: date-fns
- **UI组件**: shadcn/ui

## 🚀 快速开始

### 环境要求
- Node.js 16+
- npm 或 yarn

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/your-username/lifeflow.git
cd lifeflow
```

2. **安装依赖**
```bash
npm install
# 或
yarn install
```

3. **启动开发服务器**
```bash
npm run dev
# 或
yarn dev
```

4. **构建生产版本**
```bash
npm run build
# 或
yarn build
```

## 📱 应用截图

| 主页 | 待办清单 | 训练记录 |
|------|----------|----------|
| ![主页](https://nocode.meituan.com/photo/search?keyword=lifeflow,homepage&width=300&height=600) | ![待办](https://nocode.meituan.com/photo/search?keyword=lifeflow,todo&width=300&height=600) | ![训练](https://nocode.meituan.com/photo/search?keyword=lifeflow,workout&width=300&height=600) |

## 📂 项目结构

```
lifeflow/
├── public/              # 静态资源
├── src/
│   ├── components/      # 可复用组件
│   ├── hooks/           # 自定义钩子
│   ├── pages/           # 页面组件
│   ├── lib/             # 工具函数
│   ├── App.jsx          # 应用入口
│   └── main.jsx         # 渲染入口
├── android/             # Android原生代码
├── capacitor.config.js  # Capacitor配置
├── tailwind.config.js   # Tailwind配置
└── vite.config.js       # Vite配置
```

## 🔧 配置说明

### Tailwind CSS 配置
项目使用Tailwind CSS进行样式管理，支持暗色模式切换。

### 本地存储
应用数据存储在浏览器本地存储中，包括：
- 待办事项数据 (`lifeflow_todos`)
- 训练记录数据 (`lifeflow_workouts`)
- 自定义分类数据 (`lifeflow_custom_categories`)
- 主题设置 (`lifeflow_theme`)

## 📦 部署指南

### 静态网站部署
构建后的文件位于 `dist` 目录，可部署到任何静态网站托管服务：

```bash
npm run build
```

### 支持的部署平台
- Vercel
- Netlify
- GitHub Pages
- 阿里云OSS
- 腾讯云COS

## 🤝 贡献指南

我们欢迎任何形式的贡献！请遵循以下步骤：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 开源协议

本项目采用 MIT 协议 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [React](https://reactjs.org/) - 前端框架
- [Tailwind CSS](https://tailwindcss.com/) - 样式框架
- [Vite](https://vitejs.dev/) - 构建工具
- [Lucide](https://lucide.dev/) - 图标库
- [shadcn/ui](https://ui.shadcn.com/) - UI组件库

## 📞 联系方式

如有任何问题或建议，欢迎通过以下方式联系我们：

- 项目主页: [https://github.com/your-username/lifeflow](https://github.com/your-username/lifeflow)
- 问题反馈: [GitHub Issues](https://github.com/your-username/lifeflow/issues)

---

**LifeFlow** © 2023 | 管理您的人生，记录每日成长
