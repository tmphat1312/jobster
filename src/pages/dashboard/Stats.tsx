import LoadingSpinner from "@/components/LoadingSpinner"
import StatsAreaChart from "@/components/StatsAreaChart"
import StatsBarChart from "@/components/StatsBarChart"
import StatsCard from "@/components/StatsCard"
import StatsLineChart from "@/components/StatsLineChart"
import { getStats } from "@/features/stats/statsThunk"
import { useAppDispatch, useAppSelector } from "@/hooks"
import clsx from "clsx"
import { useEffect, useState } from "react"
import {
  MdEventAvailable,
  MdOutlineSmsFailed,
  MdPendingActions,
} from "react-icons/md"

const charts = ["area", "bar", "line"] as const
export type ChartType = (typeof charts)[number]

function Stats() {
  const [chartType, setChartType] = useState<ChartType>("area")
  const dispatch = useAppDispatch()
  const { data } = useAppSelector((state) => state.stats)

  useEffect(() => {
    dispatch(getStats())
  }, [])

  if (!data) {
    return (
      <div className="mt-12 text-center">
        <LoadingSpinner />
      </div>
    )
  }

  const statsCards = [
    {
      type: "pending" as const,
      title: "pending applications",
      count: data.defaultStats["pending"],
      icon: <MdPendingActions />,
    },
    {
      type: "interview" as const,
      title: "interviews scheduled",
      count: data.defaultStats["interview"],
      icon: <MdEventAvailable />,
    },
    {
      type: "declined" as const,
      title: "jobs declined",
      count: data.defaultStats["declined"],
      icon: <MdOutlineSmsFailed />,
    },
  ]

  const chartsComponents = {
    area: <StatsAreaChart data={data.monthlyApplications} />,
    bar: <StatsBarChart data={data.monthlyApplications} />,
    line: <StatsLineChart data={data.monthlyApplications} />,
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statsCards.map((card) => (
          <StatsCard key={card.title} card={card} />
        ))}
      </div>
      <div className="flex flex-wrap justify-center">
        {charts.map((chart) => (
          <button
            key={chart}
            onClick={() => setChartType(chart)}
            className={clsx(
              "text-primary-500 px-2 capitalize rounded-sm drop-shadow-sm",
              chartType == chart && "bg-primary-200"
            )}
          >
            {chart} chart
          </button>
        ))}
      </div>
      <div>{chartsComponents[chartType]}</div>
    </div>
  )
}

export default Stats
