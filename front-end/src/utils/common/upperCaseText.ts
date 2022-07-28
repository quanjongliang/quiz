import { upperFirst } from 'lodash';

export const upperCaseTextRole = (roleName?: string): string => {
    if (!roleName) return '';
    const roleNames = roleName.split('_');
    return roleNames.map((name) => upperFirst(name)).join(' ');
};

export const upperCaseTextName = (name?: string): string => {
    if (!name) return '';
    const names = name.split(' ');
    return names.map((n) => upperFirst(n)).join(' ');
};
