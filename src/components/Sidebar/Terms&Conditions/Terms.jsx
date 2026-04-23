import React from 'react'
import { PiArrowBendUpLeftBold } from 'react-icons/pi'
import { Navigate, useNavigate } from 'react-router-dom'

const Terms = ({setTerms}) => {

  const navigate = useNavigate()

  const handleBack = ()=>{
    // navigate("/login/create-password")
    setTerms(false)
  }
  return (
   <div className="relative flex items-center justify-center h-full">
  
  <button
    className="absolute top-4 left-4"
    onClick={handleBack}
  >
    <PiArrowBendUpLeftBold fontSize={28} color="white" />
  </button>

  <div className="bit-btn">
    Orbix Wallet
  </div>

</div>
  )
}

export default Terms