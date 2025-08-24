import Image from "next/image"

const DashboardPage = () => {
  return (
    <div className="h-[70vh] px-30">
      <Image src='/assets/dashboard.svg' alt="dashboard cover" width={1000} height={1000} />
    </div>
  )
}

export default DashboardPage