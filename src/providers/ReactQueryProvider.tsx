"use client"
import {QueryClient , QueryClientProvider} from '@tanstack/react-query'
import { useState } from 'react'

const ReactQueryProvider = ({ children }: {children:React.ReactNode} ) => {
    const [queryClient] = useState( ()=> new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 0 * (60 * 1000),
                gcTime: 1 * (60 * 1000),
                retry: 0,
            }
        }
    }))
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
  
export default ReactQueryProvider