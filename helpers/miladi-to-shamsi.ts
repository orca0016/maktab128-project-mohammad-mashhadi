import moment from "moment-jalaali";

export const convertDate = (dateString: string) => {
  const date = new Date(dateString);

  const jalaliDate = moment(date).format("jYYYY/jM/jD");

  return { jalaliDate };
};