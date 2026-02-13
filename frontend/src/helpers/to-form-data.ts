type Data = {
  [key: string]: string | number | File | boolean | undefined | null | unknown[] | (() => unknown);
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

    if (value instanceof Function) {
      continue;
    }

    formData.append(key, value.toString());
  }

  return formData;
};
