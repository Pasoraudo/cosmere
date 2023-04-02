export const nowYYYYMMDD = (): string => new Date().toISOString().slice(0, 10);
export const nowYY = (): string => new Date().toISOString().slice(2, 4);
export const nowYYYY = (): string => new Date().toISOString().slice(0, 4);

export const now = (): Date => new Date(nowYYYYMMDD());

export const afterOrEqualToday = (date: Date): boolean => {
  const justNow = now();

  if (justNow.getTime() <= date.getTime())
    return true;

  return false;
};

export const beforeOrEqualToday = (date: Date): boolean => {
  const justNow = now();

  if (justNow.getTime() >= date.getTime())
    return true;

  return false;
};

