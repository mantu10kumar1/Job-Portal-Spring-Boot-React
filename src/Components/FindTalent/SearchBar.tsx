import React, { useState } from 'react'
import { Button, Collapse, Divider, Input, RangeSlider } from '@mantine/core'
import { MultiInput } from '../FindJobs/MultiInput'
import { IconUserCircle } from '@tabler/icons-react'
import { searchFields } from '../../Data/TalentData'
import { useDispatch } from 'react-redux'
import { updateFilter } from '../../Slices/FilterSlice'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'

function SearchBar() {
  const matches = useMediaQuery('(max-width: 475px)');
  const [opened, { toggle }] = useDisclosure(false);
  const dispatch = useDispatch();
  const [value, setValue] = useState<[number, number]>([0, 50])
  const [name, setName] = useState('');

  const handleChange = (name: any, event: any) => {
    if (name === "exp") dispatch(updateFilter({ exp: event }));
    else {
      setName(event.target.value);
      dispatch(updateFilter({ name: event.target.value }));
    }
  }
  return (
    <div>
      <div className='flex justify-end'>
        {
          matches && <Button onClick={toggle} variant="outline" color='brightSun.4' m="sm" radius="lg" autoContrast >{opened ? "Close" : "Filter"}</Button>
        }
      </div>
      <Collapse in={opened || !matches}>
        <div className='flex lg-mx:!flex-wrap px-5 py-8  '>
          <div className='flex items-center lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full sx-mx:mb-1  '>
            <div className='text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2  '><IconUserCircle size={20} /></div>
            <Input defaultValue={name} onChange={(e) => handleChange('name', e)}
              className='[&_input]:!placeholder-mine-shaft-300 ' variant="unstyled" placeholder="Talent Name" />

          </div>

          <Divider className='sm-mx:hidden ' mr="xs" size="xs" orientation='vertical' />

          {
            searchFields.map((item, index) => (
              <React.Fragment key={index}>
                <div className='w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full sx-mx:mb-1'>
                  <MultiInput {...item} />
                </div>
                <Divider className='sm-mx:hidden ' mr="xs" size="sm" orientation="vertical" />
              </React.Fragment>
            ))
          }
          <div className='w-1/5  lg-mx:w-1/4 lg-mx:mt-7 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full sx-mx:mb-1 [&_.mantine-Slider-label]:!translate-y-10 '>
            <div className='flex text-sm justify-between '>
              <div>Experience (Years)</div>
              <div>{value[0]}  - {value[1]} </div>
            </div>
            <RangeSlider
              value={value}
              onChange={setValue}
              onChangeEnd={(e) => handleChange("exp", e)} minRange={1} color='brightSun.4' min={1} max={50} size="xs"
              labelTransitionProps={{
                transition: 'skew-down',
                duration: 150,
                timingFunction: 'linear'
              }} />

          </div>
        </div>
      </Collapse>
    </div>
  )
}

export default SearchBar


