import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'sign.up': 'Sign Up',
                'password.mismatch': 'Password mismatch',
                'username': 'Username',
                'displayName': 'Display Name',
                'password': 'Password',
                'passwordRepeat': 'Password Repeat',
                'login': 'Login'
            }
        },
        tr: {
            translations: {
                'sign.up': 'Kayıt Ol',
                'password.mismatch': 'Aynı şifreyi giriniz',
                'username': 'Kullanıcı adı',
                'displayName': 'Tercih Edilen İsim',
                'password': 'Şifre',
                'passwordRepeat': 'Şifreyi Tekrarla',
                'login': 'Giriş Yap'
            }
        }
    },
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeperator: false,
    interpolation: {
        escapeValue: false,
        formatSeperator: ','
    },
    react: {
        wait: true
    }
});

export default i18next;