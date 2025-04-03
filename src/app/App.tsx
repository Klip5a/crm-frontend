import { useState } from "react";

import CrmPage from "../pages/crm";
import Header from "../pages/crm/components/Header";
import NotificationContainer from "../shared/ui/Notification";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch(query: string) {
    setSearchQuery(query);
  }

  return (
    <main className="font-opensans">
      <Header onSearch={handleSearch} />
      <CrmPage searchQuery={searchQuery} />
      <NotificationContainer />
    </main>
  );
}

export default App;
