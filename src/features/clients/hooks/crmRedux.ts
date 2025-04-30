import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { CrmAppDispatch, CrmRootState } from "../store/clientLocalStore";

export const useCrmDispatch = () => useDispatch<CrmAppDispatch>();
export const useCrmSelector: TypedUseSelectorHook<CrmRootState> = useSelector;
