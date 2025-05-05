import { useModal } from "@features/clients/hooks/useModal";
import { useOpenModal } from "@features/clients/hooks/useOpenModal";

interface ModalFooterProps {
  isEditing?: boolean;
  // onSave?: () => Promise<void>;
  // onDelete?: () => void;
  textButton: string;
  onClose: () => void;
  onSubmit: () => void;
}

const ModalFooter: React.FC<ModalFooterProps> = ({
  isEditing,
  textButton,
  onSubmit,
  // onSave,
  // onDelete,
  onClose,
}) => {
  const { deleteClientModal } = useOpenModal();
  const { selectedClient } = useModal();

  const handleDeleteClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (selectedClient) {
      onClose(); // Закрываем текущее модальное окно
      deleteClientModal(selectedClient); // Открываем модальное окно удаления
    }
  };

  return (
    <div className="flex py-5 flex-col items-center">
      {/* {isDelete ? (
        <button
          onClick={onDelete}
          type="button"
          className="
                block
                py-3
                px-8
                bg-firm
                w-[147px]
                h-[44px]
                text-sm
                font-semibold
              text-white
              hover:bg-firm-secondary
              hover:text-white
              active:bg-[#8052ff]
              disabled:bg-grey
              disabled:text-white
              "
        >
          Удалить
        </button>
      ) : (
        <button
          onClick={onSave}
          type="button"
          className="
              block
              py-3
              px-8
            bg-firm
              w-[147px]
              h-[44px]
              text-sm
              font-semibold
              text-white
              hover:bg-firm-secondary
              hover:text-white
              active:bg-[#8052ff]
              disabled:bg-grey
              disabled:text-white
            "
        >
          Сохранить
        </button>
      )} */}
      <button
        onClick={onSubmit}
        type="button"
        className="
              block
              py-3
              px-8
            bg-firm
              w-[147px]
              h-[44px]
              text-sm
              font-semibold
              text-white
              hover:bg-firm-secondary
              hover:text-white
              active:bg-[#8052ff]
              disabled:bg-grey
              disabled:text-white
            "
      >
        {textButton}
      </button>
      {isEditing ? (
        // <a href="#" onClick={onDelete} className="text-black text-sm underline mt-3">
        //   Удалить клиента
        // </a>
        <a href="#" onClick={handleDeleteClick} className="text-black text-sm underline mt-3">
          Удалить клиента
        </a>
      ) : (
        <a href="#" onClick={onClose} className="text-black text-sm underline mt-2">
          Отмена
        </a>
      )}
    </div>
  );
};

export default ModalFooter;
