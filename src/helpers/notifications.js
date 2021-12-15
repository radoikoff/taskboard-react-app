import { NotificationManager } from 'react-notifications';


export const createNotification = (message, type) => {

    switch (type) {
        case 'info':
            NotificationManager.info(message, 'Information', 3000);
            break;
        case 'success':
            NotificationManager.success(message, 'Success!!!', 3000);
            break;
        case 'warning':
            NotificationManager.warning(message, 'Warning', 3000);
            break;
        case 'error':
            NotificationManager.error(message, 'Error!!!', 5000);
            break;
    }
};

export const createInfo = (message) => NotificationManager.info(message, 'Information', 3000);
export const createSuccess = (message) => NotificationManager.success(message, 'Success!', 3000);
export const createWarning = (message) => NotificationManager.warning(message, 'Warning', 3000);
export const createError = (message) => NotificationManager.error(message, 'Error!', 5000);
