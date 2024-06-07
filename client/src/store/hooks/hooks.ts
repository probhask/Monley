import { useDispatch,useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState,AppDispatch } from '../store';
// import {}   from "react-redux/es/type";
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;