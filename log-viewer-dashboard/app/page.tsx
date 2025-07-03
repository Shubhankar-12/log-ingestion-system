"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { FilterPanel } from "@/components/filters/filter-panel"
import { LogList } from "@/components/logs/log-list"
import { useLogs } from "@/hooks/use-logs"

export default function LogViewerDashboard() {
  const { logs, loading, error, filters, handleFilterChange, clearFilters, refetch } = useLogs()

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      <DashboardHeader onRefresh={refetch} loading={loading} />

      <FilterPanel filters={filters} onFilterChange={handleFilterChange} onClearFilters={clearFilters} />

      <LogList logs={logs} loading={loading} error={error} onRetry={refetch} />
    </div>
  )
}
