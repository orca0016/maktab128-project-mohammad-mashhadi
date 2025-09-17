import moment from "moment-jalaali";

export const convertDate = (dateString: string, fullTime = false) => {
  const date = new Date(dateString);

  const format = fullTime ? "jYYYY/jM/jD HH:mm" : "jYYYY/jM/jD";
  const jalaliDate = moment(date).format(format);

  return { jalaliDate };
};
