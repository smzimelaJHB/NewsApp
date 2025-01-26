import 'express-session';

declare module 'express-session' {
    interface SessionData {
        flash: { [key: string]: string[] };
    }
}

declare module 'express' {
    export interface Request {
        flash(type: string, message?: string | string[]): string[] | undefined;
    }
}