import { useCrmSelector } from "./crmRedux";

import { selectClientModal } from "../model/modalSlice";

export const useModal = () => {
  const { isOpen, modalType, selectedClient } = useCrmSelector(selectClientModal);

  const isCreate = modalType === "create";
  const isEditing = modalType === "edit";
  const isDelete = modalType === "delete";

  return {
    isOpen,
    selectedClient,
    isCreate,
    isEditing,
    isDelete,
  };
};
