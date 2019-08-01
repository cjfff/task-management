import { Module } from '@nestjs/common'

import { CryptoUtil } from './utils/crypto.util'
import { DateUtil } from './utils/date.util'

@Module({
  providers: [CryptoUtil, DateUtil],
  exports: [CryptoUtil, DateUtil]
})
export class CommonModule { }
