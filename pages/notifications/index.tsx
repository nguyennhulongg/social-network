import HeaderCommon from "@/components/HeaderComponent";
import NotificationCommon from "@/components/NotificationComponent";
import useCurrentUser from "@/hooks/useCurrentUser";
import useNotification from "@/hooks/useNotification";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import React, { useEffect } from "react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: session,
  };
}

const Notification = () => {
  return (
    <div>
      <HeaderCommon label="All Notifications" showBackArrow />
      <NotificationCommon />
    </div>
  );
};

export default Notification;
