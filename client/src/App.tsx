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
  AccountCircleOutlined
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
  TicketDetails
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
    login: ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      if (profileObj) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...profileObj,
            avatar: profileObj.picture,
          })
        );
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
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
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
