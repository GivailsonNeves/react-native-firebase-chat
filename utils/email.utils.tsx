export function validateEmail(email: string) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function extractNameFromEmail(email?: string) {
  return email?.split("@")[0] || "";
}

export function firstLetter(str?: string) {
  return str?.charAt(0).toUpperCase() || " ";
}