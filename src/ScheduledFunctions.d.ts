import cron from "node-cron";

export interface SchedulerOptions {
  cronExpression: string;
  repeat: boolean;
  timezone: string;
  id: string;
};

export class ScheduledFunctions {
  tasks: Map<string, cron.ScheduledTask>;

  schedule(opt: SchedulerOptions, callback: () => void): cron.ScheduledTask;
  getSchedule(id: string): cron.ScheduledTask | undefined;
  deleteSchedule(id: string): Boolean;
  stopSchedule(id: string): void;
  resumeSchedule(id: string): void;
};