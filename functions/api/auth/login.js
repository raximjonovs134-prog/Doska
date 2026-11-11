export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const password = body.password;

    // Temporary password check for demo / Pages functions environment
    if (password === '1245') {
      const token = `cf_pages_${Date.now()}_${Math.random().toString(36).substring(2)}`;
      return Response.json({
        success: true,
        token: token,
        message: "Muvaffaqiyatli tizimga kirildi"
      });
    }

    return Response.json({
      success: false,
      message: "Noto'g'ri parol kiritildi!"
    }, { status: 401 });
  } catch (err) {
    return Response.json({ success: false, message: "Xatolik" }, { status: 500 });
  }
}
