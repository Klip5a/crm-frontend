import { useEffect } from "react";
import { Provider } from "react-redux";

import { useCrmDispatch, useCrmSelector } from "../hooks/crmRedux";
import { clearModalData, selectClientModal } from "../model/modalSlice";
import { crmStore } from "../store/clientLocalStore";

const ModalStateListener: React.FC = () => {
  const dispatch = useCrmDispatch();
  const { isOpen } = useCrmSelector(selectClientModal);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        dispatch(clearModalData());
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isOpen, dispatch]);

  return null;
};

export const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={crmStore}>
      <ModalStateListener />
      {children}
    </Provider>
  );
};
