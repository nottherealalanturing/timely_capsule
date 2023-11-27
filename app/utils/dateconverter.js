function firebaseDateToJSDate(firebaseDate) {
  const timestamp = firebaseDate.seconds;
  const milliseconds = timestamp * 1000 + firebaseDate.nanoseconds / 1e6;
  return new Date(milliseconds);
}

export default firebaseDateToJSDate;
