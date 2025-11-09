
import { Proposals } from "@/components/Proposals";

export default function Home() {
  return (
    <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full flex-col max-w-4xl items-center py-4 px-4 bg-white dark:bg-black sm:items-start">

        <div className="flex flex-col items-center py-4 gap-4 text-center sm:items-start sm:text-left">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Proposales API Demo with Vercel AI SDK
          </h1>
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Welcome to Hrishi's Case, a simple demo about Proposales API GET and CREATE with Vercel AI SDK.
          </p>
          <ul className="list-disc px-6">
            <li>Homepage shows the list of all the Proposals available using GET API call.</li>
            <li>
              Rfp2Proposal is an AI powered Assistant to create Proposal based on given RFP details and save them in Proposales backend in Draft status ready for update/approval and send to client.
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <Proposals />
        </div>
      </main >
    </div >
  );
}
