import { JwtPayload as DefaultJwtPayload } from 'jwt-decode';

// Define your custom interface that extends the default JwtPayload
export interface CustomJwtPayload extends DefaultJwtPayload {
  username: string;
  email: string;
  bio?: string; // Bio can be optional
}
