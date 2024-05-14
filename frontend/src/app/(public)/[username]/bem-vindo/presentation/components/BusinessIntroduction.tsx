const BusinessIntroduction = (): JSX.Element => {
  return (
    <>
      <div className="flex justify-center items-center">
        <img
          src="https://github.com/emerson1337.png"
          className="rounded-full mb-8 z-10"
          alt="logo"
          width={155}
          height={155}
        />
        <div className="rounded-full w-40 h-40 absolute bg-sky-200 mb-8 z-0" />
      </div>
      <div>Bem vindo ao</div>
      <div className="font-bold">Barber!</div>
      <div className="font-light text-sm text-gray-400 mt-8 px-16 max-w-xl text-center">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the standard dummy text ever.
      </div>
    </>
  );
};

export default BusinessIntroduction;
