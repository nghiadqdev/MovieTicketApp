import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyHeader } from "~/common/constants/KeyHeader";
import { languageResource } from "./language.resource";
import create from 'zustand'

interface languageStore {
  locale: 'vi' | 'en';
  resource: object;
  loadResource: Function;
  changeLanguage: (key: 'vi' | 'en') => {};
}

const LanguageStore = create<languageStore>(set => ({
  locale: 'vi',
  resource: {},

  loadResource: () => set(state => ({
    resource: languageResource?.[state.locale] || {}
  })),

  changeLanguage: async (key) => {
    await AsyncStorage.setItem(KeyHeader.language, key)
    set({
      locale: key,
      resource: languageResource?.[key]
    })
  },
})
)

export default LanguageStore

// export class LanguageStore {

//   @bindProp locale = 'vn'
//   @bindProp resource = languageResource?.[this.locale] || {}

//   @action
//   loadResource = async () => {
//     this.resource = languageResource[this.locale]
//   }
//   constructor() {
//     makeObservable(this)
//   }
//   key = Object.keys(languageResource.en)
//   @action
//   changeLanguage = async (key?: string | 'Login' | 'Username' | 'Password' | 'Username' | 'PlaceholderFilter' | 'Confirm' | 'CFChangeIventory' | 'ChangeLanguage' | 'ChangePass') => {
//     let temp: string
//     if (key)
//       temp = key
//     else
//       temp = this.locale === 'vn' ? 'en' : 'vn'
//     console.log('---------------------------set store', temp)
//     await AsyncStorage.setItem(KeyHeader.language, temp)
//     runInAction(() => {
//       this.locale = temp
//       this.resource = languageResource?.[temp] || {}
//     })
//   }

//   translate = (key: string) => {
//     if (!key) return '';
//     try {
//       if (!this.resource) {
//         // return key;
//         return key.replace(/\[(.*?)\]/g, "");
//       }
//       if (!this.resource[key] && !this.resource[key.toLowerCase()] && !this.resource[key.toUpperCase()]) {
//         // return key;
//         return key.replace(/\[(.*?)\]/g, "");
//       }
//       return this.resource?.[key] || this.resource[key.toLowerCase()] || this.resource[key.toUpperCase()]
//     } catch (error) {

//       // return key;
//       return key.replace(/\[(.*?)\]/g, "");
//     }

//   }
// }