import type { IAuthRepository } from '../repositories/AuthRepository';

export class LogoutUser {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(): Promise<void> {
    return this.authRepository.logout();
  }
}
