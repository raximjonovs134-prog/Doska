// Ijtimoiy tarmoqlar havolalari va faolligini boshqaruvchi yordamchi funksiya

export function getSocialConfig(type, teacher) {
  const social = teacher?.socialLinks?.[type];
  
  if (social) {
    const enabled = social.enabled !== false;
    let username = (social.username || '').trim().replace(/^@/, '');
    let url = (social.url || '').trim();

    // Agar URL kiritilmagan bo'lsa, username asosida to'g'ri URL yaratish
    if (!url && username) {
      url = type === 'telegram' ? `https://t.me/${username}` : `https://instagram.com/${username}`;
    }

    return {
      enabled,
      username,
      url,
      isValid: Boolean(enabled && (url || username))
    };
  }

  // Eski maydonlar bilan orqaga moslik (fallback)
  const legacyUser = type === 'telegram' ? teacher?.telegramUsername : teacher?.instagramUsername;
  if (legacyUser) {
    const username = legacyUser.trim().replace(/^@/, '');
    const url = type === 'telegram' ? `https://t.me/${username}` : `https://instagram.com/${username}`;
    return {
      enabled: true,
      username,
      url,
      isValid: true
    };
  }

  return {
    enabled: false,
    username: '',
    url: '',
    isValid: false
  };
}
