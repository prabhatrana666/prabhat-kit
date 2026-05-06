export class Logger {
  constructor(level = 'INFO') {
    this.level = level;
    this.enabled = true;
  }

  debug(message, meta) {
    if (this.enabled) console.log(`[DEBUG] ${message}`, meta || '');
  }

  info(message, meta) {
    if (this.enabled) console.log(`[INFO] ${message}`, meta || '');
  }

  warn(message, meta) {
    if (this.enabled) console.warn(`[WARN] ${message}`, meta || '');
  }

  error(message, meta) {
    if (this.enabled) console.error(`[ERROR] ${message}`, meta || '');
  }
}

export const logger = new Logger(process.env.LOG_LEVEL || 'INFO');