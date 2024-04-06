export const scrollToDiv = (element: string) => {
  document.getElementById(element)?.scrollIntoView();
};

export const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};

export const phoneNumberFormat = (phone: string, reverse?: boolean) => {
  if (reverse) {
    return phone?.startsWith("+") ? phone : `+${phone}`;
  } else {
    return phone?.startsWith("+") ? phone.replace("+", "") : phone;
  }
};

export const sentenceCase = (str: string) => {
  return str.toLowerCase().charAt(0).toUpperCase() + str.slice(1);
};

export const randomString = (length: number, chars: string): string => {
  const charSets: Record<string, string> = {
    a: "abcdefghijklmnopqrstuvwxyz",
    A: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "#": "0123456789",
    "!": "~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\",
  };

  let mask = "";
  for (const char of chars) {
    if (charSets[char]) {
      mask += charSets[char];
    } else {
      throw new Error(
        `Invalid character set '${char}'. Use 'a', 'A', '#', or '!' as chars.`
      );
    }
  }

  const result = Array.from(
    { length },
    () => mask[Math.floor(Math.random() * mask.length)]
  ).join("");
  return result;
};
