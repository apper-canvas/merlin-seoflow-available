import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

const Clients = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      companyName: "TechStart Inc",
      contactPerson: "Sarah Johnson",
      email: "sarah@techstart.com",
      phone: "+1 (555) 123-4567",
      website: "techstart.com",
      status: "Active",
      industry: "Technology",
      projects: 3,
      lastContact: "2024-01-15",
      value: 25000,
      notes: "Important client with multiple ongoing projects"
    },
    {
      id: 2,
      companyName: "GreenLeaf Solutions",
      contactPerson: "Mike Chen",
      email: "mike@greenleaf.co",
      phone: "+1 (555) 987-6543",
      website: "greenleaf.co",
      status: "Active",
      industry: "Environmental",
      projects: 2,
      lastContact: "2024-01-12",
      value: 18000,
      notes: "Growing business, potential for expansion"
    },
    {
      id: 3,
      companyName: "Urban Fitness",
      contactPerson: "Lisa Rodriguez",
      email: "lisa@urbanfitness.com",
      phone: "+1 (555) 456-7890",
      website: "urbanfitness.com",
      status: "Inactive",
      industry: "Health & Fitness",
      projects: 1,
      lastContact: "2024-01-08",
      value: 12000,
      notes: "Seasonal client, contact before summer"
    },
    {
      id: 4,
      companyName: "Digital Marketing Pro",
      contactPerson: "James Wilson",
      email: "james@digitalmarketingpro.com",
      phone: "+1 (555) 321-0987",
      website: "digitalmarketingpro.com",
      status: "Active",
      industry: "Marketing",
      projects: 5,
      lastContact: "2024-01-20",
      value: 35000,
      notes: "High-value client with ongoing retainer"
    },
    {
      id: 5,
      companyName: "Local Restaurant Group",
      contactPerson: "Maria Garcia",
      email: "maria@localrestaurantgroup.com",
      phone: "+1 (555) 654-3210",
      website: "localrestaurantgroup.com",
      status: "Prospect",
      industry: "Food & Beverage",
      projects: 0,
      lastContact: "2024-01-18",
      value: 0,
      notes: "Interested in local SEO services"
    }
  ])

  const [columns] = useState([
    { key: 'companyName', label: 'Company Name', width: 200, type: 'text' },
    { key: 'contactPerson', label: 'Contact Person', width: 150, type: 'text' },
    { key: 'email', label: 'Email', width: 200, type: 'email' },
    { key: 'phone', label: 'Phone', width: 150, type: 'tel' },
    { key: 'website', label: 'Website', width: 150, type: 'url' },
    { key: 'status', label: 'Status', width: 120, type: 'select', options: ['Active', 'Inactive', 'Prospect', 'Lost'] },
    { key: 'industry', label: 'Industry', width: 150, type: 'text' },
    { key: 'projects', label: 'Projects', width: 100, type: 'number' },
    { key: 'lastContact', label: 'Last Contact', width: 130, type: 'date' },
    { key: 'value', label: 'Value ($)', width: 120, type: 'number' },
    { key: 'notes', label: 'Notes', width: 250, type: 'text' }
  ])

  const [selectedCell, setSelectedCell] = useState(null)
  const [editingCell, setEditingCell] = useState(null)
  const [selectedRows, setSelectedRows] = useState(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [editValue, setEditValue] = useState('')
  
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (editingCell && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editingCell])

  const filteredClients = clients.filter(client => {
    const matchesSearch = Object.values(client).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
    const matchesFilter = filterStatus === 'all' || client.status.toLowerCase() === filterStatus.toLowerCase()
    return matchesSearch && matchesFilter
  })

  const handleCellClick = (rowIndex, columnKey) => {
    const cellId = `${rowIndex}-${columnKey}`
    setSelectedCell(cellId)
    
    if (selectedCell === cellId) {
      startEditing(rowIndex, columnKey)
    }
  }

  const startEditing = (rowIndex, columnKey) => {
    const client = filteredClients[rowIndex]
    setEditingCell(`${rowIndex}-${columnKey}`)
    setEditValue(client[columnKey] || '')
  }

  const stopEditing = () => {
    if (editingCell) {
      const [rowIndex, columnKey] = editingCell.split('-')
      const clientIndex = clients.findIndex(c => c.id === filteredClients[parseInt(rowIndex)].id)
      
      if (clientIndex !== -1) {
        const updatedClients = [...clients]
        const column = columns.find(col => col.key === columnKey)
        
        let value = editValue
        if (column.type === 'number') {
          value = parseFloat(editValue) || 0
        }
        
        updatedClients[clientIndex] = {
          ...updatedClients[clientIndex],
          [columnKey]: value
        }
        
        setClients(updatedClients)
        toast.success('Cell updated successfully')
      }
      
      setEditingCell(null)
      setEditValue('')
    }
  }

  const handleKeyDown = (e) => {
    if (!selectedCell) return

    const [rowIndex, columnKey] = selectedCell.split('-')
    const currentRowIndex = parseInt(rowIndex)
    const currentColumnIndex = columns.findIndex(col => col.key === columnKey)

    switch (e.key) {
      case 'Enter':
        if (editingCell) {
          stopEditing()
        } else {
          startEditing(currentRowIndex, columnKey)
        }
        break
      case 'Escape':
        if (editingCell) {
          setEditingCell(null)
          setEditValue('')
        }
        break
      case 'ArrowUp':
        if (!editingCell && currentRowIndex > 0) {
          setSelectedCell(`${currentRowIndex - 1}-${columnKey}`)
        }
        break
      case 'ArrowDown':
        if (!editingCell && currentRowIndex < filteredClients.length - 1) {
          setSelectedCell(`${currentRowIndex + 1}-${columnKey}`)
        }
        break
      case 'ArrowLeft':
        if (!editingCell && currentColumnIndex > 0) {
          setSelectedCell(`${currentRowIndex}-${columns[currentColumnIndex - 1].key}`)
        }
        break
      case 'ArrowRight':
        if (!editingCell && currentColumnIndex < columns.length - 1) {
          setSelectedCell(`${currentRowIndex}-${columns[currentColumnIndex + 1].key}`)
        }
        break
      case 'Tab':
        e.preventDefault()
        if (editingCell) {
          stopEditing()
        }
        if (e.shiftKey) {
          if (currentColumnIndex > 0) {
            setSelectedCell(`${currentRowIndex}-${columns[currentColumnIndex - 1].key}`)
          }
        } else {
          if (currentColumnIndex < columns.length - 1) {
            setSelectedCell(`${currentRowIndex}-${columns[currentColumnIndex + 1].key}`)
          }
        }
        break
    }
  }

  const addNewRow = () => {
    const newClient = {
      id: Math.max(...clients.map(c => c.id)) + 1,
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      website: '',
      status: 'Prospect',
      industry: '',
      projects: 0,
      lastContact: new Date().toISOString().split('T')[0],
      value: 0,
      notes: ''
    }
    
    setClients([...clients, newClient])
    toast.success('New row added')
  }

  const deleteSelectedRows = () => {
    if (selectedRows.size === 0) {
      toast.warning('No rows selected')
      return
    }

    if (window.confirm(`Are you sure you want to delete ${selectedRows.size} row(s)?`)) {
      const updatedClients = clients.filter(client => !selectedRows.has(client.id))
      setClients(updatedClients)
      setSelectedRows(new Set())
      toast.success(`${selectedRows.size} row(s) deleted successfully`)
    }
  }

  const toggleRowSelection = (clientId) => {
    const newSelection = new Set(selectedRows)
    if (newSelection.has(clientId)) {
      newSelection.delete(clientId)
    } else {
      newSelection.add(clientId)
    }
    setSelectedRows(newSelection)
  }

  const selectAllRows = () => {
    if (selectedRows.size === filteredClients.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(filteredClients.map(client => client.id)))
    }
  }

  const exportToCSV = () => {
    const headers = columns.map(col => col.label).join(',')
    const rows = filteredClients.map(client => 
      columns.map(col => {
        const value = client[col.key]
        return typeof value === 'string' && value.includes(',') ? `"${value}"` : value
      }).join(',')
    )
    
    const csvContent = [headers, ...rows].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'clients.csv'
    a.click()
    window.URL.revokeObjectURL(url)
    toast.success('Data exported successfully')
  }

  const renderCell = (client, column, rowIndex) => {
    const cellId = `${rowIndex}-${column.key}`
    const isSelected = selectedCell === cellId
    const isEditing = editingCell === cellId
    const value = client[column.key]

    return (
      <td
        key={column.key}
        className={`sheets-cell ${
          isSelected ? 'selected' : ''
        } ${
          isEditing ? 'editing' : ''
        }`}
        style={{ width: column.width }}
        onClick={() => handleCellClick(rowIndex, column.key)}
        onDoubleClick={() => startEditing(rowIndex, column.key)}
      >
        {isEditing ? (
          column.type === 'select' ? (
            <select
              ref={inputRef}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={stopEditing}
              onKeyDown={(e) => {
                if (e.key === 'Enter') stopEditing()
                if (e.key === 'Escape') {
                  setEditingCell(null)
                  setEditValue('')
                }
              }}
              className="w-full bg-transparent border-none outline-none"
            >
              {column.options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <input
              ref={inputRef}
              type={column.type}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={stopEditing}
              onKeyDown={(e) => {
                if (e.key === 'Enter') stopEditing()
                if (e.key === 'Escape') {
                  setEditingCell(null)
                  setEditValue('')
                }
              }}
            />
          )
        ) : (
          <span>
            {column.type === 'number' && column.key === 'value' 
              ? `$${Number(value).toLocaleString()}` 
              : String(value || '')
            }
          </span>
        )}
      </td>
    )
  }

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="p-4 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft border border-surface-200 dark:border-surface-700 overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-surface-200 dark:border-surface-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-surface-900 dark:text-white">
                  Clients Management
                </h1>
                <p className="text-surface-500 dark:text-surface-400 mt-1">
                  Manage your clients with a spreadsheet-like interface
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-surface-400" />
                  <input
                    type="text"
                    placeholder="Search clients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full sm:w-64"
                  />
                </div>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="prospect">Prospect</option>
                  <option value="lost">Lost</option>
                </select>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="sheets-toolbar">
            <button onClick={addNewRow} className="primary">
              <ApperIcon name="Plus" className="h-4 w-4" />
              Add Row
            </button>
            
            <button 
              onClick={deleteSelectedRows} 
              className="danger"
              disabled={selectedRows.size === 0}
            >
              <ApperIcon name="Trash2" className="h-4 w-4" />
              Delete Selected ({selectedRows.size})
            </button>
            
            <button onClick={selectAllRows}>
              <ApperIcon name="CheckSquare" className="h-4 w-4" />
              {selectedRows.size === filteredClients.length ? 'Deselect All' : 'Select All'}
            </button>
            
            <button onClick={exportToCSV}>
              <ApperIcon name="Download" className="h-4 w-4" />
              Export CSV
            </button>
            
            <div className="text-sm text-surface-500 dark:text-surface-400 ml-auto">
              {filteredClients.length} of {clients.length} clients
            </div>
          </div>

          {/* Spreadsheet */}
          <div className="sheets-container" ref={containerRef}>
            <table className="sheets-table w-full">
              <thead>
                <tr>
                  <th className="sheets-header" style={{ width: 50 }}>
                    <input
                      type="checkbox"
                      checked={selectedRows.size > 0 && selectedRows.size === filteredClients.length}
                      onChange={selectAllRows}
                      className="rounded"
                    />
                  </th>
                  {columns.map((column) => (
                    <th 
                      key={column.key} 
                      className="sheets-header"
                      style={{ width: column.width }}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client, rowIndex) => (
                  <tr 
                    key={client.id}
                    className={selectedRows.has(client.id) ? 'row-selected' : ''}
                  >
                    <td className="sheets-row-number">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(client.id)}
                        onChange={() => toggleRowSelection(client.id)}
                        className="rounded"
                      />
                    </td>
                    {columns.map((column) => renderCell(client, column, rowIndex))}
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredClients.length === 0 && (
              <div className="text-center py-12">
                <ApperIcon name="Users" className="h-12 w-12 text-surface-400 mx-auto mb-4" />
                <p className="text-surface-500 dark:text-surface-400">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'No clients match your search criteria' 
                    : 'No clients found. Add your first client to get started.'
                  }
                </p>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="p-4 bg-surface-50 dark:bg-surface-700 border-t border-surface-200 dark:border-surface-600">
            <div className="text-sm text-surface-600 dark:text-surface-300 space-y-1">
              <p><strong>Tips:</strong> Click a cell to select, click again to edit. Use arrow keys to navigate, Tab to move between cells.</p>
              <p><strong>Keyboard shortcuts:</strong> Enter to edit/save, Escape to cancel, Tab/Shift+Tab to navigate</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Clients