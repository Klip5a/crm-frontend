import { Client } from "@entities/client";
import { useAppDispatch } from "@shared/lib/redux";

import {
  closeModal,
  openCreateModal,
  openDeleteModal,
  openEditModal,
} from "../model/slice/modalSlice";

export function useOpenModal() {
  const dispatch = useAppDispatch();

  const createClient = () => {
    dispatch(openCreateModal());
  };

  const editClient = (client: Client) => {
    dispatch(openEditModal(client));
  };

  const deleteClient = (client: Client) => {
    dispatch(openDeleteModal(client));
  };

  const close = () => {
    dispatch(closeModal());
  };

  return { createClient, editClient, deleteClient, close };
}
