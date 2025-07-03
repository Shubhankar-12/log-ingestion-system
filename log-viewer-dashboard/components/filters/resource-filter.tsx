"use client";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { Server } from "lucide-react";
import { useEffect, useState } from "react";

interface ResourceFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function ResourceFilter({ value, onChange }: ResourceFilterProps) {
  const [inputValue, setInputValue] = useState(value);
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    // Only call onChange if debouncedValue !== prop value
    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, value, onChange]);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Resource ID</label>
      <div className="relative">
        <Server className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Filter by resource..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  );
}
