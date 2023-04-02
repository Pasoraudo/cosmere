export const sleep = (millis: number): Promise<void> => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, millis);
});


export const delayPromise = <T>(millis: number, result: T): Promise<T> => new Promise((resolve) => {
  setTimeout(() => {
    resolve(result);
  }, millis);
});

