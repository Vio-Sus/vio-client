import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import styled from "styled-components";

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 50;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      // border: "1px solid black",
      // borderRadius: "5%",
      // backgroundColor: '#fff',
    },
  },
};




/* data */
const materials = [

    'metal',
    'compost',
    'battery',
    'cat hair',
    'plastic',
    'cables',

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
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel sx={{width: 150 }} id="materials-checkbox-label"
        >Materials
        </InputLabel>
            <Select
              labelId="materials-checkbox-label"
              id="multiple-checkbox"
              // width="auto"
              multiple
              value={materialName}
              onChange={handleChange}
              input={<OutlinedInput label="Materials" />}
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