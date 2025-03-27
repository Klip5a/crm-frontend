interface ModalFooterProps {
  isDelete: boolean;
  isEditing: boolean;
  onSave: () => void;
  onDelete: () => void;
  onClose: () => void;
}

const ModalFooter: React.FC<ModalFooterProps> = ({
  isDelete,
  isEditing,
  onSave,
  onDelete,
  onClose,
}) => {
  return (
    <div className="flex py-5 flex-col items-center">
      {isDelete ? (
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
      )}
      {/* {isEditing ? (
        <a href="#" onClick={onDelete} className="text-black text-sm underline mt-3">
          Удалить клиента
        </a>
      ) : (
        <a href="#" onClick={onClose} className="text-black text-sm underline mt-2">
          Отмена
        </a>
      )} */}
      {isEditing ? (
        isDelete ? (
          <a href="#" onClick={onClose} className="text-black text-sm underline mt-2">
            Отмена
          </a>
        ) : (
          <a href="#" onClick={onDelete} className="text-black text-sm underline mt-3">
            Удалить клиента
          </a>
        )
      ) : (
        <a href="#" onClick={onClose} className="text-black text-sm underline mt-2">
          Отмена
        </a>
      )}
    </div>
  );
};

export default ModalFooter;
