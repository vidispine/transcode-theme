export const ALL = 'all';
export const READY = 'READY';
export const STARTED = 'STARTED';
export const VIDINET_JOB = 'VIDINET_JOB';
export const FINISHED = 'FINISHED';
export const FINISHED_WARNING = 'FINISHED_WARNING';
export const WAITING = 'WAITING';
export const ABORT_PENDING = 'ABORT_PENDING';
export const ABORTED = 'ABORTED';
export const FAILED_TOTAL = 'FAILED_TOTAL';
export const LOWEST = 'LOWEST';
export const LOW = 'LOW';
export const MEDIUM = 'MEDIUM';
export const HIGH = 'HIGH';
export const HIGHEST = 'HIGHEST';
export const IMMEDIATE = 'IMMEDIATE';

export const JOB_PRIORITIES = [LOWEST, LOW, MEDIUM, HIGH, HIGHEST, IMMEDIATE];
export const JOB_STATES = [
  READY,
  STARTED,
  VIDINET_JOB,
  FINISHED,
  FINISHED_WARNING,
  WAITING,
  ABORT_PENDING,
  ABORTED,
  FAILED_TOTAL,
];

export const ALL_STATES = [ALL];

export const OK_STATES = [READY, STARTED, VIDINET_JOB, FINISHED];

export const WARNING_STATES = [WAITING, FINISHED_WARNING, ABORT_PENDING];

export const ERROR_STATES = [FAILED_TOTAL, ABORTED];

export const SUCCESSFUL_STATES = [FINISHED];

export const RUNNING_STATES = [READY, STARTED, VIDINET_JOB, WAITING];

export const INACTIVE_STATES = [FINISHED, FINISHED_WARNING, FAILED_TOTAL, ABORTED];

export const TRANSCODING_STEP = 200;
