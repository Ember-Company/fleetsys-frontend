export async function GET(): Promise<Response> {
  return Response.json({
    message: 'Test route',
  });
}
