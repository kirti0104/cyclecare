import { JwtPayload } from 'jsonwebtoken';

// Define an interface for the custom data you're including in your JWT payload.
interface CustomJwtPayload {
  id: string;
  email: string;
  fullName: string;
}

declare global {
  namespace Express {
    export interface Request {
      // Augment the Request interface to include a 'user' property.
      // It can be either a string or a combination of the standard JwtPayload
      // and your custom fields, as returned by jwt.verify().
      user?: string | (JwtPayload & CustomJwtPayload);
    }
  }
}

// An empty export statement is required to treat this file as a module
// and apply the global augmentation.
export {};