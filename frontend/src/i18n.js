import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { register } from 'timeago.js';


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
                'Load old hoaxes': 'Load old hoaxes',
                'There are new hoaxes': 'There are new hoaxes',
                'Delete Hoax': 'Delete Hoax',
                'Are you sure to delete hoax?': 'Are you sure to delete hoax?',
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
                'Load old hoaxes': 'Geçmiş Hoaxları getir',
                'There are new hoaxes': 'Yeni hoaxlar var',
                'Delete Hoax': `Hoax' u sil`,
                'Are you sure to delete hoax?': `Hoax' u silmek istediğinizden emin misiniz?`,
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

const timeageTR = (number, index) => {
    return [
      ['az önce', 'şimdi'],
      ['%s saniye önce', '%s saniye içinde'],
      ['1 dakika önce', '1 dakika içinde'],
      ['%s dakika önce', '%s dakika içinde'],
      ['1 saat önce', '1 saat içinde'],
      ['%s saat önce', '%s saat içinde'],
      ['1 gün önce', '1 gün içinde'],
      ['%s gün önce', '%s gün içinde'],
      ['1 hafta önce', '1 hafta içinde'],
      ['%s hafta önce', '%s hafta içinde'],
      ['1 ay önce', '1 ay içinde'],
      ['%s ay önce', '%s ay içinde'],
      ['1 yıl önce', '1 yıl içinde'],
      ['%s yıl önce', '%s yıl içinde']
    ][index];
  };
  register('tr', timeageTR);

export default i18next;