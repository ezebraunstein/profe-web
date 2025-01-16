type Props = {
  children: React.ReactNode;
};

const Banner = ({ children }: Props) => {
  return (
    <div className="block rounded-lg border-2 border-dashed border-gray-300 p-12 text-center text-lg font-medium text-foreground">
      {children}
    </div>
  );
};

export default Banner;
