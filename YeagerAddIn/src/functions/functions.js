/**
 * Adds two numbers.
 * @customfunction
 * @param first First number
 * @param second Second number
 * @returns The sum of the two numbers.
 */
/* global clearInterval, console, setInterval */
export function add(first, second) {
  return first + second;
}

/**
 * Displays the current time once a second.
 * @customfunction
 * @param invocation Custom function handler
 */
export function clock(invocation) {
  const timer = setInterval(() => {
    const time = currentTime();
    invocation.setResult(time);
  }, 1000);

  invocation.onCanceled = () => {
    clearInterval(timer);
  };
}

/**
 * Returns the current time.
 * @returns String with the current time formatted for the current locale.
 */
export function currentTime() {
  return new Date().toLocaleTimeString();
}

/**
 * Increments a value once a second.
 * @customfunction
 * @param incrementBy Amount to increment
 * @param invocation Custom function handler
 */
export function increment(incrementBy, invocation) {
  let result = 0;
  const timer = setInterval(() => {
    result += incrementBy;
    invocation.setResult(result);
  }, 1000);

  invocation.onCanceled = () => {
    clearInterval(timer);
  };
}

/**
 * Writes a message to console.log().
 * @customfunction LOG
 * @param message String to write.
 * @returns String to write.
 */
export function logMessage(message) {
  console.log(message);

  return message;
}

/**
 * Unpivots a range of cells.
 * @customfunction UNPIVOT
 * @param headers The range of cells that represent your headers.
 * @param rows The range of cells that represent your row headers.
 * @param values The range of cells that represent your range of values.
 * @returns  The normalized range of cells.
 */
export function unpivot(headers, rows, values) {
  let unpivot_data = [];

  for (var row = 1; row <= rows.length; row++) {
    for (var header; header <= headers.length; header++) {
      unpivot_data.push([rows[row], headers[header], values[row][header]]);
    }
  }

  return unpivot_data;
}
