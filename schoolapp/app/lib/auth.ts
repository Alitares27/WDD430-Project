import postgres from 'postgres';
import bcrypt from 'bcryptjs';
import type { Users } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function getUserFromDB(email: string, password: string): Promise<Omit<Users, 'password_hash'> | null> {
  const result = await sql<Users[]>`
    SELECT * FROM users WHERE email = ${email} AND is_active = true
  `;

  const user = result[0];
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) return null;

  const { password_hash: _password_hash, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
