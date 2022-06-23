import { types } from '@sa/store';

export const AuthUserModel = types
  .model('Auth User', {
    id: types.identifier,
    userName: types.string,
    firstName: types.string,
    lastName: types.string,
    fullName: types.string,
    displayName: types.optional(types.string, ''),
    birthDate: types.maybeNull(types.Date),
    email: types.string,
    emailConfirmed: types.boolean,
    phoneNumber: types.optional(types.string, ''),
    phoneNumberConfirmed: types.boolean,
    avatar: types.optional(types.string, ''),
    roles: types.optional(types.array(types.string), []),
    permissions: types.optional(types.array(types.string), []),
  })
  .views((self) => ({
    isInRole(role: string) {
      return self.roles.includes(role);
    },
    hasPermission(permission: string) {
      return self.permissions.includes(permission);
    },
    hasAnyPermissions(permissions: Array<string>) {
      return self.permissions.some((permission) => permissions.includes(permission));
    },
    hasAllPermissions(permissions: Array<string>) {
      return self.permissions.every((permission) => permissions.includes(permission));
    },
    get profile() {
      return {
        id: self.id,
        userName: self.userName,
        firstName: self.firstName,
        lastName: self.lastName,
        fullName: self.fullName,
        displayName: self.displayName ?? self.fullName,
        birthDate: self.birthDate,
        email: self.email,
        emailConfirmed: self.emailConfirmed,
        phoneNumber: self.phoneNumber,
        phoneNumberConfirmed: self.phoneNumberConfirmed,
        avatar: self.avatar,
      };
    },
  }));
