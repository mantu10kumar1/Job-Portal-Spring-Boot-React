import React, { useState } from 'react'
import { MultiInput } from './MultiInput'
import { Button, Collapse, Divider, RangeSlider } from '@mantine/core'
import { dropdownData } from '../../Data/JobsData'
import { useDispatch } from 'react-redux';
import { updateFilter } from '../../Slices/FilterSlice';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

function SearchBar() {
  const matches = useMediaQuery('(max-width: 475px)');
  const [opened, { toggle }] = useDisclosure(false);
  const dispatch = useDispatch();
  const [value, setValue] = useState<[number, number]>([0, 300])

  const handleChange = (event: any) => {
    dispatch(updateFilter({ salary: event }));
  }
  return (
    <div>
      <div className='flex justify-end'>
        {
          matches && <Button onClick={toggle} variant="outline" color='brightSun.4' m="sm" radius="lg" autoContrast >{opened ? "Close" : "Filter"}</Button>
        }
      </div>
      <Collapse in={opened || !matches}>
        <div className='lg-mx:!flex-wrap flex px-5 py-8 !text-mine-shaft-100 items-center  '>
          {

            dropdownData.map((item, index) => {
              return <React.Fragment key={index}>
                <div className="w-1/5 text-yellow-200 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1">
                  <MultiInput {...item} />
                </div>

                <Divider className='sm-mx:hidden ' mr="xs" size="xs" orientation='vertical' />

              </React.Fragment>
            }

            )
          }
          <div className='w-1/5  lg-mx:w-1/4 lg-mx:mt-7 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full text-sm [&_.mantine-Slider-label]:!translate-y-10 '>
            <div className='flex text-sm justify-between '>
              <div>Salary</div>
              <div>&#8377;{value[0]} LPA - &#8377; {value[1]} LPA</div>
            </div>
            <RangeSlider
              value={value}
              onChange={setValue}
              onChangeEnd={handleChange}
              color='brightSun.4' size="xs" labelTransitionProps={{
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