function isAdult(birthDate: Date): boolean {
  const today = new Date();

  const adultDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  );

  return birthDate <= adultDate;
}

export { isAdult };
