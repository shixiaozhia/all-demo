module.exports = {
  // 禁用 npm 发布
  npm: {
    publish: false
  },
  
  // Git 配置
  git: {
    commit: true,
    commitMessage: 'chore(release): v${version}',
    tag: true,
    tagName: 'v${version}',
    push: true
  },
  
  // GitHub 配置 (需要设置 GITHUB_TOKEN 环境变量)
  github: {
    release: true,
    releaseName: 'v${version}',
    preRelease: false,
    releaseNotes: null // 使用自动生成的变更日志
  },
  
  // 插件配置
  plugins: {
    // Conventional Changelog 插件 - 生成变更日志
    '@release-it/conventional-changelog': {
      preset: 'angular',
      infile: 'CHANGELOG.md',
      header: '# 变更日志 (Changelog)\n\n所有项目的版本变更历史都将记录在此文件中。\n',
      // 自定义提交类型与版本提升规则
      types: [
        { type: 'feat', section: '✨ 新功能 (Features)', hidden: false, bump: 'minor' },
        { type: 'fix', section: '🐛 问题修复 (Bug Fixes)', hidden: false, bump: 'patch' },
        { type: 'perf', section: '⚡ 性能优化 (Performance Improvements)', hidden: false, bump: 'patch' },
        { type: 'docs', section: '📝 文档更新 (Documentation)', hidden: false, bump: null },
        { type: 'style', section: '💄 样式更新 (Styles)', hidden: false, bump: null },
        { type: 'refactor', section: '♻️ 代码重构 (Code Refactoring)', hidden: false, bump: null },
        { type: 'test', section: '✅ 测试相关 (Tests)', hidden: false, bump: null },
        { type: 'build', section: '📦 构建系统 (Build System)', hidden: false, bump: null },
        { type: 'ci', section: '🔧 CI配置 (Continuous Integration)', hidden: false, bump: null },
        { type: 'chore', hidden: true, bump: null },
        // 自定义类型示例
        { type: 'security', section: '🔒 安全更新 (Security)', hidden: false, bump: 'patch' }
      ]
    }
  },
  
  // 生命周期钩子
  hooks: {
    // 发布前运行测试和构建
    'before:init': ['npm run prerelease'],
    
    // 发布完成后执行的操作
    'after:release': 'node scripts/notify.js v${version}'
  }
};