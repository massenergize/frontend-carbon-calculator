import AboutPage from '../pages/about/AboutPage'
import AuthPage from '../pages/auth/AuthPage'
import EventList from '../pages/events/EventList'
import ScoreBoardPage from '../pages/about/ScoreboardPage'
import SummaryPage from '../pages/about/SummaryPage'
import HomePage from '../pages/HomePage'

export default [
  {
    path: '/',
    Component: EventList,
    isExact: true,
  },
  {
    path: '/about',
    Component: AboutPage,
  },
  { path: '/summary', Component: SummaryPage },
  { path: '/scoreboard', Component: ScoreBoardPage },
  { path: '/auth', Component: AuthPage },
  {
    path: '/event/:id',
    Component: HomePage,
  },
]
