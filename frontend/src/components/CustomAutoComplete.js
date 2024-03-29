/* eslint-disable no-shadow */
import CircleIcon from '@mui/icons-material/Circle';
import { Autocomplete, ListItemContent, ListItemDecorator } from '@mui/joy';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import React from 'react';

export default function CustomAutoComplete(props) {
  return (
    <Autocomplete
      {...props}
      slotProps={{
        listbox: {
          disablePortal: true,
        },
      }}
      disablePortal
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <AutocompleteOption {...props}>
          <ListItemDecorator>
            <CircleIcon sx={{ color: option.color }} />
          </ListItemDecorator>
          <ListItemContent>
            {option.name}
          </ListItemContent>
        </AutocompleteOption>
      )}
    />
  );
}
