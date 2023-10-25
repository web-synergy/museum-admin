import React, { FC, useState, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import PageTemplate from "../Common/PageTemplate";
import ContactField from "./ContactField";
import { Box, Button, Container } from "@mui/material";
import { IMaskInput } from "react-imask";
import { getContactInfo, updateContactInfo } from "@/api";
import { theme } from "@/theme";
import Loader from "../Common/Loader";

type FieldName =
  | "phoneNumber"
  | "email"
  | "subwayRoute"
  | "funicularRoute"
  | "busRoute";

export const TextMaskCustom = React.forwardRef<HTMLInputElement>(
  function TextMaskCustom(props, ref) {
    const { ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(###) ###-##-##"
        definitions={{
          "#": /[0-9]/,
        }}
        inputRef={ref}
      />
    );
  }
);

const Contacts: FC = () => {
  const [contactInfo, setContactInfo] = useState({
    phoneNumber: "",
    email: "",
    subwayRoute: "",
    funicularRoute: "",
    busRoute: "",
  });

  const [loading, setLoading] = useState(true);
  const [fieldChanges, setFieldChanges] = useState<{
    [key in FieldName]: boolean;
  }>({
    phoneNumber: false,
    email: false,
    subwayRoute: false,
    funicularRoute: false,
    busRoute: false,
  });

  const [isFormChanged, setIsFormChanged] = useState(false);

  const { control, handleSubmit, setValue, getValues } = useForm<FieldValues>({
    mode: "all",
    defaultValues: {
      phoneNumber: contactInfo.phoneNumber,
      email: contactInfo.email,
      subwayRoute: contactInfo.subwayRoute,
      funicularRoute: contactInfo.funicularRoute,
      busRoute: contactInfo.busRoute,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getContactInfo();

        // console.log("response.data", response.data);

        setContactInfo(response.data);

        setValue("phoneNumber", response.data.phoneNumber || "");
        setValue("email", response.data.email || "");
        setValue("subwayRoute", response.data.subwayRoute || "");
        setValue("funicularRoute", response.data.funicularRoute || "");
        setValue("busRoute", response.data.busRoute || "");

        setLoading(false);
      } catch (error) {
        console.error("Помилка при отриманні даних з серверу:", error);
      }
    };

    fetchData();
  }, [setValue]);

  const handleInputChange = (field: FieldName, value: string) => {
    const isValueChanged = value !== getValues(field);

    setFieldChanges((prevChanges) => ({
      ...prevChanges,
      [field]: isValueChanged,
    }));

    setIsFormChanged(true);

    setContactInfo((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    setValue(field, value);
  };

  const handleSave = async () => {
    try {
      // Надіслати усі дані об'єкта contactInfo на сервер
      await updateContactInfo(contactInfo);
      console.log("Дані відправлені на сервер:", contactInfo);

      // Скинути флажки змін у полях
      setIsFormChanged(false);
    } catch (error) {
      // Обробка помилок
      console.error("Помилка при відправленні даних на сервер:", error);
    }
  };

  return (
    <PageTemplate title="Редагувати контакти">
      {loading && <Loader visible={loading} />}
      {!loading && (
        <Container
          sx={{
            pt: { xs: 4, md: 4, lg: 5 },
            pb: { xs: "60px", md: 10, lg: 15 },
          }}
        >
          <form onSubmit={handleSubmit(() => {})}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: "24px", md: "32px" },
                width: { xs: "100%", md: "552px" },
              }}
            >
              <ContactField
                label="Номер телефону"
                fieldName="phoneNumber"
                control={control}
                onChange={(value) => handleInputChange("phoneNumber", value)}
                onSave={() => handleSave()}
                isChanged={fieldChanges.phoneNumber}
                iconId="phone"
              />
              <ContactField
                label="Електронна адреса"
                fieldName="email"
                control={control}
                onChange={(value) => handleInputChange("email", value)}
                onSave={() => handleSave()}
                isChanged={fieldChanges.email}
                iconId="email"
              />
              <ContactField
                label="Метро"
                fieldName="subwayRoute"
                isMulti={true}
                rows={4}
                control={control}
                onChange={(value) => handleInputChange("subwayRoute", value)}
                onSave={() => handleSave()}
                isChanged={fieldChanges.subwayRoute}
              />
              <ContactField
                label="Фунікулер"
                fieldName="funicularRoute"
                isMulti={true}
                rows={4}
                control={control}
                onChange={(value) => handleInputChange("funicularRoute", value)}
                onSave={() => handleSave()}
                isChanged={fieldChanges.funicularRoute}
              />
              <ContactField
                label="Автобус"
                fieldName="busRoute"
                isMulti={true}
                rows={4}
                control={control}
                onChange={(value) => handleInputChange("busRoute", value)}
                onSave={() => handleSave()}
                isChanged={fieldChanges.busRoute}
              />{" "}
              <Button
                type="submit"
                variant="secondary"
                sx={{
                  width: "100%",
                  backgroundColor: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
                onClick={handleSave}
                disabled={!isFormChanged}
              >
                Зберегти зміни
              </Button>
            </Box>
          </form>
        </Container>
      )}
    </PageTemplate>
  );
};

export default Contacts;
