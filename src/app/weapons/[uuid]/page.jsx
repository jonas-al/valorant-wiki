"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import AxiosInstance from '@/utils/axiosInstance'
import iconCost from "../../assets/icon-valorant.png";
import iconArrow from "../../assets/seta-direita.png";
const WeaponsDetails = ({ params }) => {
  const [weapon, setWeapon] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AxiosInstance.get(`/armas?uuid=${params.uuid}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setWeapon(response.data)
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

  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse">
        <Image
          src="/loading.svg"
          width={100}
          height={100}
          alt="Loading"
          priority
        />
      </div>
    );
  }

  if (!weapon) {
    return <p>Dados da arma não encontrados.</p>;
  }

  return (
    <div>
      <div className="flex">
        <div className="w-1/2 py-4 gap-6">
          <WeaponHeader weapon={weapon} />
        </div>
        <div
          className="rotate-45 translate-y-60 ml-100px "
          style={{
            backgroundImage: `url(${weapon.displayIcon})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "100%",
            height: "200px",
          }}
        />
      </div>
      <div className="flex flex-col gap-6">
        <WeaponStats weapon={weapon} />
        <WeaponSkills
          weapon={weapon}
          selectedSkill={selectedSkill}
          setSelectedSkill={setSelectedSkill}
        />
      </div>
    </div>
  );
};

const WeaponHeader = ({ weapon }) => (
  <div className="flex flex-col gap-y-6 p-6 bg-[#0d1117] rounded-xl shadow-lg text-center">
    <h1 className="uppercase font-bold italic text-8xl text-white tracking-wider">
      {weapon.displayName}
    </h1>
    <div className="flex flex-col items-center gap-4 bg-[#161b22] rounded-lg shadow-md p-4 w-full max-w-md mx-auto">
      <div
        className="w-full h-40 bg-center bg-no-repeat bg-contain rounded-md"
        style={{
          backgroundImage: `url(${weapon.shopData.newImage})`,
        }}
      />
      <div className="flex flex-col items-center text-center gap-1 mt-4">
        <h2 className="text-lg text-[#ff4655] font-bold uppercase">
          Categoria
        </h2>
        <p className="text-base font-semibold text-gray-300">
          {weapon.shopData.category}
        </p>
      </div>
    </div>
    <div className="flex flex-col items-center gap-2 bg-[#161b22] rounded-lg shadow-md p-4 w-full max-w-md mx-auto mt-4">
      <div className="flex items-center gap-2">
        <Image
          style={{ width: "30px", height: "30px", objectFit: "cover" }}
          src={iconCost}
          alt="Ícone de Preço"
        />
        <p className="text-lg text-[#ff4655] font-bold uppercase">Preço:</p>
      </div>
      <span className="text-xl font-bold text-white tracking-wide">
        {weapon.shopData.cost}
      </span>
    </div>
  </div>
);

const WeaponSkills = ({ weapon, selectedSkill, setSelectedSkill }) => {
  const [page, setPage] = useState(0);
  const skinsPerPage = 5;
  const displayedSkins = weapon.skins.slice(
    page * skinsPerPage,
    (page + 1) * skinsPerPage
  );

  const nextPage = () => {
    if ((page + 1) * skinsPerPage < weapon.skins.length) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div className="flex flex-col text-center gap-y-6 gap-x-6 py-6 bg-[#1c1f24] rounded-2xl w-full shadow-lg mx-auto">
      <h2 className="uppercase font-bold text-3xl text-[#ff4655] tracking-wider mb-4">
        Skins
      </h2>
      <div className="flex items-center gap-4">
        <button
          onClick={prevPage}
          disabled={page === 0}
          className="p-2 bg-[#ff4655] text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-opacity ml-4  "
        >
          <Image src={iconArrow} className="rotate-180" />
        </button>
        <div className="flex gap-4 overflow-x-auto px-4 py-2 w-full">
          {displayedSkins.map((skin, index) => (
            <button
              key={index}
              style={{
                backgroundImage: `url(${skin.displayIcon})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "200px",
                height: "100px",
                borderRadius: "12px",
              }}
              className={`transition-transform transform hover:scale-105 duration-300 ${selectedSkill === index + page * skinsPerPage
                ? "border-4 border-[#ff4655]"
                : "border-4 border-transparent"
                }`}
              onClick={() => setSelectedSkill(index + page * skinsPerPage)}
            />
          ))}
        </div>
        <button
          onClick={nextPage}
          disabled={(page + 1) * skinsPerPage >= weapon.skins.length}
          className="p-2 bg-[#ff4655] text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-opacity mr-4"
        >
          <Image src={iconArrow} />
        </button>
      </div>
      {selectedSkill !== null && (
        <div className="mt-4">
          <h3 className="font-bold text-xl text-[#ff4655]">
            {weapon.skins[selectedSkill].displayName}
          </h3>
        </div>
      )}
    </div>
  );
};

const WeaponStats = ({ weapon }) => (
  <div className="flex flex-col gap-y-4 mt-8 bg-[#161b22] p-6 rounded-xl shadow-lg w-full mx-auto">
    <h2 className="uppercase font-bold text-3xl text-[#ff4655] text-center tracking-wider">
      Estatísticas
    </h2>
    <div className="flex flex-col gap-y-2 mt-4">
      <p className="text-gray-400 flex justify-between items-center">
        <span>Taxa de Fogo:</span>
        <span className="text-white font-semibold">
          {weapon.weaponStats.fireRate}
        </span>
      </p>
      <p className="text-gray-400 flex justify-between items-center">
        <span>Tamanho do Pente:</span>
        <span className="text-white font-semibold">
          {weapon.weaponStats.magazineSize}
        </span>
      </p>
      <p className="text-gray-400 flex justify-between items-center">
        <span>Tempo de Recarga:</span>
        <span className="text-white font-semibold">
          {weapon.weaponStats.reloadTimeSeconds}s
        </span>
      </p>
      <p className="text-gray-400 flex justify-between items-center">
        <span>Precisão do Primeiro Tiro:</span>
        <span className="text-white font-semibold">
          {weapon.weaponStats.firstBulletAccuracy}
        </span>
      </p>
    </div>
  </div>
);

export default WeaponsDetails;
