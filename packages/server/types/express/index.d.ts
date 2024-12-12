declare module 'express' {
  export interface Request {
    customParams?: { userId: number; role: string }
  }
}
