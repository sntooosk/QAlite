import type { AuthUser } from '../entities/AuthUser';
import type { IAuthRepository } from '../repositories/AuthRepository';

export class ObserveAuthState {
  constructor(private readonly authRepository: IAuthRepository) {}

  execute(listener: (user: AuthUser | null) => void): () => void {
    return this.authRepository.onAuthStateChanged(listener);
  }
}
