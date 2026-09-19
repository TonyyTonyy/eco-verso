import { redirect } from "next/navigation"

// A página /turmas foi incorporada à aba Turmas de /perfil
export default function TurmasPage() {
  redirect("/perfil?tab=turmas")
}
