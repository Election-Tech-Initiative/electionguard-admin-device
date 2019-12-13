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
  NewCardData,
} from '../config/types'
import fetchJSON from '../utils/fetchJSON'
import UseInterval from '../hooks/useInterval'

interface Props {
  children?: ReactNode
  test?: boolean
}

const DEFAULT_CHECK_INTERVAL = 1000

// TODO Fill in implementation (poll, read, etc) for USB Manager
const SmartcardManager: FC<Props> = (props: Props) => {
  const [isCardConnected, setIsCardConnected] = useState(false)
  const [isWritingToCard, setIsWritingToCard] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [currentCard, setCurrentCard] = useState({} as CardData)

  const readCard = async (): Promise<CardAPI> => {
    return fetchJSON<CardAPI>('/card/read')
  }

  const readValue = async <T extends unknown>(): Promise<T> => {
    return fetchJSON<T>('/card/read_long')
  }

  const provisionNewCard = async <T extends CardData>(card: T) => {
    setIsWritingToCard(true)
    const formData = new FormData()
    formData.append('short_value', btoa(JSON.stringify(card)))
    await fetch('/card/write_short_b64', {
      method: 'post',
      body: formData,
    })
    setIsWritingToCard(false)
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
    setIsRunning(false)
    setIsCardConnected(false)
    setIsWritingToCard(false)
    setCurrentCard({} as CardData)
  }

  const convert = ({ shortValue }: CardPresentAPI) => {
    if (!shortValue) {
      return { t: 'new' } as NewCardData
    }

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
        return cardData as TrusteeCardData
      }
      case 'voter': {
        return cardData as VoterCardData
      }
      case 'new': {
        return cardData as NewCardData
      }
      default: {
        return {} as CardData
      }
    }
  }

  const read = async <T extends CardData>(): Promise<T> => {
    const card = await readCard()

    if (!card.present) {
      if (isCardConnected) {
        setIsCardConnected(false)
      }
      return {} as T
    }
    if (!isCardConnected) {
      setIsCardConnected(true)
    }
    return convert(card) as T
  }

  const write = async <T extends unknown>(data: T) => {
    if (currentCard.t === 'new' || currentCard.t === undefined) {
      // if the card is new, provision as a trustee by default
      await provisionNewCard({ t: 'trustee', h: '' } as TrusteeCardData)
    }
    await writeValue(btoa(JSON.stringify(data)))
  }

  UseInterval(
    async () => {
      try {
        const card: CardData = await read()
        setCurrentCard(card)
      } catch (e) {
        disconnect()
      }
    },
    isRunning ? DEFAULT_CHECK_INTERVAL : undefined
  )

  const connect = () => {
    if (isRunning) {
      return
    }
    setIsRunning(true)
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
