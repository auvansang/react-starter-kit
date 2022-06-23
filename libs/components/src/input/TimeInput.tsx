import { TimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker';

import TextInput from './TextInput';

type TimeInputProps = Omit<TimePickerProps<unknown, unknown>, 'renderInput' | 'value'> & {
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
          inputRef={inputRef}
          inputProps={inputProps}
          startAdornment={InputProps?.startAdornment}
          endAdornment={InputProps?.endAdornment}
        />
      )}
    />
  );
};

export default TimeInput;
