/// <reference types="react-scripts" />

declare namespace NodeJS {
  export interface ProcessEnv {
    REACT_APP_MOCK_CARD_SERVER:  string
    REACT_APP_MOCK_USB_SERVER: string
    REACT_APP_MOCK_EG_SERVER: string
  }
}