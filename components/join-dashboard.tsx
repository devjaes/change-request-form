import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import LoggedImage from "@/public/welcome-hero.png";

const JoinDashboard = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="w-full h-full">


      <div className="relative h-[1000px]" >
        <Image
          src={LoggedImage}
          alt="Welcome back!"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center bg-black bg-opacity-60 ">
          <h1 className="text-6xl font-semibold text-white">Bienvenido de vuelta!</h1>
          {user?.id ? (
            <>
              <p className="font-thin italic text-white text-xl">Genera solicitudes de cambio para tus proyectos en un instante</p>
              <Link
                href={`/dashboard/${user.id}`}
                className="bg-gradient-to-r from-chetwode-blue-700 to-purple-950 text-white font-extra-light p-3 rounded-lg text-lg px-10 py-6 mt-8"
              >
                Join Dashboard
              </Link>
            </>
          ) : (
            <>
              <p className="font-thin italic text-white text-xl"> Inicia sesión para acceder a tu dashboard </p>
              <Link
                href={`/login`}
                className="bg-gradient-to-r from-chetwode-blue-700 to-purple-950 text-white font-extra-light p-3 rounded-lg text-xl px-10 py-6 mt-8"
              >
                Iniciar sesión
              </Link>
            </>
          )
          }
        </div>
      </div>

    </div>
  );
};

export default JoinDashboard;
