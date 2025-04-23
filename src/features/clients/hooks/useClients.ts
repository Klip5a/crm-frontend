import { useCallback, useEffect, useState } from "react";

import { Client } from "@entities/client";

const BASE_URL = "http://localhost:3000/api/clients";

export function useClients(searchQuery?: string) {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  // }, [fetchClients]);

  const fetchClients = useCallback(async () => {
    //     const url = new URL(BASE_URL);
    //     const response = await fetch(url);
    //     if (!response.ok) {
    //       throw new Error("Failed to fetch clients");
    //     }
    //     return await response.json();
    //   } catch (error) {
    //     console.error("Error fetching clients:", error);
    //     throw error;
    //   }
    // setIsLoading(true);
    // setTimeout(async () => {
    setIsLoading(true);

    try {
      //   const clientsData = await getClients();
      const res = await fetch(BASE_URL);
      if (!res.ok) {
        throw new Error("Failed to fetch clients");
      }
      const data = await res.json();
      setClients(data);
    } catch (error) {
      console.error("Ошибка при получении клиентов:", error);
    } finally {
      setIsLoading(false);
    }
    // }, 1500);
  }, []);

  //   const fetchClientsBySearch = useCallback(async (query: string) => {
  //     setIsLoading(true);
  //     try {
  //       const clientsData = await searchClients(query);
  //       setClients(clientsData);
  //     } catch (error) {
  //       console.error("Ошибка при поиске клиентов:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }, []);

  const searchClients = useCallback(async (query: string) => {
    setIsLoading(true);
    try {
      const url = new URL(BASE_URL);
      url.searchParams.append("search", query);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to search clients");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching clients:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (searchQuery && searchQuery.trim()) {
      searchClients(searchQuery.trim());
    } else {
      fetchClients();
    }
  }, [searchQuery, fetchClients, searchClients]);

  const createClient = async (client: Omit<Client, "id">) => {
    setIsLoading(true);
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
      });

      if (response.ok) {
        await fetchClients();
      } else {
        throw new Error("Failed to create client");
      }
    } catch (error) {
      console.error("Error creating client:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getClientById = async (clientId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/${clientId}`);

      if (response.ok) {
        fetchClients();
      } else {
        throw new Error("Failed to fetch client by ID");
      }
    } catch (error) {
      console.error("Error fetching client by ID:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateClient = async (client: Client) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/${client.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
      });

      if (response.ok) {
        await fetchClients();
      } else {
        throw new Error("Failed to update client");
      }
    } catch (error) {
      console.error("Error updating client:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteClient = async (clientId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/${clientId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchClients();
      } else {
        throw new Error("Failed to delete client");
      }
    } catch (error) {
      console.error("Error deleting client:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    clients,
    isLoading,
    createClient,
    updateClient,
    deleteClient,
    getClientById,
  };
}
