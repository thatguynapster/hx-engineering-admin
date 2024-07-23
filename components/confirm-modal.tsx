import {
  confirmable,
  ReactConfirmProps,
  createConfirmation,
} from "react-confirm";
import Modal from "./Modal";
import { Button, ButtonProps } from "./button";

export interface ConfirmButtonProps extends ButtonProps {
  value?: string;
}

export interface ConfirmProps extends ReactConfirmProps {
  header?: string;
  buttons?: {
    cancel?: ConfirmButtonProps;
    proceed?: ConfirmButtonProps;
  };
  message: any;
}

const Dialog = ({ show, proceed, message, header, buttons }: ConfirmProps) => {
  return (
    <Modal
      show={show}
      onHide={() => proceed()}
      header={header}
      size="sm"
      index={2}
    >
      <>
        <div className="mb-8">{message}</div>

        <div className="grid grid-cols-2 gap-4 items-center justify-center">
          <Button
            className="btn-outline w-full"
            onClick={() => proceed()}
            {...buttons?.cancel}
          >
            {buttons?.cancel?.value || "No, Close"}
          </Button>
          <Button
            className="btn-primary w-full"
            onClick={() => proceed("true")}
            {...buttons?.proceed}
          >
            {buttons?.proceed?.value || "Proceed"}
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default createConfirmation(confirmable(Dialog));
