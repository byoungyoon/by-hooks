import { ChangeEvent, useState } from "react";

export const useInput = <T>(initValue: T) => {
  const [value, setValue] = useState(initValue);

  const onChangeInput =
    (key: string) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      setValue({ ...value, [key]: event.target.value });
    };

  const onDefaultInput = () => {
    setValue(initValue);
  };

  return { value, onChangeInput, onDefaultInput };
};

export default useInput;
