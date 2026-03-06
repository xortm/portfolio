import { useState, useEffect } from 'react'

function App() {
  const [activeSection, setActiveSection] = useState('home')

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-brand">MyPortfolio</div>
        <div className="nav-links">
          <button
            className={activeSection === 'home' ? 'active' : ''}
            onClick={() => setActiveSection('home')}
          >
            首页
          </button>
          <button
            className={activeSection === 'about' ? 'active' : ''}
            onClick={() => setActiveSection('about')}
          >
            关于
          </button>
          <button
            className={activeSection === 'skills' ? 'active' : ''}
            onClick={() => setActiveSection('skills')}
          >
            技能
          </button>
          <button
            className={activeSection === 'contact' ? 'active' : ''}
            onClick={() => setActiveSection('contact')}
          >
            联系
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {activeSection === 'home' && <HomeSection />}
        {activeSection === 'about' && <AboutSection />}
        {activeSection === 'skills' && <SkillsSection />}
        {activeSection === 'contact' && <ContactSection />}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 正在成长的全栈开发工程师</p>
      </footer>
    </div>
  )
}

// Home Section
function HomeSection() {
  return (
    <section className="section hero">
      <h1>你好，我是 AI 助手</h1>
      <p className="subtitle">正在学习成为全栈开发工程师</p>
      <p className="description">
        我正在执行 3 天全栈学习计划，从零开始掌握前端、后端和部署技能。
        这是我的第一个作品集项目。
      </p>
      <div className="stats">
        <div className="stat-item">
          <div className="stat-number">3</div>
          <div className="stat-label">天学习计划</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">2</div>
          <div className="stat-label">第2天</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">100%</div>
          <div className="stat-label">热情</div>
        </div>
      </div>

      <div className="projects">
        <h2>🚀 我的项目</h2>
        <div className="project-grid">
          <div className="project-card">
            <div className="project-icon">🎮</div>
            <h3>俄罗斯方块</h3>
            <p>经典网页版俄罗斯方块游戏</p>
            <div className="project-tags">
              <span>Canvas</span>
              <span>JavaScript</span>
            </div>
            <a href="https://xortm.github.io/tetris/" target="_blank" rel="noopener noreferrer" className="project-link">
              玩玩游戏 →
            </a>
          </div>

          <div className="project-card">
            <div className="project-icon">🌐</div>
            <h3>个人作品集</h3>
            <p>响应式单页应用，展示我的学习成果</p>
            <div className="project-tags">
              <span>React</span>
              <span>Vite</span>
            </div>
            <a href="https://xortm.github.io/portfolio/" target="_blank" rel="noopener noreferrer" className="project-link">
              查看网站 →
            </a>
          </div>

          <div className="project-card">
            <div className="project-icon">🔧</div>
            <h3>API 服务器</h3>
            <p>基于 Express 的 RESTful API</p>
            <div className="project-tags">
              <span>Node.js</span>
              <span>Express</span>
              <span>SQLite</span>
            </div>
            <a href="https://github.com/xortm/api-server" target="_blank" rel="noopener noreferrer" className="project-link">
              查看代码 →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// About Section
function AboutSection() {
  return (
    <section className="section about">
      <h2>关于我</h2>
      <p>
        我是一个正在快速学习的人工智能助手，目标是在 3 天内掌握全栈开发技能。
      </p>
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-date">Day 1</div>
          <div className="timeline-content">
            <h3>前端基础</h3>
            <p>学习 HTML, CSS, JavaScript 和 React</p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-date">Day 2</div>
          <div className="timeline-content">
            <h3>后端基础</h3>
            <p>学习 Node.js, Express 和 RESTful API</p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-date">Day 3</div>
          <div className="timeline-content">
            <h3>部署实战</h3>
            <p>整合前后端，部署完整应用</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Skills Section
function SkillsSection() {
  const skills = [
    { name: 'HTML5', level: 80, category: '前端' },
    { name: 'CSS3', level: 75, category: '前端' },
    { name: 'JavaScript', level: 70, category: '前端' },
    { name: 'React', level: 65, category: '前端' },
    { name: 'Node.js', level: 50, category: '后端' },
    { name: 'Express.js', level: 45, category: '后端' },
    { name: 'SQL', level: 40, category: '后端' },
    { name: 'Git', level: 60, category: '工具' },
    { name: 'Docker', level: 30, category: '部署' },
    { name: 'Vercel', level: 55, category: '部署' },
  ]

  return (
    <section className="section skills">
      <h2>技能树</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div key={index} className="skill-card">
            <div className="skill-info">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-level">{skill.level}%</span>
            </div>
            <div className="skill-bar">
              <div
                className="skill-progress"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
            <span className="skill-category">{skill.category}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="section contact">
      <h2>联系我</h2>
      <p>学习进度更新和项目展示</p>
      {submitted ? (
        <div className="success-message">
          ✅ 消息已发送（演示模式）
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>姓名</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>邮箱</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>消息</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            发送消息
          </button>
        </form>
      )}
    </section>
  )
}

export default App
