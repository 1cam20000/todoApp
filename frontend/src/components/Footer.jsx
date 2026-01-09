import React from "react";

const Footer = ({ completedTasksCount = 0, activeTasksCount = 0 }) => {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {completedTasksCount > 0 && (
              <>
                🎉 congratulation! You have done {completedTasksCount} tasks
                {activeTasksCount > 0 && (
                  <>
                    {" "}
                    and {activeTasksCount} tasks are still pending. Keep it up!{" "}
                  </>
                )}
              </>
            )}
            {completedTasksCount === 0 && activeTasksCount > 0 && (
              <>
                You have {activeTasksCount} active tasks. Stay focused and keep
                going!
              </>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
