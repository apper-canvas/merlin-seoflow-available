import { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState('dashboard')

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'BarChart3' },
    { id: 'clients', label: 'Clients', icon: 'Users' },
    { id: 'projects', label: 'Projects', icon: 'FolderOpen' },
    { id: 'deals', label: 'Deals', icon: 'Target' },
    { id: 'keywords', label: 'Keywords', icon: 'Search' },
    { id: 'reports', label: 'Reports', icon: 'FileText' }
  ]


  const kpiCards = [
    { title: 'Total Clients', value: '47', change: '+12%', trend: 'up', icon: 'Users', color: 'blue' },
    { title: 'Active Projects', value: '23', change: '+8%', trend: 'up', icon: 'FolderOpen', color: 'green' },
    { title: 'Avg. Ranking', value: '12.4', change: '-2.1', trend: 'down', icon: 'TrendingUp', color: 'yellow' },
    { title: 'Monthly Revenue', value: '$24,850', change: '+15%', trend: 'up', icon: 'DollarSign', color: 'purple' }
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="flex min-h-screen bg-surface-50 dark:bg-surface-900">
        
        {/* Sidebar */}
        <motion.aside 
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          className="w-64 bg-white dark:bg-surface-800 shadow-soft border-r border-surface-200 dark:border-surface-700 hidden lg:block"
        >
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <ApperIcon name="Zap" className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-surface-900 dark:text-white">SEOFlow</h1>
                <p className="text-sm text-surface-500 dark:text-surface-400">Agency CRM</p>
              </div>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'deals') {
                      window.location.href = '/deals'
                    } else {
                      setActiveSection(item.id)
                    }
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-primary text-white shadow-card'
                      : 'text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                  }`}
                >
                  <ApperIcon name={item.icon} className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

          </div>
        </motion.aside>

        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <button className="p-2 bg-white dark:bg-surface-800 rounded-xl shadow-card">
            <ApperIcon name="Menu" className="h-6 w-6 text-surface-600 dark:text-surface-300" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {/* Header */}
          <header className="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 lg:flex-none">
                <h2 className="text-2xl lg:text-3xl font-bold text-surface-900 dark:text-white capitalize">
                  {activeSection}
                </h2>
                <p className="text-surface-500 dark:text-surface-400 mt-1">
                  Manage your SEO agency operations
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-xl bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                >
                  <ApperIcon 
                    name={darkMode ? 'Sun' : 'Moon'} 
                    className="h-5 w-5 text-surface-600 dark:text-surface-300" 
                  />
                </button>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm lg:text-base">JD</span>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-surface-900 dark:text-white">John Doe</p>
                    <p className="text-xs text-surface-500 dark:text-surface-400">SEO Manager</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="p-4 lg:p-8 space-y-6 lg:space-y-8">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {kpiCards.map((kpi, index) => (
                <motion.div
                  key={kpi.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-200 dark:border-surface-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      kpi.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/20' :
                      kpi.color === 'green' ? 'bg-green-100 dark:bg-green-900/20' :
                      kpi.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                      'bg-purple-100 dark:bg-purple-900/20'
                    }`}>
                      <ApperIcon 
                        name={kpi.icon} 
                        className={`h-6 w-6 ${
                          kpi.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                          kpi.color === 'green' ? 'text-green-600 dark:text-green-400' :
                          kpi.color === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' :
                          'text-purple-600 dark:text-purple-400'
                        }`} 
                      />
                    </div>
                    <span className={`text-sm font-semibold ${
                      kpi.trend === 'up' ? 'text-green-600' : 'text-red-500'
                    }`}>
                      {kpi.change}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-surface-500 dark:text-surface-400 mb-1">
                    {kpi.title}
                  </h3>
                  <p className="text-2xl lg:text-3xl font-bold text-surface-900 dark:text-white">
                    {kpi.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Main Feature Component */}
            <MainFeature />

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 lg:p-8 shadow-card border border-surface-200 dark:border-surface-700"
            >
              <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: 'New Client', icon: 'UserPlus', color: 'bg-blue-500' },
                  { title: 'Create Project', icon: 'Plus', color: 'bg-green-500' },
                  { title: 'Add Keywords', icon: 'Search', color: 'bg-yellow-500' },
                  { title: 'Generate Report', icon: 'FileText', color: 'bg-purple-500' }
                ].map((action) => (
                  <button
                    key={action.title}
                    className="flex flex-col items-center p-6 rounded-xl border-2 border-dashed border-surface-300 dark:border-surface-600 hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                  >
                    <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <ApperIcon name={action.icon} className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-medium text-surface-700 dark:text-surface-300 group-hover:text-primary transition-colors">
                      {action.title}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Home