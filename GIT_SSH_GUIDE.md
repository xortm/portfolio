# Git 部署完整流程（SSH 方式）

**无需 Token，使用 SSH 密钥**

---

## 📋 完整流程

### 步骤1：将 SSH 公钥添加到 GitHub ⭐

**公钥内容**：
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKGl/43WUKQmQQF1+xe9RMUuYO0IPKuESHmHg3WR2hzx assistant@openclaw.dev
```

**操作**：
1. 访问：https://github.com/settings/keys
   - 如果无法访问，访问：https://github.com/settings → SSH and GPG keys → New SSH key
2. Title: 填写 `OpenClaw Assistant`
3. Key: 粘贴上面的公钥（完整内容）
4. 点击 **Add SSH key**

---

### 步骤2：测试 SSH 连接

```bash
ssh -T git@github.com
```

第一次会提示：
```
The authenticity of host 'github.com' can't be established.
Are you sure you want to continue? (yes/no) [?]
```

输入：`yes`

成功会显示：
```
Hi xortrm! You've successfully authenticated...
```

---

### 步骤3：推送代码到 GitHub

```bash
cd /root/.openclaw/workspace-dev/projects/portfolio

# 添加远程仓库（SSH 方式）
git remote add origin git@github.com:xortrm/portfolio.git

# 推送代码
git push -u origin main
```

---

### 步骤4：创建 GitHub 仓库（如果还没创建）

访问：https://github.com/new
- Repository name: `portfolio`
- 设置为 **Public**
- 点击 **Create repository**

**注意**：如果仓库已存在，直接跳过

---

### 步骤5：启用 GitHub Pages

访问：https://github.com/xortrm/portfolio/settings/pages
- Source: 选择 **GitHub Actions**
- 点击 **Save**

---

### 步骤6：查看部署状态

访问：https://github.com/xortrm/portfolio/actions
- 等待 `Deploy to GitHub Pages` 工作流完成
- 看到绿色✅表示成功

---

### 步骤7：访问网站

```
https://xortrm.github.io/portfolio/
```

---

## 🔧 Git 基础命令

```bash
# 查看状态
git status

# 查看提交历史
git log --oneline

# 查看远程仓库
git remote -v

# 创建新分支
git branch feature-name

# 切换分支
git checkout feature-name

# 合并分支
git merge feature-name
```

---

## ❓ 常见问题

### Q1: SSH 连接失败 "Permission denied"

**A**: 检查公钥是否正确添加到 GitHub
```bash
# 查看公钥
cat ~/.ssh/id_ed25519.pub

# 测试连接
ssh -T git@github.com
```

### Q2: 推送失败 "repository not found"

**A**: 确保在 GitHub 上创建了 `portfolio` 仓库，并且用户名正确

### Q3: GitHub Actions 失败

**A**:
- 确保仓库是 **Public**
- 检查 .github/workflows/deploy.yml 是否存在
- 查看 Actions 日志获取错误信息

### Q4: 网站显示 404

**A**:
- 等待 1-2 分钟让 DNS 传播
- 刷新页面
- 检查 GitHub Pages 设置是否正确

---

## ✅ 完成检查清单

- [ ] SSH 公钥已添加到 GitHub
- [ ] `ssh -T git@github.com` 连接成功
- [ ] GitHub 仓库 `portfolio` 已创建（Public）
- [ ] 代码已推送到 main 分支
- [ ] GitHub Pages 已启用（GitHub Actions）
- [ ] Actions 部署成功
- [ ] 可以访问 https://xortrm.github.io/portfolio/

---

## 🚀 快速执行（复制粘贴）

```bash
# 1. 测试 SSH 连接（先在网页添加公钥）
ssh -T git@github.com

# 2. 推送代码
cd /root/.openclaw/workspace-dev/projects/portfolio
git remote add origin git@github.com:xortrm/portfolio.git
git push -u origin main

# 3. 查看推送状态
git status
```

---

## 📝 你的 SSH 信息

**公钥位置**: `~/.ssh/id_ed25519.pub`
**私钥位置**: `~/.ssh/id_ed25519`
**公钥内容**:
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKGl/43WUKQmQQF1+xe9RMUuYO0IPKuESHmHg3WR2hzx assistant@openclaw.dev
```

---

*准备好后，先在网页添加 SSH 公钥，然后告诉我，我帮你推送代码！*
