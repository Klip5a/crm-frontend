import { useCallback } from "react";
const BASE_URL = "http://localhost:3000/api/clients";

export function useClintSearch() {
  const searchClients = useCallback(async (query: string) => {
    setIsLoading(true);
    try {
      const url = new URL(BASE_URL);
      url.searchParams.append("search", query);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to search clients");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching clients:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { searchClients };
}
