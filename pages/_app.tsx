import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

import Layout from "@/components/Layout";
import LoginModal from "@/components/ModalComponent/LoginComponent";
import RegisterModal from "@/components/ModalComponent/RegisterComponent";
import "@/styles/globals.css";
import EditModal from "@/components/ModalComponent/EditModalComponent";
import ChatPopupCommon from "@/components/ChatPopupComponent";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <EditModal />
      <RegisterModal />
      <LoginModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
