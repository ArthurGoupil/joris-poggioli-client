import { useRouter } from 'next/router'

const ArchitectureProject = (): JSX.Element => {
  const router = useRouter()
  const { project } = router.query

  return <div>{project}</div>
}

export default ArchitectureProject
