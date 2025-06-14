import React from 'react'
import MyOrderPage from './MyOrderPage'

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Left Section */}
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-lg rounded-lg p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Harsh Tanwar</h1>
            <div className="overflow-hidden">
              <p
                className="text-lg text-gray-600 mb-4 truncate"
                title="harsh.tanwar9818@gmail.com"
              >
                harsh.tanwar9818@gmail.com
              </p>
            </div>
            <button className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
              Logout
            </button>
          </div>

          {/* Right section: order table */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <MyOrderPage />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
