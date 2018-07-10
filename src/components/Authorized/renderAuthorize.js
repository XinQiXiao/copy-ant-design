
let CURRENT = 'NULL'

const renderAuthorize = Authorized => {
	return currentAuthority => {
		if(currentAuthority){
			if(currentAuthority.constructor.name === 'Function'){
				CURRENT = currentAuthority()
			}
			if(
				currentAuthority.constructor.name === 'String' ||
				currentAuthority.constructor.name === 'Array'
			){
				CURRENT = currentAuthority
			}
		} else {
			CURRENT = 'NULL'
		}
		return Authorized
	}
}

export default Authorized => renderAuthorize(Authorized)