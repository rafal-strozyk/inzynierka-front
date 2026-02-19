import type { UserRoles } from "@/types/user.ts";
import { useUserStore } from "@/stores/user.ts";

export default (roles: Array<UserRoles>): boolean => {
  const userStore = useUserStore();
  const userRole = userStore.getUser().value?.role;
  return userRole ? roles.includes(userRole) : false;
};
