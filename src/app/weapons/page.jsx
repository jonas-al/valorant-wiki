"use client";
import { useEffect, useState } from "react";
import AxiosInstance from '@/utils/axiosInstance'

// Components
import WeaponsCard from "../components/Weapons/WeaponsCard";
import WeaponCardLoading from "../components/Weapons/WeaponCardLoading";

const Weapons = () => {
  const [weapons, setWeapons] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AxiosInstance.get("/armas", {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setWeapons(response.data)
        setLoading(false)
        console.log('Resposta:', response.data);
      })
      .catch(error => {
        if (error.response) {
          console.error('Erro:', error.response.data);
        } else {
          console.error('Erro na requisição:', error.message);
        }
      });
  }, [])

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
