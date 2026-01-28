import { defineStore } from "pinia";
import { type Component, ref } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";

type ModalBase = {
  show: boolean;
  status?: "success" | "error";
};

type ComponentModal<C extends Component = Component> = ModalBase & {
  type: "component";
  component: {
    is: C;
    props: ComponentProps<C>;
  };
};

type ConfirmModal = ModalBase & {
  type: "confirm";
  body: string;
  title: string;
  callback: {
    confirm: string;
    type: "green" | "red";
    function?: () => unknown;
  };
};

type EmptyModal = ModalBase & {
  type: "empty";
};

type ModalData<C extends Component = Component> = EmptyModal | ComponentModal<C> | ConfirmModal;

export const useModalStore = defineStore("modal", () => {
  const dataTemplate = {
    show: false,
    type: "empty",
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
