import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArticleCard } from "@/components/article-card"
import { popularTags, articleTabs, filterArticlesByTab } from "@/data/articles"

// Conteúdo da página de Artigos, extraído para ser reutilizado como aba em /explorar
export function ArtigosConteudo() {
  return (
    <>
      <section className="mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium mr-2">Tags Populares:</span>
          {popularTags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </section>

      <Tabs defaultValue="all" className="mb-16">
        <TabsList className="flex-wrap h-auto">
          {articleTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {articleTabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterArticlesByTab(tab.value).map((article) => (
                <ArticleCard
                  key={article.url}
                  title={article.title}
                  excerpt={article.excerpt}
                  image={article.image}
                  date={article.date}
                  author={article.author}
                  readTime={article.readTime}
                  tags={article.tags}
                  url={article.url}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </>
  )
}
