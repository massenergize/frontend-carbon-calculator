import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardActionArea, CardContent, CardMedia } from '@material-ui/core'

const useStyles = makeStyles({
  logoImg: {
    maxWidth: '100%',
  },
})

const MyCard = ({ children, title, image, imageAlt, imageUrl }) => {
  const classes = useStyles()
  return (
    <Card>
      <CardActionArea>
        <CardMedia title={title}>
          <a href={imageUrl}>
            <img className={classes.logoImg} src={image} alt={imageAlt} />
          </a>
        </CardMedia>
      </CardActionArea>
      {children && <CardContent>{children}</CardContent>}
    </Card>
  )
}

MyCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  imageUrl: PropTypes.string,
}

export default MyCard
