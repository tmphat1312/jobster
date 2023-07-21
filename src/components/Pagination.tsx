import { useState } from "react"
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai"

export interface PaginationProps {
  total: number
  current: number
  action: (page: number) => void
}

function Pagination({ total, current, action }: PaginationProps) {
  const [page, setPage] = useState(current)
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    action(page)
  }

  function handlePrev() {
    action(current - 1)
  }

  function handleNext() {
    action(current + 1)
  }

  return (
    <div className="flex flex-col items-center justify-between max-w-lg gap-2 p-2 mx-auto rounded-md sm:flex-row bg-slate-200 drop-shadow-sm">
      <div className="capitalize">
        page <b>{current}</b>/<b>{total}</b>
      </div>
      <div className="flex gap-4">
        <button
          className="flex items-center gap-1 px-2 capitalize rounded-sm bg-primary-200 text-primary-500 drop-shadow-sm disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
          onClick={handlePrev}
          disabled={current == 1}
        >
          <AiOutlineDoubleLeft />
          <span>prev</span>
        </button>
        <form
          onSubmit={handleSubmit}
          className="p-1 space-x-1 rounded-sm bg-slate-400 drop-shadow-sm"
        >
          <input
            type="number"
            min={1}
            max={total}
            value={page}
            className="pl-2 rounded-sm"
            onChange={(e) => setPage(Number(e.target.valueAsNumber))}
          />
          <button type="submit" className="px-2 text-white capitalize">
            go
          </button>
        </form>
        <button
          className="flex items-center gap-1 px-2 capitalize rounded-sm bg-primary-200 text-primary-500 drop-shadow-sm disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
          onClick={handleNext}
          disabled={current == total}
        >
          <span>next</span>
          <AiOutlineDoubleRight />
        </button>
      </div>
    </div>
  )
}

export default Pagination
