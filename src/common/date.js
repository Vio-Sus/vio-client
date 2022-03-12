export function dateToYMD(date) {
  let yyyy = date.getFullYear();
  let mm = (date.getMonth() + 1).toString().padStart(2, '0');
  let dd = date.getDate().toString().padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function makeToday() {
  const todayObj = new Date(new Date().toString());
  const todayDate = dateToYMD(todayObj);
  return todayDate;
}

export function makeDefaultStartDate(daysPassed) {
  const todayObj = new Date(new Date().toString());
  const todayMinus100 = new Date(
    new Date().setDate(todayObj.getDate() - daysPassed)
  );
  const defaultStartDate = dateToYMD(todayMinus100);
  return defaultStartDate;
}
