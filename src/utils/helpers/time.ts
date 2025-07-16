export const isBefore = (d1: Date, d2: Date) => d1.getTime() < d2.getTime();
export const addMinutes = (d: Date, m: number) =>
  new Date(d.getTime() + m * 60000);
