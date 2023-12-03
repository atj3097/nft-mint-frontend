import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  base,
  zora,
    polygonZkEvm
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { ChakraBaseProvider} from "@chakra-ui/react";
import chakraTheme from '@chakra-ui/theme';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    polygonZkEvm,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: 'c8e492b8e3f0ef4f86d75a963cc82aec',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
    connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <ChakraBaseProvider theme={chakraTheme}>
        <Component {...pageProps} />
        </ChakraBaseProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
