import { mockCardApi } from './card/mockCardApi'
import { mockUsbApi } from './usb/mockUsbApi'
import { mockElectionGuardApi } from './electionguard/mockElectionGuardApi'

class MockApiService {
  cardMockEnabled: boolean

  usbMockEnabled: boolean

  electionGuardMockEnabled: boolean

  constructor() {
    this.cardMockEnabled =
      process.env.REACT_APP_MOCK_CARD_SERVER === 'true' || false
    this.usbMockEnabled =
      process.env.REACT_APP_MOCK_USB_SERVER === 'true' || false
    this.electionGuardMockEnabled =
      process.env.REACT_APP_MOCK_EG_SERVER === 'true' || false
  }

  public startEnabledMockServices = () => {
    if (this.cardMockEnabled) {
      mockCardApi()
    }
    if (this.usbMockEnabled) {
      mockUsbApi()
    }
    if (this.electionGuardMockEnabled) {
      mockElectionGuardApi()
    }
  }
}

const mockApiService = new MockApiService()

export default mockApiService
