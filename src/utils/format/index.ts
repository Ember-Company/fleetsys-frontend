export const formatPhoneNumber = (phoneNumber: string | null): string | null => {
  if (!phoneNumber) return null;

  const cleanNumber = phoneNumber.replace(/\D+/g, '');
  const countryCode = cleanNumber.startsWith('0') ? cleanNumber.slice(1, 3) : cleanNumber.slice(0, 3);
  const restNumber = cleanNumber.startsWith('0') ? cleanNumber.slice(3) : cleanNumber.slice(3);
  const formattedNumber = restNumber.replace(/^(\d{2})(\d{4})(\d{4})$/, `+${countryCode} ($1) $2-$3`);

  return formattedNumber;
};
