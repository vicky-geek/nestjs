import { SetMetadata } from '@nestjs/common';
export const ROLES_KEY = 'roles';

export const Roles = (...args: string[]) =>  { 
    console.log("args=>", args);
    return SetMetadata( ROLES_KEY, args)
};

