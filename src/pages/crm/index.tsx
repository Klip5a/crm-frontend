// import { useState } from "react";

// import { Client, getClients, searchClients } from "@entities/client";
import { useOpenModal } from "@features/clients/hooks/useOpenModal";
import AddClientButton from "@features/clients/ui/AddClientButton";
import ClientModal from "@features/clients/ui/ClientModal";
import ClientTable from "@features/clients/ui/ClientTable/ClientTable";
import NotificationContainer from "@shared/ui/Notification";

import Header from "./components/Header";
import { useSearch } from "./hooks/useSearch";

const CrmPage: React.FC = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const [searchQuery, setSearchQuery] = useState("");

  // function handleSearch(query: string) {
  //   setSearchQuery(query);
  // }

  const { search, debounceSearch, onSearchChange } = useSearch("", 300);
  const { createClient } = useOpenModal();
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
        <AddClientButton onClick={createClient} />

        <ClientModal
        // isOpen={isModalOpen}
        // isEditing={false}
        // isDelete={false}
        // onClose={() => setIsModalOpen(false)}
        // onSave={fetchClients}
        // onUpdate={fetchClients}
        // onDelete={fetchClients}
        />
      </div>

      <NotificationContainer />
    </>
  );
};

export default CrmPage;
