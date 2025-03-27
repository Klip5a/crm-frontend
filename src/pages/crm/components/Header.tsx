import { useState } from "react";

const Header = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  }

  return (
    <header className="bg-white">
      <div className="container flex justify-center sm:justify-start h-[90px] max-w-[1366px] mx-auto items-center p-[20px]">
        <div className="w-[50px] h-[50px] bg-firm flex items-center justify-center text-white font-bold rounded-[50px]">
          skb.
        </div>
        <form className="hidden sm:block w-[80%] max-w-[580px]">
          <input
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full h-[44px] ml-[53px] border-[1px] border-[rgba(51, 51, 51, 0.2)] px-[16px] placeholder:text-txt-grey outline-none"
            placeholder="Введите запрос"
            type="search"
          />
        </form>
      </div>
    </header>
  );
};

export default Header;
