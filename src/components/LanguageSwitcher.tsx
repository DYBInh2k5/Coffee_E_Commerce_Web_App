import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'vi', label: 'VI', flag: '🇻🇳' }
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <div className="flex gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`px-2 py-1 text-xs rounded transition-colors ${
            i18n.language === lang.code
              ? 'bg-amber-700 text-white'
              : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
          }`}
          title={lang.label}
        >
          {lang.flag} {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
