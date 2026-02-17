type Data = {
  [key: string]: string | number | File | boolean | undefined | null | string[] | (() => unknown);
};

export default (data: Data) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null || Number.isNaN(value)) {
      continue;
    }

    if (value instanceof File) {
      formData.append(key, value);
      continue;
    }

    if (typeof value === "function") {
      continue;
    }
    if (typeof value === "boolean") {
      formData.append(key, value ? "1" : "0");
      continue;
    }

    if (Array.isArray(value)) {
      for (const [index, val] of value.entries()) {
        formData.append(`${key}[${index}]`, val);
      }
      continue;
    }

    formData.append(key, value.toString());
  }

  return formData;
};
