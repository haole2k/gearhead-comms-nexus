import fs from 'fs';
import path from 'path';

const LOG_FILE = 'error.log';

export const logError = (error: Error | string, context?: string) => {
  const timestamp = new Date().toISOString();
  const errorMessage = error instanceof Error ? error.message : error;
  const stackTrace = error instanceof Error ? error.stack : '';
  
  const logEntry = `[${timestamp}] ${context ? `[${context}] ` : ''}${errorMessage}\n${stackTrace ? `Stack: ${stackTrace}\n` : ''}\n`;
  
  fs.appendFileSync(LOG_FILE, logEntry);
};