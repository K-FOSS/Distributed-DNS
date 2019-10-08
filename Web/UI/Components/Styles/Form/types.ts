import { ElementLike } from 'react-hook-form/dist/types';

// Web/UI/Components/Styles/Form/types.ts
export enum HTMLInputTypesENUM {
  'color' = 'color',
  'date' = 'date',
  'datetime-local' = 'datetime-local',
  'email' = 'email',
  'file' = 'file',
  'hidden' = 'hidden',
  'image' = 'image',
  'month' = 'month',
  'number' = 'number',
  'password' = 'password',
  'search' = 'search',
  'tel' = 'tel',
  'text' = 'text',
  'time' = 'time',
  'url' = 'url',
  'week' = 'week',
}

/**
 * Taken from https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types
 */
export type HTMLInputTypes =
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'
  | HTMLInputTypesENUM;

// type HTMLInputTypes = 'email' | 'username' | 'password' | 'date' | 'text';

/**
 * Taken from https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#Values
 */
export type HTMLAUTOCOMPLETETYPES =
  | 'off'
  | 'on'
  | 'name'
  | 'email'
  | 'username'
  | 'new-password'
  | 'current-password'
  | 'one-time-code'
  | 'organization-title'
  | 'organization'
  | 'street-address'
  | 'address-line1'
  | 'address-line2'
  | 'address-line3'
  | 'address-level4'
  | 'address-level3'
  | 'address-level2'
  | 'address-level1'
  | 'country'
  | 'country-name'
  | 'postal-code'
  | 'cc-name'
  | 'cc-given-name'
  | 'cc-additional-name'
  | 'cc-family-name'
  | 'cc-number'
  | 'cc-exp'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-csc'
  | 'cc-type'
  | 'transaction-currency'
  | 'transaction-amount'
  | 'language'
  | 'bday'
  | 'bday-day'
  | 'bday-month'
  | 'bday-year'
  | 'sex'
  | 'tel'
  | 'tel-country-code'
  | 'tel-national'
  | 'tel-area-code'
  | 'tel-local'
  | 'tel-extension'
  | 'impp'
  | 'url'
  | 'photo';

/* eslint-disable */
export type Register = {
  <Element_1 extends ElementLike = ElementLike>(
    validateRule: Partial<{
      required: string | boolean;
      min:
        | string
        | number
        | {
            value: string | number;
            message: string;
          };
      max:
        | string
        | number
        | {
            value: string | number;
            message: string;
          };
      maxLength:
        | string
        | number
        | {
            value: string | number;
            message: string;
          };
      minLength:
        | string
        | number
        | {
            value: string | number;
            message: string;
          };
      pattern:
        | RegExp
        | {
            value: RegExp;
            message: string;
          };
      validate:
        | import('react-hook-form/dist/types').Validate
        | Record<string, import('react-hook-form/dist/types').Validate>
        | {
            value:
              | import('react-hook-form/dist/types').Validate
              | Record<string, import('react-hook-form/dist/types').Validate>;
            message: string;
          };
    }>,
  ): (ref: Element_1 | null) => void;
  <Element_2 extends ElementLike = ElementLike>(
    ref: Element_2 | null,
    validationOptions?:
      | Partial<{
          required: string | boolean;
          min:
            | string
            | number
            | {
                value: string | number;
                message: string;
              };
          max:
            | string
            | number
            | {
                value: string | number;
                message: string;
              };
          maxLength:
            | string
            | number
            | {
                value: string | number;
                message: string;
              };
          minLength:
            | string
            | number
            | {
                value: string | number;
                message: string;
              };
          pattern:
            | RegExp
            | {
                value: RegExp;
                message: string;
              };
          validate:
            | import('react-hook-form/dist/types').Validate
            | Record<string, import('react-hook-form/dist/types').Validate>
            | {
                value:
                  | import('react-hook-form/dist/types').Validate
                  | Record<
                      string,
                      import('react-hook-form/dist/types').Validate
                    >;
                message: string;
              };
        }>
      | undefined,
  ): void;
};
/* eslint-enable */
