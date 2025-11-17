import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar.tsx";
import { AppSidebar } from "@/components/app-sidebar.tsx";
import { createBrowserRouter, Navigate, Outlet } from "react-router";
import { RouterProvider } from "react-router/dom";
import Task1 from "./pages/Task1.tsx";
import Task2 from "./pages/Task2.tsx";
import { Separator } from "./components/ui/separator.tsx";
import Task3 from "./pages/Task3.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Task4 from "./pages/Task4.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <span className="text-sm">
                  Pham Ba Thang - Aleph Assignment
                </span>
              </div>
            </header>
          </SidebarInset>
          <Outlet />
        </main>
      </SidebarProvider>
    ),
    children: [
      { index: true, element: <Navigate to="/task1" replace /> },
      { path: "task1", element: <Task1 /> },
      { path: "task2", element: <Task2 /> },
      { path: "task3", element: <Task3 /> },
      { path: "task4", element: <Task4 /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
