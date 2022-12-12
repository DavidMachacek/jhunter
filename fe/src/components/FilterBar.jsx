import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import {useDispatch} from "react-redux";
import {saveRole} from '../slices/roleFilter.js';
import roles from '../consts/roles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(role, roleName, theme) {
    return {
        fontWeight: theme.typography.fontWeightRegular
            /*roleName.indexOf(role.key) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,*/
    };
}

function FilterBar() {


    const theme = useTheme();
    const [roleName, setRoleName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setRoleName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        dispatch(saveRole(value))
    };
    const dispatch = useDispatch();

    return (
        <div>
            <FormControl sx={{m: 1, width: 300}}>
                <InputLabel id="demo-multiple-chip-label">Roles</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={roleName}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
                    renderValue={(selected) => (
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                            {selected.map((value) => (
                                <Chip label={value.label}/>
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {roles.map((role) => (
                        <MenuItem
                            key={role.key}
                            value={role}
                            style={getStyles(role, roleName.label, theme)}
                        >
                            {role.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

export default FilterBar;