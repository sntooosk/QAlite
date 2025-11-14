import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

import { AuthUser } from '../../domain/entities/AuthUser';
import { DEFAULT_ROLE, Role } from '../../domain/entities/Role';
import {
  AuthStateListener,
  IAuthRepository,
  LoginPayload,
  RegisterPayload
} from '../../domain/repositories/AuthRepository';
import { firebaseAuth, firebaseFirestore } from '../firebase/firebaseConfig';

const USERS_COLLECTION = 'users';

export class FirebaseAuthRepository implements IAuthRepository {
  async register(payload: RegisterPayload): Promise<AuthUser> {
    const { user } = await createUserWithEmailAndPassword(
      firebaseAuth,
      payload.email,
      payload.password
    );

    await updateProfile(user, { displayName: payload.displayName });

    const role = payload.role ?? DEFAULT_ROLE;
    await this.persistUserProfile(user, role);

    return this.mapToAuthUser(user, role);
  }

  async login(payload: LoginPayload): Promise<AuthUser> {
    const credential = await signInWithEmailAndPassword(
      firebaseAuth,
      payload.email,
      payload.password
    );

    const role = await this.fetchUserRole(credential.user.uid);
    return this.mapToAuthUser(credential.user, role);
  }

  async logout(): Promise<void> {
    await signOut(firebaseAuth);
  }

  async sendPasswordReset(email: string): Promise<void> {
    await sendPasswordResetEmail(firebaseAuth, email);
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    const user = firebaseAuth.currentUser;
    if (!user) {
      return null;
    }

    const role = await this.fetchUserRole(user.uid);
    return this.mapToAuthUser(user, role);
  }

  onAuthStateChanged(listener: AuthStateListener): () => void {
    return firebaseOnAuthStateChanged(firebaseAuth, async (user) => {
      if (!user) {
        listener(null);
        return;
      }

      const role = await this.fetchUserRole(user.uid);
      listener(this.mapToAuthUser(user, role));
    });
  }

  private mapToAuthUser(user: FirebaseUser, role: Role): AuthUser {
    return {
      uid: user.uid,
      email: user.email ?? '',
      displayName: user.displayName ?? '',
      role,
      accessToken: user.refreshToken
    };
  }

  private async persistUserProfile(user: FirebaseUser, role: Role): Promise<void> {
    const userDoc = doc(firebaseFirestore, USERS_COLLECTION, user.uid);
    await setDoc(
      userDoc,
      {
        email: user.email,
        displayName: user.displayName,
        role,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );
  }

  private async fetchUserRole(uid: string): Promise<Role> {
    const userDoc = doc(firebaseFirestore, USERS_COLLECTION, uid);
    const snapshot = await getDoc(userDoc);

    if (snapshot.exists()) {
      const data = snapshot.data();
      return (data.role as Role) ?? DEFAULT_ROLE;
    }

    return DEFAULT_ROLE;
  }
}
