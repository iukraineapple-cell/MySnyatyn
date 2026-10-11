import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function proxy(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Застосовуємо до всіх маршрутів, окрім статичних файлів:
     * - _next/static (статичні файли)
     * - _next/image (оптимізація зображень)
     * - favicon.ico (фавіконка)
     * - розширень картинок (.svg, .png, .jpg тощо)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
