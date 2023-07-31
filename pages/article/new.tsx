import css from 'styles/ArticleNew.module.scss'

const NewArticlePage = () => {
  return (
    <div className={css.container}>
      <h1>Nuevo Articulo</h1>
      <form className={css.form}>
        <input type="text" placeholder="Ingrese el nombre del articulo" />
        <input type="number" />
        <input type="submit" value="Guardar" />
      </form>
    </div>
  )
}

export default NewArticlePage
