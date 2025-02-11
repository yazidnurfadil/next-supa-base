import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale("id");
dayjs.extend(relativeTime);

export default dayjs;
