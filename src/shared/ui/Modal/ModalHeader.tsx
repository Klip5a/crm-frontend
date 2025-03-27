// import { memo } from "react";

import { ClientData } from "../../../entities/client";
import closeIcon from "../../assets/close.svg";

interface ModalHeaderProps {
  isDelete: boolean;
  isEditing: boolean;
  clientData?: ClientData;
  onClose: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ isDelete, isEditing, clientData, onClose }) => {
  return (
    <>
      {isDelete ? (
        <>
          <h3 className="text-lg text-center font-bold text-black ">Удалить клиента</h3>
          <p className="text-center text-sm mt-2 w-[250px] mx-auto">
            Вы действительно хотите удалить данного клиента?
          </p>
          <button
            onClick={onClose}
            type="button"
            className="absolute top-[15px] right-[15px] text-gray-400 hover:text-gray-500"
          >
            <img src={closeIcon} alt="Закрыть" />
          </button>
        </>
      ) : (
        <div className="px-7 pb-2">
          <div className="flex justify-between">
            <h3 className="text-lg font-bold text-black" id="modal-title">
              {isEditing ? (
                <>
                  Изменить данные
                  <span className="ml-2 text-xs text-txt-grey font-normal">
                    ID: {clientData?.id}
                  </span>
                </>
              ) : (
                <>Новый клиент</>
              )}
            </h3>
            <button
              onClick={onClose}
              type="button"
              className="absolute top-[15px] right-[15px] text-gray-400 hover:text-gray-500"
            >
              <img src={closeIcon} alt="Закрыть" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalHeader;
