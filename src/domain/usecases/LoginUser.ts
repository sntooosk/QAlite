import type { AuthUser } from '../entities/AuthUser';
import type { IAuthRepository } from '../repositories/AuthRepository';

export interface LoginUserInput {
  email: string;
  password: string;
}

export class LoginUser {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(input: LoginUserInput): Promise<AuthUser> {
    return this.authRepository.login({ email: input.email, password: input.password });
  }
}
