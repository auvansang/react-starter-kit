import { forwardRef, Ref, useState } from 'react';

import { ButtonBase, Stack } from '@mui/material';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';

import TextInput, { TextInputProps } from './TextInput';

export type NumberInputProps = Omit<TextInputProps, 'type'> & {
  step?: number;
  min?: number;
  max?: number;
};

const NumberInput = forwardRef((props: NumberInputProps, ref?: Ref<HTMLDivElement>) => {
  const { step = 1, ...restProps } = props;
  const [value, setValue] = useState(Number(props.value ?? props.defaultValue ?? 0));

  const increment = () => {
    let newValue = value + step;

    if (props.max && value + step > props.max) {
      newValue = props.max;
    }

    setValue(newValue);
    props.onChange?.({
      target: {
        value: String(newValue),
      },
    } as any);
  };

  const decrement = () => {
    let newValue = value - step;

    if (props.min && value - step < props.min) {
      newValue = props.min;
    }

    setValue(newValue);
    props.onChange?.({
      target: {
        value: String(newValue),
      },
    } as any);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = Number(event.target.value);

    if (props.min && newValue < props.min) {
      newValue = props.min;
    } else if (props.max && newValue > props.max) {
      newValue = props.max;
    }

    const eventClone = { ...event };
    eventClone.target.value = String(newValue);

    setValue(newValue);

    props.onChange?.(eventClone);
  };

  return (
    <TextInput
      ref={ref}
      {...restProps}
      type="number"
      value={value}
      onChange={onChange}
      sx={{
        '& .MuiInputBase-adornedEnd': {
          paddingRight: 0,
        },

        '& input': {
          appearance: 'textfield',
        },
      }}
      endAdornment={
        <Stack
          direction="column"
          sx={{
            position: 'relative',

            '&:before': {
              position: 'absolute',
              content: '""',
              left: 0,
              bottom: 0,
              right: 0,
              pointerEvents: 'none',
              height: '100%',
              borderLeft: (theme) => `1px solid ${theme.palette.grey[400]}`,
            },

            '& .MuiButtonBase-root': {
              height: '1.25rem',
              width: (theme) => theme.spacing(5),

              '&:hover': {
                color: (theme) => theme.palette.grey[700],
              },
            },
          }}
        >
          <ButtonBase
            onClick={increment}
            sx={{
              position: 'relative',

              '&:before': {
                position: 'absolute',
                content: '""',
                left: 0,
                bottom: 0,
                right: 0,
                pointerEvents: 'none',
                borderBottom: (theme) => `1px solid ${theme.palette.grey[400]}`,
              },
            }}
          >
            <ArrowDropUp fontSize="small" />
          </ButtonBase>
          <ButtonBase onClick={decrement}>
            <ArrowDropDown fontSize="small" />
          </ButtonBase>
        </Stack>
      }
    />
  );
});

NumberInput.displayName = 'NumberInput';

export default NumberInput;
