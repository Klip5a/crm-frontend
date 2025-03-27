const BASE_URL = "http://localhost:3000/api/clients";

export async function getClients(search = "") {
  try {
    const url = new URL(BASE_URL);
    url.searchParams.append("search", search);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch clients");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
}

export async function createClient(clientData) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientData),
    });
    if (!response.ok) {
      throw new Error("Failed to create client");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating client:", error);
    throw error;
  }
}

export async function getClientById(id) {
  try {
    const url = new URL(`${BASE_URL}/${id}`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch client by ID");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching client by ID:", error);
    throw error;
  }
}

export async function updateClient(id, clientData) {
  try {
    const url = new URL(`${BASE_URL}/${id}`);
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientData),
    });
    if (!response.ok) {
      throw new Error("Failed to update client");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating client:", error);
    throw error;
  }
}

export async function deleteClient(id) {
  try {
    const url = new URL(`${BASE_URL}/${id}`);
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete client");
    }
    return true; // Возвращаем true, если удаление прошло успешно
  } catch (error) {
    console.error("Error deleting client:", error);
    throw error;
  }
}
