import { useCallback, useState } from "react";

export const useClientModals = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const openEditModal = useCallback(() => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setIsEditModalOpen(true);
    }, 1000);
  }, []);

  const openDeleteModal = useCallback(() => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      setIsDeleteModalOpen(true);
    }, 1000);
  }, []);

  const closeEditModal = () => setIsEditModalOpen(false);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  return {
    isEditModalOpen,
    isDeleteModalOpen,
    isDeleting,
    isUpdating,
    openEditModal,
    openDeleteModal,
    closeEditModal,
    closeDeleteModal,
  };
};
