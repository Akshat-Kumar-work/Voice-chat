import React, { useState } from 'react'
import StepPhoneEmail from './Steps/StepPhoneEmail';
import StepOtp from './Steps/StepOtp';

const steps = {
    1: StepPhoneEmail,
    2: StepOtp
}


const Login = () => {
    const onNext = ()=>{
        setStep(step+1);
    }

    const [step , setStep ] = useState(1);
    const Step = steps[step];

  return (
    <div>
        <Step onNext={onNext}/>
    </div>
  )
}

export default Login