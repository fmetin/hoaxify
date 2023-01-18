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
                'login': 'Login',
                'logout': 'Logout',
                'users': 'Users',
                'next': 'next >',
                'previous': '< previous',
                'load.failure': 'Load Failure',
                'user.not.found': 'User not found',
                'edit': 'Edit',
                'cancel': 'Cancel',
                'save': 'Save',
                'change.display.name': 'Change Display Name',
                'my.profile': 'My Profile',
                'hoaxify': 'Hoaxify',
                'There are no hoaxes': 'There are no hoaxes',
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
                'login': 'Giriş Yap',
                'logout': 'Çıkış Yap',
                'users': 'Kullanıcılar',
                'next': 'sonraki >',
                'previous': '< önceki',
                'load.failure': 'Liste alınamadı',
                'user.not.found': 'Kullanıcı bulunamadı',
                'edit': 'Düzenle',
                'cancel': 'İptal',
                'save': 'Kaydet',
                'change.display.name': 'Görünür İsminizi Değiştirin',
                'my.profile': 'Hesabım',
                'hoaxify': 'Hoaxify',
                'There are no hoaxes': 'Hoax bulunamadı',
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