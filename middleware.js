import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// VERIFICAR IS ADMIN
export default withAuth(
  async function middleware(req) {
    return NextResponse.rewrite(new URL("/admin", req.url));
  },
  {
    callbacks: {
      // si esto es true, entonces el middelware se activa
      authorized({ token }) {
        // console.log(token);
        return token?.role === "admin";
      },
    },
  }
);

export const config = { matcher: ["/admin"] };
