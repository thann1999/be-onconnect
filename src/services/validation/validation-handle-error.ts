import { Request } from 'express';
import { ValidationError, validationResult } from 'express-validator';

interface ValidationResult {
  errors: ValidationError[] | null;
}

export function validationHandleError(req: Request) {
  const result: ValidationResult = {
    errors: null,
  };

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    result.errors = errors.array();
  }
  return result;
}
