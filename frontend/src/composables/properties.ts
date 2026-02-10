import { useModalStore } from "@/stores/modal.ts";
import { markRaw } from "vue";
import EditPropertyComponent from "@/components/modal/EditPropertyComponent.vue";
import type { PropertyData } from "@/types/properties.ts";
import { useRoute } from "vue-router";
import { pageSizes, type PageSizesUnion } from "@/types/table.ts";
import catchAxiosError from "@/helpers/catch-axios-error.ts";

export function getPropertiesQueryParams() {
  const route = useRoute();
  return {
    search: ((): string => {
      const search = route.query.search;
      if (!search || Array.isArray(search)) {
        return "";
      }

      return search;
    })(),
    page: ((): number => {
      const page = route.query.page;
      if (!page || Array.isArray(page)) {
        return 1;
      }
      return parseInt(page) || 1;
    })(),
    per_page: ((): PageSizesUnion => {
      const perPage = route.query.per_page;
      if (!perPage || Array.isArray(perPage)) {
        return pageSizes[0];
      }

      const intPerPage = parseInt(perPage) as PageSizesUnion;
      return pageSizes.includes(intPerPage) ? intPerPage : pageSizes[0];
    })(),
  };
}

export function editPropertyModal(
  propertyData: PropertyData | undefined,
  callbackFn?: () => unknown,
) {
  if (propertyData === undefined) {
    throw new Error("propertyData is undefined");
  }

  const modalStore = useModalStore();

  modalStore.setModal({
    type: "component",
    show: true,
    component: {
      is: markRaw(EditPropertyComponent),
      props: { ...propertyData, callback: callbackFn },
    },
  });
}

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
          console.log(error);
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
