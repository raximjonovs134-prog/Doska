export async function onRequestGet(context) {
  const authHeader = context.request.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return Response.json({ success: true, message: "Faol sessiya" });
  }
  return Response.json({ success: false, message: "Ruxsat etilmagan" }, { status: 401 });
}
