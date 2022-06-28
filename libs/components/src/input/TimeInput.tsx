import { TimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker';

import TextInput, { type TextInputProps } from './TextInput';

export type TimeInputProps = Omit<TimePickerProps<unknown, unknown>, 'renderInput' | 'value'> &
  Omit<TextInputProps, 'value'> & {
    value?: unknown;
  };

const TimeInput = (props: TimeInputProps) => {
  const { value = null, ...restProps } = props;

  return (
    <TimePicker
      value={value}
      {...restProps}
      renderInput={({ InputProps, inputRef, inputProps }) => (
        <TextInput
          {...restProps}
          inputRef={inputRef}
          inputProps={{
            ...inputProps,
            placeholder: restProps?.placeholder || inputProps?.placeholder,
          }}
          startAdornment={InputProps?.startAdornment}
          endAdornment={InputProps?.endAdornment}
        />
      )}
    />
  );
};

export default TimeInput;
