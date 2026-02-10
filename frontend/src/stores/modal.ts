import { defineStore } from "pinia";
import { ref } from "vue";
import type { ModalData } from "@/types/modal.ts";

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
