import React from 'react'

const UserProfile = ({params}: any) => {
  return (
    <div>
      <div className="h1 text-center py-3">Profile </div>
      <hr />
      <div className="mt-3 text-center">The user id is {params.id}</div>
    </div>
  )
}

export default UserProfile