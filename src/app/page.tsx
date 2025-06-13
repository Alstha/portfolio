import { prisma } from '@/lib/db'
import HomeClient from './HomeClient'

export default async function Home() {
  const projectCount = await prisma.project.count()
  return <HomeClient projectCount={projectCount} />
}
