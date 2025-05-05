// import { useState } from "react";

// import { Client, getClients, searchClients } from "@entities/client";
import { useModal } from "@features/clients/hooks/useModal";
import { useOpenModal } from "@features/clients/hooks/useOpenModal";
import { ClientProvider } from "@features/clients/provider/ClientProvider";
import AddClientButton from "@features/clients/ui/AddClientButton";
import ClientCreateModal from "@features/clients/ui/ClientModal/ClientCreateModal";
import ClientDeleteModal from "@features/clients/ui/ClientModal/ClientDeleteModal";
// import ClientModal from "@features/clients/ui/ClientModal";
import ClientUpdateModal from "@features/clients/ui/ClientModal/ClientUpdateModal";
import ClientTable from "@features/clients/ui/ClientTable/ClientTable";
import NotificationContainer from "@shared/ui/Notification";

import Header from "./components/Header";
import { useSearch } from "./hooks/useSearch";

const CrmContent: React.FC = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const [searchQuery, setSearchQuery] = useState("");

  // function handleSearch(query: string) {
  //   setSearchQuery(query);
  // }

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const onSkeleton

  // const debouncedFetchClients = useMemo(
  //   () => debounce(fetchClientsBySearch, 300),
  //   [fetchClientsBySearch]
  // );

  // useEffect(() => {
  //   if (searchQuery) {
  //     debouncedFetchClients(searchQuery);
  //   } else {
  //     fetchClients;
  //   }
  // }, [searchQuery, debouncedFetchClients, fetchClients]);

  const { search, debounceSearch, onSearchChange } = useSearch("", 300);
  const { isOpen, selectedClient, isEditing, isCreate, isDelete } = useModal();
  const { createClientModal } = useOpenModal();

  return (
    <>
      <Header value={search} onChange={onSearchChange} />
      <div className="container max-w-[1186px] min-w-[320px] mx-auto mt-[40px]">
        <h2 className="text-[24px] font-bold max-xl:mx-5">Клиенты</h2>
        <ClientTable
          // isLoading={isLoading}
          // clients={clients}
          searchQuery={debounceSearch}
          // sortField={sortField}
          // sortOrder={sortOrder}
          // onSort={handleSort}
          // fetchClients={fetchClients}
        />
        <AddClientButton onClick={createClientModal} />

        {/* <ClientModal
        // isOpen={isModalOpen}
        // isEditing={false}
        // isDelete={false}
        // onClose={() => setIsModalOpen(false)}
        // onSave={fetchClients}
        // onUpdate={fetchClients}
        // onDelete={fetchClients}
        /> */}
        {/* <ClientCreateModal
          isOpen={modalType === "create" && isOpen}
          onClose={() => dispatch(closeModal())}
        /> */}

        <ClientUpdateModal
          key={selectedClient?.id}
          isOpen={isOpen && isEditing}
          selectedClient={selectedClient}
          isEditing={isEditing}
        />

        <ClientCreateModal selectedClient={selectedClient} isOpen={isOpen && isCreate} />

        <ClientDeleteModal
          isOpen={isOpen && isDelete}
          selectedClient={selectedClient}
          isDelete={isDelete}
        />
      </div>

      <NotificationContainer />
    </>
  );
};

export default function CrmPage() {
  return (
    <ClientProvider>
      <CrmContent />
    </ClientProvider>
  );
}
