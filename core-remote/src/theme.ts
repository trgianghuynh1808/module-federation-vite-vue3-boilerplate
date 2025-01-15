import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { VSkeletonLoader } from "vuetify/labs/VSkeletonLoader";
import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";
import { useI18n } from "vue-i18n";

import { PRIMARY_COLOR } from "@/constants";
import { i18n } from "@/locales";

const vuetify = createVuetify({
  ssr: false,
  components: {
    ...components,
    VSkeletonLoader,
  },
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: "myCustomTheme",
    themes: {
      myCustomTheme: {
        dark: false,
        colors: {
          primary: PRIMARY_COLOR,
          secondary: "#0e2e39",
          background: "#eaedeb",
          background_card: "#fff",
          form_title: "#505c76",
          active_color: "#f37125",
          "status-draft": "#546e7a",
          "status-approved": "#2e7d32",
          "status-assigned": "#e6a54a",
          "status-submitted": "#fbc02d",
          "status-processing": "#f37125",
          "status-completed": "#01579B",
          "status-incompletely": "#d9534f",
          "status-canceled": "#d9534f",
          "status-paused": "#ffb300",
          "border-focus": "#25a7f3",
          "shadow-focus": "#dceeff",
          "k-green-darken": "#294d38",
        },
      },
    },
  },
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
});

export { vuetify };
