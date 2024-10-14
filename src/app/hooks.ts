import { useDispatch, useSelector } from 'react-redux';
import { store, RootState } from './store';

export type AppDispath = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispath>();

export const useAuthSelector = () => useSelector((state: RootState) => state.auth);
