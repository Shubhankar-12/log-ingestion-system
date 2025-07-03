"use client"

import { useState, useEffect, useCallback } from "react"
import type { LogEntry, LogFilters } from "@/types/log"
import { fetchLogs } from "@/services/log-service"
import { useDebounce } from "./use-debounce"

export function useLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Filter states
  const [filters, setFilters] = useState<LogFilters>({
    message: "",
    level: "all",
    resourceId: "",
    timestamp_start: "",
    timestamp_end: "",
  })

  // Debounced search values
  const debouncedMessage = useDebounce(filters.message, 300)
  const debouncedResourceId = useDebounce(filters.resourceId, 300)

  // Fetch logs function
  const fetchLogsData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await fetchLogs({
        ...filters,
        message: debouncedMessage,
        resourceId: debouncedResourceId,
      })
      setLogs(data)
    } catch (err) {
      setError("Failed to fetch logs. Please try again.")
      console.error("Error fetching logs:", err)
    } finally {
      setLoading(false)
    }
  }, [filters, debouncedMessage, debouncedResourceId])

  // Fetch logs on filter changes
  useEffect(() => {
    fetchLogsData()
  }, [fetchLogsData])

  // Handle filter changes
  const handleFilterChange = (key: keyof LogFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      message: "",
      level: "all",
      resourceId: "",
      timestamp_start: "",
      timestamp_end: "",
    })
  }

  return {
    logs,
    loading,
    error,
    filters,
    handleFilterChange,
    clearFilters,
    refetch: fetchLogsData,
  }
}
