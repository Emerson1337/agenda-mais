export const ErrorLabel = ({ children }: { children?: string }) => {
  return <p className="text-red-700 text-xs min-h-[20px]">{children ?? ""}</p>;
};
