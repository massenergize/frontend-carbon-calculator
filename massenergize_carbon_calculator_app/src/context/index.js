import React from 'react'
import PropTypes from 'prop-types'
import { AnsweredProvider } from './AnsweredContext'
import { AuthProvider } from './AuthContext'
import { EventProvider } from './EventContext'
import { ScoreProvider } from './ScoreContext'
import { SelectedProvider } from './SelectedContext'
import { SkipProvider } from './SkipContext'
import { GroupProvider } from './GroupContext'

const ContextWrapper = ({ children }) =>
  [
    AnsweredProvider,
    AuthProvider,
    EventProvider,
    ScoreProvider,
    SelectedProvider,
    GroupProvider,
    SkipProvider,
  ].reduce((component, Context) => <Context>{component}</Context>, children)

ContextWrapper.propTypes = {
  children: PropTypes.any,
}

export default ContextWrapper
