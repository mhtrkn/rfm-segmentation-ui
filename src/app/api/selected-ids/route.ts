export async function POST(req: Request) {
  const body = await req.json();

  return Response.json({
    success: true,
    count: body.ids?.length ?? 0,
  });
}
