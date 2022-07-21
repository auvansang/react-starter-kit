import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteRenderOptionState,
  Box,
  Checkbox,
  FormControlLabel,
  ListItemText,
  MenuItem,
} from '@mui/material';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import { type Option } from './types';

import TextInput, { TextInputProps } from './TextInput';

interface AutocompleteInputOption extends Option {}

export type AutocompleteInputProps<
  T extends AutocompleteInputOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> = Omit<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'> &
  Pick<TextInputProps, 'label' | 'error' | 'helperText'> & {
    selection?: boolean;
  };

const renderOption = (
  props: React.HTMLAttributes<HTMLLIElement>,
  option: AutocompleteInputOption,
  state: AutocompleteRenderOptionState,
  selection?: boolean
) => {
  const matches = match(option.label, state.inputValue);
  const parts = parse(option.label, matches);

  const PartElements = parts.map((part, index) => (
    <Box
      key={index}
      component="span"
      sx={{
        fontWeight: (theme) =>
          part.highlight ? theme.typography.fontWeightBold : theme.typography.fontWeightRegular,
      }}
    >
      {part.text}
    </Box>
  ));

  return (
    <MenuItem {...props}>
      {selection ? (
        <FormControlLabel
          control={<Checkbox icon={option.icon} checked={state.selected} />}
          label={PartElements}
        />
      ) : (
        <ListItemText>{PartElements}</ListItemText>
      )}
    </MenuItem>
  );
};

const AutocompleteInput = <
  T extends AutocompleteInputOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>(
  props: AutocompleteInputProps<T, Multiple, DisableClearable, FreeSolo>
) => {
  const { label, helperText, error, ...restProps } = props;

  return (
    <Autocomplete
      {...restProps}
      renderOption={(renderOptionProps, option, state) =>
        renderOption(renderOptionProps, option, state, props.selection && props.multiple)
      }
      renderInput={({ InputProps, id, inputProps, disabled }) => (
        <TextInput
          id={id}
          inputProps={inputProps}
          disabled={disabled}
          ref={InputProps.ref}
          startAdornment={InputProps.startAdornment}
          endAdornment={InputProps.endAdornment}
          label={label}
          helperText={helperText}
          error={error}
          placeholder={restProps.placeholder}
        />
      )}
    />
  );
};

export default AutocompleteInput;
