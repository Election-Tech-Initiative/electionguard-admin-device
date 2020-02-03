/* eslint-disable react/prefer-stateless-function */
import React, {
  Component,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import styled from 'styled-components'
import {
  CandidateContest,
  YesNoContest,
  Election,
  Parties,
} from '@votingworks/ballot-encoder'
import ReactToPrint from 'react-to-print'
import Main from '../../components/Main'
import Screen from '../../components/Screen'
import Sidebar from '../../components/Sidebar'
import SidebarFooter from '../../components/SidebarFooter'
import LinkButton from '../../components/LinkButton'
import AdminContext from '../../contexts/adminContext'
import {
  CandidateVoteTally,
  YesNoVoteTally,
  ElectionGuardStatus,
  ElectionGuardState,
  Tally,
} from '../../electionguard'
import {
  adminDriveIndex,
  stateFile,
  tallyFile,
  trackersFile,
  electionResultsFile,
} from '../../components/UsbManager'
import UsbContext from '../../contexts/usbContext'
import LoadAdminDrive from '../LoadAdminDrive'
import ElectionInfo from '../../components/ElectionInfo'
import {
  exportTrackerCsv,
  exportElectionResultsCsv,
} from '../../electionguard/utils/csvConverter'
import TallyContext from '../../contexts/tallyContext'

const Header = styled.div`
  margin: 0 auto;
  text-align: center;
`

const Title = styled.h1`
  font-size: 1.2rem;
`

const ReportDate = styled.p`
  margin: 0;
  font-size: 0.8rem;
`

const ContestTitle = styled.h2`
  margin: 0;
  line-height: 1.3;
  font-size: 0.9rem;
`

const TallyContainer = styled.div`
  padding: 0.5rem 0.5rem;
`

const BorderContainer = styled.div`
  margin: 0.5rem;
  border: 1px solid rgb(38, 50, 56);
  padding: 0.5rem;
  font-size: 0.8rem;
`

const Selection = styled.li`
  margin-bottom: 0.25rem;
`

const StyledButton = styled.button`
  margin: 20px auto;
  border: none;
  border-radius: 8px;
  box-shadow: 0 0 0 0 rgba(71, 167, 75, 1);
  box-sizing: border-box;
  background: rgb(71, 167, 75);
  cursor: pointer;
  width: 400px;
  padding: 1rem 1.5rem;
  line-height: 1.25;
  color: #ffffff;
  font-size: 1.25rem;
  touch-action: manipulation;
`

const SignatureLine = styled.div`
  display: flex;
  margin: 10px 0;
  border-bottom: 1px solid #000000;
  width: 60%;
  height: 1.1em;
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
  tally: CandidateVoteTally,
  parties: Parties
) => {
  return (
    <>
      <ContestTitle>{contest.title}</ContestTitle>
      <ul>
        {contest.candidates.map((candidate, index) => (
          <Selection key={candidate.id}>
            {candidate.name}
            {parties.filter(x => x.id === candidate.partyId).length > 0
              ? `(${parties.filter(x => x.id === candidate.partyId)[0].name})`
              : ''}
            : {tally.candidates[index]}
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
  tally: CandidateVoteTally | YesNoVoteTally,
  parties: Parties
) => {
  switch (contest.type) {
    case 'candidate':
      return renderCandidateTally(
        contest as CandidateContest,
        tally as CandidateVoteTally,
        parties
      )
    case 'yesno':
      return renderYesNoTally(contest as YesNoContest, tally as YesNoVoteTally)
    default:
      return <div />
  }
}

const renderSignatureBlock = () => {
  return (
    <BorderContainer>
      <p>
        <b>Certification Signatures</b>
        <br />
        <br />
        We, the undersigned, do hereby certify the election was conducted in
        accordance with the laws of the state.
      </p>
      <SignatureLine>X</SignatureLine>
      <SignatureLine>X</SignatureLine>
      <SignatureLine>X</SignatureLine>
    </BorderContainer>
  )
}

interface PrintableTallyProps {
  tally: Tally
  election: Election
  printing?: boolean
}

const printDate = () => {
  const options = {
    dateStyle: 'long',
    timeStyle: 'long',
    hour12: false,
  }
  return new Date().toLocaleDateString('en-US', options)
}

class PrintableTallyPage extends Component<PrintableTallyProps> {
  render() {
    const { tally, election, printing } = this.props
    const parties = election ? election.parties : []
    return (
      <div>
        {election && printing ? (
          <ElectionInfo election={election} precinctId="" horizontal />
        ) : (
          <></>
        )}
        <Header>
          <Title>ElectionGuard Tally Results</Title>
          {printing ? (
            <ReportDate>{`Report Printed at: ${printDate()}`}</ReportDate>
          ) : (
            <></>
          )}
        </Header>
        <TallyContainer>
          {tally && tally.length === election.contests.length ? (
            election.contests.map((contest, index) => (
              <BorderContainer key={contest.id}>
                {renderContest(contest, tally[index], parties)}{' '}
              </BorderContainer>
            ))
          ) : (
            <></>
          )}
          {printing ? renderSignatureBlock() : <></>}
        </TallyContainer>
      </div>
    )
  }
}

const TallyPage = () => {
  const {
    election,
    electionGuardConfig,
    setElectionGuardStatus,
    tally,
  } = useContext(AdminContext)
  const { connect, disconnect, write, adminDriveMounted } = useContext(
    UsbContext
  )

  const { castTrackers } = useContext(TallyContext)

  const tallyDisplayRef = useRef(null) // eslint-disable-line

  const startMonitoringDrives = useCallback(connect, [])
  const stopMonitoringDrives = useCallback(disconnect, [])
  useEffect(() => {
    startMonitoringDrives()
    return () => stopMonitoringDrives()
  }, [startMonitoringDrives, stopMonitoringDrives])

  const writeFilesToAdminDrive = async () => {
    let result = await write(adminDriveIndex, stateFile, {
      ...electionGuardConfig,
      status: ElectionGuardStatus.Complete,
    } as ElectionGuardState)
    if (!result.success) {
      throw new Error('failed to write status')
    }

    result = await write(adminDriveIndex, tallyFile, tally)
    if (!result.success) {
      throw new Error('failed to write tallied ballots')
    }

    const trackers = exportTrackerCsv(castTrackers)
    result = await write(adminDriveIndex, trackersFile, trackers)
    if (!result.success) {
      throw new Error('failed to write trackers')
    }

    const electionResults = exportElectionResultsCsv(tally, election)
    result = await write(adminDriveIndex, electionResultsFile, electionResults)
    if (!result.success) {
      throw new Error('failed to write election results')
    }
  }

  const onComplete = () => {
    writeFilesToAdminDrive().then(() =>
      setElectionGuardStatus(ElectionGuardStatus.Complete)
    )
  }

  if (!adminDriveMounted) {
    return <LoadAdminDrive />
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
          <LinkButton
            small
            to="/ballots"
            id="back"
            aria-label="Navigate Back"
            disabled
          >
            Back
          </LinkButton>
        </p>
      </Sidebar>
      <Main>
        <ReactToPrint
          trigger={() => <StyledButton>Print Results</StyledButton>}
          content={() => tallyDisplayRef.current!}
        />
        <div style={{ display: 'none' }}>
          <PrintableTallyPage
            ref={tallyDisplayRef}
            printing
            tally={tally}
            election={election}
          />
        </div>
        <PrintableTallyPage tally={tally} election={election} />
      </Main>
    </Screen>
  )
}

export default TallyPage
