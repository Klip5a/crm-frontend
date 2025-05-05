import { useClients } from "@features/clients/hooks/useClients";
import { useOpenModal } from "@features/clients/hooks/useOpenModal";
import { ModalProps } from "@features/clients/interface/modal";
import { useNotification } from "@shared/hooks/useNotification";
import Modal from "@shared/ui/Modal";

import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";

const ClientDeleteModal: React.FC<ModalProps> = ({ selectedClient, isOpen, isDelete }) => {
  const { close } = useOpenModal();
  const { deleteClient } = useClients();
  const { addNotification } = useNotification();

  const handleDelete = async () => {
    if (!selectedClient) return;

    try {
      await deleteClient(selectedClient.id);
      addNotification(
        "success",
        `Клиент ${selectedClient.name} ${selectedClient.lastName} удален`,
        5000
      );
      close();
    } catch (error) {
      addNotification("error", "Ошибка при удалении клиента", 5000);
    }
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader isDelete={isDelete} onClose={close} />
      <ModalFooter textButton="Удалить" onSubmit={handleDelete} onClose={close} />
    </Modal>
  );
};

export default ClientDeleteModal;
