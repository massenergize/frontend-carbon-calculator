import AuthPage from '../container/pages/auth/AuthPage'
import EventList from '../container/pages/events/EventList'
import EventItem from '../container/pages/events/EventItem'
import ScoreBoardPage from '../container/pages/about/ScoreboardPage'
import SummaryPage from '../container/pages/about/SummaryPage'
import AboutPage from '../container/pages/about/AboutPage'
import HomePage from '../container/pages/about/HomePage'

export default [
  {
    path: '/',
    Component: HomePage,
    isExact: true,
  },
  {
    path: '/about',
    Component: AboutPage,
    name: 'About Mass Energize',
  },
  {
    path: '/events',
    name: 'Events',
    Component: EventList,
  },
  { path: '/summary', name: 'Summary', Component: SummaryPage },
  { path: '/scoreboard', name: 'Scoreboard', Component: ScoreBoardPage },
  { path: '/auth', Component: AuthPage },
  {
    path: '/event/:id',
    Component: EventItem,
  },
]
