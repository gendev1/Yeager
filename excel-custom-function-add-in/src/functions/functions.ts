/**
 * Adds two numbers.
 * @customfunction
 * @param first First number
 * @param second Second number
 * @returns The sum of the two numbers.
 */
/* global clearInterval, console, setInterval */
export function add(first: number, second: number): number {
  return first + second + 1;
}

/**
 * Displays the current time once a second.
 * @customfunction
 * @param invocation Custom function handler
 */
export function clock(invocation: CustomFunctions.StreamingInvocation<string>): void {
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
export function currentTime(): string {
  return new Date().toLocaleTimeString();
}

/**
 * Increments a value once a second.
 * @customfunction
 * @param incrementBy Amount to increment
 * @param invocation Custom function handler
 */
export function increment(incrementBy: number, invocation: CustomFunctions.StreamingInvocation<number>): void {
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
export function logMessage(message: string): string {
  console.log(message);

  return message;
}

/**
 * Writes a message to console.log().
 * @customfunction LOG1
 * @param message String to write.
 * @returns String to write.
 */
export function logMessages(message: string): string {
  console.log(message);

  return message;
}

/**
 * Get balances of all tokens in a wallet. using covalent api
 * @customfunction GETBALANCES
 * @param walletAddress String to write.
 * @param chainId String to write.
 * @param apiKey String to write.
 * @returns List of token balances.
 */
export function getBalances(walletAddress: string, chainId: string, apiKey: string): Promise<string> {
  const url = `https://api.covalenthq.com/v1/${chainId}/address/${walletAddress}/balances_v2/?key=${apiKey}`;

  // eslint-disable-next-line no-undef
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const balances = data.data.items;
        const result = JSON.stringify(balances);
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}
