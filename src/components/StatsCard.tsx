import clsx from "clsx"

interface StatsCardProps {
  card: {
    type: "pending" | "interview" | "declined"
    title: string
    count: number
    icon: JSX.Element
  }
}

function StatsCard({ card }: StatsCardProps) {
  const styles = {
    cardClasses:
      "flex justify-between p-8 bg-white border-b-4 rounded-md drop-shadow-sm",
    iconClasses: clsx(
      "text-3xl h-1/2 aspect-square grid place-content-center rounded-md",
      card.type == "pending" && "bg-pending-bg text-pending-text",
      card.type == "interview" && "bg-interview-bg text-interview-text",
      card.type == "declined" && "bg-declined-bg text-declined-text"
    ),
    borderClasses: clsx(
      "border-pending-border",
      card.type == "pending" && "border-pending-text",
      card.type == "interview" && "border-interview-text",
      card.type == "declined" && "border-declined-text"
    ),
    countTextClasses: clsx(
      "text-4xl",
      card.type == "pending" && "text-pending-text",
      card.type == "interview" && "text-interview-text",
      card.type == "declined" && "text-declined-text"
    ),
  }

  return (
    <article className={clsx(styles.cardClasses, styles.borderClasses)}>
      <div className="space-y-4">
        <p className={styles.countTextClasses}>{card.count}</p>
        <p className="text-xl capitalize text-slate-600">{card.title}</p>
      </div>
      <div className={styles.iconClasses}>{card.icon}</div>
    </article>
  )
}

export default StatsCard
