import { Button } from '@mantine/core'
import React from 'react'
import ExpInput from './ExpInput';

function ExpCard(props:any) {
  const [edit, setEdit] = React.useState(false);
  return (
    !edit ? <div className='flex flex-col gap-2  '>
        <div className='flex justify-between  '>
                <div className='flex gap-2 items-center '>
                    <div className='p-2 bg-mine-shaft-800 rounded-md  '>
                        <img className=' h-7 ' src={`/Icons/${props.company}.png`} alt="ms" />
                    </div>
                    
                    <div className='flex flex-col'>
                        <div className='font-semibold' >{props.title}</div>
                        <div className='text-sm text-mine-shaft-300 '>{props.company} &#x2022; {props.location} </div>
                    </div>
                </div>
              <div className='text-sm text-mine-shaft-300 '>
                {props.startDate} - {props.endDate}
              </div>
            </div>
            <div className='text-sm text-mine-shaft-300 text-justify  '>
               {props.description}
            </div>
           {props.edit && <div className='flex gap-5  '>
              <Button onClick={() => setEdit(true)} color='brightSun.4' variant='outline' >Edit</Button>
              <Button color='red.8' variant='light' >Delete</Button>
            </div>}
    </div> : <ExpInput setEdit={setEdit} />
  )
}

export default ExpCard