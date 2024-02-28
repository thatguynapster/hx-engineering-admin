import * as argon2 from "argon2";

export const hashPassword = async (
  password: string
): Promise<string | null> => {
  try {
    // const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    return null;
  }
};

export const comparePassword = async (
  hash: string,
  password: string
): Promise<boolean> => {
  // return await bcrypt.compare(password, hash);
  return await argon2.verify(hash, password);
};
