declare module 'firebase/app' {
  import { FirebaseApp } from '@firebase/app';
  export { FirebaseApp };
  export function initializeApp(config: any): FirebaseApp;
}

declare module 'firebase/auth' {
  import { Auth, User } from '@firebase/auth';
  export { Auth, User };
  export function getAuth(app: any): Auth;
  export function signInWithEmailAndPassword(auth: Auth, email: string, password: string): Promise<any>;
  export function signOut(auth: Auth): Promise<void>;
  export function onAuthStateChanged(auth: Auth, callback: (user: User | null) => void): () => void;
}

declare module 'firebase/database' {
  import { Database } from '@firebase/database';
  export { Database };
  export function getDatabase(app: any): Database;
  export function ref(db: Database, path: string): any;
  export function push(ref: any, data: any): Promise<any>;
  export function set(ref: any, data: any): Promise<void>;
  export function get(ref: any): Promise<any>;
  export function update(ref: any, data: any): Promise<void>;
}

declare module '@firebase/app' {
  export * from 'firebase/app';
}

declare module '@firebase/auth' {
  export * from 'firebase/auth';
}

declare module '@firebase/database' {
  export * from 'firebase/database';
} 