import { createEntityAdapter } from "@reduxjs/toolkit";
import { error } from "console";

import { Client } from "../types";

interface ClientExtraState {
  loading: boolean;
  error: string | null;
}

const clientAdapter = createEntityAdapter<Client>();

const initialState = clientAdapter.getInitialState<ClientExtraState>({
  loading: false,
  error: null,
});
