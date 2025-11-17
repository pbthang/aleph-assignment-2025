import {
  ChartColumnBig,
  FileText,
  TableProperties,
  Workflow,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";

// Menu items.
const items = [
  {
    title: "Task 1",
    url: "/task1",
    icon: TableProperties,
  },
  {
    title: "Task 2",
    url: "/task2",
    icon: Workflow,
  },
  {
    title: "Task 3",
    url: "/task3",
    icon: FileText,
  },
  {
    title: "Task 4",
    url: "/task4",
    icon: ChartColumnBig,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
