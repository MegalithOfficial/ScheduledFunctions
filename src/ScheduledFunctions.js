import cron from "node-cron";

export class ScheduledFunctions {

  /**
   * Constructor code of ScheduledFunctions class.
   */
  constructor() {
    /**
     * A map that stores the scheduled tasks.
     * @type {Map<string, cron.ScheduledTask>}
     */
    this.tasks = new Map();
  }

  /**
   * 
   * @param {Object} opt 
   * @param {Function} callback 
   * @returns {cron.ScheduledTask}
   */
  schedule(opt, callback) {
    const task = cron.schedule(opt.cronExpression, async () => {
      callback();
      if (!opt.repeated) {
        task.stop()
      }
    }, { scheduled: true, timezone: opt.timezone });

    this.tasks.set(opt.id, task)
    return task;
  };

  /**
   * Gets the status of a scheduled task.
   * @param {string} id - The unique ID of the scheduled task to get the status of.
   * @returns {string} The status of the scheduled task.
   */
  getSchedule(id) {
    return (this.tasks.get(id) ?? null);
  }

  /**
   * Deletes a scheduled task.
   * @param {string} id - The unique ID of the scheduled task to delete.
   * @returns {boolean} The status of the deleted task.
   */
  deleteSchedule(id) {
    const task = (this.tasks.get(id) ?? null);
    if (!task) throw Error("Scheduled Task cannot be founded.")
    task.stop();
    return this.tasks.delete(id);
  }

  /**
   * Stops a scheduled task.
   * @param {string} id - The unique ID of the scheduled task to stop.
   * @returns {void}
   */
  stopSchedule(id) {
    const task = (this.tasks.get(id) ?? null);
    if (!task) throw Error("Scheduled Task cannot be founded.")
    task.stop();
  }

  /**
   * Resumes a stopped scheduled task.
   * @param {string} id - The unique ID of the scheduled task to resume.
   * @returns {void}
   */
  resumeSchedule(id) {
    const task = (this.tasks.get(id) ?? null);
    if (!task) throw Error("Scheduled Task cannot be founded.")
    task.start();
  }

};