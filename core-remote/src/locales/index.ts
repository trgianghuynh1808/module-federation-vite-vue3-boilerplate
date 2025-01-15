import { createI18n } from 'vue-i18n';

import vi from '@/locales/vi.json';
import en from '@/locales/en.json';

const i18n = createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  locale: 'vi',
  fallbackLocale: 'vi',
  messages: {
    vi,
    en,
  },
});

export { i18n };
