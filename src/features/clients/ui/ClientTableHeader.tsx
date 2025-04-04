import arrowSort from "../../../shared/assets/arrow-sort.svg";

interface ClientTableHeaderProps {
  onSort: (field: string, order: "asc" | "desc") => void;
  sortField: string | null;
  sortOrder: "asc" | "desc";
}

const ClientTableHeader: React.FC<ClientTableHeaderProps> = ({ onSort, sortField, sortOrder }) => {
  const handleSort = (field: string) => {
    const newOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    onSort(field, newOrder);
  };

  const renderSortIcon = (field: string) => {
    return (
      <span className="relative inline-block ml-1 h-2.5 w-2.5 ">
        <img
          src={arrowSort}
          alt={`Sort ${sortOrder === "asc" ? "ascending" : "descending"}`}
          className={`absolute top-[2px] transform ${
            sortField === field && sortOrder === "asc" ? "rotate-180" : ""
          }`}
        />
      </span>
    );
  };

  return (
    <div className="grid-table-header mt-2.5 h-8 text-xs text-grey">
      <div
        className="grid-table-cell-id cursor-pointer pl-5 text-firm flex items-center"
        onClick={() => handleSort("id")}
      >
        ID
        {renderSortIcon("id")}
      </div>
      <div
        className="grid-table-cell-name cursor-pointer flex items-center"
        onClick={() => handleSort("name")}
      >
        <p>Фамилия Имя Отчество&nbsp;{renderSortIcon("name")}</p>
        <span className="ml-1 text-firm text-[10px]">{sortOrder === "asc" ? "А-Я" : "Я-А"}</span>
      </div>
      <div
        className="grid-table-cell-created cursor-pointer flex items-center"
        onClick={() => handleSort("createdAt")}
      >
        <p>
          Дата и время{" "}
          <span className="whitespace-nowrap">создания{renderSortIcon("createdAt")}</span>
        </p>
      </div>
      <div
        className="grid-table-cell-updated cursor-pointer flex items-center"
        onClick={() => handleSort("updatedAt")}
      >
        <p>
          Последние{" "}
          <span className="whitespace-nowrap">изменения{renderSortIcon("updatedAt")}</span>
        </p>
      </div>
      <div className="grid-table-cell-contacts flex items-center">Контакты</div>
      <div className="grid-table-cell-actions flex items-center">Действия</div>
    </div>
  );
};

export default ClientTableHeader;
