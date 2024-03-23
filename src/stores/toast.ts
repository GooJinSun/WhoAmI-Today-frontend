import { SliceStateCreator } from './useBoundStore';

interface Toast {
  message: string;
  actionText?: string | null;
  action?: () => void;
}
interface ToastState {
  toast?: Toast;
}

interface ToastAction {
  openToast: (toast: Toast) => void;
  closeToast: () => void;
}

const initialState = {
  toast: undefined,
};

export type ToastSlice = ToastState & ToastAction;

export const createToastSlice: SliceStateCreator<ToastSlice> = (set) => ({
  ...initialState,
  openToast: (toast: Toast) => set(() => ({ toast }), false, 'toast/openToast'),
  closeToast: () => set(() => ({ message: undefined }), false, 'toast/closeToast'),
});
