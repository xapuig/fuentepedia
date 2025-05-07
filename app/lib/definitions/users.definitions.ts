export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
};

export type StateUpdateUser = {
  errors?: {
    name?: string[];
    email?: string[];
    currentPassword?: string[];
    newPassword?: string[];
    confirmNewPassword?: string[];
  };
  message?: string | null;
};
