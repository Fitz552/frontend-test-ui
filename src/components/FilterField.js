import { FormControl, InputLabel, Select, OutlinedInput, MenuItem, Checkbox, ListItemText } from "@mui/material"

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

function FilterField(props) {
    const handleChange = (event) => {
        
          props.setState(
            event.target.value
          );
    }
 

    return(
        <div>
            <FormControl sx={{ m: 1, width: 250 }}>
                <InputLabel id={`filter-${props.property}-label`}>{props.property}</InputLabel>
                <Select
                    labelId={`filter-${props.property}-label`}
                    id={`filter-${props.property}`}
                    multiple
                    value={props.state}
                    onChange={handleChange}
                    input={<OutlinedInput label={props.property} />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {props.options.map((value) => (
                        <MenuItem key={value} value={value}>
                            <Checkbox checked={props.state.includes(value)}/>
                            <ListItemText primary={value} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

export default FilterField