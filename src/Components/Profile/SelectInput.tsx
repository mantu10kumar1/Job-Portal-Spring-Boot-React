import { useEffect, useState } from 'react';
import { Combobox, InputBase, ScrollArea, useCombobox } from '@mantine/core';

// Removed 'Console' import as it's not needed for browser environments and causes issues.
// import { Console } from 'console';

function SelectInput(props: any) {

    // The useEffect hook now correctly includes 'props.options' and 'props.value'
    // in its dependency array. This ensures that the state variables 'data', 'value',
    // and 'search' are updated whenever these props change.
    useEffect(() => {
        // Ensure props.options is an array before setting data, filtering out any non-string values
        const validOptions = Array.isArray(props.options)
            ? props.options.filter((item: any) => typeof item === 'string')
            : [];
        setData(validOptions);
        // Ensure 'value' can be null, but 'search' is always a string
        setValue(props.form.getInputProps(props.name).value || '');
        setSearch(props.form.getInputProps(props.name).value || ''); // Ensure search is always a string, defaulting to '' if props.value is null/undefined
    }, [props.options, props.value]); // Dependencies added here to resolve the warning

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [data, setData] = useState<string[]>([]);
    const [value, setValue] = useState<string | null>(null);
    const [search, setSearch] = useState('');


    // Determine if there's an exact match for the search term in the data
    // Added a type check for 'item' to prevent 'toLowerCase' on undefined/null
    const exactOptionMatch = data.some((item) => typeof item === 'string' && item === search);

    // Filter options based on the search input. If there's an exact match, show all data.
    // Otherwise, filter by case-insensitive inclusion.
    // Added a type check for 'item' to prevent 'toLowerCase' on undefined/null
    // Also ensured 'search' is treated as a string before calling toLowerCase()
    const filteredOptions = exactOptionMatch
        ? data
        : data.filter((item) => typeof item === 'string' && item.toLowerCase().includes(search?.toLowerCase().trim()));

    // Map the filtered options to Combobox.Option components
    const options = filteredOptions.map((item) => (
        <Combobox.Option value={item} key={item}>
            {item}
        </Combobox.Option>
    ));

    return (
        <Combobox
            store={combobox}
            withinPortal={false}
            // Handler for when an option is submitted (selected or created)
            onOptionSubmit={(val) => {
                if (val === '$create') {
                    // If '$create' is submitted, add the current search term to data
                    setData((current) => [...current, search]);
                    setValue(search); // Set the value to the newly created item
                    props.form.setFieldValue(props.name, search)
                } else {
                    // Otherwise, set the value and search to the selected option
                    setValue(val);
                    setSearch(val);
                    props.form.setFieldValue(props.name, val)
                }
                combobox.closeDropdown(); // Close the dropdown after submission
            }}
        >
            <Combobox.Target>
                <InputBase {...props.form.getInputProps(props.name)}
                 withAsterisk
                    // leftSection={<props.leftSection stroke={1.5}  />} // Uncomment if left section is needed
                    label={props.label}
                    rightSection={<Combobox.Chevron />} // Chevron icon for the dropdown
                    leftSection={<props.leftSection stroke={1.5} />}
                    value={search}
                    // Handle input changes: open dropdown, update selected option index, and update search state
                    onChange={(event) => {
                        combobox.openDropdown();
                        combobox.updateSelectedOptionIndex();
                        setSearch(event.currentTarget.value);
                    }}
                    onClick={() => combobox.openDropdown()} // Open dropdown on click
                    onFocus={() => combobox.openDropdown()} // Open dropdown on focus
                    // Handle blur: close dropdown and reset search to the current value
                    onBlur={() => {
                        combobox.closeDropdown();
                        setSearch(value || ''); // Revert search to the last selected value if any
                    }}
                    placeholder={props.placeholder}
                    rightSectionPointerEvents="none" // Prevent click events on the right section
                />
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>
                    <ScrollArea.Autosize mah={200} type="scroll">
                    {options}
                    {/* Show a "Create" option if there's no exact match and search term is not empty */}
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
