import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

const LoginPage = lazy(() => import("../../pages/auth/Login"));
const RegisterPage = lazy(() => import("../../pages/auth/Register"));
const CrmPage = lazy(() => import("../../pages/crm/"));
const ClientPage = lazy(() => import("../../pages/client"));

function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Routes>
          {/* PUBLIC ROUTE */}

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* PROTECTED ROUTE*/}

          <Route
            path="/"
            element={
              //TODO: добавить Protectionroute
              <CrmPage />
            }
          />

          <Route
            path="/clients/:id"
            element={
              //TODO: добавить Protectionroute
              <ClientPage />
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;
