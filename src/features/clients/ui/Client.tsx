import { lazy, Suspense, useState } from "react";

import { ClientData } from "../../../entities/client/types";
import cancelIcon from "../../../shared/assets/cancel.svg";
import contactIcon from "../../../shared/assets/contact.svg";
import editIcon from "../../../shared/assets/edit.svg";
import facebookIcon from "../../../shared/assets/fb.svg";
import mailIcon from "../../../shared/assets/mail.svg";
import phoneIcon from "../../../shared/assets/phone.svg";
import vkIcon from "../../../shared/assets/vk.svg";

// Ленивый импорт модального окна:
const Modal = lazy(() => import("../../../shared/ui/Modal"));

import { useClickOutside } from "../hooks/useClickOutside";
import { useClientModals } from "../hooks/useClientModal";
import { useClientTooltip } from "../hooks/useClientTooltip";
import { formatContactValue } from "../lib/contactUtils";
import { formatDateTime } from "../lib/dateUtils";
import TooltipPortal from "./components/TooltipPortal";
import SpinnerIcon from "./SpinnerIcon";

const ContactIcons = ({ type }: { type: string }) => {
  switch (type.toLowerCase()) {
    case "телефон":
      return <img src={phoneIcon} alt="Phone" width="16" />;
    case "доп. телефон":
      return <img src={phoneIcon} alt="Phone" width="16" />;
    case "email":
      return <img src={mailIcon} alt="Email" width="16" />;
    case "facebook":
      return <img src={facebookIcon} alt="Facebook" width="16" />;
    case "vk":
      return <img src={vkIcon} alt="VK" width="16" />;
    default:
      return <img src={contactIcon} alt="Contact" width="16" />;
  }
};

const Client: React.FC<{
  client: ClientData;
  filterText: string;
  fetchClients: () => void;
}> = ({ client, filterText, fetchClients }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [tooltipTarget, setTooltipTarget] = useState<HTMLDivElement | null>(null);

  const formattedCreatedAt = formatDateTime(client.createdAt);
  const formattedUpdatedAt = formatDateTime(client.updatedAt);

  const {
    tooltipIndex,
    isTooltipOpen,
    isTooltipClicked,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseClick,
    resetTooltip,
  } = useClientTooltip();

  const {
    isEditModalOpen,
    isDeleteModalOpen,
    isDeleting,
    isUpdating,
    openEditModal,
    openDeleteModal,
    closeEditModal,
    closeDeleteModal,
  } = useClientModals();

  const tooltipRef = useClickOutside(resetTooltip);

  const visibleContacts = expanded ? client.contacts : client.contacts.slice(0, 5);

  const handleExpandToggle = () => {
    setExpanded(!expanded);
  };

  const handleUpdateClient = () => {
    closeEditModal();
    fetchClients();
  };

  const handleDeleteClient = () => {
    closeDeleteModal();
    fetchClients();
  };

  // Функция подсветки совпадений
  const highlightMatches = (name: string) => {
    if (!filterText) return name;
    const regex = new RegExp(`(${filterText})`, "gi");
    return name.split(regex).map((part, index) => {
      return part.match(regex) ? (
        <span key={index} className="highlighted">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      );
    });
  };

  return (
    <div
      className="
        flex
        items-center 
        border-b 
        border-gray-200 
        py-2 
        h-[60px]
        bg-white
        text-sm
      "
    >
      <div className="w-[100px] min-w-[80px] pl-5 pr-2 text-txt-grey text-xs break-all">
        {client.id}
      </div>
      <div className="w-[370px] min-w-[220px] text-sm">
        {highlightMatches(client.name)} {highlightMatches(client.lastName)}{" "}
        {highlightMatches(client.surname)}
      </div>
      <div className="w-[175px] min-w-[100px] text-sm pr-2">
        {formattedCreatedAt.date} <span className="text-txt-grey">{formattedCreatedAt.time}</span>
      </div>
      <div className="w-[175px] min-w-[100px] text-sm pr-2">
        {formattedUpdatedAt.date} <span className="text-txt-grey">{formattedUpdatedAt.time}</span>
      </div>
      <div ref={tooltipRef} className="w-[160px] min-w-[130px] flex flex-wrap flex-between">
        {visibleContacts.map((contact, index) => (
          <div
            key={index}
            ref={(el) => {
              if (tooltipIndex === index) {
                setTooltipTarget(el);
              }
            }}
            className={`relative mr-1 cursor-pointer ${visibleContacts.length > 7 ? "mt-1" : ""}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleMouseClick(index)}
          >
            <div
              className={
                (isTooltipOpen && tooltipIndex === index) ||
                (isTooltipClicked && tooltipIndex === index)
                  ? "opacity-100"
                  : "opacity-70"
              }
            >
              <ContactIcons type={contact.type} />
            </div>
            {tooltipIndex === index && (
              <TooltipPortal targetRef={{ current: tooltipTarget }}>
                <div className="z-10 absolute box-content bottom-full left-1/2 -translate-x-1/2 bg-black px-4 py-2 text-xs text-white mb-2.5 break-words max-w-[200px] w-auto h-auto after:content-[''] after:block after:absolute after:w-2 after:h-2 after:bg-black after:-bottom-1 after:-rotate-45 after:left-1/2 after:-translate-x-1/2">
                  {formatContactValue(contact.type, contact.value).isPhone ? (
                    <span className="text-white font-bold whitespace-nowrap">
                      {formatContactValue(contact.type, contact.value).formattedValue}
                    </span>
                  ) : (
                    <>
                      <span className="break-normal">
                        {formatContactValue(contact.type, contact.value).formattedType}:&nbsp;
                      </span>
                      <span className="text-firm font-bold">
                        {formatContactValue(contact.type, contact.value).formattedValue}
                      </span>
                    </>
                  )}
                </div>
              </TooltipPortal>
            )}
          </div>
        ))}
        {!expanded && client.contacts.length > 5 && (
          <button
            onClick={handleExpandToggle}
            className="w-[16px] h-[16px] border-firm border-2 border-collapse rounded-[50%] text-[10px] font-semibold flex text-center items-center opacity-70 hover:opacity-100"
          >
            +{client.contacts.length - 5}
          </button>
        )}
      </div>

      <div className="w-[210px] min-w-[110px] flex flex-col justify-between  lg:flex-row lg:min-w-[210px] lg:pr-5">
        {isUpdating ? (
          <button className="flex items-center text-firm" onClick={openEditModal}>
            <SpinnerIcon color="#9873ff" />
            Изменить
          </button>
        ) : (
          <button className="flex items-center hover:text-firm" onClick={openEditModal}>
            <img src={editIcon} alt="" />
            Изменить
          </button>
        )}
        {isDeleting ? (
          <button className="flex items-center text-red" onClick={openDeleteModal}>
            <SpinnerIcon color="#f06a4d" />
            Удалить
          </button>
        ) : (
          <button className="flex items-center hover:text-red" onClick={openDeleteModal}>
            <img src={cancelIcon} alt="" />
            Удалить
          </button>
        )}
      </div>

      <Suspense fallback={null}>
        <Modal
          isOpen={isEditModalOpen}
          isEditing={true}
          isDelete={false}
          onClose={closeEditModal}
          onSave={closeEditModal}
          onUpdate={handleUpdateClient}
          onDelete={handleDeleteClient}
          clientData={client}
        />
        <Modal
          isOpen={isDeleteModalOpen}
          isEditing={false}
          isDelete={true}
          onClose={closeDeleteModal}
          onUpdate={closeDeleteModal}
          onDelete={handleDeleteClient}
          clientData={client}
        />
      </Suspense>
    </div>
  );
};

export default Client;
