import React, { FC, useContext, useEffect } from 'react';
import { getOptionsSchema } from '../../lib/elements';
import { ClassNames } from '../../types';
import { Checkbox } from '../Elements/Checkbox';
import { DateField } from '../Elements/Date';
import { Email } from '../Elements/Email';
import { Number } from '../Elements/Number';
import { Phone } from '../Elements/Phone';
import { Radio } from '../Elements/Radio';
import { Submit } from '../Elements/Submit';
import { Text } from '../Elements/Text';
import { Textarea } from '../Elements/Textarea';
import { Website } from '../Elements/Website';
import { CurrentPageContext, SchemaContext } from '../SnoopForm/SnoopForm';
import { PageContext } from '../SnoopPage/SnoopPage';

interface Option {
  label: string;
  value: string;
}

export interface SnoopElementProps {
  type: string;
  name: string;
  label?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  classNames?: ClassNames;
  required?: boolean;
  options?: Option[] | string[];
  rows?: number;
  /**
   * Minimum date a User can select from.
   */
  minDate?: Date;
  /**
   * Deafult Date the selected.
   */
  defaultDate?: Date;
  /**
   * Default date based on current time?
   *
   */
  defauleDateNow?: boolean;
}

export const SnoopElement: FC<SnoopElementProps> = ({
  type,
  name,
  label = undefined,
  icon,
  placeholder,
  classNames = {},
  required = false,
  options,
  rows,
  defauleDateNow,
  defaultDate,
}) => {
  const { schema, setSchema } = useContext(SchemaContext);
  const pageName = useContext(PageContext);
  const { currentPageIdx } = useContext(CurrentPageContext);

  useEffect(() => {
    setSchema((schema: any) => {
      if (pageName === '') {
        console.warn(
          `🦝 SnoopForms: An Element must always be a child of a page!`
        );
        return;
      }
      const newSchema = { ...schema };
      let pageIdx = newSchema.pages.findIndex((p: any) => p.name === pageName);
      if (pageIdx === -1) {
        console.warn(`🦝 SnoopForms: Error accessing page`);
        return;
      }
      let elementIdx = newSchema.pages[pageIdx].elements.findIndex(
        (e: any) => e.name === name
      );
      if (elementIdx === -1) {
        newSchema.pages[pageIdx].elements.push({ name });
        elementIdx = newSchema.pages[pageIdx].elements.length - 1;
      }
      newSchema.pages[pageIdx].elements[elementIdx].type = type;
      newSchema.pages[pageIdx].elements[elementIdx].label = label;
      if (['checkbox', 'radio'].includes(type)) {
        newSchema.pages[pageIdx].elements[
          elementIdx
        ].options = getOptionsSchema(options);
      }
      return newSchema;
    });
  }, [name, setSchema, pageName]);

  return (
    <div>
      {currentPageIdx ===
        schema.pages.findIndex((p: any) => p.name === pageName) && (
        <div>
          {type === 'checkbox' ? (
            <Checkbox
              name={name}
              label={label}
              classNames={classNames}
              required={required}
              options={options || []}
            />
          ) : type === 'email' ? (
            <Email
              name={name}
              label={label}
              Icon={icon}
              placeholder={placeholder}
              classNames={classNames}
              required={required}
            />
          ) : type === 'number' ? (
            <Number
              name={name}
              label={label}
              Icon={icon}
              placeholder={placeholder}
              classNames={classNames}
              required={required}
            />
          ) : type === 'phone' ? (
            <Phone
              name={name}
              label={label}
              Icon={icon}
              placeholder={placeholder}
              classNames={classNames}
              required={required}
            />
          ) : type === 'radio' ? (
            <Radio
              name={name}
              label={label}
              classNames={classNames}
              required={required}
              options={options || []}
            />
          ) : type === 'submit' ? (
            <Submit label={label} classNames={classNames} />
          ) : type === 'text' ? (
            <Text
              name={name}
              label={label}
              Icon={icon}
              placeholder={placeholder}
              classNames={classNames}
              required={required}
            />
          ) : type === 'textarea' ? (
            <Textarea
              name={name}
              label={label}
              rows={rows}
              placeholder={placeholder}
              classNames={classNames}
              required={required}
            />
          ) : type === 'website' ? (
            <Website
              name={name}
              label={label}
              Icon={icon}
              placeholder={placeholder}
              classNames={classNames}
              required={required}
            />
          ) : type === 'date' ? (
            <DateField
              name={name}
              label={label}
              Icon={icon}
              placeholder={placeholder}
              classNames={classNames}
              required={required}
              defaultDate={defaultDate}
              defaultDateNow={defauleDateNow}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};
