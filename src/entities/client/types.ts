export interface ClientContact {
  type: string;
  value: string;
}

/**
 *
 */
export interface Client {
  id: number;
  name: string;
  lastName: string;
  surname: string;
  createdAt: string;
  updatedAt: string;
  contacts: ClientContact[];
  [key: string]: string | number | ClientContact[];
}
