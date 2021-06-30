/* eslint-disable import/prefer-default-export */
export const getMetadataFieldValue = (metadata, fieldName) => {
  if (!metadata.timespan) {
    return null;
  }
  let result = null;
  metadata.timespan.forEach((timespan) => {
    if (!timespan.field) {
      return;
    }
    timespan.field.forEach((field) => {
      if (field.name === fieldName) {
        result = field.value[0].value;
      }
    });
  });
  return result;
};
