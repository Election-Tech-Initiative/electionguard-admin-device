import { mockCardApi } from './card/mockCardApi'
import { mockUsbApi } from './usb/mockUsbApi'
import { mockElectionGuardApi } from './electionguard/mockElectionGuardApi'

class MockApiService {
  enabled: boolean

  constructor() {
    this.enabled = process.env.REACT_APP_MOCK_SERVERS === 'true' || false
  }

  public startEnabledMockServices = () => {
    if (this.enabled) {
      mockCardApi()
      mockUsbApi()
      mockElectionGuardApi()
    }
  }
}

const mockApiService = new MockApiService()

export default mockApiService
