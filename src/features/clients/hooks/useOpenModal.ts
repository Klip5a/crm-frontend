import { Client } from "@entities/client";

import { useCrmDispatch } from "./crmRedux";

import {
  closeModal,
  openCreateModal,
  openDeleteModal,
  openEditModal,
  startLoading,
} from "../model/modalSlice";

const TIMEOUT = 500;

export function useOpenModal() {
  const dispatch = useCrmDispatch();

  return {
    createClientModal: () => {
      dispatch(openCreateModal());
    },
    editClientModal: (client: Client) => {
      dispatch(startLoading("editModal"));
      setTimeout(() => {
        dispatch(openEditModal(client));
      }, TIMEOUT);
    },
    deleteClientModal: (client: Client) => {
      dispatch(startLoading("deleteModal"));
      setTimeout(() => {
        dispatch(openDeleteModal(client));
      }, TIMEOUT);
    },
    close: () => {
      dispatch(closeModal());
    },
  };
}
