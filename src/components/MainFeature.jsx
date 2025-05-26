import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [activeTab, setActiveTab] = useState('clients')
  const [showAddForm, setShowAddForm] = useState(false)
  const [clients, setClients] = useState([
    {
      id: 1,
      companyName: "TechStart Inc",
      contactPerson: "Sarah Johnson",
      email: "sarah@techstart.com",
      phone: "+1 (555) 123-4567",
      website: "techstart.com",
      status: "active",
      projects: 3,
      lastContact: "2024-01-15"
    },
    {
      id: 2,
      companyName: "GreenLeaf Solutions",
      contactPerson: "Mike Chen",
      email: "mike@greenleaf.co",
      phone: "+1 (555) 987-6543",
      website: "greenleaf.co",
      status: "active",
      projects: 2,
      lastContact: "2024-01-12"
    },
    {
      id: 3,
      companyName: "Urban Fitness",
      contactPerson: "Lisa Rodriguez",
      email: "lisa@urbanfitness.com",
      phone: "+1 (555) 456-7890",
      website: "urbanfitness.com",
      status: "inactive",
      projects: 1,
      lastContact: "2024-01-08"
    }
  ])

  const [projects, setProjects] = useState([
    {
      id: 1,
      clientId: 1,
      projectName: "E-commerce SEO Optimization",
      description: "Complete SEO overhaul for online store",
      status: "in-progress",
      progress: 65,
      startDate: "2024-01-01",
      endDate: "2024-03-01",
      budget: 5000,
      tasks: 12
    },
    {
      id: 2,
      clientId: 2,
      projectName: "Local SEO Campaign",
      description: "Improve local search visibility",
      status: "planning",
      progress: 25,
      startDate: "2024-01-15",
      endDate: "2024-04-15",
      budget: 3500,
      tasks: 8
    },
    {
      id: 3,
      clientId: 1,
      projectName: "Content Marketing Strategy",
      description: "Develop and implement content strategy",
      status: "completed",
      progress: 100,
      startDate: "2023-11-01",
      endDate: "2024-01-01",
      budget: 4200,
      tasks: 15
    }
  ])

  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    projectName: '',
    description: '',
    budget: '',
    endDate: ''
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const tabs = [
    { id: 'clients', label: 'Client Management', icon: 'Users' },
    { id: 'projects', label: 'Project Tracking', icon: 'FolderOpen' }
  ]

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (activeTab === 'clients') {
      if (!formData.companyName || !formData.contactPerson || !formData.email) {
        toast.error("Please fill in all required fields")
        return
      }

      const newClient = {
        id: clients.length + 1,
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        status: 'active',
        projects: 0,
        lastContact: new Date().toISOString().split('T')[0]
      }

      setClients([...clients, newClient])
      toast.success("Client added successfully!")
    } else {
      if (!formData.projectName || !formData.description || !formData.budget) {
        toast.error("Please fill in all required fields")
        return
      }

      const newProject = {
        id: projects.length + 1,
        clientId: 1,
        projectName: formData.projectName,
        description: formData.description,
        status: 'planning',
        progress: 0,
        startDate: new Date().toISOString().split('T')[0],
        endDate: formData.endDate,
        budget: parseFloat(formData.budget),
        tasks: 0
      }

      setProjects([...projects, newProject])
      toast.success("Project created successfully!")
    }

    setFormData({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      website: '',
      projectName: '',
      description: '',
      budget: '',
      endDate: ''
    })
    setShowAddForm(false)
  }

  const deleteClient = (id) => {
    setClients(clients.filter(client => client.id !== id))
    toast.success("Client deleted successfully!")
  }

  const deleteProject = (id) => {
    setProjects(projects.filter(project => project.id !== id))
    toast.success("Project deleted successfully!")
  }

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || client.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
      case 'in-progress':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'inactive':
      case 'planning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft border border-surface-200 dark:border-surface-700 overflow-hidden">
      
      {/* Header with Tabs */}
      <div className="border-b border-surface-200 dark:border-surface-700 p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex bg-surface-100 dark:bg-surface-700 rounded-xl p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-surface-600 text-primary shadow-card'
                      : 'text-surface-600 dark:text-surface-300 hover:text-surface-900 dark:hover:text-white'
                  }`}
                >
                  <ApperIcon name={tab.icon} className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <div className="relative">
                <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-surface-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full sm:w-auto"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full sm:w-auto"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl font-medium transition-colors w-full sm:w-auto justify-center"
          >
            <ApperIcon name="Plus" className="h-4 w-4" />
            <span>Add {activeTab === 'clients' ? 'Client' : 'Project'}</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 lg:p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'clients' ? (
            <motion.div
              key="clients"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              {filteredClients.length === 0 ? (
                <div className="text-center py-12">
                  <ApperIcon name="Users" className="h-12 w-12 text-surface-400 mx-auto mb-4" />
                  <p className="text-surface-500 dark:text-surface-400">No clients found</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredClients.map((client) => (
                    <motion.div
                      key={client.id}
                      layout
                      className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4 lg:p-6 border border-surface-200 dark:border-surface-600 hover:shadow-card transition-all duration-200 group"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                            <h3 className="text-lg font-semibold text-surface-900 dark:text-white">
                              {client.companyName}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)} w-fit`}>
                              {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                            </span>
                          </div>
                          
                          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-surface-600 dark:text-surface-300">
                            <div className="flex items-center space-x-2">
                              <ApperIcon name="User" className="h-4 w-4" />
                              <span>{client.contactPerson}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <ApperIcon name="Mail" className="h-4 w-4" />
                              <span className="truncate">{client.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <ApperIcon name="Phone" className="h-4 w-4" />
                              <span>{client.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <ApperIcon name="FolderOpen" className="h-4 w-4" />
                              <span>{client.projects} Projects</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-surface-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                            <ApperIcon name="Edit" className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => deleteClient(client.id)}
                            className="p-2 text-surface-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <ApperIcon name="Trash2" className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="projects"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {filteredProjects.length === 0 ? (
                <div className="text-center py-12">
                  <ApperIcon name="FolderOpen" className="h-12 w-12 text-surface-400 mx-auto mb-4" />
                  <p className="text-surface-500 dark:text-surface-400">No projects found</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      layout
                      className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4 lg:p-6 border border-surface-200 dark:border-surface-600 hover:shadow-card transition-all duration-200 group"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                            <h3 className="text-lg font-semibold text-surface-900 dark:text-white">
                              {project.projectName}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)} w-fit`}>
                              {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                            </span>
                          </div>
                          
                          <p className="text-sm text-surface-600 dark:text-surface-300 mt-2 mb-4">
                            {project.description}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-surface-600 dark:text-surface-300">
                            <div className="flex items-center space-x-2">
                              <ApperIcon name="Calendar" className="h-4 w-4" />
                              <span>{project.endDate}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <ApperIcon name="DollarSign" className="h-4 w-4" />
                              <span>${project.budget.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <ApperIcon name="CheckSquare" className="h-4 w-4" />
                              <span>{project.tasks} Tasks</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <ApperIcon name="TrendingUp" className="h-4 w-4" />
                              <span>{project.progress}% Complete</span>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="mt-4">
                            <div className="bg-surface-200 dark:bg-surface-600 rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-surface-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                            <ApperIcon name="Edit" className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => deleteProject(project.id)}
                            className="p-2 text-surface-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <ApperIcon name="Trash2" className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
                  Add New {activeTab === 'clients' ? 'Client' : 'Project'}
                </h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="p-2 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 rounded-lg"
                >
                  <ApperIcon name="X" className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {activeTab === 'clients' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
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

                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Project Name *
                      </label>
                      <input
                        type="text"
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Description *
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Budget *
                      </label>
                      <input
                        type="number"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </>
                )}

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
                    Add {activeTab === 'clients' ? 'Client' : 'Project'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature