import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex gap-4">
      <button onClick={() => changeLanguage('en')} className="text-white">English</button>
      <button onClick={() => changeLanguage('hi')} className="text-white">हिन्दी</button>
      <button onClick={() => changeLanguage('ta')} className="text-white">தமிழ்</button>
      <button onClick={() => changeLanguage('kn')} className="text-white">ಕನ್ನಡ</button>
    </div>
  );
};

export default LanguageSelector;
