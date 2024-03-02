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
