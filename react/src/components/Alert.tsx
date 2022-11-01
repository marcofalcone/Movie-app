import { ReactNode } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const toastOptions: object = {
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
}

export const notifySuccess = (text: string): ReactNode => toast.success(text, toastOptions)

export const notifyError = (text?: string): ReactNode => toast.error(text ?? 'An error occured', toastOptions)

export const notifyWarning = (text: string): ReactNode => toast.warning(text, toastOptions)
