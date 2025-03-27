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
            sortField === field && sortOrder === "desc" ? "rotate-180" : ""
          }`}
        />
      </span>
    );
  };

  return (
    <div className="flex items-center text-xs text-grey mt-2.5 h-8">
      <div
        className="flex items-center w-[100px] min-w-[80px] cursor-pointer pl-5 text-firm"
        onClick={() => handleSort("id")}
      >
        ID
        {renderSortIcon("id")}
      </div>
      <div
        className="flex items-center w-[370px] min-w-[220px] cursor-pointer"
        onClick={() => handleSort("name")}
      >
        <p>Фамилия Имя Отчество&nbsp;{renderSortIcon("name")}</p>
        <span className="ml-1 text-firm text-[10px]">{sortOrder === "asc" ? "А-Я" : "Я-А"}</span>
      </div>
      <div
        className="flex items-center w-[175px] min-w-[100px] cursor-pointer"
        onClick={() => handleSort("createdAt")}
      >
        <p>
          Дата и время{" "}
          <span className="whitespace-nowrap">создания{renderSortIcon("createdAt")}</span>
        </p>
      </div>
      <div
        className="flex items-center w-[175px] min-w-[100px] cursor-pointer"
        onClick={() => handleSort("updatedAt")}
      >
        <p>
          Последние{" "}
          <span className="whitespace-nowrap">изменения{renderSortIcon("updatedAt")}</span>
        </p>
      </div>
      <div className="flex items-center w-[160px] min-w-[130px]">Контакты</div>
      <div className="flex items-center w-[210px] min-w-[110px] lg:min-w-[210px]">Действия</div>
    </div>
  );
};

export default ClientTableHeader;
