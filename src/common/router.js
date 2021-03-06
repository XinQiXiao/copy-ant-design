import { createElement } from 'react'
import dynamic from 'dva/dynamic'
import pathToRegexp from 'path-to-regexp'

// menu
import { getMenuData } from './menu'

let routerDataCache

const modelNotExisted = (app, model)=> {
	const flag = !app._models.some(({namespace}) => {
		return namespace === model.substring(model.lastIndexOf('/')+1)
	})
	return flag
}

const dynamicWrapper = (app, models, component) => {
	console.log('dynamicWrapper require module')
	if(component.toString().indexOf('.then(') < 0){
		models.forEach( model => {
			if(modelNotExisted(app, model)){
				app.model(require(`../models/${model}`).default)
			}
		})

		return props => {
			if(!routerDataCache){
				routerDataCache =  getRouterData(app)
			}
			return createElement(component().default, {
				...props,
				routerData: routerDataCache
			})
		}
	}
	console.log('dynamicWrapper import module')
	return dynamic({
		app,
		models: ()=> 
			models.filter(model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)),
		component: ()=>{
			if(!routerDataCache){
				routerDataCache = getRouterData(app)
			}
			return component().then(raw => {
				const Component = raw.default || raw 
				return props => createElement(Component, {
					...props,
					routerData: routerDataCache,
				})
			})
		}
	})
}

function getFlatMenuData(menus){
	let keys = {}
	menus.forEach(item => {
		if(item.children){
			keys[item.path] = {...item}
			keys = {
				...keys,
				...getFlatMenuData(item.children)
			}
		} else {
			keys[item.path] = {...item}
		}
	})
	return keys 
}

const getRouterData = (app) => {
	console.log('getRouterData app=>', app)
	const routerConfig = {
		'/': {
			component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
		}
	}
	console.log('getRouterData routerConfig=>', routerConfig)

	const menuData = getFlatMenuData(getMenuData())
	console.log('getRouterData menuData=>', menuData)

	const routerData = {}
	// The route matches the menu
	Object.keys(routerConfig).forEach(path => {
		// Regular match item name
    // eg.  router /user/:id === /user/chen
		const pathRegexp = pathToRegexp(path)
		console.log('getRouterData pathRegexp=>', pathRegexp)
		const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`))
		console.log('getRouterData menuKey=>', menuKey)
		let menuItem = {}
		// If menuKey is not empty
		if(menuKey){
			menuItem = menuData[menuKey]
		}
		console.log('getRouterData menuItem=>', menuItem)
		let router = routerConfig[path]
		router = {
			...router,
			name: router.name || menuItem.name,
			authority: router.authority || menuItem.authority,
			hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
		}
		console.log('getRouterData router 2=>', router)
		routerData[path] = router
	})

	return routerData
}

export {
	getRouterData
}