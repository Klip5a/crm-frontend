import { useMemo, useState } from "react";

import ClientRow from "./ClientRow";
import ClientTableHeader, { Field } from "./ClientTableHeader";
import ClientTableSkeleton from "./ClientTableSkeleton";

import { useClients } from "../../hooks/useClients";

interface ClientTableProps {
  // isLoading: boolean;
  // clients: Client[];
  searchQuery: string;
  // sortField: string | null;
  // sortOrder: "asc" | "desc";
  // onSort: (field: string, order: "asc" | "desc") => void;
  // fetchClients: () => void;
}

const ClientTable: React.FC<ClientTableProps> = ({
  // isLoading,
  // clients,
  searchQuery,
  // sortField,
  // sortOrder,
  // onSort,
  // fetchClients,
}) => {
  const { clients, isLoading } = useClients({ searchQuery });
  // const [sortField, setSortField] = useState<string | null>("id");
  const [sortField, setSortField] = useState<Field | null>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedClients = useMemo(() => {
    if (!sortField) return clients;

    return [...clients].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (aVal === bVal) return 0;
      // if (order === "asc") {
      //   return a[field] > b[field] ? 1 : -1;
      // } else {
      //   return a[field] < b[field] ? 1 : -1;
      // }

      const result = aVal > bVal ? 1 : -1;
      return sortOrder === "asc" ? result : -result;
    });
  }, [clients, sortField, sortOrder]);

  const handleSort = (field: Field, order: "asc" | "desc") => {
    setSortField(field);
    setSortOrder(order);
  };

  return (
    <div className="overflow-x-auto max-xl:mx-5">
      <div className="grid-table-container">
        <ClientTableHeader onSort={handleSort} sortField={sortField} sortOrder={sortOrder} />
        <div>
          {isLoading
            ? Array(5)
                .fill(0)
                .map((_, index) => <ClientTableSkeleton key={index} />)
            : sortedClients.map((client) => (
                <ClientRow
                  key={client.id}
                  client={client}
                  filterText={searchQuery}
                  // fetchClients={fetchClients}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default ClientTable;
