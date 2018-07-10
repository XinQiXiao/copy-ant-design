import React from 'react'

// component
import Exception from '../Exception'


const Exception403 = () => {
	return (
		<Exception type="403" style={{minHeight: 500, height: '80%'}}/>
	)
}

const authorize = (authority, error) => {
	/**
   * conversion into a class
   * 防止传入字符串时找不到staticContext造成报错
   * String parameters can cause staticContext not found error
   */
	let classError = false
	if(error){
		classError = () => error
	}
	if(!authority){
		throw new Error('authority is required')
	}
	return function decideAuthority(target){
		
	}
}

export default authorize