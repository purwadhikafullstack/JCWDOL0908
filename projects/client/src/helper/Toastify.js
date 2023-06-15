import { toast } from "react-toastify";

const ToastPromise = (promise, success = "Task completed successfully!") => {
  toast.promise(promise, {
    pending: "Loading...",
    success: success,
    error: "An error occurred.",
  });
};

const ToastSuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const ToastError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  });
};

export { ToastPromise, ToastSuccess, ToastError };
