"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LevelFilterProps {
  value: string
  onChange: (value: string) => void
}

export function LevelFilter({ value, onChange }: LevelFilterProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Log Level</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          <SelectItem value="error">Error</SelectItem>
          <SelectItem value="warn">Warning</SelectItem>
          <SelectItem value="info">Info</SelectItem>
          <SelectItem value="debug">Debug</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
