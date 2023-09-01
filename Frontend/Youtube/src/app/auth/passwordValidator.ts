import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormGroup } from '@angular/forms';

export function createPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);

    const hasLowerCase = /[a-z]+/.test(value);

    const hasNumeric = /[0-9]+/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

    return !passwordValid ? {
      passwordStrength: {
        hasUpperCase: true,
        hasLowerCase: true,
        hasNumeric: false
      }
    } : null;
  }
}

export function createPasswordStrengthValidatorConfirm(controlName, matchingControlName): ValidatorFn {
  return (formGroup: FormGroup): ValidationErrors | null => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
      return { passwordConfirm: "password wont match" };
    } else {
      matchingControl.setErrors(null);
      return null;
    }
  }
}
