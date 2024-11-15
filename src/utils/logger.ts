export const logError = (error: Error | string, context?: string) => {
  const timestamp = new Date().toISOString();
  const errorMessage = error instanceof Error ? error.message : error;
  const stackTrace = error instanceof Error ? error.stack : '';
  
  const logEntry = `[${timestamp}] ${context ? `[${context}] ` : ''}${errorMessage}\n${stackTrace ? `Stack: ${stackTrace}\n` : ''}\n`;
  
  // Log to console in development
  console.error(logEntry);
  
  // Store in localStorage for development debugging
  const existingLogs = localStorage.getItem('error_logs') || '';
  localStorage.setItem('error_logs', existingLogs + logEntry);
  
  // Send to server for persistent logging
  fetch('/api/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      timestamp,
      context,
      message: errorMessage,
      stackTrace,
    }),
  }).catch(err => console.error('Failed to send log to server:', err));
};