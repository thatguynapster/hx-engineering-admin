import bcrypt from "bcryptjs";

export const hashPassword = async (
  password: string
): Promise<string | null> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
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
  return await bcrypt.compare(password, hash);
};
