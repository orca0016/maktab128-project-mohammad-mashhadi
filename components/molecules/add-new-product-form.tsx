import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@heroui/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import DropzoneInput from "../atoms/dropzone-input";

interface IFormInput {
  images: File[];
}

const AddNewProductForm = () => {
  const { control, handleSubmit, setValue } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="text-title-text-light dark:bg-[#1C252E] dark:text-white">
        <CardHeader className="flex gap-3">
          <h1 className="text-xl">جزییات محصول را وارد کنید</h1>
        </CardHeader>
        <Divider />
        <CardBody>
          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <DropzoneInput
                value={field.value}
                onChange={field.onChange}
                multiple={true}
                setValue={setValue}
              />
            )}
          />
          {/* <Input title="اسم محصول" />
          <Input title="قیمت" />
          <Input title="موجودیت" />
          <Input title="برند" />
          <Input title="توزیحات" />
          <Input title="" /> */}
        </CardBody>
        <Divider />
        <CardFooter>
          <Button type="submit">submit</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default AddNewProductForm;
