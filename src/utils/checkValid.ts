function checkId(id: string): boolean {
  const idValid = /^[a-zA-Z0-9_-]{0,26}$/;
  return idValid.test(id);
}

function checkPassword(password: string): boolean {
  const pwValid = /^[a-zA-Z0-9~!@#$%^&*()_+|<>?:{}]{0,16}$/;
  return pwValid.test(password);
}

function checkPasswordSignUp(password: string): RegExpMatchArray | null {
  const pwValid = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  return password.match(pwValid);
}

function checkIdSignUp(id: string): RegExpMatchArray | null {
  const idValid = /^[a-zA-Z0-9_-]{4,26}$/;
  return id.match(idValid);
}

function checkEmail(email: string): RegExpMatchArray | null {
  const emailValid =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return email.match(emailValid);
}

export const Validation = {
  checkIdSignUp,
  checkPassword,
  checkId,
  checkEmail,
  checkPasswordSignUp,
};
