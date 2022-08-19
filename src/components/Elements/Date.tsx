import React, { FC, useContext, useState } from 'react';
import DatePicker from 'react-date-picker';
import { setSubmissionValue } from '../../lib/elements';
import { ClassNames } from '../../types';
import { SubmissionContext } from '../SnoopForm/SnoopForm';
import { PageContext } from '../SnoopPage/SnoopPage';

interface Props {
  name: string;
  label?: string;
  Icon?: React.ReactNode;
  placeholder?: string;
  classNames: ClassNames;
  required: boolean;
  minDate?: Date;
  defaultDateNow?: boolean;
  defaultDate?: Date;
}

export const DateField: FC<Props> = ({
  name,
  label,
  Icon,
  classNames,
  placeholder,
  required,
  minDate,
  defaultDate,
  defaultDateNow,
}) => {
  const [date, setDate] = useState<Date | undefined | null>(() => {
    if (defaultDateNow) return new Date();
    if (defaultDate) return defaultDate;
    return null;
  });
  const [calendarOpen, setCalendarOpen] = useState(false);
  const { setSubmission } = useContext(SubmissionContext);
  const pageName = useContext(PageContext);
  return (
    <div>
      {label && (
        <label
          className={
            classNames.label || 'block text-sm font-medium text-gray-700'
          }
        >
          {label}
        </label>
      )}
      <div className="mt-1">
        <DatePicker
          name={name}
          required={required}
          onChange={(selectedDate: Date) => {
            if (selectedDate instanceof Date) {
              const value = selectedDate.toISOString().split('T')[0];
              setDate(selectedDate);
              setSubmissionValue(value, pageName, name, setSubmission);
            }
          }}
          calendarIconPosition={'left'}
          calendarIcon={!Icon ? null : undefined}
          minDate={minDate}
          dayPlaceholder={placeholder}
          clearIcon={null}
          onCalendarOpen={() => setCalendarOpen(true)}
          onCalendarClose={() => setCalendarOpen(false)}
          className={`w-full ${calendarOpen ? 'date-open' : 'date-close'}`}
          value={date}
        />
      </div>
    </div>
  );
};
