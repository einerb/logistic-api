export default class RegisterUserResponseDTO {
  id: string;
  name: string;
  lastname?: string;
  email: string;
  role: string;

  constructor(
    id: string,
    name: string,
    lastname: string | "",
    email: string,
    role: string
  ) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.role = role;
  }

  static fromEntity(user: any): RegisterUserResponseDTO {
    return new RegisterUserResponseDTO(
      user.id,
      user.name,
      user.lastname,
      user.email,
      user.role
    );
  }
}
