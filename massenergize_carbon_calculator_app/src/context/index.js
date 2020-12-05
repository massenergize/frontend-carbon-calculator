import React from 'react'
import PropTypes from 'prop-types'
import { AnsweredProvider } from './AnsweredContext'
import { AuthProvider } from './AuthContext'
import { EventProvider } from './EventContext'
import { ScoreProvider } from './ScoreContext'
import { SelectedProvider } from './SelectedContext'
import { SkipProvider } from './SkipContext'
import { GroupProvider } from './GroupContext'

const ContextWrapper = ({ children }) => (
  <AnsweredProvider>
    <AuthProvider>
      <EventProvider>
        <ScoreProvider>
          <SelectedProvider>
            <GroupProvider>
              <SkipProvider>{children}</SkipProvider>
            </GroupProvider>
          </SelectedProvider>
        </ScoreProvider>
      </EventProvider>
    </AuthProvider>
  </AnsweredProvider>
)

ContextWrapper.propTypes = {
  children: PropTypes.any,
}

export default ContextWrapper
