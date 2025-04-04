import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ClientData, getClients } from "../../entities/client";
import AddClientButton from "../../features/clients/ui/AddClientButton";
import ClientTable from "../../features/clients/ui/ClientTable";
import Modal from "../../shared/ui/Modal";
import NotificationContainer from "../../shared/ui/Notification";
import Header from "./components/Header";

const CrmPage: React.FC = () => {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [sortField, setSortField] = useState<string | null>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch(query: string) {
    setSearchQuery(query);
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const fetchClients = useCallback(async (query: string) => {
    setIsLoading(true);
    // setTimeout(async () => {
    try {
      const clientsData = await getClients(query);
      setClients(clientsData);
    } catch (error) {
      console.error("Ошибка при получении клиентов:", error);
    } finally {
      setIsLoading(false);
    }
    // }, 1500);
  }, []);

  const debouncedFetchClients = useMemo(() => debounce(fetchClients, 300), [fetchClients]);

  useEffect(() => {
    debouncedFetchClients(searchQuery);
  }, [searchQuery, debouncedFetchClients]);

  const handleSort = (field: string, order: "asc" | "desc") => {
    const sortedClients = [...clients].sort((a, b) => {
      if (order === "asc") {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });

    setClients(sortedClients);
    setSortField(field);
    setSortOrder(order);
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <div className="container max-w-[1186px] min-w-[320px] mx-auto mt-[40px]">
        <h2 className="text-[24px] font-bold max-xl:mx-5">Клиенты</h2>
        <ClientTable
          isLoading={isLoading}
          clients={clients}
          searchQuery={searchQuery}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
          fetchClients={() => fetchClients("")}
        />
        <AddClientButton onClick={openModal} />

        <Modal
          isOpen={isModalOpen}
          isEditing={false}
          isDelete={false}
          onClose={() => setIsModalOpen(false)}
          onSave={() => fetchClients("")}
          onUpdate={() => fetchClients("")}
          onDelete={() => fetchClients("")}
        />
      </div>

      <NotificationContainer />
    </>
  );
};

export default CrmPage;
