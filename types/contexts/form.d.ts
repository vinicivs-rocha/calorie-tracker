export type FormState = [
  {
    errors: {
      name?: string[] | undefined;
      foods?: string[] | undefined;
    };
  },
  () => void,
];
