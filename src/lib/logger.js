/**
 * Production-ready logger utility
 * Replaces console.log with environment-aware logging
 */

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  NONE: 4,
};

class Logger {
  constructor() {
    // Set log level based on environment
    const envLevel = import.meta.env.VITE_LOG_LEVEL || 'INFO';
    this.level = LOG_LEVELS[envLevel] || LOG_LEVELS.INFO;
    this.isDevelopment = import.meta.env.DEV;
  }

  /**
   * Log debug information (only in development)
   */
  debug(message, ...args) {
    if (this.level <= LOG_LEVELS.DEBUG && this.isDevelopment) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  }

  /**
   * Log general information
   */
  info(message, ...args) {
    if (this.level <= LOG_LEVELS.INFO) {
      console.log(`[INFO] ${message}`, ...args);
    }
  }

  /**
   * Log warnings
   */
  warn(message, ...args) {
    if (this.level <= LOG_LEVELS.WARN) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  /**
   * Log errors (always logged unless NONE)
   */
  error(message, error, ...args) {
    if (this.level <= LOG_LEVELS.ERROR) {
      console.error(`[ERROR] ${message}`, error, ...args);
      
      // In production, you could send to error tracking service
      if (!this.isDevelopment && window.Sentry) {
        window.Sentry.captureException(error, {
          extra: { message, args },
        });
      }
    }
  }

  /**
   * Log form submissions
   */
  formSubmit(formName, data) {
    if (this.isDevelopment) {
      this.debug(`Form submitted: ${formName}`, data);
    }
    // In production, send to analytics
    if (!this.isDevelopment && window.gtag) {
      window.gtag('event', 'form_submit', {
        form_name: formName,
      });
    }
  }

  /**
   * Log navigation events
   */
  navigation(from, to) {
    this.debug(`Navigation: ${from} -> ${to}`);
  }

  /**
   * Log API calls
   */
  api(method, endpoint, status) {
    this.info(`API ${method} ${endpoint} - Status: ${status}`);
  }
}

// Export singleton instance
export const logger = new Logger();

// Export for testing
export { Logger, LOG_LEVELS };
