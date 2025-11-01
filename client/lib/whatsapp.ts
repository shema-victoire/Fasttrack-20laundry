export const whatsappConfig = {
  phoneNumber: "250794939367",
  businessName: "Fast Track Laundry",
};

export function getWhatsAppLink(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${whatsappConfig.phoneNumber}?text=${encodedMessage}`;
}

export function openWhatsApp(message: string): void {
  const link = getWhatsAppLink(message);
  window.open(link, "_blank", "noopener,noreferrer");
}
