import { createEntityAdapter } from "@reduxjs/toolkit";

import { Client } from "../types";

const clientAdapter = createEntityAdapter<Client>({
  selectId: (client: Omit<Client, "id">) => client.id,
});

const initialState = clientAdapter.getInitialState<{}>;
