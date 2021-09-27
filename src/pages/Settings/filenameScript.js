export default `
function main() {
  const fileId = context.getFileId();
  const jobMetadata = context.getJobMetadata();
  const fileExtension = context.getExtension();
  const defaultFilename = [fileId, fileExtension].join('.');

  if (jobMetadata !== null) {
    const filename = jobMetadata.get('filename');
    if (filename !== undefined && filename !== null) return filename;
  }

  return defaultFilename;
}

try {
  main();
} catch (error) {
  logger.log('Error setting filename: ' + error);
}
`;
