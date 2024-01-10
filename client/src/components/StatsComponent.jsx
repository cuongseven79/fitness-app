import  { useState, useEffect } from 'react'

const StatsComponent = () => {
  const initialStatsData = [
    { label: 'Trained Champions', value: 198 },
    { label: 'Satisfied Clients', value: 164 },
    { label: 'Working Trainers', value: 47 },
    { label: 'Years of Experience', value: 14 },
  ]

  const totalDuration = 15000 // 15 seconds
  const interval = 16 // Update approximately every 16 milliseconds for smoother animation

  const [statsData, setStatsData] = useState(
    initialStatsData.map((stat) => ({ ...stat, currentValue: 0 }))
  )

  useEffect(() => {
    const steps = Math.ceil(totalDuration / interval)

    const intervalId = setInterval(() => {
      setStatsData((prevStatsData) =>
        prevStatsData.map((stat) => ({
          ...stat,
          currentValue: Math.min(
            stat.currentValue + Math.ceil(stat.value / steps),
            stat.value
          ),
        }))
      )
    }, interval)

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className='grid grid-cols-2 gap-y-7 md:grid-cols-4 items-start text-center p-10'>
      {statsData.map((stat) => (
        <div
          className={`space-y-4 ${
            stat.label === 'Trained Champions' ? 'border-none' : 'border-l'
          } ${stat.label === 'Working Trainers' ? 'md:border-l border-l-0 ' : 'border-l'}`}
          key={stat.label}
        >
          <h3 className='font-bold text-yellow-500 text-6xl'>
            {stat.currentValue}
          </h3>
          <p className='lg:text-xl font-semibold'>{stat.label}</p>
        </div>
      ))}
    </div>
  )
}

export default StatsComponent
