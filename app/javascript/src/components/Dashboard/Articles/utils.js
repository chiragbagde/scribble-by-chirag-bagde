import dayjs from "dayjs";

export const formatDateAndTime = date => dayjs(date).format("MMMM D, YYYY");
