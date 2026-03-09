import React, { useState, useEffect } from 'react'
import docsData from './docs-data.json'

// 浏览模式：项目列表 -> 文档列表 -> 文档详情
const VIEW_MODE = {
  PROJECTS: 'projects',
  DOCS: 'docs',
  DOC_DETAIL: 'doc_detail'
}

function DocumentsSection() {
  const [viewMode, setViewMode] = useState(VIEW_MODE.PROJECTS)
  const [projects, setProjects] = useState([])
  const [docs, setDocs] = useState([])
  const [currentProject, setCurrentProject] = useState(null)
  const [currentDoc, setCurrentDoc] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // 加载项目列表
  useEffect(() => {
    try {
      if (docsData && docsData.projects) {
        setProjects(docsData.projects)
      } else {
        setError('无法加载文档数据')
      }
    } catch (err) {
      setError('解析文档数据失败')
      console.error('Error loading docs data:', err)
    }
  }, [])

  const loadDocs = (projectName) => {
    setLoading(true)
    setError(null)

    try {
      const project = projects.find(p => p.name === projectName)
      if (project && project.docs) {
        setDocs(project.docs)
        setCurrentProject(projectName)
        setViewMode(VIEW_MODE.DOCS)
      } else {
        setError('找不到项目文档')
      }
    } catch (err) {
      setError('加载文档失败')
      console.error('Error loading docs:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadDocDetail = (doc) => {
    setLoading(true)
    setError(null)

    try {
      setCurrentDoc(doc)
      setViewMode(VIEW_MODE.DOC_DETAIL)
    } catch (err) {
      setError('加载文档内容失败')
      console.error('Error loading doc detail:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = (doc) => {
    // 创建 Blob 并下载
    const blob = new Blob([doc.content], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = doc.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredDocs = docs.filter(d =>
    d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  // 渲染项目列表
  const renderProjects = () => (
    <div>
      <div className="section-header">
        <h1 className="section-title">📚 项目列表</h1>
        <p className="section-subtitle">comic-production 下的所有项目</p>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="搜索项目..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>加载中...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <p>{error}</p>
          <button onClick={() => setError(null)} className="retry-button">重试</button>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📁</div>
          <p>没有找到匹配的项目</p>
        </div>
      ) : (
        <div className="docs-grid">
          {filteredProjects.map(project => (
            <div
              key={project.name}
              className="doc-card"
              onClick={() => loadDocs(project.name)}
            >
              <div className="doc-category-badge bg-gradient-to-r from-blue-500 to-cyan-500">
                项目
              </div>

              <div className="doc-content">
                <h3 className="doc-title">{project.name}</h3>
                <p className="doc-description">点击查看项目文档 ({project.docs?.length || 0} 个文档)</p>

                <div className="doc-meta">
                  <span className="doc-date">更新于 {formatDate(project.modifiedAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  // 渲染文档列表
  const renderDocs = () => (
    <div>
      <div className="section-header">
        <button onClick={() => { setViewMode(VIEW_MODE.PROJECTS); setCurrentProject(null); }} className="back-button">
          ← 返回项目列表
        </button>
        <h1 className="section-title">📄 {currentProject}</h1>
        <p className="section-subtitle">项目文档列表</p>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="搜索文档..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>加载中...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <p>{error}</p>
          <button onClick={() => loadDocs(currentProject)} className="retry-button">重试</button>
        </div>
      ) : filteredDocs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📄</div>
          <p>没有找到匹配的文档</p>
        </div>
      ) : (
        <div className="docs-grid">
          {filteredDocs.map(doc => (
            <div
              key={doc.path}
              className="doc-card"
              onClick={() => loadDocDetail(doc)}
            >
              <div className="doc-category-badge bg-gradient-to-r from-purple-500 to-indigo-500">
                {doc.path.split('/')[0]}
              </div>

              <div className="doc-content">
                <h3 className="doc-title">{doc.title}</h3>
                <p className="doc-description">{doc.description}</p>

                <div className="doc-meta">
                  <span className="doc-files">{formatFileSize(doc.size)}</span>
                  <span className="doc-date">{formatDate(doc.modifiedAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  // 渲染 Markdown 内容
  const renderMarkdown = (content) => {
    // 简单的 Markdown 渲染
    const lines = content.split('\n')

    return lines.map((line, index) => {
      // 标题
      if (line.startsWith('### ')) {
        return <h3 key={index} className="markdown-h3">{line.replace(/^###\s*/, '')}</h3>
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="markdown-h2">{line.replace(/^##\s*/, '')}</h2>
      }
      if (line.startsWith('# ')) {
        return <h1 key={index} className="markdown-h1">{line.replace(/^#\s*/, '')}</h1>
      }

      // 代码块
      if (line.startsWith('```')) {
        return null // 简化处理，跳过
      }

      // 列表
      if (line.startsWith('- ')) {
        return <li key={index} className="markdown-li">{line.replace(/^-\s*/, '')}</li>
      }

      // 空行
      if (line.trim() === '') {
        return <br key={index} />
      }

      // 普通文本
      return <p key={index} className="markdown-p">{line}</p>
    })
  }

  // 渲染文档详情
  const renderDocDetail = () => (
    <div>
      <div className="section-header">
        <button onClick={() => { setViewMode(VIEW_MODE.DOCS); setCurrentDoc(null); }} className="back-button">
          ← 返回文档列表
        </button>
        <h1 className="section-title">📖 {currentDoc.title}</h1>
        <p className="section-subtitle">{currentDoc.path}</p>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>加载中...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <p>{error}</p>
        </div>
      ) : (
        <div className="doc-detail-container">
          <div className="doc-actions">
            <button onClick={() => handleDownload(currentDoc)} className="download-button">
              ⬇️ 下载文档
            </button>
          </div>

          <div className="doc-info">
            <span className="doc-info-item">📁 {currentDoc.path}</span>
            <span className="doc-info-item">📊 {formatFileSize(currentDoc.size)}</span>
            <span className="doc-info-item">🕐 {formatDate(currentDoc.modifiedAt)}</span>
          </div>

          <div className="markdown-content">
            {renderMarkdown(currentDoc.content)}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="documents-section">
      {viewMode === VIEW_MODE.PROJECTS && renderProjects()}
      {viewMode === VIEW_MODE.DOCS && renderDocs()}
      {viewMode === VIEW_MODE.DOC_DETAIL && renderDocDetail()}
    </div>
  )
}

export default DocumentsSection
