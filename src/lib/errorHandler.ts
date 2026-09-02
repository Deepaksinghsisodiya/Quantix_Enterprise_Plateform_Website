/**
 * Centralized Senior-Level API Error Parser
 * Robust extraction of ASP.NET Core & Quantix API error responses with full null-safety.
 */

export interface ApiValidationErrorMap {
  [key: string]: string[] | string | undefined;
}

export interface ApiErrorResponse {
  success?: boolean;
  errorCode?: string;
  message?: string;
  validationErrors?: ApiValidationErrorMap;
  title?: string;
  errors?: Record<string, string[]>;
  status?: number | string;
}

export function parseApiError(error: unknown, fallbackMessage = 'An unexpected error occurred. Please try again.'): string {
  if (!error) return fallbackMessage;

  // Handle Fetch/Network error
  if (typeof error === 'object' && error !== null) {
    const err = error as any;

    // Check for RTK Query Fetch error
    if (err.status === 'FETCH_ERROR' || err.error?.includes('Failed to fetch')) {
      return 'Unable to connect to the server. Please check your internet connection or server availability.';
    }

    if (err.status === 'TIMEOUT_ERROR') {
      return 'The request timed out. Please try again.';
    }

    if (err.status === 401) {
      return 'Invalid credentials or your session has expired. Please sign in again.';
    }

    if (err.status === 403) {
      return 'You do not have permission to perform this action.';
    }

    if (err.status === 404) {
      return 'The requested resource was not found.';
    }

    if (err.status === 500) {
      const serverMsg = err.data?.message || err.data?.title;
      return serverMsg ? `Server Error: ${serverMsg}` : 'Internal server error. Our engineering team has been notified.';
    }

    // Extract payload from data or root
    const data: ApiErrorResponse | undefined = err.data || err;

    if (data && typeof data === 'object') {
      // 1. Check for field validation errors map (FluentValidation / ASP.NET ModelState)
      const valErrors = data.validationErrors || data.errors;
      if (valErrors && typeof valErrors === 'object') {
        const errorMessages: string[] = [];
        for (const [field, msgs] of Object.entries(valErrors)) {
          if (Array.isArray(msgs) && msgs.length > 0) {
            const cleanField = field.replace(/^\$\./, '').replace(/^dto\./, '');
            errorMessages.push(`${cleanField ? `${cleanField}: ` : ''}${msgs[0]}`);
          } else if (typeof msgs === 'string' && msgs.trim()) {
            errorMessages.push(msgs);
          }
        }
        if (errorMessages.length > 0) {
          return errorMessages.join(' | ');
        }
      }

      // 2. Check for top-level message
      if (typeof data.message === 'string' && data.message.trim()) {
        return data.message.trim();
      }

      // 3. Check for ASP.NET ProblemDetails title
      if (typeof data.title === 'string' && data.title.trim()) {
        return data.title.trim();
      }

      // 4. Check for error code fallback
      if (typeof data.errorCode === 'string' && data.errorCode.trim()) {
        return `Error: ${data.errorCode.replace(/_/g, ' ')}`;
      }
    }

    // Direct error string on object
    if (typeof err.error === 'string' && err.error.trim()) {
      return err.error.trim();
    }

    // Standard JavaScript Error object
    if (typeof err.message === 'string' && err.message.trim()) {
      return err.message.trim();
    }
  }

  // String error
  if (typeof error === 'string' && error.trim()) {
    return error.trim();
  }

  return fallbackMessage;
}
