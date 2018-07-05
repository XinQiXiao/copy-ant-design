import '@babel/polyfill'
import 'url-polyfill'
import setprototypeof from 'setprototypeof'


// https://github.com/umijs/umi/issues/413
Object.setPrototypeOf = setprototypeof