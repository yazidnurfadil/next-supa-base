import { memo } from "react";
import React, { ReactElement } from "react";

import { Input, InputProps } from "@nextui-org/react";

import { Formik, type FormikConfig } from "formik";

import { BusinessSchema } from "@/lib/validations";
import { ImageUploader } from "@/components/molecules/ImageUploader";

export type FormBusinessValues = {
  ownerName?: string;
  ownerEmail?: string;
  ownerPhone?: string;
  businessName?: string;
  businessSlug?: string;
  businessLogo?: string;
  businessPhone?: string;
  profilePicture?: string;
};

type ChildProps = {
  triggerSubmit: () => void;
  values: FormBusinessValues;
};

type FormBusinessProps = {
  isLoading?: boolean;
  initialValues?: FormBusinessValues;
  submitHandler?: FormikConfig<FormBusinessValues>["onSubmit"];
  children?:
    | ((props: ChildProps) => ReactElement<ChildProps>)
    | React.ReactNode;
};

const defaultValues: FormBusinessValues = {
  ownerName: undefined,
  ownerEmail: undefined,
  ownerPhone: undefined,
  businessName: undefined,
  businessSlug: undefined,
  businessLogo: undefined,
  businessPhone: undefined,
  profilePicture: undefined,
};

const PhonePrepend = memo((props: InputProps) => (
  <span className="text-sm text-inherit">+62</span>
));

export const FormBusiness: React.FC<FormBusinessProps> = ({
  children,
  isLoading,
  initialValues = defaultValues,
  submitHandler = async () => {},
}) => {
  return (
    <Formik
      onSubmit={submitHandler}
      initialValues={initialValues}
      validationSchema={BusinessSchema}
    >
      {({ values, errors, touched, handleBlur, submitForm, handleChange }) => {
        const childArgs = {
          values,
          triggerSubmit: submitForm,
        };
        const validChildren =
          typeof children === "function" &&
          React.isValidElement<ChildProps>(children(childArgs));
        return (
          <>
            <div className="flex flex-wrap rounded-xl border-2 border-default-200 px-4 pt-6">
              <div className="flex w-full gap-4">
                <div className="flex flex-1 flex-col">
                  <Input
                    isRequired
                    color="secondary"
                    variant="bordered"
                    name="businessName"
                    onBlur={handleBlur}
                    description="&nbsp;"
                    label="Business Name"
                    isDisabled={isLoading}
                    onChange={handleChange}
                    value={values.businessName}
                    errorMessage={errors.businessName}
                    isInvalid={!!errors.businessName && !!touched.businessName}
                  />
                  <Input
                    isRequired
                    color="secondary"
                    variant="bordered"
                    name="businessSlug"
                    onBlur={handleBlur}
                    description="&nbsp;"
                    label="Business Slug"
                    isDisabled={isLoading}
                    onChange={handleChange}
                    value={values.businessSlug}
                    errorMessage={errors.businessSlug}
                    isInvalid={!!errors.businessSlug && !!touched.businessSlug}
                  />
                </div>
                <div className="max-h-[136px] w-[128px]">
                  <ImageUploader
                    label="Logo"
                    color="secondary"
                    className="h-full"
                    name="businessLogo"
                  />
                </div>
              </div>
              <Input
                type="tel"
                color="secondary"
                variant="bordered"
                onBlur={handleBlur}
                name="businessPhone"
                description="&nbsp;"
                isDisabled={isLoading}
                label="Business Phone"
                onChange={handleChange}
                value={values.businessPhone}
                startContent={<PhonePrepend />}
                errorMessage={errors.businessPhone}
                isInvalid={!!errors.businessPhone && !!touched.businessPhone}
              />
            </div>
            <div className="flex flex-wrap rounded-xl border-2 border-default-200 px-4 pt-6">
              <div className="flex w-full gap-4">
                <div className="max-h-[136px] w-[128px]">
                  <ImageUploader
                    className="h-full"
                    name="profilePicture"
                    label="Profile Picture"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <Input
                    isRequired
                    name="ownerName"
                    variant="bordered"
                    onBlur={handleBlur}
                    label="Owner's Name"
                    description="&nbsp;"
                    isDisabled={isLoading}
                    onChange={handleChange}
                    value={values.ownerName}
                    errorMessage={errors.ownerName}
                    isInvalid={!!errors.ownerName && !!touched.ownerName}
                  />
                  <Input
                    isRequired
                    name="ownerEmail"
                    variant="bordered"
                    onBlur={handleBlur}
                    description="&nbsp;"
                    label="Owner's Email"
                    isDisabled={isLoading}
                    onChange={handleChange}
                    value={values.ownerEmail}
                    errorMessage={errors.ownerEmail}
                    isInvalid={!!errors.ownerEmail && !!touched.ownerEmail}
                  />
                </div>
              </div>
              <Input
                type="tel"
                name="ownerPhone"
                variant="bordered"
                onBlur={handleBlur}
                description="&nbsp;"
                label="Owner's Phone"
                isDisabled={isLoading}
                onChange={handleChange}
                value={values.ownerPhone}
                startContent={<PhonePrepend />}
                errorMessage={errors.ownerPhone}
                isInvalid={!!errors.ownerPhone && !!touched.ownerPhone}
              />
            </div>
            {validChildren && children(childArgs)}
          </>
        );
      }}
    </Formik>
  );
};
