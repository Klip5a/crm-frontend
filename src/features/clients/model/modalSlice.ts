import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { Client } from "@entities/client";

import { CrmRootState } from "../store/clientLocalStore";

export type ModalType = "create" | "edit" | "delete" | null;

export interface ClientModalSlice {
  isOpen: boolean;
  modalType: ModalType;
  selectedClient: Client | null;
}

const initialState: ClientModalSlice = {
  isOpen: false,
  modalType: null,
  selectedClient: null,
};

const clientModalSlice = createSlice({
  name: "clientModal",
  initialState,
  reducers: {
    openCreateModal: (state) => {
      state.isOpen = true;
      state.modalType = "create";
      state.selectedClient = null;
    },
    openEditModal: (state, action: PayloadAction<Client>) => {
      state.isOpen = true;
      state.modalType = "edit";
      state.selectedClient = action.payload;
    },
    openDeleteModal: (state, action: PayloadAction<Client>) => {
      state.isOpen = true;
      state.modalType = "delete";
      state.selectedClient = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
      // Не очищаем selectedClient сразу для плавной анимации закрытия
    },
    clearModalData: (state) => {
      state.selectedClient = null;
    },
  },
});

export const { openCreateModal, openEditModal, openDeleteModal, closeModal, clearModalData } =
  clientModalSlice.actions;

export const selectClientModal = (state: CrmRootState) => state.clientModal;

export default clientModalSlice.reducer;
