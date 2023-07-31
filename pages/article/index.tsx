import css from 'styles/ArticleIndex.module.scss'

const ArticleIndexPage = () => {
  return (
    <div className={css.container}>
      <a href="/article/1">Articulo 1</a>
      <a href="/article/2">Articulo 2</a>
      <a href="/article/3">Articulo 3</a>
      <a href="/article/new">Crear un nuevo articulo</a>
    </div>
  )
}

export default ArticleIndexPage
