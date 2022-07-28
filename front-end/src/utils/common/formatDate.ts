import { format } from 'date-fns';

const formatDate = (date?: Date | string) => {
    return date ? format(new Date(date), 'd MMM yyyy HH:mm') : format(new Date(), 'd MMM yyyy HH:mm');
};
export default formatDate;
