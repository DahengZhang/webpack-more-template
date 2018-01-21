// 与此文件相关的js也被热更新，不添加词段代码，js更改时不会触发热更新
if (module.hot) {
  module.hot.accept()
}

import publicComponent from '@/components/public.component'
import publicStyle from './public'

console.log('加载通用组建', publicComponent)

const rootDom = document.getElementById('root')

rootDom.innerHTML = `
<span class="${publicStyle.big_text}">大号字体</span>
<div id="inner"></div>
`

const page = 'admin'

if (page === 'admin')
  import(/* webpackChunkName: 'componentA' */
    '@/components/component.a').then(component => {
    console.log('异步加载组建A: ', component)
    const innerDom = document.getElementById('inner')

    innerDom.innerHTML = component.default
  })
else
  import(/* webpackChunkName: 'componentB' */
    '@/components/component.b').then(component => {
    console.log('异步加载组建B: ', component)
  })
