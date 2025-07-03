"use client"

import { Input } from "@/components/ui/input"

interface DateRangeFilterProps {
  startValue: string
  endValue: string
  onStartChange: (value: string) => void
  onEndChange: (value: string) => void
}

export function DateRangeFilter({ startValue, endValue, onStartChange, onEndChange }: DateRangeFilterProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Time Range</label>
      <div className="flex gap-2">
        <Input
          type="datetime-local"
          value={startValue}
          onChange={(e) => onStartChange(e.target.value)}
          className="text-xs"
        />
        <Input
          type="datetime-local"
          value={endValue}
          onChange={(e) => onEndChange(e.target.value)}
          className="text-xs"
        />
      </div>
    </div>
  )
}
