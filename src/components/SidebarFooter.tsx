import React, { useContext } from 'react'
import styled from 'styled-components'
import AdminContext from '../contexts/adminContext'
import ElectionInfo from './ElectionInfo'

const LogoImage = styled.img`
  display: flex;
  margin: 0 auto;
  max-width: 12rem;
`

const SidebarFooter = () => {
  const { election } = useContext(AdminContext)
  return (
    <>
      <hr />
      <ElectionInfo election={election} precinctId="" horizontal />
      <hr />
      <LogoImage alt="Election Guard Logo" src="/images/electionguard.svg" />
    </>
  )
}

export default SidebarFooter
