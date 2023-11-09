import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "~/firebase";
import { Auth0Provider } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { env } from "~/env.mjs";

const MyApp: AppType = ({ Component, pageProps }) => {
  // const location = useLocation();
  // const navigate = useNavigate();
  // const params = useParams();

  const [origin, setOrigin] = useState("");
  useEffect(() => {
    setOrigin(window.location.origin);
  }, [origin]);

  if (origin == null || origin.length == 0 || origin == "") {
    return null;
  }

  return (
    <Auth0Provider
      domain={env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      authorizationParams={{ redirect_uri: origin }}
    >
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </FirebaseAppProvider>
    </Auth0Provider>
  );
};

export default api.withTRPC(MyApp);
