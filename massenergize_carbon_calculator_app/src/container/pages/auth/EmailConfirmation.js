import React from 'react'
import useQuery from '../../../hooks/useQuery'

const EmailConfirmation = () => {
  const query = useQuery()  // not sure what this does
  console.log(query)  // eliminates linter warning
  return <div>Email Confirmation</div>
}

export default EmailConfirmation
