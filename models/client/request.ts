export class PasswordRequest {
  password: string = "";
}

export class VerifyEmail {
  email: string = "";
}

export class UpdateProfile {
  firstName: string = "";
  middleName: string = "";
  lastName: string = "";
  phoneNumber: string = "";
  country: string = "";
  address: string = "";
  email: string = "";
}

export class Login {
  email: string = "";
  password: string = "";
  type: "PASSWORD" | "PIN" = "PASSWORD";
}

export class PinRequest {
  pin: string = "";
  confirmPin: string = "";
}
