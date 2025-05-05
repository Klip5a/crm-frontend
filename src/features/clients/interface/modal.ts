import { Client } from "@entities/client";

export interface ModalProps {
  selectedClient: Client | null;
  isOpen: boolean;
  isEditing?: boolean;
  isDelete?: boolean;
  isCreate?: boolean;
}
