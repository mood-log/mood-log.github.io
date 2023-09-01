export const translations = {
    common: {
        en: () => import('./common/en.json'),
        ru: () => import('./common/ru.json'),
    },
    feelings: {
        en: () => import('./feelings/en.json'),
        ru: () => import('./feelings/ru.json'),
    },
    mood: {
        en: () => import('./mood/en.json'),
        ru: () => import('./mood/ru.json'),
    },
    settings: {
        en: () => import('./settings/en.json'),
        ru: () => import('./settings/ru.json'),
    },
    triggers: {
        en: () => import('./triggers/en.json'),
        ru: () => import('./triggers/ru.json'),
    },
};
  
export const DEFAULT_LANGUAGE = 'en';
