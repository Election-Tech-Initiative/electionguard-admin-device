import React, { FC, ReactNode, useState } from 'react'
import SmartcardContext from '../contexts/smartcardContext'
import {
  CardAPI,
  CardPresentAPI,
  CardData,
  ClerkCardData,
  PollworkerCardData,
  TrusteeCardData,
  VoterCardData,
} from '../config/types'
import fetchJSON from '../utils/fetchJSON'

interface Props {
  children?: ReactNode
  test?: boolean
}

// TODO Fill in implementation (poll, read, etc) for USB Manager
const SmartcardManager: FC<Props> = (props: Props) => {
  const [isCardConnected, setIsCardConnected] = useState(false)
  const [isWritingToCard, setIsWritingToCard] = useState(false)
  const [cardCheckInterval, setCardCheckInterval] = useState(0)
  const [currentCard, setCurrentCard] = useState({} as CardData)

  const readCard = async (): Promise<CardAPI> => {
    return fetchJSON<CardAPI>('/card/read')
  }

  const readValue = async <T extends unknown>(): Promise<T> => {
    return fetchJSON<T>('/card/read_long')
  }

  const writeValue = async (data: string) => {
    setIsWritingToCard(true)
    const formData = new FormData()
    formData.append('long_value', data)

    await fetch('/card/write_long_b64', {
      method: 'post',
      body: formData,
    })
    setIsWritingToCard(false)
  }

  const disconnect = () => {
    console.log(`disconnect: ${cardCheckInterval}`)
    window.clearInterval(cardCheckInterval)
    setCardCheckInterval(0)
    setIsCardConnected(false)
    setIsWritingToCard(false)
    setCurrentCard({} as CardData)
  }

  const convert = ({ longValueExists, shortValue }: CardPresentAPI) => {
    let cardData: CardData = (shortValue as unknown) as CardData

    if (!cardData) {
      cardData = JSON.parse(shortValue as string)
    }

    switch (cardData.t) {
      case 'clerk': {
        return cardData as ClerkCardData
      }
      case 'pollworker': {
        return cardData as PollworkerCardData
      }
      case 'trustee': {
        console.log('convert: found trustee card')
        return cardData as TrusteeCardData
      }
      case 'voter': {
        return cardData as VoterCardData
      }
      default: {
        console.log(`${cardData.t} longValueExists: ${longValueExists}`)
        return cardData
      }
    }
  }

  const read = async <T extends CardData>(): Promise<T> => {
    const card = await readCard()

    if (!card.present) {
      setCurrentCard({} as CardData)
      console.log('not present')
      setIsCardConnected(false)
      return {} as T
    }
    if (!isCardConnected) {
      console.log('is present')
      setIsCardConnected(true)
    }
    return convert(card) as T
  }

  const write = async <T extends unknown>(data: T) => {
    await writeValue(btoa(JSON.stringify(data)))
  }

  const getIsConnected = () => {
    console.log(`getIsConnected: ${isCardConnected}`)
    return isCardConnected
  }

  const callRead = async () => {
    if (getIsConnected()) {
      return
    }

    try {
      const card: CardData = await read()
      setCurrentCard(card)
    } catch {
      disconnect()
    }
  }

  const connect = () => {
    if (cardCheckInterval !== 0) {
      return
    }
    const newInterval = window.setInterval(callRead, 1000)

    console.log(`new interval: ${newInterval}`)
    setCardCheckInterval(newInterval)
  }

  return (
    <SmartcardContext.Provider
      value={{
        isCardConnected,
        isWritingToCard,
        currentCard,
        connect,
        disconnect,
        read,
        readValue,
        write,
      }}
    >
      {props.children}
    </SmartcardContext.Provider>
  )
}

export default SmartcardManager
