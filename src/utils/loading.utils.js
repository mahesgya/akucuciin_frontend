const LoadingUtils = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F9FAFB] dark:bg-dark-bg">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 dark:border-neutral-700 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-[#687EFF] rounded-full animate-spin"></div>
        </div>
        
        {/* Loading Text */}
        <div className="flex flex-col items-center gap-2">
          <p className="font-['Montserrat'] text-lg font-semibold text-gray-700 dark:text-dark-text">
            Memuat...
          </p>
          <p className="font-['Montserrat'] text-sm text-gray-500 dark:text-gray-400">
            Mohon tunggu sebentar
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoadingUtils
