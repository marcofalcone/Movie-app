import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alert = () => {
  const toastOptions = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const notifySuccess = (text) => toast.success(text, toastOptions);

  const notifyError = (text) => toast.error(text || 'An error occured', toastOptions);

  const notifyWarning = (text) => toast.warning(text, toastOptions);

  return {
    notifySuccess,
    notifyError,
    notifyWarning
  };
};

export default Alert;
