import React, { useContext } from 'react'
import styled from 'styled-components'
import { CandidateContest, YesNoContest } from '@votingworks/ballot-encoder'
import Main, { MainChild } from '../../components/Main'
import Prose from '../../components/Prose'
import Screen from '../../components/Screen'
import Sidebar from '../../components/Sidebar'
import SidebarFooter from '../../components/SidebarFooter'
import LinkButton from '../../components/LinkButton'
import TallyContext from '../../contexts/tallyContext'
import AdminContext from '../../contexts/adminContext'
import { ElectionGuardStatus } from '../../config/types'
import { Tally, CandidateVoteTally, YesNoVoteTally } from '../../electionguard'

const Header = styled.div`
  margin: 0 auto;
  text-align: center;
`

const ContestTitle = styled.h2`
  margin: 0;
  line-height: 1.3;
  font-size: 1.2rem;
`

const TallyContainer = styled.div`
  padding: 0.5rem 0.5rem;
`

const ContestContainer = styled.div`
  margin: 0.5rem;
  border: 1px solid rgb(38, 50, 56);
  padding: 0.5rem;
`

const Selection = styled.li`
  margin-bottom: 0.25rem;
`

const renderYesNoTally = (contest: YesNoContest, tally: YesNoVoteTally) => {
  return (
    <>
      <ContestTitle>{contest.title}</ContestTitle>
      <ul>
        <Selection>Yes: {tally.yes}</Selection>
        <Selection>No: {tally.no}</Selection>
      </ul>
    </>
  )
}

const renderCandidateTally = (
  contest: CandidateContest,
  tally: CandidateVoteTally
) => {
  return (
    <>
      <ContestTitle>{contest.title}</ContestTitle>
      <ul>
        {contest.candidates.map((candidate, index) => (
          <Selection key={candidate.id}>
            {candidate.name} : {tally.candidates[index]}
          </Selection>
        ))}
        {contest.allowWriteIns ? (
          <Selection>Write Ins: {tally.writeIns[0].tally}</Selection>
        ) : (
          <></>
        )}
      </ul>
    </>
  )
}

const renderContest = (
  contest: CandidateContest | YesNoContest,
  tally: CandidateVoteTally | YesNoVoteTally
) => {
  switch (contest.type) {
    case 'candidate':
      return renderCandidateTally(
        contest as CandidateContest,
        tally as CandidateVoteTally
      )
    case 'yesno':
      return renderYesNoTally(contest as YesNoContest, tally as YesNoVoteTally)
    default:
      return <div />
  }
}

const TallyPage = () => {
  const { election, setElectionGuardStatus } = useContext(AdminContext)
  const { tally, setTally } = useContext(TallyContext)

  const tempTally: Tally = election.contests.map(contest => {
    // eslint-disable-next-line default-case
    switch (contest.type) {
      case 'candidate':
        return {
          candidates: contest.candidates.map(() => 5),
          writeIns: [
            {
              name: 'writein',
              tally: 5,
            },
          ],
        } as CandidateVoteTally
      case 'yesno':
        return {
          yes: 4,
          no: 2,
        } as YesNoVoteTally
    }
    return {} as YesNoVoteTally
  })

  if (!tally) {
    setTally(tempTally)
  }

  const onComplete = () => {
    setElectionGuardStatus(ElectionGuardStatus.Complete)
  }

  return (
    <Screen flexDirection="row-reverse" white>
      <Sidebar footer={<SidebarFooter />}>
        <p>
          <LinkButton
            onPress={() => onComplete()}
            big
            primary
            to="/start"
            id="start"
            aria-label="Tally complete return to start."
          >
            Complete
          </LinkButton>
        </p>
        <p>
          <LinkButton small to="/ballots" id="back" aria-label="Navigate Back">
            Back
          </LinkButton>
        </p>
      </Sidebar>
      <Main>
        <MainChild>
          <Prose id="audiofocus">
            <Header>
              <h1>Tally Results</h1>
            </Header>
          </Prose>
          <TallyContainer>
            {tally && tally.length === election.contests.length ? (
              election.contests.map((contest, index) => (
                <ContestContainer key={contest.id}>
                  {renderContest(contest, tally[index])}{' '}
                </ContestContainer>
              ))
            ) : (
              <></>
            )}
          </TallyContainer>
        </MainChild>
      </Main>
    </Screen>
  )
}

export default TallyPage
