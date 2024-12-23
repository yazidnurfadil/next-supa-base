import {
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";

import { FormikConfig, FormikHelpers } from "formik";

import {
  FormBusiness,
  FormBusinessValues,
} from "@/components/organisms/FormBusiness";

type AddBusinessButtonProps = {
  onOpen?: () => void;
  isLoading?: boolean;
  onClose?: () => void;
  onSubmit?: FormikConfig<FormBusinessValues>["onSubmit"];
};

export const AddBusinessButton: React.FC<AddBusinessButtonProps> = ({
  isLoading,
  onOpen = () => {},
  onClose = () => {},
  onSubmit = async () => {},
}) => {
  const {
    isOpen,
    onOpen: triggerOpen,
    onClose: triggerClose,
  } = useDisclosure();
  const onOpenChange = (open: boolean) => {
    if (open) {
      onOpen();
    } else {
      triggerClose();
      onClose();
    }
  };

  const submitHandler = async (
    values: FormBusinessValues,
    formikHelpers: FormikHelpers<FormBusinessValues>
  ) => {
    await onSubmit?.(values, formikHelpers);
    triggerClose();
  };

  return (
    <div>
      <>
        <Button color="primary" onPress={triggerOpen}>
          Add
        </Button>
        <Modal
          isOpen={isOpen}
          placement="top-center"
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Business
              </ModalHeader>
              <ModalBody className="py-0">
                <FormBusiness
                  isLoading={isLoading}
                  submitHandler={submitHandler}
                >
                  {({ triggerSubmit }) => {
                    return (
                      <footer className="flex flex-row justify-end gap-2 pb-4 pt-1">
                        <Button
                          color="danger"
                          variant="flat"
                          onPress={triggerClose}
                        >
                          Close
                        </Button>
                        <Button color="primary" onPress={triggerSubmit}>
                          Add
                        </Button>
                      </footer>
                    );
                  }}
                </FormBusiness>
              </ModalBody>
            </>
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
