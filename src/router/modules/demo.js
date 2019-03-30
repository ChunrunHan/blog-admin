import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/manager',
  name: 'manager',
  meta,
  redirect: { name: 'manager' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'drafts', name: `${pre}drafts`, component: () => import('@/pages/manager/drafts'), meta: { ...meta, title: '草稿箱' } },
    { path: 'dustbin', name: `${pre}dustbin`, component: () => import('@/pages/manager/dustbin'), meta: { ...meta, title: '垃圾箱' } }
  ])('manager-')
}
