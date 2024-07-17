export function checkPassword(str) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return regex.test(str);
}
export function checkUsername(str) {
  const regex = /^(?=.*[a-z])([a-z0-9]{8,})$/;
  return regex.test(str);
}
