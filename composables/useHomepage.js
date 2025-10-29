export const useHomepage = () => {
  const homepage = useState("homepage", () => null);
  return { homepage };
};
