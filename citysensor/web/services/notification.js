/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import Notification from 'components/Notification';

export const SUCCESS = 'success';
export const ERROR = 'error';
export const WARN = 'warn';

/**
 * Notification Snackbar with Message
 * @param String message - required
 * @param String type - defaults to info if none provided
 */
export const showNotification = (message, type = 'info') => {
  ReactDOM.render(<Notification show message={message} type={type} />, document.getElementById('notification'));
};
