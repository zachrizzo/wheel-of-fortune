import "@/styles/globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

export default function App({ Component, pageProps }) {
  return (
    <AppRouterCacheProvider>
      <Component {...pageProps} />
    </AppRouterCacheProvider>
  );
}
