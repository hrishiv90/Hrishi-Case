export async function Header() {
  return (
    <div className="flex items-center justify-center font-sans dark:bg-black">
      <div className="flex w-full max-w-4xl items-center justify-between py-2 px-4 bg-white dark:bg-black sm:items-start">
        <strong className="-mr-1">Hrishi's Case</strong>
        <div className="flex items-center justify-between gap-8">
          <a className="px-2" href="/">Home</a>
          <a className="px-2" href="/rfp2ppsl">RFP to Proposal</a>
        </div>
      </div>
    </div>
  )
}