export type StateUpdateUser = {
  errors?: {
    name?: string[];
    email?: string[];
    newPassword?: string[];
    confirmNewPassword?: string[];
    role?: string[];
  };
  message?: string | null;
};
