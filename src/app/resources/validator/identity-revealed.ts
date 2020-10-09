import {FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export const passwordRepeatValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const repeatPassword = control.get('repeatPassword');
  if (password && repeatPassword) {
    return password.value === repeatPassword.value ? null : { 'passwordRepeat': true };
  }
  return null;
};
