// // app/providers.tsx

// 'use client'

// import { WagmiConfig, createConfig, configureChains } from 'wagmi'
// import { sepolia } from 'wagmi/chains'
// // Note: This import should work in wagmi v2
// import { publicProvider } from 'wagmi/providers/public'
// import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [sepolia],
//   [publicProvider()]
// )

// const config = createConfig({
//   autoConnect: true,
//   connectors: [new MetaMaskConnector({ chains })],
//   publicClient,
//   webSocketPublicClient,
// })

// const queryClient = new QueryClient()

// export function Providers({ children }: { children: React.ReactNode }) {
//   return (
//     <WagmiConfig config={config}>
//       <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//     </WagmiConfig>
//   )
// }
