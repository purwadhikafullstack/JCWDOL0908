export const SectionTitle = ({ children }) => {
  return (
    <h1 className="sm:text-4xl text-2xl text-primary font-bold mb-4 font-title">
      {children}
    </h1>
  );
};

export const H3 = ({ children }) => {
  return <h3 className="text-xl font-semibold mb-4 font-title">{children}</h3>;
};