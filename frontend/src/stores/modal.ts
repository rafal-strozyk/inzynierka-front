import { defineStore } from "pinia";
import { type Component, ref } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";

type ModalData<C extends Component = Component> = {
  show: boolean;
  status?: "success" | "error";
  component?: {
    is: C;
    props: ComponentProps<C>;
  };
};

export const useModalStore = defineStore("modal", () => {
  const dataTemplate = {
    show: false,
  } satisfies ModalData;

  const data = ref<ModalData>({ ...dataTemplate });

  function getModal() {
    return data;
  }
  function setModal(payload: ModalData) {
    data.value = { ...payload };
  }

  function resetModal() {
    data.value = {
      ...dataTemplate,
    };
  }

  return { setModal, resetModal, getModal };
});
