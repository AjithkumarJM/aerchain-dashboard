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

export { formatIndianNumber };
