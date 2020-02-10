/// <reference types="react-scripts" />

declare namespace NodeJS {
  export interface ProcessEnv {
    REACT_APP_MOCK_SERVERS: string
    REACT_APP_MOCK_ZERO_TALLY: string
    REACT_APP_MOCK_EG_SERVER: string
    REACT_APP_POLLING_DATE: string
    REACT_APP_POLLING_LOCATION: string
  }
}