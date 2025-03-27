import { useState } from "react";

import CrmPage from "../pages/crm";
import Header from "../pages/crm/components/Header";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch(query: string) {
    setSearchQuery(query);
  }

  return (
    <main className="font-opensans">
      <Header onSearch={handleSearch} />
      <CrmPage searchQuery={searchQuery} />
    </main>
  );
}

export default App;
