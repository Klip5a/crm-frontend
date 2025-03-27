export interface ClientContact {
  type: string;
  value: string;
}

/**
 *
 */
export interface ClientData {
  id: number;
  name: string;
  lastName: string;
  surname: string;
  createdAt: string;
  updatedAt: string;
  contacts: ClientContact[];
  [key: string]: string | number | ClientContact[];
}
