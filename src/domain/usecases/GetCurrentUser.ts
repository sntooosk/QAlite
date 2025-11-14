import type { AuthUser } from '../entities/AuthUser';
import type { IAuthRepository } from '../repositories/AuthRepository';

export class GetCurrentUser {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(): Promise<AuthUser | null> {
    return this.authRepository.getCurrentUser();
  }
}
