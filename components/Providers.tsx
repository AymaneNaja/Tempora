'use client'

import { Provider } from "react-redux"
import { store } from '../redux/store';
import { SidebarProvider } from "./ui/sidebar";
import { ThemeProvider } from "./theme-provider";
import { ReactNode } from "react";

function Providers({ children }: { children: ReactNode }) {
    return (
        <Provider store={store}>
            <SidebarProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </SidebarProvider>
        </Provider>
    )
}

export default Providers