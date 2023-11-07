import React, { useState } from 'react'
import StepPhoneEmail from "./Steps/StepPhoneEmail"
import StepOtp from "./Steps/StepOtp"
import StepName from "./Steps/StepName"
import StepAvatar from "./Steps/StepAvatar"
import StepUserName from "./Steps/StepUserName"



const steps = {
    1: StepPhoneEmail,
    2: StepOtp, 
    3: StepName,
    4: StepAvatar,
    5: StepUserName
}

const Register = () => {

    const onNext = ()=>{
        setStep(step+1);
    }

    const [step , setStep] = useState(1);
    const Step = steps[step];

  return (
    <div>
        <Step onNext={onNext} />
    </div>
  )
}

export default Register