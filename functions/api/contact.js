export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    if (!data.name || !data.phone) {
      return Response.json({ success: false, message: "Ism va telefon raqami kiritilishi shart" }, { status: 400 });
    }

    const requestItem = {
      id: `req-${Date.now()}`,
      name: data.name,
      phone: data.phone,
      course: data.course || "Umumiy",
      message: data.message || "",
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: "Yangi"
    };

    return Response.json({
      success: true,
      message: "Arizangiz muvaffaqiyatli qabul qilindi! Tez orada bog'lanamiz.",
      request: requestItem
    });
  } catch (err) {
    return Response.json({ success: false, message: "Serverda xatolik yuz berdi" }, { status: 500 });
  }
}
