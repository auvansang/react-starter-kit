import { types } from 'mobx-state-tree';

const parseDateTime = (dateTimeStr: string) => {
  const dateTime = Date.parse(dateTimeStr);

  if (isNaN(dateTime)) {
    return null;
  }

  return new Date(dateTime);
};

const DateTime = types.custom<string, Date | null>({
  name: 'DateTime',
  fromSnapshot(snapshot) {
    return parseDateTime(snapshot);
  },
  toSnapshot(value) {
    if (value instanceof Date) return value.toISOString();

    return '';
  },
  isTargetType(value) {
    return value instanceof Date;
  },
  getValidationMessage(snapshot) {
    try {
      parseDateTime(snapshot);

      return '';
    } catch {
      return `"${snapshot}" is not a valid date time`;
    }
  },
});

export default DateTime;
