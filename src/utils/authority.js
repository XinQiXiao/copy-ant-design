
const ANTD_AUTHORITY_KEY = 'copy_antd_authority'

function getAuthority(){
	return localStorage.getItem(ANTD_AUTHORITY_KEY) || 'admin'
}

export {
	getAuthority,
}