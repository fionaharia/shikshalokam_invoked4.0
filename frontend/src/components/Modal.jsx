import React, { useState } from "react";
import Button from "./Button";
import { useTranslation } from "react-i18next";

const Modal = ({ isOpen, onClose, portalAccess }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black border-white text-white border-2 p-6 rounded-lg shadow-lg w-96 relative">

        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 hover:text-gray-400"
        >
          ✖
        </button>

        <h2 className="text-2xl text-center font-semibold mb-4">
          {portalAccess}
        </h2>  

        <div className="mb-4">
          <label className="block text-sm mb-2 font-medium">
            {t("modal.emailLabel")}
          </label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full bg-black rounded-xl px-3 py-2 mt-1 text-white border focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t("modal.emailPlaceholder")}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2 font-medium">
            {t("modal.passwordLabel")}
          </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full px-3 py-2 mt-1 bg-black text-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t("modal.passwordPlaceholder")}
          />
        </div>
        <div className="mt-8 justify-center flex">
          <Button text={t("modal.loginButton")} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
