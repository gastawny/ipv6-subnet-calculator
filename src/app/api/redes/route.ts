export async function GET(req: Request) {
  const [{ bloqueio }, { nSubRedes }] = req.url
    .split("?")[1]
    .split("&")
    .map((x) => {
      const [key, value] = x.split("=");

      return {
        [key]: value,
      };
    }) as any;

  return Response.json({
    message: new Date().toISOString(),
  });
}
