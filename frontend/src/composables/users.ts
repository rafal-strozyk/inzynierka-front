import { useModalStore } from "@/stores/modal.ts";
import catchAxiosError from "@/helpers/catch-axios-error.ts";
import type { UserData } from "@/types/user.ts";
import isMyRole from "@/helpers/is-my-role.ts";

export function deleteUserModal(
  propertyData: Pick<UserData, "id" | "name">,
  callbackFn: () => unknown,
) {
  const modalStore = useModalStore();

  modalStore.setModal({
    type: "confirm",
    show: true,
    title: `Usuwanie ${isMyRole(["admin"]) ? "użytkownika" : "najemcy"}`,
    body: `Czy na pewno chcesz usunąć ${isMyRole(["admin"]) ? "użytkownika" : "najemcę"}: ${propertyData.name}?`,
    callback: {
      variant: "danger",
      confirm: "Potwierdź",
      function: async () => {
        const [, error] = await catchAxiosError(
          window.API.delete(`/properties/${propertyData.id}`),
        );

        if (error) {
          modalStore.setModal({
            show: true,
            type: "confirm",
            status: "error",
            title: "Wystąpił błąd",
            body: `Nie udało się usunąć ${isMyRole(["admin"]) ? "użytkownika" : "najemcy"}: ${propertyData.name}.`,
          });
          return;
        }

        modalStore.setModal({
          show: true,
          type: "confirm",
          status: "success",
          title: "Sukces",
          body: `${isMyRole(["admin"]) ? "Użytkownik" : "Najemca"} ${propertyData.name} została usunięta poprawnie.`,
        });

        callbackFn();
      },
    },
  });
}
