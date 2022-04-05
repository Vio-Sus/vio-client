import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      minWidth: 100,
      //if needed
    },
  },
};

const materials = [

    'metal',
    'compost',
    'battery',
    'cat hair',
    'human hair',
];

export default function MultipleSelectCheckmarks() {
  const [materialName, setMaterialName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setMaterialName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl 
      sx={{
         m: 1, 
         width: 120, 
        //  height: 10, 
         }}>
        <InputLabel id="materials-checkbox-label"
        sx={{
          fontSize:8,
        }}
        >Materials</InputLabel>
        <Select
          labelId="materials-checkbox-label"
          id="multiple-checkbox"
          multiple
          value={materialName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {materials.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={materialName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}