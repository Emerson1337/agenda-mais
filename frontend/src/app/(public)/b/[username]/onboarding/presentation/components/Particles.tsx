const Particles = (): JSX.Element => {
  return (
    <>
      <div className="absolute top-0 bg-gradient-to-r from-transparent via-primary to-transparent h-[2px] w-3/4 blur-sm left-1/2 transform -translate-x-1/2" />
      <div className="absolute top-0 bg-gradient-to-r from-transparent via-primary to-transparent h-px w-3/4 left-1/2 transform -translate-x-1/2" />
      <div className="absolute top-0 bg-gradient-to-r from-transparent via-primary to-transparent h-[5px] w-1/4 blur-sm left-1/2 transform -translate-x-1/2" />
      <div className="absolute top-0 bg-gradient-to-r from-transparent via-primary to-transparent h-px w-1/4 left-1/2 transform -translate-x-1/2" />
    </>
  );
};

export default Particles;
