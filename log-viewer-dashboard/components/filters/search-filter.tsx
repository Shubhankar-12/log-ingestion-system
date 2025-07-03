"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";

interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchFilter({
  value,
  onChange,
  placeholder = "Search log messages...",
}: SearchFilterProps) {
  const [inputValue, setInputValue] = useState(value);

  // Sync prop value to input state only when it changes externally
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
      <label className="text-sm font-medium">Search Messages</label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  );
}
