import Link from "next/link";
import { getSession, useSession } from "next-auth/react";
import {  signOut } from "next-auth/react";

export default function IndexPage() {
  const { data: session } = useSession();
  return <div>{session ? User({session}) : Guest()}</div>;
}

// gest esta de mas
function Guest() {
  return (
    <div>
      <h3>Bienvenido a la pagina Inicial</h3>
      <Link href="/login">Ingresar</Link>
    </div>
  );
}

function User({session}) {

  const handleGoogleLogout = () => {
    signOut("google",{callback:"http://localhost:3000"});
  };
  return (
    <div>
      {session.user.email}
      <hr/>
      {session.user.name}
      <h3>Bienvenido a la pagina Inicial</h3>
      <Link href="/profile">Tu cuenta</Link>
      <button onClick={handleGoogleLogout}>Cerrar sesion</button>
    </div>
  );
}

// este es como un isAuth o isUser
export async function getServerSideProps({req}){
  const session = await getSession({req})
 
  if(!session){
    return{
      redirect:{
        destination: "/login",
        permanent: false
      }
    }
  }
  return{
    props: {session}
  }
}
