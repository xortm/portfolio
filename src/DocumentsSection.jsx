import React, { useState, useEffect } from 'react'

const DEFAULT_DOCS = [
  {
    id: 1,
    title: '真千金放弃豪门转身投军',
    description: '女主角重生复仇爽文',
    category: '小说',
    status: '进行中',
    date: '2026-03-08',
    files: 13
  },
  {
    id: 2,
    title: 'Taste Skill 集成指南',
    description: '前端设计技能集合',
    category: '技能',
    status: '已完成',
    date: '2026-03-07',
    files: 4
  },
  {
    id: 3,
    title: '俄罗斯方块游戏',
    description: 'Canvas 游戏开发',
    category: '游戏',
    status: '已完成',
    date: '2026-03-08',
    files: 1
  }
]

function DocumentsSection() {
  const [docs, setDocs] = useState(DEFAULT_DOCS)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // 这里可以添加从后端 API 获取文档的逻辑
    // 目前使用静态数据
  }, [])

  const filteredDocs = docs.filter(doc => {
    const matchesFilter = filter === 'all' || doc.category === filter
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const categories = ['all', ...new Set(docs.map(doc => doc.category))]

  const getStatusColor = (status) => {
    switch(status) {
      case '已完成': return 'text-green-400'
      case '进行中': return 'text-blue-400'
      case '计划中': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const getCategoryColor = (category) => {
    switch(category) {
      case '小说': return 'from-pink-500 to-rose-500'
      case '技能': return 'from-blue-500 to-cyan-500'
      case '游戏': return 'from-purple-500 to-indigo-500'
      default: return 'from-gray-500 to-slate-500'
    }
  }

  return (
    <div className="documents-section">
      <div className="section-header">
        <h1 className="section-title">文档列表</h1>
        <p className="section-subtitle">项目文档与开发记录</p>
      </div>

      {/* 搜索栏 */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="搜索文档..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* 分类过滤 */}
      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${filter === category ? 'active' : ''}`}
            onClick={() => setFilter(category)}
          >
            {category === 'all' ? '全部' : category}
          </button>
        ))}
      </div>

      {/* 文档列表 */}
      <div className="docs-grid">
        {filteredDocs.map(doc => (
          <div key={doc.id} className="doc-card">
            <div className={`doc-category-badge bg-gradient-to-r ${getCategoryColor(doc.category)}`}>
              {doc.category}
            </div>
            
            <div className="doc-content">
              <h3 className="doc-title">{doc.title}</h3>
              <p className="doc-description">{doc.description}</p>
              
              <div className="doc-meta">
                <span className={`doc-status ${getStatusColor(doc.status)}`}>
                  {doc.status}
                </span>
                <span className="doc-date">{doc.date}</span>
                <span className="doc-files">{doc.files} 个文件</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 空状态 */}
      {filteredDocs.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📄</div>
          <p>没有找到匹配的文档</p>
        </div>
      )}
    </div>
  )
}

export default DocumentsSection
