import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { ClientData, getClientById } from "../../entities/client";

function ClientPage() {
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<ClientData | null>(null);

  useEffect(() => {
    if (id) {
      getClientById(id)
        .then((res) => {
          setClient(res);
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  if (!client) return <div>Загрузка...</div>;

  console.log(client);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="rounded-2xl shadow-xl p-4 flex flex-col">
        <span>id: {client.id}</span>
        <span>name: {client.name}</span>
        <span>lastName: {client.lastName}</span>
        <span>surname: {client.surname}</span>
        <span>createdAt: {client.id}</span>
        <span>updatedAt: {client.id}</span>
        <ul className="bg-gray-300">
          contacts:{" "}
          {client.contacts.map((contact) => (
            <li className="border-green border-2">
              <span>type: {contact.type}</span>
              <br />
              <span>value: {contact.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ClientPage;
