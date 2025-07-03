"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { AddLogDialog } from "./add-log/add-log-dialog";

interface DashboardHeaderProps {
  onRefresh: () => void;
  loading: boolean;
}

export function DashboardHeader({ onRefresh, loading }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Log Viewer</h1>
        <p className="text-muted-foreground">
          Monitor and analyze system logs in real-time
        </p>
      </div>
      <div className="flex items-center gap-2">
        <AddLogDialog onLogAdded={onRefresh} />
        <Button onClick={onRefresh} disabled={loading} variant="outline">
          <RefreshCw
            className={cn("h-4 w-4 mr-2", loading && "animate-spin")}
          />
          Refresh
        </Button>
      </div>
    </div>
  );
}
