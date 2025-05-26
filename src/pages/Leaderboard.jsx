import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

const Leaderboard = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [timePeriod, setTimePeriod] = useState('monthly')
  const [sortBy, setSortBy] = useState('revenue')
  const [showAddForm, setShowAddForm] = useState(false)
  
  const [salesTeam, setSalesTeam] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'SJ',
      position: 'Senior Sales Manager',
      revenue: 156780,
      dealsWon: 23,
      dealsLost: 4,
      activitiesCompleted: 89,
      winRate: 85.2,
      activityScore: 94,
      badge: 'gold',
      lastActivity: '2024-01-15'
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: 'MC',
      position: 'Sales Representative',
      revenue: 142350,
      dealsWon: 28,
      dealsLost: 6,
      activitiesCompleted: 76,
      winRate: 82.4,
      activityScore: 88,
      badge: 'gold',
      lastActivity: '2024-01-14'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      avatar: 'ER',
      position: 'Sales Executive',
      revenue: 128940,
      dealsWon: 19,
      dealsLost: 5,
      activitiesCompleted: 82,
      winRate: 79.2,
      activityScore: 91,
      badge: 'silver',
      lastActivity: '2024-01-13'
    },
    {
      id: 4,
      name: 'David Kim',
      avatar: 'DK',
      position: 'Sales Representative',
      revenue: 118760,
      dealsWon: 21,
      dealsLost: 8,
      activitiesCompleted: 71,
      winRate: 72.4,
      activityScore: 79,
      badge: 'silver',
      lastActivity: '2024-01-12'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      avatar: 'LT',
      position: 'Junior Sales Rep',
      revenue: 96450,
      dealsWon: 15,
      dealsLost: 7,
      activitiesCompleted: 65,
      winRate: 68.2,
      activityScore: 75,
      badge: 'bronze',
      lastActivity: '2024-01-11'
    },
    {
      id: 6,
      name: 'James Wilson',
      avatar: 'JW',
      position: 'Sales Representative',
      revenue: 89320,
      dealsWon: 12,
      dealsLost: 9,
      activitiesCompleted: 58,
      winRate: 57.1,
      activityScore: 68,
      badge: 'bronze',
      lastActivity: '2024-01-10'
    },
    {
      id: 7,
      name: 'Angela Davis',
      avatar: 'AD',
      position: 'Sales Trainee',
      revenue: 67890,
      dealsWon: 8,
      dealsLost: 6,
      activitiesCompleted: 45,
      winRate: 57.1,
      activityScore: 62,
      badge: 'none',
      lastActivity: '2024-01-09'
    }
  ])

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    revenue: '',
    dealsWon: '',
    dealsLost: ''
  })

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.position) {
      toast.error("Please fill in all required fields")
      return
    }

    const newMember = {
      id: salesTeam.length + 1,
      name: formData.name,
      avatar: formData.name.split(' ').map(n => n[0]).join('').toUpperCase(),
      position: formData.position,
      revenue: parseFloat(formData.revenue) || 0,
      dealsWon: parseInt(formData.dealsWon) || 0,
      dealsLost: parseInt(formData.dealsLost) || 0,
      activitiesCompleted: 0,
      winRate: 0,
      activityScore: 0,
      badge: 'none',
      lastActivity: new Date().toISOString().split('T')[0]
    }

    setSalesTeam([...salesTeam, newMember])
    toast.success("Team member added successfully!")
    
    setFormData({
      name: '',
      position: '',
      revenue: '',
      dealsWon: '',
      dealsLost: ''
    })
    setShowAddForm(false)
  }

  const deleteMember = (id) => {
    setSalesTeam(salesTeam.filter(member => member.id !== id))
    toast.success("Team member removed successfully!")
  }

  const filteredAndSortedTeam = salesTeam
    .filter(member => 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'revenue':
          return b.revenue - a.revenue
        case 'deals':
          return b.dealsWon - a.dealsWon
        case 'winRate':
          return b.winRate - a.winRate
        case 'activity':
          return b.activityScore - a.activityScore
        default:
          return 0
      }
    })

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'gold':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'silver':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
      case 'bronze':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400'
      default:
        return 'bg-surface-100 text-surface-600 dark:bg-surface-700 dark:text-surface-400'
    }
  }

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case 'gold':
        return 'Trophy'
      case 'silver':
        return 'Award'
      case 'bronze':
        return 'Medal'
      default:
        return 'User'
    }
  }

  const getRankIcon = (index) => {
    switch (index) {
      case 0:
        return '🥇'
      case 1:
        return '🥈'
      case 2:
        return '🥉'
      default:
        return `#${index + 1}`
    }
  }

  const totalRevenue = salesTeam.reduce((sum, member) => sum + member.revenue, 0)
  const totalDeals = salesTeam.reduce((sum, member) => sum + member.dealsWon, 0)
  const avgWinRate = salesTeam.reduce((sum, member) => sum + member.winRate, 0) / salesTeam.length

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
        
        {/* Header */}
        <header className="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="p-2 rounded-xl bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
              >
                <ApperIcon name="ArrowLeft" className="h-5 w-5 text-surface-600 dark:text-surface-300" />
              </button>
              
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-surface-900 dark:text-white">
                  Sales Leaderboard
                </h1>
                <p className="text-surface-500 dark:text-surface-400 mt-1">
                  Track team performance and achievements
                </p>
              </div>
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

        {/* Main Content */}
        <main className="p-4 lg:p-8 space-y-6">
          
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-200 dark:border-surface-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                  <ApperIcon name="DollarSign" className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm font-semibold text-green-600">+15%</span>
              </div>
              <h3 className="text-sm font-medium text-surface-500 dark:text-surface-400 mb-1">
                Total Revenue
              </h3>
              <p className="text-2xl lg:text-3xl font-bold text-surface-900 dark:text-white">
                ${totalRevenue.toLocaleString()}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-200 dark:border-surface-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                  <ApperIcon name="Target" className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm font-semibold text-blue-600">+8%</span>
              </div>
              <h3 className="text-sm font-medium text-surface-500 dark:text-surface-400 mb-1">
                Deals Closed
              </h3>
              <p className="text-2xl lg:text-3xl font-bold text-surface-900 dark:text-white">
                {totalDeals}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-200 dark:border-surface-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                  <ApperIcon name="TrendingUp" className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-sm font-semibold text-purple-600">+5%</span>
              </div>
              <h3 className="text-sm font-medium text-surface-500 dark:text-surface-400 mb-1">
                Avg Win Rate
              </h3>
              <p className="text-2xl lg:text-3xl font-bold text-surface-900 dark:text-white">
                {avgWinRate.toFixed(1)}%
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-200 dark:border-surface-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl flex items-center justify-center">
                  <ApperIcon name="Users" className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <span className="text-sm font-semibold text-yellow-600">+2</span>
              </div>
              <h3 className="text-sm font-medium text-surface-500 dark:text-surface-400 mb-1">
                Team Members
              </h3>
              <p className="text-2xl lg:text-3xl font-bold text-surface-900 dark:text-white">
                {salesTeam.length}
              </p>
            </motion.div>
          </div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-200 dark:border-surface-700"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-surface-400" />
                  <input
                    type="text"
                    placeholder="Search team members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full sm:w-64"
                  />
                </div>

                <select
                  value={timePeriod}
                  onChange={(e) => {
                    setTimePeriod(e.target.value)
                    toast.info(`Switched to ${e.target.value} view`)
                  }}
                  className="px-3 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="weekly">This Week</option>
                  <option value="monthly">This Month</option>
                  <option value="quarterly">This Quarter</option>
                  <option value="yearly">This Year</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value)
                    toast.info(`Sorted by ${e.target.value}`)
                  }}
                  className="px-3 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="revenue">Revenue</option>
                  <option value="deals">Deals Won</option>
                  <option value="winRate">Win Rate</option>
                  <option value="activity">Activity Score</option>
                </select>
              </div>

              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl font-medium transition-colors"
              >
                <ApperIcon name="Plus" className="h-4 w-4" />
                <span>Add Team Member</span>
              </button>
            </div>
          </motion.div>

          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-surface-800 rounded-2xl shadow-card border border-surface-200 dark:border-surface-700 overflow-hidden"
          >
            <div className="p-6 border-b border-surface-200 dark:border-surface-700">
              <h3 className="text-xl font-bold text-surface-900 dark:text-white">
                Team Rankings
              </h3>
              <p className="text-surface-500 dark:text-surface-400 mt-1">
                Performance metrics for {timePeriod} period
              </p>
            </div>

            <div className="divide-y divide-surface-200 dark:divide-surface-700">
              {filteredAndSortedTeam.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl font-bold text-surface-400 dark:text-surface-500 w-8">
                        {getRankIcon(index)}
                      </div>
                      
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">{member.avatar}</span>
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-3">
                          <h4 className="text-lg font-semibold text-surface-900 dark:text-white">
                            {member.name}
                          </h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(member.badge)}`}>
                            <ApperIcon name={getBadgeIcon(member.badge)} className="inline h-3 w-3 mr-1" />
                            {member.badge === 'none' ? 'New' : member.badge.charAt(0).toUpperCase() + member.badge.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-surface-500 dark:text-surface-400">
                          {member.position}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                      <div className="text-center">
                        <p className="text-xs text-surface-500 dark:text-surface-400 mb-1">Revenue</p>
                        <p className="text-lg font-bold text-surface-900 dark:text-white">
                          ${member.revenue.toLocaleString()}
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-xs text-surface-500 dark:text-surface-400 mb-1">Deals Won</p>
                        <p className="text-lg font-bold text-surface-900 dark:text-white">
                          {member.dealsWon}
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-xs text-surface-500 dark:text-surface-400 mb-1">Win Rate</p>
                        <p className="text-lg font-bold text-surface-900 dark:text-white">
                          {member.winRate}%
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-xs text-surface-500 dark:text-surface-400 mb-1">Activity</p>
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-12 bg-surface-200 dark:bg-surface-600 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${member.activityScore}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-surface-900 dark:text-white">
                            {member.activityScore}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-surface-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                        <ApperIcon name="Eye" className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-surface-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                        <ApperIcon name="Edit" className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => deleteMember(member.id)}
                        className="p-2 text-surface-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <ApperIcon name="Trash2" className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>

        {/* Add Form Modal */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowAddForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-surface-800 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-surface-900 dark:text-white">
                    Add Team Member
                  </h3>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="p-2 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 rounded-lg"
                  >
                    <ApperIcon name="X" className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Position *
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Initial Revenue
                    </label>
                    <input
                      type="number"
                      name="revenue"
                      value={formData.revenue}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Deals Won
                      </label>
                      <input
                        type="number"
                        name="dealsWon"
                        value={formData.dealsWon}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Deals Lost
                      </label>
                      <input
                        type="number"
                        name="dealsLost"
                        value={formData.dealsLost}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="flex-1 px-4 py-2 text-surface-600 dark:text-surface-300 bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors"
                    >
                      Add Member
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Leaderboard