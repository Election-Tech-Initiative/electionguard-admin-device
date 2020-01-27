import fetchMock from 'fetch-mock'
import drives from './responses/drives.json'
import election from './responses/election.json'
import castBallots from './responses/castBallots.json'
import spoiledBallots from './responses/spoiledBallots.json'
import encryptedBallots from './responses/encryptedBallots.json'
import tally from './responses/tally.json'

const postSuccess = {
  success: true,
  body: '',
}

export const mockUsbApi = () => {
  fetchMock.get('/usb', () => {
    return JSON.stringify(drives)
  })

  fetchMock.get(`/usb/${drives[0].id}/file?path=data/election.json`, () => {
    return JSON.stringify(election)
  })

  fetchMock.post(`/usb/${drives[0].id}/file?path=data/election.json`, {
    success: true,
    body: JSON.stringify(election),
  })

  fetchMock.post(
    `/usb/${drives[0].id}/file?path=data/election.state.json`,
    postSuccess
  )

  fetchMock.post(
    `/usb/${drives[0].id}/file?path=data/election.map.json`,
    postSuccess
  )

  fetchMock.get(
    `/usb/${drives[1].id}/file?path=data/encryptedBallots.json`,
    () => {
      return JSON.stringify(encryptedBallots)
    }
  )

  fetchMock.get(
    `/usb/${drives[1].id}/file?path=data/spoiledBallots.json`,
    () => {
      return JSON.stringify(spoiledBallots)
    }
  )

  fetchMock.get(`/usb/${drives[1].id}/file?path=data/castBallots.json`, () => {
    return JSON.stringify(castBallots)
  })

  fetchMock.get(`/usb/${drives[0].id}/file?path=data/tally.json`, () => {
    return JSON.stringify(tally)
  })

  fetchMock.post(`/usb/${drives[0].id}/file?path=data/tally.json`, {
    success: true,
    body: JSON.stringify(tally),
  })

  fetchMock.post(`/usb/${drives[0].id}/file?path=data/trackers.csv`, {
    success: true,
    body: JSON.stringify(election),
  })

  fetchMock.post(`/usb/${drives[0].id}/file?path=data/results.csv`, {
    success: true,
    body: JSON.stringify(election),
  })
}

export default mockUsbApi
