import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

const Deals = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedDeal, setSelectedDeal] = useState(null)
  const [draggedDeal, setDraggedDeal] = useState(null)

  const [deals, setDeals] = useState([
    {
      id: 1,
      title: "TechStart Inc - SEO Package",
      clientName: "TechStart Inc",
      value: 5000,
      stage: "lead",
      probability: 20,
      expectedCloseDate: "2024-02-15",
      contactPerson: "Sarah Johnson",
      email: "sarah@techstart.com",
      phone: "+1 (555) 123-4567",
      notes: "Interested in comprehensive SEO package for e-commerce site",
      createdDate: "2024-01-10",
      lastActivity: "2024-01-15"
    },
    {
      id: 2,
      title: "GreenLeaf - Local SEO Campaign",
      clientName: "GreenLeaf Solutions",
      value: 3500,
      stage: "qualified",
      probability: 60,
      expectedCloseDate: "2024-02-01",
      contactPerson: "Mike Chen",
      email: "mike@greenleaf.co",
      phone: "+1 (555) 987-6543",
      notes: "Looking for local SEO to improve visibility in 3 major cities",
      createdDate: "2024-01-05",
      lastActivity: "2024-01-16"
    },
    {
      id: 3,
      title: "Urban Fitness - Content Strategy",
      clientName: "Urban Fitness",
      value: 4200,
      stage: "proposal",
      probability: 75,
      expectedCloseDate: "2024-01-25",
      contactPerson: "Lisa Rodriguez",
      email: "lisa@urbanfitness.com",
      phone: "+1 (555) 456-7890",
      notes: "Proposal sent for 6-month content marketing strategy",
      createdDate: "2024-01-01",
      lastActivity: "2024-01-14"
    },
    {
      id: 4,
      title: "TechFlow - Enterprise SEO",
      clientName: "TechFlow Corp",
      value: 8500,
      stage: "negotiation",
      probability: 85,
      expectedCloseDate: "2024-02-10",
      contactPerson: "David Kim",
      email: "david@techflow.com",
      phone: "+1 (555) 234-5678",
      notes: "Negotiating contract terms for enterprise-level SEO services",
      createdDate: "2023-12-20",
      lastActivity: "2024-01-16"
    },
    {
      id: 5,
      title: "Fashion Hub - E-commerce SEO",
      clientName: "Fashion Hub",
      value: 6200,
      stage: "closed-won",
      probability: 100,
      expectedCloseDate: "2024-01-15",
      contactPerson: "Emma Wilson",
      email: "emma@fashionhub.com",
      phone: "+1 (555) 345-6789",
      notes: "Contract signed for e-commerce SEO optimization",
      createdDate: "2023-12-15",
      lastActivity: "2024-01-15"
    }
  ])

  const [formData, setFormData] = useState({
    title: '',
    clientName: '',
    value: '',
    stage: 'lead',
    probability: 20,
    expectedCloseDate: '',
    contactPerson: '',
    email: '',
    phone: '',
    notes: ''
  })

  const stages = [
    { id: 'lead', name: 'Lead', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400' },
    { id: 'qualified', name: 'Qualified', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' },
    { id: 'proposal', name: 'Proposal', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' },
    { id: 'negotiation', name: 'Negotiation', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400' },
    { id: 'closed-won', name: 'Closed Won', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' },
    { id: 'closed-lost', name: 'Closed Lost', color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' }
  ]

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'value' ? parseFloat(value) || '' : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.title || !formData.clientName || !formData.value) {
      toast.error("Please fill in all required fields")
      return
    }

    const newDeal = {
      id: deals.length + 1,
      ...formData,
      value: parseFloat(formData.value),
      createdDate: new Date().toISOString().split('T')[0],
      lastActivity: new Date().toISOString().split('T')[0]
    }

    setDeals([...deals, newDeal])
    toast.success("Deal added successfully!")
    
    setFormData({
      title: '',
      clientName: '',
      value: '',
      stage: 'lead',
      probability: 20,
      expectedCloseDate: '',
      contactPerson: '',
      email: '',
      phone: '',
      notes: ''
    })
    setShowAddForm(false)
  }

  const updateDealStage = (dealId, newStage) => {
    setDeals(deals.map(deal => 
      deal.id === dealId 
        ? { 
            ...deal, 
            stage: newStage, 
            lastActivity: new Date().toISOString().split('T')[0],
            probability: newStage === 'closed-won' ? 100 : newStage === 'closed-lost' ? 0 : deal.probability
          }
        : deal
    ))
    toast.success("Deal stage updated successfully!")
  }

  const deleteDeal = (dealId) => {
    setDeals(deals.filter(deal => deal.id !== dealId))
    toast.success("Deal deleted successfully!")
  }

  const handleDragStart = (e, deal) => {
    setDraggedDeal(deal)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, newStage) => {
    e.preventDefault()
    if (draggedDeal && draggedDeal.stage !== newStage) {
      updateDealStage(draggedDeal.id, newStage)
    }
    setDraggedDeal(null)
  }

  const getStageDeals = (stageId) => {
    return deals.filter(deal => deal.stage === stageId)
  }

  const getTotalValue = (stageId) => {
    return getStageDeals(stageId).reduce((sum, deal) => sum + deal.value, 0)
  }

  const getWeightedValue = (stageId) => {
    return getStageDeals(stageId).reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0)
  }

  const totalPipelineValue = deals.reduce((sum, deal) => sum + deal.value, 0)
  const weightedPipelineValue = deals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0)

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
        
        {/* Header */}
        <header className="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.location.href = '/'}
                className="p-2 text-surface-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
              >
                <ApperIcon name="ArrowLeft" className="h-5 w-5" />
              </button>
              
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-surface-900 dark:text-white">Deal Pipeline</h1>
                <p className="text-surface-500 dark:text-surface-400 mt-1">
                  Manage and track your sales opportunities
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
              
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl font-medium transition-colors"
              >
                <ApperIcon name="Plus" className="h-4 w-4" />
                <span>Add Deal</span>
              </button>
            </div>
          </div>
        </header>

        {/* Pipeline Overview */}
        <div className="p-4 lg:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-200 dark:border-surface-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                  <ApperIcon name="Target" className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-surface-500 dark:text-surface-400 mb-1">Total Deals</h3>
              <p className="text-2xl lg:text-3xl font-bold text-surface-900 dark:text-white">{deals.length}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-200 dark:border-surface-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                  <ApperIcon name="DollarSign" className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-surface-500 dark:text-surface-400 mb-1">Pipeline Value</h3>
              <p className="text-2xl lg:text-3xl font-bold text-surface-900 dark:text-white">
                ${totalPipelineValue.toLocaleString()}
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
              </div>
              <h3 className="text-sm font-medium text-surface-500 dark:text-surface-400 mb-1">Weighted Value</h3>
              <p className="text-2xl lg:text-3xl font-bold text-surface-900 dark:text-white">
                ${Math.round(weightedPipelineValue).toLocaleString()}
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
                  <ApperIcon name="Award" className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-surface-500 dark:text-surface-400 mb-1">Closed Won</h3>
              <p className="text-2xl lg:text-3xl font-bold text-surface-900 dark:text-white">
                {getStageDeals('closed-won').length}
              </p>
            </motion.div>
          </div>

          {/* Pipeline Board */}
          <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-card border border-surface-200 dark:border-surface-700 overflow-hidden">
            <div className="p-6 border-b border-surface-200 dark:border-surface-700">
              <h2 className="text-xl font-bold text-surface-900 dark:text-white">Pipeline Board</h2>
              <p className="text-surface-500 dark:text-surface-400 mt-1">Drag deals between stages to update their status</p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {stages.map((stage) => {
                  const stageDeals = getStageDeals(stage.id)
                  return (
                    <div
                      key={stage.id}
                      className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, stage.id)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-surface-900 dark:text-white text-sm">
                            {stage.name}
                          </h3>
                          <p className="text-xs text-surface-500 dark:text-surface-400">
                            {stageDeals.length} deals • ${getTotalValue(stage.id).toLocaleString()}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${stage.color}`}>
                          {stageDeals.length}
                        </span>
                      </div>

                      <div className="space-y-3 min-h-[200px]">
                        {stageDeals.map((deal) => (
                          <motion.div
                            key={deal.id}
                            layout
                            draggable
                            onDragStart={(e) => handleDragStart(e, deal)}
                            className="bg-white dark:bg-surface-800 rounded-lg p-4 border border-surface-200 dark:border-surface-600 cursor-move hover:shadow-card transition-all duration-200 group"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-surface-900 dark:text-white text-sm leading-tight">
                                {deal.title}
                              </h4>
                              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                  onClick={() => setSelectedDeal(deal)}
                                  className="p-1 text-surface-400 hover:text-primary hover:bg-primary/10 rounded transition-colors"
                                >
                                  <ApperIcon name="Eye" className="h-3 w-3" />
                                </button>
                                <button 
                                  onClick={() => deleteDeal(deal.id)}
                                  className="p-1 text-surface-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                                >
                                  <ApperIcon name="Trash2" className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                            
                            <div className="space-y-2 text-xs text-surface-600 dark:text-surface-300">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">${deal.value.toLocaleString()}</span>
                                <span className="bg-surface-100 dark:bg-surface-600 px-2 py-1 rounded-full">
                                  {deal.probability}%
                                </span>
                              </div>
                              
                              <div className="flex items-center space-x-1">
                                <ApperIcon name="User" className="h-3 w-3" />
                                <span className="truncate">{deal.clientName}</span>
                              </div>
                              
                              <div className="flex items-center space-x-1">
                                <ApperIcon name="Calendar" className="h-3 w-3" />
                                <span>{deal.expectedCloseDate}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Add Deal Modal */}
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
                className="bg-white dark:bg-surface-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-surface-900 dark:text-white">Add New Deal</h3>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="p-2 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 rounded-lg"
                  >
                    <ApperIcon name="X" className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Deal Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Client Name *
                      </label>
                      <input
                        type="text"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Deal Value ($) *
                      </label>
                      <input
                        type="number"
                        name="value"
                        value={formData.value}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Stage
                      </label>
                      <select
                        name="stage"
                        value={formData.stage}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        {stages.map((stage) => (
                          <option key={stage.id} value={stage.id}>{stage.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Probability (%)
                      </label>
                      <input
                        type="number"
                        name="probability"
                        value={formData.probability}
                        onChange={handleInputChange}
                        min="0"
                        max="100"
                        className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Expected Close Date
                      </label>
                      <input
                        type="date"
                        name="expectedCloseDate"
                        value={formData.expectedCloseDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Contact Person
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Notes
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows="3"
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
                      Add Deal
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Deal Detail Modal */}
        <AnimatePresence>
          {selectedDeal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedDeal(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-surface-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-surface-900 dark:text-white">Deal Details</h3>
                  <button
                    onClick={() => setSelectedDeal(null)}
                    className="p-2 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 rounded-lg"
                  >
                    <ApperIcon name="X" className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">{selectedDeal.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-surface-600 dark:text-surface-300">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        stages.find(s => s.id === selectedDeal.stage)?.color
                      }`}>
                        {stages.find(s => s.id === selectedDeal.stage)?.name}
                      </span>
                      <span className="font-medium">${selectedDeal.value.toLocaleString()}</span>
                      <span>{selectedDeal.probability}% probability</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-surface-900 dark:text-white mb-2">Client Information</h5>
                        <div className="space-y-2 text-sm text-surface-600 dark:text-surface-300">
                          <div className="flex items-center space-x-2">
                            <ApperIcon name="Building" className="h-4 w-4" />
                            <span>{selectedDeal.clientName}</span>
                          </div>
                          {selectedDeal.contactPerson && (
                            <div className="flex items-center space-x-2">
                              <ApperIcon name="User" className="h-4 w-4" />
                              <span>{selectedDeal.contactPerson}</span>
                            </div>
                          )}
                          {selectedDeal.email && (
                            <div className="flex items-center space-x-2">
                              <ApperIcon name="Mail" className="h-4 w-4" />
                              <span>{selectedDeal.email}</span>
                            </div>
                          )}
                          {selectedDeal.phone && (
                            <div className="flex items-center space-x-2">
                              <ApperIcon name="Phone" className="h-4 w-4" />
                              <span>{selectedDeal.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-surface-900 dark:text-white mb-2">Timeline</h5>
                        <div className="space-y-2 text-sm text-surface-600 dark:text-surface-300">
                          <div className="flex items-center space-x-2">
                            <ApperIcon name="Calendar" className="h-4 w-4" />
                            <span>Created: {selectedDeal.createdDate}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <ApperIcon name="Clock" className="h-4 w-4" />
                            <span>Last Activity: {selectedDeal.lastActivity}</span>
                          </div>
                          {selectedDeal.expectedCloseDate && (
                            <div className="flex items-center space-x-2">
                              <ApperIcon name="Target" className="h-4 w-4" />
                              <span>Expected Close: {selectedDeal.expectedCloseDate}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedDeal.notes && (
                    <div>
                      <h5 className="font-medium text-surface-900 dark:text-white mb-2">Notes</h5>
                      <p className="text-sm text-surface-600 dark:text-surface-300 bg-surface-50 dark:bg-surface-700 rounded-lg p-4">
                        {selectedDeal.notes}
                      </p>
                    </div>
                  )}

                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={() => setSelectedDeal(null)}
                      className="flex-1 px-4 py-2 text-surface-600 dark:text-surface-300 bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 rounded-lg font-medium transition-colors"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        toast.info("Edit functionality coming soon!")
                      }}
                      className="flex-1 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors"
                    >
                      Edit Deal
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Deals