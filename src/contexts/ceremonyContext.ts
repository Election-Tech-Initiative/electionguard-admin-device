import { createContext } from 'react'

import {
  CeremonyContextInterface,
  EncrypterStore,
  TrusteeKeyVault,
} from '../config/types'

const context: CeremonyContextInterface = {
  numberOfTrustees: (undefined as unknown) as number,
  setNumberOfTrustees: () => undefined,
  threshold: (undefined as unknown) as number,
  setThreshold: () => undefined,
  keyVault: (undefined as unknown) as TrusteeKeyVault,
  setKeyVault: () => undefined,
  claimTrusteeKey: () => undefined,
  numberOfEncrypters: (undefined as unknown) as number,
  setNumberOfEncrypters: () => undefined,
  encrypterStore: (undefined as unknown) as EncrypterStore,
  setEncrypterStore: () => undefined,
  claimEncrypterDrive: () => undefined,
}

const CeremonyContext = createContext(context)

export default CeremonyContext
