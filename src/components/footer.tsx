import Link from "next/link"
import { Leaf } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">EcoVerso</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Educação ambiental interativa para um futuro sustentável.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-facebook"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-youtube"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3z" />
                </svg>
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-muted-foreground hover:text-primary">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/atividades" className="text-muted-foreground hover:text-primary">
                  Atividades
                </Link>
              </li>
              <li>
                <Link href="/recursos" className="text-muted-foreground hover:text-primary">
                  Recursos
                </Link>
              </li>
              <li>
                <Link href="/artigos" className="text-muted-foreground hover:text-primary">
                  Artigos
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-muted-foreground hover:text-primary">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Recursos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/recursos" className="text-muted-foreground hover:text-primary">
                  Vídeos
                </Link>
              </li>
              <li>
                <Link href="/recursos" className="text-muted-foreground hover:text-primary">
                  Infográficos
                </Link>
              </li>
              <li>
                <Link href="/gincanas" className="text-muted-foreground hover:text-primary">
                  Gincanas Ecológicas
                </Link>
              </li>
            </ul>
          </div>{/* 
          <div>
            <h3 className="font-medium mb-4">Contato</h3>
            <address className="not-italic text-sm text-muted-foreground space-y-2">
              <p>Fundação Educacional EcoVerso</p>
              <p>Rua Verde, 123</p>
              <p>São Paulo, SP 01234-567</p>
              <p>Brasil</p>
              <p className="pt-2">
                <a href="mailto:info@ecoverso.org" className="hover:text-primary">
                  info@ecoverso.org
                </a>
              </p>
            </address>
          </div> */}
        </div>
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} EcoVerso. Todos os direitos reservados.</p>
          <div className="mt-2 flex justify-center gap-4">
            <Link href="#" className="hover:text-primary">
              Política de Privacidade
            </Link>
            <Link href="#" className="hover:text-primary">
              Termos de Uso
            </Link>
            <Link href="#" className="hover:text-primary">
              Política de Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
