
import { RenderAuthorized } from '../components'
import { getAuthority } from './authority'

let Authorized = RenderAuthorized(getAuthority())

export default Authorized