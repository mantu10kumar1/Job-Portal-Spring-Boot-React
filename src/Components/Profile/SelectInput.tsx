import { useEffect, useState } from 'react';
import { Combobox, InputBase, ScrollArea, useCombobox } from '@mantine/core';

function SelectInput(props: any) {
    useEffect(() => {
        const validOptions = Array.isArray(props.options)
            ? props.options.filter((item: any) => typeof item === 'string')
            : [];
        setData(validOptions);
        // Ensure 'value' can be null, but 'search' is always a string
        setValue(props.form.getInputProps(props.name).value || '');
        setSearch(props.form.getInputProps(props.name).value || '');
    }, [props.options, props.form.getInputProps(props.name).value]); // Updated dependency: use the actual form value

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [data, setData] = useState<string[]>([]);
    const [value, setValue] = useState<string | null>(null);
    const [search, setSearch] = useState('');

    const exactOptionMatch = data.some((item) => typeof item === 'string' && item === search);

    const filteredOptions = exactOptionMatch
        ? data
        : data.filter((item) => typeof item === 'string' && item.toLowerCase().includes(search?.toLowerCase().trim()));

    const options = filteredOptions.map((item) => (
        <Combobox.Option value={item} key={item}>
            {item}
        </Combobox.Option>
    ));

    // Conditionally render leftSection only if props.leftSection is a valid component
    const LeftSectionComponent = props.leftSection; // Assign to a variable for clarity

    return (
        <Combobox
            store={combobox}
            withinPortal={false}
            onOptionSubmit={(val) => {
                if (val === '$create') {
                    setData((current) => [...current, search]);
                    setValue(search);
                    props.form.setFieldValue(props.name, search);
                } else {
                    setValue(val);
                    setSearch(val);
                    props.form.setFieldValue(props.name, val);
                }
                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <InputBase
                    {...props.form.getInputProps(props.name)}
                    withAsterisk
                    label={props.label}
                    rightSection={<Combobox.Chevron />}
                    // Conditionally render the leftSection
                    leftSection={LeftSectionComponent ? <LeftSectionComponent stroke={1.5} /> : null}
                    value={search}
                    onChange={(event) => {
                        combobox.openDropdown();
                        combobox.updateSelectedOptionIndex();
                        setSearch(event.currentTarget.value);
                    }}
                    onClick={() => combobox.openDropdown()}
                    onFocus={() => combobox.openDropdown()}
                    onBlur={() => {
                        combobox.closeDropdown();
                        setSearch(value || '');
                    }}
                    placeholder={props.placeholder}
                    rightSectionPointerEvents="none"
                />
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>
                    <ScrollArea.Autosize mah={200} type="scroll">
                        {options}
                        {!exactOptionMatch && search?.trim()?.length > 0 && (
                            <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
                        )}
                    </ScrollArea.Autosize>
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}

export default SelectInput;
