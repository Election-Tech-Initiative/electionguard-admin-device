import SetupTrusteesPage from './pages/SetupTrusteesPage'
import StartPage from './pages/StartPage'
import TallyPage from './pages/TallyPage'
import NotFoundPage from './pages/NotFoundPage'

export type Route = {
  id: string
  name: string
  path: string
  exact?: boolean
  component: (props: any) => JSX.Element
}

export const routes: { [id: string]: Route } = {
  start: {
    id: 'start',
    name: 'Start',
    path: '/start',
    exact: true,
    component: StartPage,
  },
  setup: {
    id: 'setup',
    name: 'Setup Trustees',
    path: '/setup',
    exact: true,
    component: SetupTrusteesPage,
  },
  // keys: {
  //   id: 'keys',
  //   name: 'Distribute Keys',
  //   path: '/keys',
  //   exact: true,
  //   component: DistributeKeysPage,
  // },
  // downloadkey: {
  //   id: 'downloadkey',
  //   name: 'Download Key',
  //   path: '/keys/:keyIndex',
  //   exact: false,
  //   component: DistributeKeysPage,
  // },
  tally: {
    id: 'tally',
    name: 'Tally Votes',
    path: '/tally',
    exact: true,
    component: TallyPage,
  },
  404: {
    id: '404',
    name: 'Not Found',
    path: '/:path',
    exact: false,
    component: NotFoundPage,
  },
}

export default routes
