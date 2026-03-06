#!/bin/bash
# GitHub Pages 部署脚本
# 使用方法：bash deploy.sh

set -e

echo "🚀 开始部署到 GitHub Pages..."
echo ""

# 配置
REPO_URL="https://github.com/xortrm/portfolio.git"
BRANCH="main"

echo "📦 1. 重新构建项目..."
npm run build

echo ""
echo "🔗 2. 添加远程仓库..."
git remote add origin $REPO_URL 2>/dev/null || true
git remote set-url origin $REPO_URL

echo ""
echo "⬆️ 3. 推送到 GitHub..."
echo "如果需要认证，请输入你的 GitHub 凭证"
echo ""

git push -u origin $BRANCH

echo ""
echo "✅ 部署成功！"
echo ""
echo "📋 接下来的步骤："
echo ""
echo "1. 访问你的仓库：https://github.com/xortrm/portfolio"
echo ""
echo "2. 启用 GitHub Pages："
echo "   - 点击 Settings → Pages"
echo "   - Build and deployment → Source: 选择 'GitHub Actions'"
echo "   - 点击 Save"
echo ""
echo "3. 等待 1-2 分钟，查看 Actions 部署状态"
echo ""
echo "4. 访问你的网站："
echo "   🌐 https://xortrm.github.io/portfolio/"
echo ""
echo "🎉 完成！"
