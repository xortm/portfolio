# 手动部署到 GitHub Pages

## 🎯 你的信息

- **GitHub 用户名**: xortrm
- **仓库名称**: portfolio
- **仓库 URL**: https://github.com/xortrm/portfolio
- **网站 URL**: https://xortrm.github.io/portfolio/

---

## 📋 部署步骤

### 方法1: 在有 GitHub 访问权限的环境运行

```bash
cd /root/.openclaw/workspace-dev/projects/portfolio
bash deploy.sh
```

### 方法2: 手动推送

```bash
cd /root/.openclaw/workspace-dev/projects/portfolio

# 1. 添加远程仓库
git remote add origin https://github.com/xortrm/portfolio.git

# 2. 推送到 GitHub（需要 GitHub 认证）
git push -u origin main
```

如果需要 GitHub 认证：
- **Token**: 使用 Personal Access Token（推荐）
- **密码**: 可能需要双因素认证

---

## 🔑 创建 GitHub Personal Access Token（推荐）

1. 访问：https://github.com/settings/tokens
2. 点击 **Generate new token (classic)**
3. 命名：`Portfolio Deploy`
4. 选择权限：
   - ✅ repo（full control）
5. 点击 **Generate token**
6. 复制 token（只显示一次）

### 使用 Token 推送

```bash
cd /root/.openclaw/workspace-dev/projects/portfolio
git push https://<TOKEN>@github.com/xortrm/portfolio.git main
```

替换 `<TOKEN>` 为你的 Personal Access Token

---

## 🌐 创建 GitHub 仓库

### 方式1: 使用 GitHub CLI（如果你已安装）

```bash
gh repo create portfolio --public --source=. --remote=origin --push
```

### 方式2: 手动创建

1. 访问：https://github.com/new
2. 仓库名：`portfolio`
3. 设置为 **Public**
4. **不要** 勾选 README
5. 点击 **Create repository**

---

## 🔧 启用 GitHub Pages

创建并推送代码后：

1. 访问：https://github.com/xortrm/portfolio/settings/pages
2. **Build and deployment** 部分：
   - **Source**: 选择 `GitHub Actions`
3. 点击 **Save**

### GitHub Actions 会自动：
- 构建项目（npm run build）
- 部署到 Pages
- 提供网站 URL

---

## ⏱️ 查看部署状态

1. 访问：https://github.com/xortrm/portfolio/actions
2. 查看 `Deploy to GitHub Pages` 工作流
3. 等待完成（1-2 分钟）

### 部署完成后

访问你的网站：
```
https://xortrm.github.io/portfolio/
```

---

## 🔍 故障排除

### Q1: 推送失败 "could not read Username"

**A**: 环境没有配置 GitHub 凭证

使用 Personal Access Token：
```bash
git push https://<TOKEN>@github.com/xortrm/portfolio.git main
```

### Q2: GitHub Actions 失败

**A**: 检查以下内容：
- 仓库是 Public
- GitHub Pages 权限已启用
- package.json 有正确的 scripts

### Q3: 网站显示 404

**A**:
- 等待 1-2 分钟让 DNS 传播
- 刷新页面
- 检查 dist 文件夹是否包含 index.html

---

## 🎉 成功标志

- ✅ GitHub 仓库有代码
- ✅ Actions 显示绿色勾
- ✅ Pages 设置显示部署 URL
- ✅ 访问 https://xortrm.github.io/portfolio/ 可以看到网站

---

## 📝 备用方案：直接部署 dist 文件

如果 GitHub Actions 有问题，可以：

1. 在 GitHub Pages 设置中选择：
   - Source: `Deploy from a branch`
   - Branch: `main` → `/ (root)`

2. 确保推送了 dist 文件夹：
```bash
cd /root/.openclaw/workspace-dev/projects/portfolio
git add dist/
git commit -m "Add production build"
git push origin main
```

---

## 🚀 快速命令总结

```bash
# 进入项目目录
cd /root/.openclaw/workspace-dev/projects/portfolio

# 添加远程仓库
git remote add origin https://github.com/xortrm/portfolio.git

# 推送（替换 TOKEN 为你的 Personal Access Token）
git push https://<TOKEN>@github.com/xortrm/portfolio.git main
```

推送成功后：
1. 启用 GitHub Pages（Source: GitHub Actions）
2. 访问 https://xortrm.github.io/portfolio/

---

*需要帮助？告诉我你遇到的问题！*
