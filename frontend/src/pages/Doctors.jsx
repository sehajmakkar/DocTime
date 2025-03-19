import React from 'react'

// we need to handle two cases.

// from specialization section we need to show the docs from a particular specialization
// so using useParams hook to get the specialization from the url 

// and if the specialization is not provided then we need to show all the doctors
// in this case specialisation will be undefined

// this page will contain a filter panel acc to specialization on the left and the docs on the right

const Doctors = () => {

  const { specialization } = useParams();


  return (
    <div>Doctors</div>
  )
}

export default Doctors