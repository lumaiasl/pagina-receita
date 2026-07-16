interface PrepStepsProps {
   index: number,
   description: string; 
}

export default function PrepSteps({index, description}: PrepStepsProps){
    return(
        <li className="flex gap-2">
            <span className="flex items-center justify-center shrink-0 bg-orange-100 w-6 h-6 rounded-full text-orange-500">{index + 1}</span>
            <p>{description}</p>
        </li>
    )
}