import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  try {
    const id = context.params.id

    const res = await fetch("http://localhost:3000/api/home", {
      method: 'GET',
    });
    
    const data = await res.json();

    const dataItem = data.find((item: any) => item.id === Number(id))

    return NextResponse.json({ dataItem });

  } catch (error) {
    return NextResponse.json({
      message: "Error",
      status: 500,
      error: error,
    });
  }
}





