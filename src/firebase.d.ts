declare module 'firebase/app' {
  export function initializeApp(config: any): any;
}

declare module 'firebase/auth' {
  export function getAuth(app: any): any;
}

declare module 'firebase/database' {
  export function getDatabase(app: any): any;
} 