import { Client } from "@entities/client";

import { useCrmDispatch } from "./crmRedux";

import { closeModal, openCreateModal, openDeleteModal, openEditModal } from "../model/modalSlice";

export function useOpenModal() {
  const dispatch = useCrmDispatch();

  return {
    createClientModal: () => {
      dispatch(openCreateModal());
    },
    editClientModal: (client: Client) => {
      dispatch(openEditModal(client));
    },
    deleteClientModal: (client: Client) => {
      dispatch(openDeleteModal(client));
    },
    close: () => {
      dispatch(closeModal());
    },
  };
}
