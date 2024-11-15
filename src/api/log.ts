import fs from 'fs';
import path from 'path';

const LOG_FILE = path.join(process.cwd(), 'error.log');

export const logToFile = (logData: {
  timestamp: string;
  context?: string;
  message: string;
  stackTrace?: string;
}) => {
  const logEntry = `[${logData.timestamp}] ${logData.context ? `[${logData.context}] ` : ''}${logData.message}\n${logData.stackTrace ? `Stack: ${logData.stackTrace}\n` : ''}\n`;
  
  fs.appendFileSync(LOG_FILE, logEntry);
};