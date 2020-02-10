import fetchMock from 'fetch-mock'
import drives from './responses/drives.json'
import election from './responses/election.json'
import config from './responses/election.config.json'
import castBallots from './responses/castBallots.json'
import spoiledBallots from './responses/spoiledBallots.json'
import encryptedBallots from './responses/encryptedBallots.json'
import tally from './responses/tally.json'
import {
  electionFile,
  electionConfigFile,
  stateFile,
  mapFile,
  spoiledBallotsFile,
  castBallotsFile,
  encryptedBallotsFile,
  tallyFile,
  trackersFile,
  electionResultsFile,
  defaultDirectory,
} from '../../components/UsbManager'

const postSuccess = {
  success: true,
  body: '',
}

const adminDriveMountpoints = drives[0].mountpoints
const storageDriveMountpoints = drives[1].mountpoints
let adminDriveMounted = false
let storageDriveMounted = false
let storageDriveConnected = true

export const mockUsbApi = (zeroTally: boolean) => {
  fetchMock.get('/usb', () => {
    drives[0].mountpoints = adminDriveMounted ? adminDriveMountpoints : []
    drives[1].mountpoints = storageDriveMounted ? storageDriveMountpoints : []
    const result = storageDriveConnected ? drives : [drives[0]]
    storageDriveConnected = true
    return JSON.stringify(result)
  })

  // Admin Drive
  fetchMock.post(`/usb/${drives[0].id}/mount?label=admin_drive`, () => {
    adminDriveMounted = true
    return postSuccess
  })

  fetchMock.get(`/usb/${drives[0].id}/file?path=${electionFile}`, () => {
    return JSON.stringify(election)
  })

  fetchMock.get(`/usb/${drives[0].id}/file?path=${mapFile}`, () => {
    return undefined
  })

  fetchMock.get(`/usb/${drives[0].id}/file?path=${stateFile}`, () => {
    return undefined
  })

  fetchMock.post(`/usb/${drives[0].id}/file?path=${electionFile}`, {
    success: true,
    body: JSON.stringify(election),
  })

  fetchMock.post(`/usb/${drives[0].id}/file?path=${stateFile}`, postSuccess)

  fetchMock.post(`/usb/${drives[0].id}/file?path=${mapFile}`, postSuccess)

  fetchMock.get(`/usb/${drives[0].id}/file?path=${tallyFile}`, () => {
    return JSON.stringify(tally)
  })

  fetchMock.post(`/usb/${drives[0].id}/file?path=${tallyFile}`, {
    success: true,
    body: JSON.stringify(tally),
  })

  fetchMock.post(`/usb/${drives[0].id}/unmount`, () => {
    adminDriveMounted = false
    return postSuccess
  })

  fetchMock.post(`/usb/${drives[0].id}/file?path=${trackersFile}`, {
    success: true,
    body: JSON.stringify(election),
  })

  fetchMock.post(`/usb/${drives[0].id}/file?path=${electionResultsFile}`, {
    success: true,
    body: JSON.stringify(election),
  })

  fetchMock.get(
    `/usb/${drives[0].id}/file?path=${electionConfigFile}`,
    JSON.stringify(config)
  )

  // Storage Drive
  fetchMock.post(`/usb/${drives[1].id}/mount?label=storage_drive`, () => {
    storageDriveMounted = true
    return postSuccess
  })

  fetchMock.post(`/usb/${drives[1].id}/file?path=${electionConfigFile}`, {
    success: true,
    body: JSON.stringify(config),
  })

  fetchMock.post(`/usb/${drives[1].id}/file?path=${stateFile}`, postSuccess)

  fetchMock.get(`/usb/${drives[1].id}/file?path=${spoiledBallotsFile}`, () => {
    if (zeroTally) {
      return JSON.stringify([])
    }
    return JSON.stringify(spoiledBallots)
  })

  fetchMock.get(`/usb/${drives[1].id}/file?path=${castBallotsFile}`, () => {
    if (zeroTally) {
      return JSON.stringify([])
    }
    return JSON.stringify(castBallots)
  })

  fetchMock.get(
    `/usb/${drives[1].id}/file?path=${encryptedBallotsFile}`,
    () => {
      if (zeroTally) {
        return JSON.stringify([])
      }
      return JSON.stringify(encryptedBallots)
    }
  )

  fetchMock.post(`/usb/${drives[1].id}/file?path=${electionFile}`, () => {
    return postSuccess
  })

  fetchMock.post(
    `/usb/${drives[1].id}/directory?path=${defaultDirectory}`,
    () => {
      return postSuccess
    }
  )

  fetchMock.post(`/usb/${drives[1].id}/unmount`, () => {
    storageDriveMounted = false
    storageDriveConnected = false // Not reality but to simulate pulling drive
    return postSuccess
  })
}

export default mockUsbApi
