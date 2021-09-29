import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Container from '../Container'

const useStyles = makeStyles({
  tableContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    fontSize: '1rem',
    '& table': {
      width: '100%',
      '& th': {
        color: '#6FC5EB',
      },
      '& td': {
        textAlign: 'center',
      },
    },
  },
  titleWrapper: {
    width: '100%',
  },
  title: {
    color: '#6FC5EB',
    textAlign: 'center',
  },
  container: {
    padding: 20,
  },
})

const ScoreRow = ({ members, name, points }) => {
  const scoreName =
    members > 0 ? name : <span style={{ color: 'red' }}>{name}</span>

  return (
    <tr>
      <td>{scoreName}</td>
      <td>{points}</td>
      <td>{members}</td>
    </tr>
  )
}

ScoreRow.propTypes = {
  members: PropTypes.number,
  name: PropTypes.string,
  points: PropTypes.number,
}

const ScoreboardPage = ({ scores }) => {
  const classes = useStyles()
  let lastCategory
  return (
    <Container
      titleWrapperClassName={classes.titleWrapper}
      wrapperClassName={classes.container}
      title={<h1 className={classes.title}>Score Board</h1>}
    >
      <div className={classes.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Points</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {scores.map(({ category, name, ...rest }) => {
              if (category !== lastCategory) lastCategory = category
              return (
                <Fragment key={name}>
                  {category !== lastCategory && (
                    <tr>
                      <th colSpan="3">{category}</th>
                    </tr>
                  )}
                  <ScoreRow name={name} {...rest} />
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </Container>
  )
}

ScoreboardPage.propTypes = {
  scores: PropTypes.arrayOf(
    PropTypes.shape({
      members: PropTypes.number,
      category: PropTypes.string,
      name: PropTypes.string,
      score: PropTypes.number,
    }),
  ),
}

export default ScoreboardPage
