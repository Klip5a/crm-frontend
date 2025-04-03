import { ClientData } from "../../../entities/client/types";
import Client from "./Client";
import ClientTableHeader from "./ClientTableHeader";
import ClientTableSkeleton from "./ClientTableSkeleton";

interface ClientTableProps {
  isLoading: boolean;
  clients: ClientData[];
  searchQuery: string;
  sortField: string | null;
  sortOrder: "asc" | "desc";
  onSort: (field: string, order: "asc" | "desc") => void;
  fetchClients: () => void;
}

const ClientTable: React.FC<ClientTableProps> = ({
  isLoading,
  clients,
  searchQuery,
  sortField,
  sortOrder,
  onSort,
  fetchClients,
}) => {
  return (
    <div className="overflow-x-auto max-xl:mx-5">
      <div className="grid-table-container">
        <ClientTableHeader onSort={onSort} sortField={sortField} sortOrder={sortOrder} />
        <div>
          {isLoading
            ? Array(5)
                .fill(0)
                .map((_, index) => <ClientTableSkeleton key={index} />)
            : clients.map((client) => (
                <Client
                  key={client.id}
                  client={client}
                  filterText={searchQuery}
                  fetchClients={fetchClients}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default ClientTable;
