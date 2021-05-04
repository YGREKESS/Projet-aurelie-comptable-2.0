const formatDate = (date) => {
  const dateT = date.split("T")[0];
  const day =
    dateT.split("-")[2] + "/" + dateT.split("-")[1] + "/" + dateT.split("-")[0];
  return day;
};

export { formatDate };
