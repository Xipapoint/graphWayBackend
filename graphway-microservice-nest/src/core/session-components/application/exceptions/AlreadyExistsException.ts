import { HttpException, HttpStatus } from '@nestjs/common';

/**
 *
 * Exception thrown when a resource already exists.
 * @extends HttpException
 *
 * @example
 * ```typescript
 * throw new AlreadyExistsException('User');
 * ```
 * ```console.log - User already exists.```
 *
 * @param resource - The name of the resource that already exists.
 */
export class AlreadyExistsException extends HttpException {
  /**
   * Creates an instance of AlreadyExistsException.
   *
   * @param resource - The name of the resource that already exists.
   */
  constructor(resource: string) {
    super(`${resource} already exists.`, HttpStatus.CONFLICT);
  }
}
