export const logs: any[] = [];

export const log = (message?: any, ...optionalParams: any[]): void => {
  console.log(message, ...optionalParams);

  logs.push(message);
};
