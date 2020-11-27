import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

// Styled Button
const MyButton = withStyles({
  root: {
    color: '#fff',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#8dc63f',
    borderColor: '#8dc63f',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#7aab37',
      borderColor: '#6d9931',
      boxShadow: 'none',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(141, 198, 63, .5)',
    },
  },
})(Button)

export default MyButton
