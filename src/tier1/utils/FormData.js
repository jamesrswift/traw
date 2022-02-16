import formdata from 'form-data'
import isBrowser from './isBrowser'

export const FormData = formdata
//export const FormData = isBrowser ? self.FormData : formdata
export default FormData
