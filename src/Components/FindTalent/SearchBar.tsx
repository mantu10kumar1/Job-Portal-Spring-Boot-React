import React, { useState } from 'react'
import { Divider, Input, RangeSlider } from '@mantine/core'
import { MultiInput } from '../FindJobs/MultiInput'
import { IconUserCircle } from '@tabler/icons-react'
import { searchFields } from '../../Data/TalentData'
import { useDispatch } from 'react-redux'
import { updateFilter } from '../../Slices/FilterSlice'

function SearchBar() {
  const dispatch = useDispatch();
  const [value, setValue] = useState<[number , number]>([0, 50])
  const [name , setName] = useState('');
  const handleChange = (name: any , event:any) =>{
    if(name === "exp") dispatch(updateFilter({exp:event}));
    else{
      setName(event.target.value);
      dispatch(updateFilter({name: event.target.value}));
    }
  }
  return (
    <div className='flex px-5 py-8  '>
        <div className='flex items-center  '>
            <div className='text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2  '><IconUserCircle size={20} /></div>
            <Input   defaultValue={name} onChange={(e) => handleChange('name', e)}
            className='[&_input]:!placeholder-mine-shaft-300 ' variant="unstyled" placeholder="Talent Name" />

        </div>
      {/* {
        searchFields.map((item, index) => <> 
          <div key={index}  className='w-1/5'>
            <MultiInput {...item} />
          </div>
          <Divider mr="xs" size="sm" orientation="vertical" />
        </>
        )
      } */}

        {
        searchFields.map((item, index) => (
          // Use explicit React.Fragment and place the key prop on it
          <React.Fragment key={index}>
            <div className='w-1/5'>
              <MultiInput {...item} />
            </div>
            <Divider mr="xs" size="sm" orientation="vertical" />
          </React.Fragment>
        ))
      }
      <div className='w-1/5 [&_.mantine-Slider-label]:!translate-y-10 '>
      <div className='flex text-sm justify-between '>
        <div>Experience (Years)</div>
        <div>{value[0]}  - {value[1]} </div>
      </div>
          <RangeSlider onChangeEnd={(e) =>handleChange("exp" , e)} color='brightSun.4' min={1} max={50} size="xs" value={value} labelTransitionProps={{
            transition : 'skew-down',
            duration : 150,
            timingFunction : 'linear'
          }}  onChange={setValue} />

      </div>
    </div>
  )
}

export default SearchBar


