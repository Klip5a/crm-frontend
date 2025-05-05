import { Client } from "@entities/client";
import {
  useAddClientMutation,
  useDeleteClientMutation,
  useGetClientByIdQuery,
  useGetClientsQuery,
  useSearchClientsQuery,
  useUpdateClientMutation,
} from "@entities/client/api";

interface UseClientsOptions {
  searchQuery?: string;
  clientId?: string;
}

export function useClients({ searchQuery, clientId }: UseClientsOptions = {}) {
  const trimmed = searchQuery?.trim() || "";

  const { data: searchData, isLoading: isSearching } = useSearchClientsQuery(trimmed, {
    skip: !trimmed,
  });

  const { data: listData, isLoading: isListing } = useGetClientsQuery(undefined, {
    skip: !!trimmed,
  });

  const { data: clientData, isLoading: isLoadingClient } = useGetClientByIdQuery(clientId ?? "", {
    skip: !clientId,
  });

  const [addClient, { isLoading: isAdding }] = useAddClientMutation();
  const [updateClientMutation, { isLoading: isUpdating }] = useUpdateClientMutation();
  const [deleteClientMutation, { isLoading: isDeleting }] = useDeleteClientMutation();

  const clients = trimmed ? searchData ?? [] : listData ?? [];
  const client = clientData;
  const isLoading =
    isSearching || isListing || isLoadingClient || isAdding || isUpdating || isDeleting;

  const createClient = async (client: Omit<Client, "id" | "createdAt" | "updatedAt">) => {
    await addClient(client).unwrap();
  };

  const updateClient = async (client: Partial<Client> & { id: string }) => {
    await updateClientMutation(client).unwrap();
  };

  const deleteClient = async (id: string) => {
    await deleteClientMutation(id).unwrap();
  };

  return {
    clients,
    client,
    isLoading,
    createClient,
    updateClient,
    deleteClient,
  };
}
