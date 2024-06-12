function formatIndianNumber(number) {
  const str = number.toString();
  const lastThreeDigits = str.slice(-3);
  const otherDigits = str.slice(0, -3);

  if (otherDigits !== "") {
    return (
      otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThreeDigits
    );
  } else {
    return lastThreeDigits;
  }
}

function daysFromNow(days) {
  const now = new Date();

  now.setDate(now.getDate() + days);

  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const year = String(now.getFullYear()).slice(-2);

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";

  hours = hours % 12;
  hours = hours ? hours : 12;

  const formattedDate = `${month}/${day}/${year}`;
  const formattedTime = `${hours}:${minutes}${ampm}`;

  return `${formattedDate}, ${formattedTime}`;
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function generateId() {
  return "xxxxxxxxxxxxxxxxxxxxxxxx".replace(/x/g, () =>
    Math.floor(Math.random() * 16).toString(16)
  );
}

export { formatIndianNumber, daysFromNow, getComparator, generateId };
