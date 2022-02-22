import url from 'url'
import isBrowser from './isBrowser'

export const URLSearchParams = isBrowser ? self.URLSearchParams : url.URLSearchParams
export default URLSearchParams
