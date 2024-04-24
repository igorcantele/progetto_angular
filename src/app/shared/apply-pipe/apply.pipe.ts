import {Pipe, PipeTransform} from '@angular/core';

/**
 * Executes the given function with the given params.
 *
 * Used to use given functions as pure pipes.
 *
 * *Usage (in HTML template):*
 * html
 * {{ myFunction | apply : arg1 : arg2 : argn }}
 *
 * @param {fn} function Function to be executed.
 * @param {args} any Params of the function.
 */
@Pipe({
  name: 'apply',
  standalone: true,
})
export class ApplyPipe implements PipeTransform {
  transform<T, U extends any[]>(fn: (...fnArgs: U) => T, ...args: U): T {
    return fn(...args);
  }
}
