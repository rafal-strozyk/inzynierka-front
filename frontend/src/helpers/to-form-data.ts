type Data = {
  [key: string]: string | number | File | boolean | undefined | null;
};

export default (data: Data) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (!value) {
      continue;
    }

    if (typeof value === "boolean") {
      formData.append(key, value ? "1" : "0");
      continue;
    }

    if (value instanceof File) {
      formData.append(key, value);
      continue;
    }

    formData.append(key, value.toString());
  }

  return formData;
};
