export function passwordValidator(password) {
  const passwordRegex = /^[a-zA-Z0-9]{6,}$/;
  return passwordRegex.test(password);
}
