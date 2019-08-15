export const getFilter = (tasksCount) => ({
  all: tasksCount,
  overdue: tasksCount,
  today: tasksCount,
  favorites: tasksCount,
  repeating: tasksCount,
  tags: tasksCount,
  archive: tasksCount,
});
