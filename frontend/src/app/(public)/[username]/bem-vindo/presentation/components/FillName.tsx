const FillName = (): JSX.Element => {
  return (
    <div>
      <div className="text-2xl text-center font-medium text-white dark:text-white mb-8">
        <div className="font-bold">Quase lá!</div>
        <div className="font-thin">Como podemos te chamar? 😁</div>
      </div>
      <input
        type="text"
        id="phone-input"
        aria-describedby="helper-text-explanation"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        placeholder="Digite o seu nome"
        required
      />
      <p
        id="helper-text-explanation"
        className="mt-2 text-sm text-gray-500 dark:text-gray-400"
      ></p>
    </div>
  );
};

export default FillName;
