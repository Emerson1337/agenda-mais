import React, { useEffect, useState } from "react";
import { fetchCoffeeService } from "@app/coffees/application/fetchCoffeeService";
import { CoffeeMapper } from "@app/coffees/infrastructure/coffee.mapper";
import { CoffeePage } from "@app/coffees/presentation/pages/CoffeePage";
import Spinner from "@app/interface/presentation/components/Spinner";
import { motion } from "framer-motion";

export default function Index(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setData(await fetchCoffeeService());
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const domainData = data.map(CoffeeMapper.toDomain);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isLoading ? (
          <div className="load-screen">
            <Spinner />
          </div>
        ) : (
          <CoffeePage data={domainData} />
        )}
      </motion.div>
    </>
  );
}
