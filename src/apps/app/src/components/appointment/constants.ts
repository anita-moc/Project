export const stateLabel: Record<string, { label: string; color: string }> = {
  SCHEDULED: {
    label: 'Schedule',
    color: 'var(--border)',
  },
  CONFIRMED: {
    label: 'Confirmed',
    color: '#0043ce',
  },
  PAYED: {
    label: 'Pagada',
    color: '#8167ec',
  },
  READY: {
    label: 'Lista',
    color: '#22a094',
  },
  STARTED: {
    label: 'Started',
    color: '#22a094',
  },
  MISSED: {
    label: 'Missed',
    color: '#f1b603',
  },
  CANCELLED: {
    label: 'Cancelled',
    color: '#ea3a3d',
  },
  FINISHED: {
    label: 'Finished',
    color: '#673AB7',
  },
};
