import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"

function StatsBarChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="date" stroke="#2563eb" />
        <YAxis />
        <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
        <Bar dataKey="count" fill="#2563eb" />
      </BarChart>
    </ResponsiveContainer>
  )
}
export default StatsBarChart
