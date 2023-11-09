import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { email, password } = body;
    if (email === "thai@gmail.com" && password === "123") {
      return NextResponse.json({
        message: "Đăng nhập thành công",
        status: 200,
      });
    }
    return NextResponse.json({
      message: "Đăng nhập thất bại",
      status: 400,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error",
      status: 500,
      error: error,
    });
  }
}
