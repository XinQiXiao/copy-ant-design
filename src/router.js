import React from 'react'
import { routerRedux, Switch, Route } from 'dva/router'
import { LocaleProvider, Spin } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import dynamic from 'dva/dynamic'

// router
import { HomePage, DemoPage } from './routes/demo'
import { getRouterData } from './common'

// util
import { Authorized } from './utils'

// style
import styles from './index.less'

console.log('router root Authorized=>', Authorized)

// const
const { ConnectedRouter } = routerRedux 
dynamic.setDefaultLoadingComponent(()=>{
	return <Spin size="large" className={styles.globalSpin}/>
})

function RouterConfig({history, app}){
	const routerData = getRouterData(app)
	console.log('router root RouterConfig routerData=>', routerData)
	const BasicLayout = routerData['/'].component
	return (
		<LocaleProvider locale={zhCN}>
			<ConnectedRouter history={history}>
				<Switch >
					<Route path="/" component={HomePage} />
					<Route path="/demo" component={DemoPage} />
				</Switch>
			</ConnectedRouter>
		</LocaleProvider>
	)
}

export default RouterConfig