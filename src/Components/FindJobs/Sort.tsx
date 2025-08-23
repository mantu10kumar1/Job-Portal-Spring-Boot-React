import { useState } from 'react';
import { ActionIcon, Combobox, useCombobox } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { updateSort } from '../../Slices/SortSlice';

const opt = ['Relevance', 'Most Recent', 'Salary: Low to High', 'Salary: High to Low'];
const talentSort = ['Relevance',  'Experience: Low to High', 'Experience: High to Low'];
const Sort = (props:any) => {
  const dispatch = useDispatch();

  const [selectedItem, setSelectedItem] = useState<string | null>('Relevance');
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = props.sort == "job" ? opt.map((item) => (
    <Combobox.Option className='!text-xs' value={item} key={item}>
      {item}
    </Combobox.Option>
  )): talentSort.map((item) => (
    <Combobox.Option className='!text-xs' value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <>
      <Combobox
        store={combobox}
        width={150}
        position="bottom-start"
        withArrow
        onOptionSubmit={(val) => {
          setSelectedItem(val);
          dispatch(updateSort(val));
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <div onClick={() =>combobox.toggleDropdown()} className='cursor-pointer border border-bright-sun-400 flex
           px-2 py-1 gap-2 rounded-xl items-center text-md '>
             {selectedItem} <ActionIcon color='brightSun.4' variant='transparent' aria-label='Settings' >
              <IconAdjustments className=' h-5 w-5 text-bright-sun-400 ' style={{width:'70%' , height:'70%'}} stroke={1.5} />
             </ActionIcon>
              </div>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
}

export default Sort;