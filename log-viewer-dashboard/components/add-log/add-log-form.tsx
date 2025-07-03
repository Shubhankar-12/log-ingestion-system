"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import type { CreateLogRequest } from "@/types/log";
import { generateLogEntry } from "@/lib/utils";

interface AddLogFormProps {
  onSubmit: (logData: CreateLogRequest) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

export function AddLogForm({ onSubmit, onCancel, loading }: AddLogFormProps) {
  const [formData, setFormData] = useState<CreateLogRequest>({
    level: "info",
    message: "",
    resourceId: "",
    timestamp: new Date().toISOString().slice(0, 19),
    traceId: "",
    spanId: "",
    commit: "",
    metadata: {},
  });

  const [metadataText, setMetadataText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Parse metadata JSON
    let parsedMetadata = {};
    if (metadataText.trim()) {
      try {
        parsedMetadata = JSON.parse(metadataText);
      } catch (error) {
        alert("Invalid JSON in metadata field");
        return;
      }
    }

    const logData = {
      ...formData,
      metadata: parsedMetadata,
    };

    await onSubmit(logData);
  };

  const handleInputChange = (field: keyof CreateLogRequest, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateRandomId = (prefix: string) => {
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    return `${prefix}-${randomSuffix}`;
  };

  const fillExampleData = () => {
    const randomFormData = generateLogEntry();
    setFormData(randomFormData);
    setMetadataText(
      randomFormData.metadata ? JSON.stringify(randomFormData.metadata) : ""
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Add New Log Entry</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={fillExampleData}
        >
          Fill Example
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Log Level */}
        <div className="space-y-2">
          <Label htmlFor="level">Log Level *</Label>
          <Select
            value={formData.level}
            onValueChange={(value: any) => handleInputChange("level", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="warn">Warning</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="debug">Debug</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Resource ID */}
        <div className="space-y-2">
          <Label htmlFor="resourceId">Resource ID *</Label>
          <div className="flex gap-2">
            <Input
              id="resourceId"
              value={formData.resourceId}
              onChange={(e) => handleInputChange("resourceId", e.target.value)}
              placeholder="e.g., server-1234"
              required
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                handleInputChange("resourceId", generateRandomId("server"))
              }
            >
              Generate
            </Button>
          </div>
        </div>

        {/* Timestamp */}
        <div className="space-y-2">
          <Label htmlFor="timestamp">Timestamp *</Label>
          <Input
            id="timestamp"
            type="datetime-local"
            value={formData.timestamp}
            onChange={(e) => handleInputChange("timestamp", e.target.value)}
            required
          />
        </div>

        {/* Trace ID */}
        <div className="space-y-2">
          <Label htmlFor="traceId">Trace ID *</Label>
          <div className="flex gap-2">
            <Input
              id="traceId"
              value={formData.traceId}
              onChange={(e) => handleInputChange("traceId", e.target.value)}
              placeholder="e.g., abc-xyz-123"
              required
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                handleInputChange("traceId", generateRandomId("trace"))
              }
            >
              Generate
            </Button>
          </div>
        </div>

        {/* Span ID */}
        <div className="space-y-2">
          <Label htmlFor="spanId">Span ID *</Label>
          <div className="flex gap-2">
            <Input
              id="spanId"
              value={formData.spanId}
              onChange={(e) => handleInputChange("spanId", e.target.value)}
              placeholder="e.g., span-456"
              required
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                handleInputChange("spanId", generateRandomId("span"))
              }
            >
              Generate
            </Button>
          </div>
        </div>

        {/* Commit */}
        <div className="space-y-2">
          <Label htmlFor="commit">Commit *</Label>
          <div className="flex gap-2">
            <Input
              id="commit"
              value={formData.commit}
              onChange={(e) => handleInputChange("commit", e.target.value)}
              placeholder="e.g., 5e5342f"
              required
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                handleInputChange(
                  "commit",
                  Math.random().toString(36).substring(2, 9)
                )
              }
            >
              Generate
            </Button>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
          placeholder="Enter log message..."
          rows={3}
          required
        />
      </div>

      {/* Metadata */}
      <div className="space-y-2">
        <Label htmlFor="metadata">Metadata (JSON)</Label>
        <Textarea
          id="metadata"
          value={metadataText}
          onChange={(e) => setMetadataText(e.target.value)}
          placeholder='{"key": "value", "parentResourceId": "server-5678"}'
          rows={3}
        />
        <p className="text-xs text-muted-foreground">
          Enter valid JSON object. Leave empty for no metadata.
        </p>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          Add Log
        </Button>
      </div>
    </form>
  );
}
