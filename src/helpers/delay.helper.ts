export const delay = (millis: number) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout((_) => resolve(), millis);
  });
};
