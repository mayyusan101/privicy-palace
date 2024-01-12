import { toast } from 'vue3-toastify'

const notify = (
  payload = { type: 'success', message: 'default notify message', theme: 'dark' }
) => {
  toast(payload.message, {
    theme: payload.theme,
    type: payload.type,
    transition: 'flip',
    dangerouslyHTMLString: true
  })
}

export default notify
