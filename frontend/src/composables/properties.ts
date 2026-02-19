import { useModalStore } from "@/stores/modal.ts";
import type { PropertyData } from "@/types/properties.ts";
import catchAxiosError from "@/helpers/catch-axios-error.ts";

export function deletePropertyModal(
  propertyData: Pick<PropertyData, "id" | "name">,
  callbackFn: () => unknown,
) {
  const modalStore = useModalStore();

  modalStore.setModal({
    type: "confirm",
    show: true,
    title: "Usuwanie nieruchomości",
    body: `Czy na pewno chcesz usunąć nieruchomość: ${propertyData.name}`,
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
            body: `Nie udało się usunąć nieruchomości: ${propertyData.name}`,
          });
          return;
        }

        modalStore.setModal({
          show: true,
          type: "confirm",
          status: "success",
          title: "Sukces",
          body: `Nieruchgomość ${propertyData.name} została usunięta poprawnie`,
        });

        callbackFn();
      },
    },
  });
}
