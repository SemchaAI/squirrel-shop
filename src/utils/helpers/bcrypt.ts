"use server";
import bcrypt from "bcryptjs";
export async function saltAndHashPassword(password: string) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}
export const comparePasswords = async (raw: string, hashed: string) =>
  bcrypt.compare(raw, hashed);
