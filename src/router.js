import React from 'react'
import { routerRedux, Switch, Route } from 'dva/router'
import { LocaleProvider, Spin } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import dynamic from 'dva/dynamic'

// router
import { HomePage, DemoPage } from './routes/demo'
import { getRouterData } from './common'

// style
import styles from './index.less'

// const
const { ConnectedRouter } = routerRedux 
dynamic.setDefaultLoadingComponent(()=>{
	return <Spin size="large" className={styles.globalSpin}/>
})

function RouterConfig({history, app}){
	const routerData = getRouterData(app)
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