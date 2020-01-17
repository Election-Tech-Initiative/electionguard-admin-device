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

const adminDriveMountpoints = drives[0].mountpoints
const storageDriveMountpoints = drives[1].mountpoints
let adminDriveMounted = false
let storageDriveMounted = false
let storageDriveConnected = true

export const mockUsbApi = () => {
  fetchMock.get('/usb', () => {
    drives[0].mountpoints = adminDriveMounted ? adminDriveMountpoints : []
    drives[1].mountpoints = storageDriveMounted ? storageDriveMountpoints : []
    const result = storageDriveConnected ? drives : [drives[0]]
    storageDriveConnected = true
    return JSON.stringify(result)
  })

  fetchMock.post(`/usb/${drives[0].id}/mount?label=admin_drive`, () => {
    adminDriveMounted = true
    return {
      success: true,
    }
  })

  fetchMock.post(`/usb/${drives[1].id}/mount?label=storage_drive`, () => {
    storageDriveMounted = true
    return {
      success: true,
    }
  })

  fetchMock.get(`/usb/${drives[0].id}/file?path=data/election.json`, () => {
    return JSON.stringify(election)
  })

  fetchMock.get(`/usb/${drives[0].id}/file?path=data/election.map.json`, () => {
    return undefined
  })

  fetchMock.get(
    `/usb/${drives[0].id}/file?path=data/election.state.json`,
    () => {
      return undefined
    }
  )

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

  fetchMock.post(
    `/usb/${drives[1].id}/file?path=data/election.state.json`,
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

  fetchMock.post(`/usb/${drives[0].id}/unmount`, () => {
    adminDriveMounted = false
    return postSuccess
  })

  fetchMock.post(`/usb/${drives[1].id}/unmount`, () => {
    storageDriveMounted = false
    storageDriveConnected = false // Not reality but to simulate pulling drive
    return postSuccess
  })
}

export default mockUsbApi
