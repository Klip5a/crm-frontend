/**

Represents a contact method for a client

@interface ClientContact

@property {string} type - The type of contact (e.g., 'email', 'phone', 'address')
@property {string} value - The actual contact information value
*/
export interface ClientContact {
  id: string;
  type: string;
  value: string;
}

/**
  
  Represents a client in the system
  
  @interface Client
  
  @property {string} id - Unique identifier for the client
  @property {string} name - Client's first name
  @property {string} lastName - Client's last name
  @property {string} surname - Client's surname or middle name
  @property {string} createdAt - ISO timestamp when the client record was created
  @property {string} updatedAt - ISO timestamp when the client record was last updated
  @property {ClientContact[]} contacts - Array of client's contact information
  */
export interface Client {
  id: string;
  name: string;
  lastName: string;
  surname: string;
  createdAt: string;
  updatedAt: string;
  contacts: ClientContact[];
}
