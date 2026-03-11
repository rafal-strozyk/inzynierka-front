import { USER_ROLES } from "@/types/user.ts";
import { useUserStore } from "@/stores/user.ts";

export default (roles: Array<(typeof USER_ROLES)[number]>): boolean => {
  const userStore = useUserStore();
  const userRole = userStore.getUser().value?.role;
  return userRole ? roles.includes(userRole) : false;
};
