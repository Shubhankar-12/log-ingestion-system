"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddLogForm } from "./add-log-form";
import { createLog } from "@/services/log-service";
import type { CreateLogRequest } from "@/types/log";

interface AddLogDialogProps {
  onLogAdded?: () => void;
}

export function AddLogDialog({ onLogAdded }: AddLogDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (logData: CreateLogRequest) => {
    setLoading(true);
    try {
      // Convert timestamp to ISO format if needed
      const isoTimestamp = logData.timestamp.includes("T")
        ? logData.timestamp + "Z"
        : new Date(logData.timestamp).toISOString();

      await createLog({
        ...logData,
        timestamp: isoTimestamp,
      });

      setOpen(false);
      onLogAdded?.();

      // Show success message
      alert("Log entry added successfully!");
    } catch (error) {
      console.error("Failed to create log:", error);
      alert("Failed to create log. Please check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="gap-2">
        <Plus className="h-4 w-4" />
        Add Log
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Log Entry</DialogTitle>
          </DialogHeader>
          <AddLogForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
