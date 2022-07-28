import { UserProfile } from 'types/template/user-profile';

export interface ContactStateProps {
    contacts: UserProfile[];
    error: object | string | null;
}
