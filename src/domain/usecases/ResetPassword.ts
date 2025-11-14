import type { IAuthRepository } from '../repositories/AuthRepository';

export class ResetPassword {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(email: string): Promise<void> {
    return this.authRepository.sendPasswordReset(email);
  }
}
