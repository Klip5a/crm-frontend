// import { useState } from "react";

import { useAppSelector } from "@shared/lib/redux";

import { selectClientModal } from "../model/slice/modalSlice";

export const useClientModal = () => {
  // const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  // const [isDeleting, setIsDeleting] = useState<boolean>(false);
  // const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // const openEditModal = useCallback(() => {
  //   setIsUpdating(true);
  //   setTimeout(() => {
  //     setIsUpdating(false);
  //     setIsEditModalOpen(true);
  //   }, 1000);
  // }, []);

  // const openDeleteModal = useCallback(() => {
  //   setIsDeleting(true);
  //   setTimeout(() => {
  //     setIsDeleting(false);
  //     setIsDeleteModalOpen(true);
  //   }, 1000);
  // }, []);

  // const closeEditModal = () => setIsEditModalOpen(false);
  // const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const { isOpen, modalType, selectedClient } = useAppSelector(selectClientModal);
  // const [confirmDelete, setConfirmDelete] = useState(false);

  const isEditing = modalType === "edit";
  const isDelete = modalType === "delete";

  // const deletionMode = isEditing ? confirmDelete : isDelete;

  return {
    isOpen,
    selectedClient,
    isEditing,
    isDelete,
    // deletionMode,
    // setConfirmDelete,
    // isEditModalOpen,
    // isDeleteModalOpen,
    // isDeleting,
    // isUpdating,
    // openEditModal,
    // openDeleteModal,
    // closeEditModal,
    // closeDeleteModal,
  };
};
