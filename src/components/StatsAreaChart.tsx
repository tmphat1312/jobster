import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"

function StatsAreaChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="date" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#2563eb" stopOpacity={0.6} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="count"
          stroke="#2563eb"
          fillOpacity={1}
          fill="url(#date)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default StatsAreaChart
