import FormDataNode from 'form-data'
import isBrowser from './isBrowser'

export const FormData: typeof FormDataNode = isBrowser ? self.FormData as any : FormDataNode
export default FormData
