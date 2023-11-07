import React from 'react'

const StepPhoneEmail = ({onNext}) => {
  return (
    <>
        <div>Phone or email</div>
        <button onClick={onNext}>Next</button>
    </>
  )
}

export default StepPhoneEmail