import db from '~/main/apis/core/datastore'
import { ipcMain } from 'electron'
import { showMessageBox } from '~/main/utils/common'
import { SHOW_PRIVACY_MESSAGE } from '~/universal/events/constants'
import { T } from '~/universal/i18n'

class PrivacyManager {
  async init () {
    // 授权
    ipcMain.on(SHOW_PRIVACY_MESSAGE, () => {
      this.show(false)
      console.log('授权信息')
    })
    if (db.get('settings.privacyEnsure') !== true) {
      // const res = await this.show(true)
      console.log('授权信息')
      // console.log(res)
      // cancel
      // if (res.result === 1) {
      //   return false
      // } else {
      //   db.set('settings.privacyEnsure', true)
      //   return true
      // }
    }
    return true
  }

  async show (showCancel = true) {
    const res = await showMessageBox({
      type: 'info',
      buttons: showCancel ? ['Yes', 'No'] : ['Yes'],
      title: T('PRIVACY_AGREEMENT'),
      message: T('PRIVACY')
    })
    return res
  }
}

const privacyManager = new PrivacyManager()

export {
  privacyManager
}
