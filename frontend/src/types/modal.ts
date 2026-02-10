import { type Component } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";

export type ModalStatus = "success" | "error";
export type ModalCallbackType = "primary" | "ghost" | "danger";

type ModalBase = {
  show: boolean;
  status?: ModalStatus;
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
  callback?: {
    confirm: string;
    variant: Exclude<ModalCallbackType, "ghost">;
    function: () => unknown;
  };
};

type EmptyModal = ModalBase & {
  type: "empty";
};

export type ModalData<C extends Component = Component> =
  | EmptyModal
  | ComponentModal<C>
  | ConfirmModal;
