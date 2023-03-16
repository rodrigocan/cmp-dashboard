import React from "react";

import { Refine, AuthProvider } from "@pankod/refine-core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
  LightTheme,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-mui";

import {
  BusinessOutlined,
  SensorDoorOutlined,
  Groups2Outlined,
  DescriptionOutlined,
  AccountCircleOutlined,
  SummarizeOutlined
} from '@mui/icons-material'

import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import axios, { AxiosRequestConfig } from "axios";
import { useTranslation } from "react-i18next";
import { Title, Sider, Layout, Header } from "components/layout";
import { CredentialResponse } from "interfaces/google";
import { parseJwt } from "utils/parse-jwt";

import {
  Login,
  Home,
  CreateProperty,
  EditProperty,
  ListProperties,
  PropertyDetails,
  CreateSector,
  EditSector,
  ListSectors,
  SectorDetails,
  ListUsers,
  UserProfile,
  MyProfile,
  CreateTicket,
  ListTickets,
  TicketDetails,
  ListServices
} from "./pages";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const { t, i18n } = useTranslation();

  const authProvider: AuthProvider = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      if (profileObj) {
        const response = await fetch(
          "http://localhost:8080/api/v1/users",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: profileObj.name,
              email: profileObj.email,
              avatar: profileObj.picture,
            }),
          },
        );

        const data = await response.json();

        if (response.status === 200) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...profileObj,
              avatar: profileObj.picture,
              userid: data._id,
            }),
          );
        } else {
          return Promise.reject();
        }
      }
      localStorage.setItem("token", `${credential}`);

      return Promise.resolve();
    },
    logout: () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return Promise.resolve();
        });
      }

      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return Promise.resolve();
      }
      return Promise.reject();
    },

    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return Promise.resolve(JSON.parse(user));
      }
    },
  };

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <ThemeProvider theme={LightTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine
          dataProvider={dataProvider("http://localhost:8080/api/v1")}
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={[
            {
              name: "my-profile",
              options: {
                label: 'Meu Perfil'
              },
              list: MyProfile,
              icon: <AccountCircleOutlined />
            },
            {
              name: "properties",
              options: {
                label: 'Imóveis'
              },
              list: ListProperties,
              create: CreateProperty,
              edit: EditProperty,
              show: PropertyDetails,
              icon: <BusinessOutlined />
            },
            {
              name: "sectors",
              options: {
                label: 'Setores'
              },
              list: ListSectors,
              create: CreateSector,
              edit: EditSector,
              show: SectorDetails,
              icon: <SensorDoorOutlined />
            },
            {
              name: "users",
              options: {
                label: 'Usuários'
              },
              list: ListUsers,
              show: UserProfile,
              icon: <Groups2Outlined />
            },
            {
              name: "tickets",
              options: {
                label: 'Chamados'
              },
              list: ListTickets,
              create: CreateTicket,
              show: TicketDetails,
              icon: <DescriptionOutlined />
            },
            {
              name: "services",
              options: {
                label: 'Catálogo'
              },
              list: ListServices,
              icon: <SummarizeOutlined />
            }
          ]}
          Title={Title}
          Sider={Sider}
          Layout={Layout}
          Header={Header}
          routerProvider={routerProvider}
          authProvider={authProvider}
          LoginPage={Login}
          DashboardPage={Home}
          i18nProvider={i18nProvider}
        />
      </RefineSnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
