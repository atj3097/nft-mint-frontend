import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { localhost } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { ChakraBaseProvider} from "@chakra-ui/react";
import {defineChain} from "viem/utils/chain/defineChain";

const localhostv2 = {
  id: 31337,
  name: 'LocalhostV2',
  network: 'localhostv2',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
    public: { http: ['http://127.0.0.1:8545'] },
  },
}

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [localhostv2],
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
        <ChakraBaseProvider>
        <Component {...pageProps} />
        </ChakraBaseProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
