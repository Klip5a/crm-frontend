import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { Client } from "@entities/client";

import { CrmRootState } from "../store/clientLocalStore";

export type ModalType = "create" | "edit" | "delete" | null;

export interface ClientModalSlice {
  isOpen: boolean;
  modalType: ModalType;
  selectedClient: Client | null;
  loadingStates: {
    editModal: boolean;
    deleteModal: boolean;
  };
}

const initialState: ClientModalSlice = {
  isOpen: false,
  modalType: null,
  selectedClient: null,
  loadingStates: {
    editModal: false,
    deleteModal: false,
  },
};

const clientModalSlice = createSlice({
  name: "clientModal",
  initialState,
  reducers: {
    startLoading: (state, action: PayloadAction<keyof typeof state.loadingStates>) => {
      state.loadingStates[action.payload] = true;
    },
    stopLoading: (state, action: PayloadAction<keyof typeof state.loadingStates>) => {
      state.loadingStates[action.payload] = false;
    },
    openCreateModal: (state) => {
      state.isOpen = true;
      state.modalType = "create";
      state.selectedClient = null;
    },
    openEditModal: (state, action: PayloadAction<Client>) => {
      state.isOpen = true;
      state.modalType = "edit";
      state.selectedClient = action.payload;
      state.loadingStates.editModal = false;
    },
    openDeleteModal: (state, action: PayloadAction<Client>) => {
      state.isOpen = true;
      state.modalType = "delete";
      state.selectedClient = action.payload;
      state.loadingStates.deleteModal = false;
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

export const {
  openCreateModal,
  openEditModal,
  openDeleteModal,
  closeModal,
  clearModalData,
  stopLoading,
  startLoading,
} = clientModalSlice.actions;

export const selectClientModal = (state: CrmRootState) => state.clientModal;

export default clientModalSlice.reducer;
