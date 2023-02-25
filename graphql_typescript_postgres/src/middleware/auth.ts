import * as jwt from "jsonwebtoken";
import config from "config";
export interface AuthTokenPayload {
  userId: number;
}
export const auth = (header: string): AuthTokenPayload => {
  const token = header.split(" ")[1];

  if (!token) {
    throw new Error("Invalid token.");
  }

  return jwt.verify(
    token,
    config.get<string>("JWT_SECRET")
  ) as AuthTokenPayload;
};
