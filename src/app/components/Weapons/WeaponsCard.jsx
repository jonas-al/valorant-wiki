import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const WeaponsCard = ({ weapon }) => {
  console.log("Dados da arma recebidos no WeaponsCard:", weapon);
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const hover = {
    background: `linear-gradient(to bottom, #ff4655, #ff7875)`,
  };
  const normal = {
    background: "white",
  };

  if (!weapon.displayIcon || !weapon.displayName) {
    console.warn("Dados incompletos para:", weapon);
    return (
      <div>
        Dados incompletos para {weapon.displayName || "arma desconhecida"}
      </div>
    );
  }

  const handleClick = () => {
    router.push(`/weapons/${weapon.uuid}`);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className="w-[500px] h-[124px] rounded group bg-transparent hover:bg-gradient-to-b from-transparent from-85% to-black bg-opacity-100 shadow my-16 mx-4 cursor-pointer"
    >
      <div
        className="absolute"
        style={{
          WebkitMaskImage: `url(${weapon.newImage})`,
          maskImage: `url(${weapon.newImage})`,
          width: "500px",
          height: "124px",
          maskSize: "cover",
        }}
      >
        <div
          style={isHovered ? { ...normal, ...hover } : normal}
          className="w-full h-full"
        />
      </div>
      <div
        style={{ backgroundImage: `url(${weapon.displayIcon})` }}
        className={`relative bg-contain bg-center w-full h-full bg-no-repeat  ${
          isHovered && "transition ease-out delay-[350] scale-x-[-1]"
        }`}
      />
      <div className="flex justify-between items-center bg-[#ff4655] uppercase text-lg font-bold px-6 py-2 rounded-b">
        <h2>{weapon.displayName}</h2>
        {weapon.shopData && weapon.killStreamIcon && (
          <Image
            src={`${weapon.killStreamIcon}`}
            width={50}
            height={19}
            className="h-[auto] hidden group-hover:block"
            alt="Icone da categoria da arma"
            priority
          />
        )}
      </div>
    </div>
  );
};

export default WeaponsCard;
