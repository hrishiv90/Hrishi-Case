import { ProposalView } from "@/components/Proposals/View";
import { notFound } from "next/navigation"

export default async function ProposalPage({ params }: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (!id) {
    return notFound();
  }

  return (
    <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full flex-col max-w-4xl items-center py-4 px-4 bg-white dark:bg-black sm:items-start">
        <ProposalView id={id} />
      </main>
    </div>
  )
}
