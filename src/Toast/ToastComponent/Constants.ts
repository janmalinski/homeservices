import { colors } from '@src/components';
import { ToastVariant } from './Interfaces';

export const TOAST_MARGIN = 20;
export const TOAST_MIN_HEIGHT = 50;
export const TOAST_PADDING = 10;
export const CLOSE_ICON_SIZE = 12;
export const BIG_ICON_SIZE = 30;

export const Icons: Record<ToastVariant, string> = {
  error: 'exclamation-circle',
  info: 'info-circle',
  success: 'check-circle',
  warning: 'exclamation-triangle',
};

export const IconColors: Record<ToastVariant, string> = {
  error: colors.error,
  info: colors.primary,
  success: colors.success,
  warning: colors.warning,
};
