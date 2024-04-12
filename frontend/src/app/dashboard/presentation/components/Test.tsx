"use client";

import { useState } from "react";

export default function Test() {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </>
  );
}

//SERVER COMPONENTS
// 1.[browser] => 2.[NextJS] => 3.[API]

// 1. => 2. pode ocorrer em streaming. O servidor retorna NextJS retorna já conteúdo HTML enquanto faz a requisição à API.
// Dessa forma, o servidor Next ainda evita enviar JS de interatividade para o browser. Dados podem ser carregados de maneira
// assíncrona com o JS desabilitado.

//CLIENT COMPONENTS
//A unica diferença é que o browser é HIDRATADO com javascript para interatividade. Um componente do tipo SERVER pode funcionar
// sem JS. Um client component não. Todo component que usa useState/useEffect/hooks é client component
