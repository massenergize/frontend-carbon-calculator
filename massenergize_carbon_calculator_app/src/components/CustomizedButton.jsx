import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

// Styled Button
const CustomizedButton = withStyles({
  root: {
    width: '100%',
    color: '#67b6e4',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
})(Button)

export default CustomizedButton
