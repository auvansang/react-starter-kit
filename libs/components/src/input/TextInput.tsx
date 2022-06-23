import { forwardRef, Ref } from 'react';
import HorizontalInput, { HorizontalInputProps } from './HorizontalInput';
import InlineInput, { type InlineInputProps } from './InlineInput';
import VerticalInput, { VerticalInputProps } from './VerticalInput';

export type TextInputProps = Omit<
  VerticalInputProps | InlineInputProps | HorizontalInputProps,
  'ref'
> & {
  layout?: 'inline' | 'vertical' | 'horizontal';
};

const TextInput = forwardRef((props: TextInputProps, ref?: Ref<HTMLDivElement>) => {
  const { layout = 'vertical', ...restInputProps } = props;

  let InputComponent = VerticalInput;

  if (layout === 'inline') {
    InputComponent = InlineInput;
  } else if (layout === 'horizontal') {
    InputComponent = HorizontalInput;
  }

  return <InputComponent ref={ref} {...restInputProps} />;
});

TextInput.displayName = 'TextInput';

export default TextInput;
