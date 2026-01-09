import React from "react";
import { Card } from "./ui/card";
import { Circle } from "lucide-react";

const TaskEmptyState = ({ filter }) => {
  return (
    <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
      <div className="space-y-3">
        <Circle className="size-12 mx-auto text-muted-foreground" />
        <div>
          <h3 className="font-medium text-foreground">
            {filter === "active"
              ? "No active tasks found."
              : filter === "completed"
              ? "No completed tasks found."
              : "No tasks found."}
          </h3>
          <p className="text-sm text-muted-foreground">
            {filter ==='all' ? "Add tasks to get started." : `Try changing the filter "all" to see tasks ${filter === "active" ? "that are active." : "that are completed."}`}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TaskEmptyState;
