import React from 'react'
import PropTypes from 'prop-types'
import { SCORES as scores } from '../../../mock/testScore'

const ScoreCategoryRow = ({ category }) => (
  <tr>
    <th colSpan="3">{category}</th>
  </tr>
)

ScoreCategoryRow.propTypes = {
  category: PropTypes.string,
}

const ScoreRow = ({ score: { members, name, points } }) => {
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
  score: PropTypes.shape({
    members: PropTypes.string,
    name: PropTypes.string,
    points: PropTypes.number,
  }),
}

const ScoreBoardPage = () => {
  let lastCategory
  return (
    <div className="scoreBoard">
      <h1>Score Board</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Points</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {scores.map(score => {
            if (score.category !== lastCategory) lastCategory = score.category
            return (
              <>
                {score.category !== lastCategory && (
                  <ScoreCategoryRow
                    category={score.category}
                    key={score.category}
                  />
                )}
                <ScoreRow score={score} key={score.name} />
              </>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ScoreBoardPage
