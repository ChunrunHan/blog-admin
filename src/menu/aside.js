// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  { path: '/article', title: '创建文章', icon: 'pencil' },
  { path: '/category', title: '创建分类', icon: 'cubes' },
  { path: '/tag', title: '创建标签', icon: 'tags' },
  {
    title: '文章管理',
    icon: 'file',
    children: [
      { path: '/manager/drafts', title: '草稿箱' },
      { path: '/manager/dustbin', title: '垃圾箱' }
    ]
  }
]
