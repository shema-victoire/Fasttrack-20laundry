export const whatsappConfig = {
  phoneNumber: "250784123456",
  businessName: "LaundryPro",
};

export function getWhatsAppLink(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${whatsappConfig.phoneNumber}?text=${encodedMessage}`;
}

export function openWhatsApp(message: string): void {
  const link = getWhatsAppLink(message);
  window.open(link, "_blank", "noopener,noreferrer");
}
