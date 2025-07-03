"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import type { LogFilters } from "@/types/log"
import { SearchFilter } from "./search-filter"
import { LevelFilter } from "./level-filter"
import { ResourceFilter } from "./resource-filter"
import { DateRangeFilter } from "./date-range-filter"

interface FilterPanelProps {
  filters: LogFilters
  onFilterChange: (key: keyof LogFilters, value: string) => void
  onClearFilters: () => void
}

export function FilterPanel({ filters, onFilterChange, onClearFilters }: FilterPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SearchFilter value={filters.message} onChange={(value) => onFilterChange("message", value)} />

          <LevelFilter value={filters.level} onChange={(value) => onFilterChange("level", value)} />

          <ResourceFilter value={filters.resourceId} onChange={(value) => onFilterChange("resourceId", value)} />

          <DateRangeFilter
            startValue={filters.timestamp_start}
            endValue={filters.timestamp_end}
            onStartChange={(value) => onFilterChange("timestamp_start", value)}
            onEndChange={(value) => onFilterChange("timestamp_end", value)}
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={onClearFilters} size="sm">
            Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
