import './polyfill'
import dva from 'dva'
import createHistory from 'history/createHashHistory'

import './index.less'
import router from './router'

// 1. Initialize
const app = dva({
	history: createHistory()
})

// 2. Plugins
app.use({})

// 3. Register global model
// app.model()

// 4. Router
app.router(router)

// 5. Start
app.start('#root')

// console.log('src index app=>', app)
export default app._store