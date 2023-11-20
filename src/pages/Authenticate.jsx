import React, { useState } from 'react'
import StepPhoneEmail from './Steps/StepPhoneEmail';
import StepOtp from './Steps/StepOtp';


const Steps = {
    1: StepPhoneEmail,
    2: StepOtp
}

const Authenticate = () => {
    const [step , setStep ] = useState(1);
    const Step = Steps[step];

    function onNext () {
      console.log("inside authenticate")
        setStep(step+1);
     
    }

  return (
    <div>

    <Step onNext={onNext}/>

    </div>
  )
}

export default Authenticate;