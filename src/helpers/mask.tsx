import React from 'react';
import MaskedInput from 'react-text-mask';

class MaskHelper {
  public static PhoneTextMask = React.forwardRef((props: any, ref: any): React.ReactElement => {
    const { ...otherProps } = props;

    const phoneMask = [
      '+',
      '7',
      ' ',
      '(',
      /[1-9]/,
      /\d/,
      /\d/,
      ')',
      ' ',
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
    ];

    return (
      <MaskedInput
        {...otherProps}
        mask={phoneMask}
        guide={false}
        placeholder="+"
        ref={() => ref(ref ? ref.inputElement : null)}
      />
    );
  });

  public static BirthdayTextMask = React.forwardRef((props: any, ref: any): React.ReactElement => {
    const { ...otherProps } = props;

    const dateMask = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];

    return (
      <MaskedInput
        {...otherProps}
        mask={dateMask}
        guide={false}
        placeholder="01.01.2000"
        ref={() => ref(ref ? ref.inputElement : null)}
      />
    );
  });
}

export { MaskHelper };
