export async function GET(req: Request) {
  const [{ id }, { asd }] = req.url
    .split("?")[1]
    .split("&")
    .map((x) => {
      const [key, value] = x.split("=");

      return {
        [key]: value,
      };
    }) as any;

  console.log(id, asd);

  return Response.json({
    message: new Date().toISOString(),
  });
}
