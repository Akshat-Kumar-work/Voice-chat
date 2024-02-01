import { useCallback, useEffect, useRef, useState } from "react"


//it is a hook which will call when the client state is updated 
//it is a normal use State hook but with call back functionality
export const useStateWithCallback  = (initialState)=>{

    const [state , setState] = useState(initialState);
    
    //we are using useRef because we dont want to re redner our component when callBackRef values change
    const callBackRef = useRef();

    //creating update state function  for client Custom useState hook to give a extra call back function to it
    //set state is simple set state function for updating the state for client custom use state hook
    const updateClients = useCallback( (SETstate,callback)=>{
        
        //giving call back function to callback reference to avoid the re-rendering of component when call back will assigned
        callBackRef.current = callback;

        setState((prev)=>{return typeof SETstate === 'function' ? SETstate(prev): SETstate})

    },[]);

    useEffect(()=>{

        //agar callback ref m koi call back function mila toh y kro
        if(callBackRef.current){
            callBackRef.current(state);
            callBackRef.current = null;
        }
   
    },[state])

    return [state,updateClients];

}