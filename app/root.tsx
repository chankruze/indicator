import { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "@remix-run/react";
import { useEffect } from "react";
import { Indicator } from "./lib/indicator";

const indicator = new Indicator();

export const links: LinksFunction = () => [];

export function Layout({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === "loading") indicator.start();
    if (navigation.state === "idle") indicator.stop();
  }, [navigation.state]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
