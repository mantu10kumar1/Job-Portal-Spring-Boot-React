import { useState } from 'react';
import { ActionIcon, Combobox, useCombobox } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';

const opt = ['Relevance', 'Most Recent', 'Salary (Lowt to High)', 'Salary (Hight to Low) '];

const Sort = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>('Relevance');
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = opt.map((item) => (
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