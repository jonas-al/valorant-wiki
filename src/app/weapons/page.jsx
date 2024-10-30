"use client";
import { useEffect, useState } from "react";

// Components
import WeaponsCard from "../components/Weapons/WeaponsCard";
import WeaponCardLoading from "../components/Weapons/WeaponCardLoading";

// Hooks
import { useSocket } from "../hooks/useSocket";

const Weapons = () => {
  const [weapons, setWeapons] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const socket = useSocket({
      type: "armas",
      uuid: null,
    });

    socket.onmessage = (event) => {
      try {
        console.log("Mensagem recebida!!", event.data);
        const response = JSON.parse(event.data).data;
        console.log("Dados da API:", response);
        if (response) {
          response.forEach((weapon) => {
            console.log("Verificando arma:", weapon);
          });
          setWeapons(response);
          setLoading(false);
        } else {
          console.error("Dados inválidos recebidos:", response);
        }
      } catch (error) {
        console.error("Erro ao processar a mensagem:", error);
      }
      socket.close();
      console.log("Conexão encerrada!!");
    };
  }, []);

  if (loading)
    return (
      <div className="flex flex-wrap items-center justify-center gap-16">
        {[...Array(10)].map((_, j) => (
          <WeaponCardLoading key={j} />
        ))}
      </div>
    );

  console.log("Dados das armas:", weapons);

  return (
    <div className="flex flex-wrap items-center justify-center gap-16">
      {weapons &&
        weapons.map((weapon) => {
          console.log("Passando arma para WeaponsCard:", weapon);
          if (weapon.displayIcon && weapon.displayName) {
            return <WeaponsCard weapon={weapon} key={weapon.uuid} />;
          } else {
            console.warn("Dados incompletos para:", weapon);
            return (
              <div key={weapon.uuid}>
                Dados incompletos para{" "}
                {weapon.displayName || "arma desconhecida"}
              </div>
            );
          }
        })}
    </div>
  );
};

export default Weapons;
