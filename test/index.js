import { ScheduledFunctions } from "../src/ScheduledFunctions.js";
const task = new ScheduledFunctions();
task.schedule({
  cronExpression: '* * * * *',
  repeat: false,
  timezone: 'America/New_York',
  id: 'task1'
}, () => {
  console.log('This function will be executed once, one minute from now.');
});

//console.log(task.getSchedule("task1"))