export const formatPhoneNumber = (phoneNumber?: string): string | null => {
  if (!phoneNumber) return null;

  const cleanNumber = phoneNumber.replace(/\D+/g, '');
  const formattedNumber = cleanNumber.replace(/^(\d{3})(\d{2})(\d{4})(\d{4})$/, '+($3) ($2) $3-$4');
  return formattedNumber;
};
