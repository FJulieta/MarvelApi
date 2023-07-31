import { useRouter } from 'next/router'

const ArticuleDetailPage = () => {
  const router = useRouter()

  return (
    <div>
      <h1>Este es el detalle del producto {router.query.id}</h1>
    </div>
  )
}

export default ArticuleDetailPage
