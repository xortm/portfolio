# GitHub Pages 部署指南

## 📋 部署步骤

### 1. 创建 GitHub 仓库

1. 访问 https://github.com/new
2. 创建新仓库，命名为 `portfolio`（或你喜欢的名称）
3. 设置为 **Public**（GitHub Pages 需要）
4. **不要**初始化 README（本地已经有了）
5. 点击 "Create repository"

### 2. 连接本地仓库到 GitHub

在你的终端执行：

```bash
cd /root/.openclaw/workspace-dev/projects/portfolio

# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# 推送到 GitHub
git push -u origin main
```

### 3. 启用 GitHub Pages

1. 进入你的仓库页面
2. `Settings` → `Pages`
3. 在 `Build and deployment` 下：
   - **Source**: 选择 `GitHub Actions`
4. 点击 `Save`

### 4. 查看部署状态

1. 进入 `Actions` 标签
2. 查看 `Deploy to GitHub Pages` 工作流
3. 等待部署完成（通常 1-2 分钟）

### 5. 访问你的网站

部署成功后，访问：
```
https://YOUR_USERNAME.github.io/portfolio/
```

---

## 🚀 一键部署脚本

创建 GitHub 仓库后，运行：

```bash
cd /root/.openclaw/workspace-dev/projects/portfolio

# 替换 YOUR_USERNAME
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

---

## 🔧 替代方案：手动推送 dist 文件

如果 GitHub Actions 有问题，可以手动部署：

```bash
cd /root/.openclaw/workspace-dev/projects/portfolio

# 确保 dist 文件夹已构建
npm run build

# 推送 main 分支
git push -u origin main
```

然后在 GitHub Pages 设置中：
- Source: `Deploy from a branch`
- Branch: `main` → `/ (root)`

---

## 📝 常见问题

### Q: 推送失败？
**A:** 检查 GitHub 凭证是否配置
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Q: GitHub Actions 失败？
**A:** 确保仓库是 Public，并且启用了 Pages 权限

### Q: 网站显示 404？
**A:** 等待 1-2 分钟让 DNS 传播，然后刷新

### Q: 样式丢失？
**A:** 检查 vite.config.js 中的 base 路径是否正确

---

## 🎯 部署成功标志

- ✅ GitHub Actions 显示绿色勾
- ✅ Pages 设置中显示部署 URL
- ✅ 访问 URL 可以看到网站

---

*准备好部署了吗？告诉我你的 GitHub 用户名，我可以帮你生成具体的命令！*
