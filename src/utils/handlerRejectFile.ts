import type { Ref } from 'vue'
import type { QRejectedEntry } from 'quasar'

export const handlerRejectFile =
  (ref: Ref<string>) => (entries: QRejectedEntry[]) => {
    if (entries[0].failedPropValidation === 'accept') {
      ref.value = `File type: '${entries[0].file.type}' is not valid`
    } else {
      ref.value = 'Invalid file'
    }
  }
