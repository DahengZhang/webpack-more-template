// 与此文件相关的js也被热更新，不添加词段代码，js更改时不会触发热更新
if (module.hot) {
  module.hot.accept()
}

import publicComponent from '@/components/public.component'

console.log('加载通用组建', publicComponent)

const page = 'admin'

if (page === 'admin')
  import(/* webpackChunkName: 'componentA' */
    '@/components/component.a').then(component => {
    console.log('异步加载组建A: ', component)
  })
else
  import(/* webpackChunkName: 'componentB' */
    '@/components/component.b').then(component => {
    console.log('异步加载组建B: ', component)
  })
