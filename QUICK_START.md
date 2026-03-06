# 🚀 快速部署到 GitHub Pages

**用户名**: xortrm
**网站**: https://xortrm.github.io/portfolio/

---

## 方法1: 使用 GitHub CLI（推荐）

### 步骤1: 登录 GitHub

```bash
gh auth login
```

按提示操作：
1. What account do you want to log into? → **Github.com**
2. What is your preferred protocol for Git operations? → **HTTPS**
3. Authenticate with Git or GitHub CLI? → **GitHub CLI**
4. 会打开浏览器，授权后完成

### 步骤2: 创建并推送仓库

```bash
cd /root/.openclaw/workspace-dev/projects/portfolio

# 创建仓库并推送（会自动设置为 Public）
gh repo create portfolio --public --source=. --remote=origin --push
```

### 步骤3: 启用 GitHub Pages

```bash
# 使用 CLI 启用 Pages
gh api \
  -X PUT \
  -H "Accept: application/vnd.github.v3+json" \
  /repos/xortrm/portfolio/pages \
  -f 'source[build_type]=workflow'
```

### 步骤4: (可选) 等待并查看部署

```bash
# 查看 Actions 状态
gh run list --repo xortrm/portfolio

# 查看 Actions 日志
gh run view --repo xortrm/portfolio
```

### 访问网站

等待 1-2 分钟后，访问：
```
https://xortrm.github.io/portfolio/
```

---

## 方法2: 使用 Personal Access Token

### 步骤1: 创建 Token

1. 访问：https://github.com/settings/tokens
2. 点击 **Generate new token (classic)**
3. 命名：`Portfolio Deploy`
4. 选择权限：✅ **repo**
5. 点击 **Generate token**
6. 复制 token（只显示一次）

### 步骤2: 使用 Token 推送



```bash
cd /root/.openclaw/workspace-dev/projects/portfolio

# 替换 <YOUR_TOKEN> 为你的 Personal Token
git push https://<YOUR_TOKEN>@github.com/xortrm/portfolio.git main
```

### 步骤3: 手动创建仓库（如果还没创建）

访问：https://github.com/new
- 仓库名：`portfolio`
- 设置为 **Public**
- 点击 **Create repository**

### 步骤4: 启用 GitHub Pages

访问：https://github.com/xortrm/portfolio/settings/pages
- **Build and deployment** → Source: `GitHub Actions`
- 点击 **Save**

---

## 方法3: 手动上传

如果命令行方式不行，可以：

1. 访问：https://github.com/new
2. 创建仓库 `portfolio`（Public）
3. 点击 "uploading an existing file"
4. 拖放整个项目文件夹
5. 启用 GitHub Pages（Source: GitHub Actions）

---

## ✅ 验证部署

### 检查仓库

访问：https://github.com/xortrm/portfolio

应该看到：
- 所有文件已上传
- .github/workflows/deploy.yml 存在

### 检查 Actions

访问：https://github.com/xortrm/portfolio/actions

应该看到：
- `Deploy to GitHub Pages` 工作流
- 状态：✅ Success 或 🟡 In progress

### 访问网站

```
https://xortrm.github.io/portfolio/
```

---

## 🔧 故障排除

### GitHub CLI 登录失败

如果浏览器无法打开，使用设备代码：

```bash
gh auth login --web
```

或使用 PAT：

```bash
gh auth login --with-token
# 然后粘贴你的 Personal Access Token
```

### 推送失败

确保 git 配置正确：

```bash
git config --global user.name "AI Assistant"
git config --global user.email "assistant@openclaw.dev"
```

### GitHub Actions 失败

检查 workflow 文件：

```bash
cat .github/workflows/deploy.yml
```

确保仓库是 **Public**

---

## 📊 部署检查清单

- [ ] GitHub 仓库已创建
- [ ] 代码已推送到 main 分支
- [ ] GitHub Pages 已启用（GitHub Actions）
- [ ] Actions 工作流运行成功
- [ ] 网站可以访问：https://xortrm.github.io/portfolio/

---

## 🎉 一键部署（完整脚本）

```bash
#!/bin/bash

echo "🚀 部署到 GitHub Pages"
echo ""

# 登录 GitHub CLI
gh auth login

# 创建并推送仓库
cd /root/.openclaw/workspace-dev/projects/portfolio
gh repo create portfolio --public --source=. --remote=origin --push

# 启用 GitHub Pages
gh api \
  -X PUT \
  -H "Accept: application/vnd.github.v3+json" \
  /repos/xortrm/portfolio/pages \
  -f 'source[build_type]=workflow'

echo ""
echo "✅ 部署完成！"
echo "🌐 访问：https://xortrm.github.io/portfolio/"
```

保存为 `deploy-all.sh`，然后运行：
```bash
chmod +x deploy-all.sh
./deploy-all.sh
```

---

*准备好后，选择一个方法开始部署！*
