import { mockCardApi } from './card/mockCardApi'
import { mockUsbApi } from './usb/mockUsbApi'
import { mockElectionGuardApi } from './electionguard/mockElectionGuardApi'

class MockApiService {
  enabled: boolean

  zeroTally: boolean

  constructor() {
    this.enabled = process.env.REACT_APP_MOCK_SERVERS === 'true' || false
    this.zeroTally = process.env.REACT_APP_MOCK_ZERO_TALLY === 'true' || false
  }

  public startEnabledMockServices = () => {
    if (this.enabled) {
      mockCardApi()
      mockUsbApi(this.zeroTally)
      mockElectionGuardApi(this.zeroTally)
    }
  }
}

const mockApiService = new MockApiService()

export default mockApiService
